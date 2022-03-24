import express from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import { Route } from '../routes/Route';
import sequelize, { checkConnection } from '../utils/connection';
import hpp from 'hpp';
import { rateLimiterHandler } from '../middlewares/rateLimiterHandler';
import helmet from 'helmet';
import { Logger } from '../utils/Logger';

export class Application {
    app: express.Application = express();

    constructor(private readonly routeList: Route[], private readonly logger: Logger) {
        this.appConfig();
        this.routeConfig(routeList);
    }

    private routeConfig(routeList: Route[]) {
        routeList.forEach((route) => route.mountRoute(this.app));
        this.app.use(errorHandler);
    }

    private appConfig() {
        this.app.use(express.json({ limit: '5kb' }));
        this.app.use(express.urlencoded({ extended: true, limit: '5kb' }));
        this.app.use(hpp({ checkBody: true, checkBodyOnlyForContentType: 'urlencoded', checkQuery: true }));
        this.app.use(rateLimiterHandler);
        this.app.use(helmet());
        this.app.use('/api/v1');
    }

    initializePort(port: number): void {
        this.app.listen(port, async () => {
            await sequelize.sync();
            this.logger.info(`Listening on port ${port}`);
        });
    }

    verifyConnection(): void {
        checkConnection(this.logger);
    }
}
