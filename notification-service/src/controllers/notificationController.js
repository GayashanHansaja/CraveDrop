// src/controllers/notificationController.js
import Notification from '../models/notification.js';
import { publishNotification } from '../services/publisher.js';
import { StatusCodes } from 'http-status-codes';

export const sendNotification = async (req, res, next) => {
    try {
        const { userId, type, recipient, message, subject } = req.body;

        if (!userId || !type || !recipient || !message || !subject) {
            return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Missing required fields' });
        }

        const notification = await Notification.create({ userId, type, recipient, message, subject });

        await publishNotification({ type, recipient, message, subject });

        res.status(StatusCodes.CREATED).json({
            message: 'Notification queued',
            notificationId: notification.id
        });
    } catch (err) {
        next(err);
    }
};

export const getNotificationsByUserId = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const notifications = await Notification.findAll({ where: { userId }, order: [['createdAt', 'DESC']] });
        res.status(StatusCodes.OK).json(notifications);
    } catch (err) {
        next(err);
    }
};
