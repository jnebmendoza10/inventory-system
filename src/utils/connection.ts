import dotenv from 'dotenv';
import { Sequelize } from 'sequelize';
import { Logger } from './Logger';

dotenv.config();

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const sequelize = new Sequelize(process.env.DB_NAME!, process.env.DB_USER!, process.env.DB_PASSWORD!, {
    host: process.env.DB_HOST,
    dialect: 'mssql',
});

export const checkConnection = async (logger: Logger) => {
    try {
        await sequelize.authenticate();
        logger.info('Connection has been established successfully.');
    } catch (error: any) {
        logger.error('Unable to connect to the database:', error);
    }
};

export default sequelize;
