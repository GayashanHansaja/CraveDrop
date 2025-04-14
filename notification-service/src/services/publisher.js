import { getChannel } from '../utils/rabbitmq.js';

export const publishNotification = async (payload) => {
    const channel = await getChannel();
    const queue = payload.type === 'sms' ? 'sms_queue' : 'email_queue';
    await channel.assertQueue(queue, { durable: true });
    channel.sendToQueue(queue, Buffer.from(JSON.stringify(payload)), { persistent: true });
};
