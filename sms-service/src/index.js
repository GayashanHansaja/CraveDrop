import amqp from "amqplib";
import dotenv from "dotenv";
import twilio from "twilio";
import { logger } from "./middleware/logger.js";
import express from "express";

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "ok",
        service: "user-service",
        timestamp: new Date().toISOString(),
    });
});

app.listen(PORT, () => {
    logger.info(`Email Service health API listening on port ${PORT}`);
});

// Start RabbitMQ consumer
const run = async () => {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue("sms_queue");

    logger.info("SMS Service is listening on sms_queue...");

    channel.consume("sms_queue", async (msg) => {
        const { recipient, message } = JSON.parse(msg.content.toString());

        try {
            const response = await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: recipient,
            });

            const {
                sid,
                status,
                to,
                from,
                body,
                error_code,
                error_message,
            } = response;

            logger.info({
                sid,
                status,
                to,
                from,
                body,
                error: {
                    code: error_code || "none",
                    message: error_message || "",
                },
            });
            channel.ack(msg);
        } catch (error) {
            logger.warn(`Failed to send SMS to ${recipient}:`, error.message);
            channel.nack(msg, false, false);
        }
    });
};

run().catch(console.error);

// client.messages
//     .create({
//         from: 'whatsapp:+123456789',
//         contentSid: '',
//         contentVariables: '{"1":"12/1","2":"3pm"}',
//         to: 'whatsapp:+941234567'
//     })
//     .then(message => console.log(message.sid))
//     .done()
