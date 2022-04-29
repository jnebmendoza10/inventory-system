import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import { Review } from '../base/Review';
import { ProductModel } from './ProductSequelize';
import { UserModel } from './UserSequelize';

export interface ReviewSequelize extends Review, Model {}

export const ReviewModel = sequelize.define<ReviewSequelize>('Reviews', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
        allowNull: false,
    },
    comment: {
        type: DataTypes.STRING,
        allowNull: true,
    },
});

UserModel.hasMany(ReviewModel, { foreignKey: 'customer' });
ProductModel.hasMany(ReviewModel, { foreignKey: 'product' });
