import amqp from 'amqplib';
import dotenv from 'dotenv';
import twilio from "twilio"

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

// Start RabbitMQ consumer
const run = async () => {
    const conn = await amqp.connect(process.env.RABBITMQ_URL);
    const channel = await conn.createChannel();
    await channel.assertQueue('sms_queue');

    console.log('SMS Service is listening on sms_queue...');

    channel.consume('sms_queue', async (msg) => {
        const { recipient, message } = JSON.parse(msg.content.toString());

        try {
            const response = await client.messages.create({
                body: message,
                from: process.env.TWILIO_PHONE_NUMBER,
                to: recipient,
            });
            console.log(response)
            console.log(`SMS sent to ${recipient}`);
            channel.ack(msg);
        } catch (error) {
            console.error(`Failed to send SMS to ${recipient}:`, error.message);
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
//     .done();