module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: [
        '!src/server.ts',
        '!src/application/Application.ts',
        '!src/middlewares/rateLimiterHandler.ts',
        'src/**/*.ts',
    ],
    collectCoverage: false,
    coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'text-summary', 'html'],
};
