import { DataTypes, Model } from 'sequelize';
import sequelize from '../../utils/connection';
import { Product } from '../base/Product';

export interface ProductSequelize extends Product, Model {}

export const ProductModel = sequelize.define<ProductSequelize>('Products', {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV1,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
});
