import express from 'express';
import { errorHandler } from '../middlewares/errorHandler';
import { Route } from '../routes/Route';
import sequelize from '../utils/connection';
import hpp from 'hpp';
import { rateLimiterHandler } from '../middlewares/rateLimiterHandler';

export class Application {
    app: express.Application = express();

    constructor(private readonly routeList: Route[]) {
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
    }

    initializePort(port: number): void {
        this.app.listen(port, async () => {
            await sequelize.sync();
            console.info(`Listening on port ${port}`);
        });
    }
}
