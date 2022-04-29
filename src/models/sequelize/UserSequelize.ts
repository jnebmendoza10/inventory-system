import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import { User } from '../base/User';

export interface UserSequelize extends User, Model {}

export const UserModel = sequelize.define<UserSequelize>('Users', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    },
});
