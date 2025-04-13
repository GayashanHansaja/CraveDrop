import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import User from './user.js';

const MobileNumber = sequelize.define('MobileNumber', {
    number: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'mobile_numbers',
    timestamps: false
});

User.hasMany(MobileNumber, { foreignKey: 'userId', as: 'mobileNumbers', onDelete: 'CASCADE' });
MobileNumber.belongsTo(User, { foreignKey: 'userId' });

export default MobileNumber;
