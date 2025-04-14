import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';

const Notification = sequelize.define('Notification', {
    userId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    type: {
        type: DataTypes.ENUM('email', 'sms'),
        allowNull: false
    },
    recipient: {
        type: DataTypes.STRING,
        allowNull: false
    },
    message: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING,
        defaultValue: 'queued'
    }
}, {
    tableName: 'notifications',
    timestamps: true
});

export default Notification;

// TODO: Connect with user db