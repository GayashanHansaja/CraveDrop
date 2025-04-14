import express from 'express';
import dotenv from 'dotenv';
import sequelize from './db/sequelize.js';
import notificationRoutes from './routes/notificationRoutes.js';

dotenv.config();
const app = express();
app.use(express.json());

app.use('/notify', notificationRoutes);

app.get('/health', (req, res) => {
    res.json({ status: 'ok', service: 'notification-service' });
});

const PORT = process.env.PORT || 3000;
const start = async () => {
    try {
        await sequelize.sync();
        app.listen(PORT, () => console.log(`Notification Service on port ${PORT}`));
    } catch (err) {
        console.error('Startup failed', err);
    }
};

start();
