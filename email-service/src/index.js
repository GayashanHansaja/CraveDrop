import amqp from "amqplib";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { logger } from "./middleware/logger.js";
import express from "express";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "ok",
    service: "email-service",
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  logger.info(`Email Service health API listening on port ${PORT}`);
});

var transport = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const run = async () => {
  const conn = await amqp.connect(process.env.RABBITMQ_URL);
  const channel = await conn.createChannel();
  await channel.assertQueue("email_queue");

  logger.info("Email Service is consuming from email_queue...");

  channel.consume("email_queue", async (msg) => {
    const { recipient, message, subject } = JSON.parse(msg.content.toString());

    try {
      // attempt to send email
      await transport.sendMail({
        from: process.env.EMAIL_FROM || '"No Reply" <no-reply@example.com>',
        to: recipient,
        subject: subject,
        text: message,
        html: `<p>${message}</p>`,
      });

      logger.info(`Email sent to ${recipient}`);
      channel.ack(msg); // success
    } catch (error) {
      logger.warn(`Failed to send email to ${recipient}: ${error.message}`);

      // Retry logic:
      const maxRetries = 2;
      const headers = msg.properties.headers || {};
      const currentRetries = headers["x-retry"] || 0;

      if (currentRetries < maxRetries) {
        // requeue with retry count
        channel.nack(msg, false, false); // remove from current queue
        channel.sendToQueue("email_queue", msg.content, {
          headers: { "x-retry": currentRetries + 1 },
        });
      } else {
        logger.warn(`Giving up on ${recipient} after ${maxRetries} retries`);
        channel.nack(msg, false, false); // drop message
      }
    }
  });
};

run().catch(console.error);
