import { Logger } from './Logger';
import pino, { Logger as PinoLogger } from 'pino';

const LOGGING_LEVEL = 'info';

export class LoggerImpl implements Logger {
    #loggerinstance: PinoLogger;

    constructor() {
        this.#loggerinstance = pino(
            {
                level: LOGGING_LEVEL,
                base: {
                    pid: false,
                },
                prettyPrint: {
                    colorize: true,
                    levelFirst: true,
                    translateTime: 'yyyy-dd-mm, h:MM:ss TT',
                },
            },
            pino.destination(`${__dirname}/logger.log`),
        );
    }
    info(message: string, ...params: string[]): void {
        this.#loggerinstance.info(message, params);
    }
    debug(message: string, ...params: string[]): void {
        this.#loggerinstance.debug(message, params);
    }
    error(message: string, ...params: string[]): void {
        this.#loggerinstance.error(message, params);
    }
}
