import express from 'express';
import {
    sendNotification,
    getNotificationsByUserId
} from '../controllers/notificationController.js';

const router = express.Router();

router.post('/', sendNotification);
router.get('/:userId', getNotificationsByUserId);

export default router;
