module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    collectCoverageFrom: ['!src/**/server.ts', 'src/**/*.ts'],
    collectCoverage: true,
    coverageReporters: ['json', 'json-summary', 'lcov', 'text', 'text-summary', 'html'],
};
