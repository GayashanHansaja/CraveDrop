import { DataTypes } from 'sequelize';
import sequelize from '../db/sequelize.js';
import User from './user.js';

const Address = sequelize.define('Address', {
    street: { type: DataTypes.STRING },
    city: { type: DataTypes.STRING },
    postalCode: { type: DataTypes.STRING },
    country: { type: DataTypes.STRING }
}, {
    tableName: 'addresses',
    timestamps: false
});

// Associations
User.hasOne(Address, { foreignKey: 'userId', as: 'address', onDelete: 'CASCADE' });
Address.belongsTo(User, { foreignKey: 'userId' });

export default Address;
