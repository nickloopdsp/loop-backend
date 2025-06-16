import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development')
        .description('Application environment (development, production, test)'),
    PORT: Joi.number()
        .default(3001)
        .description('Port number for the application server'),
    API_PREFIX: Joi.string()
        .default('api')
        .description('Prefix for all API routes'),
    API_VERSION: Joi.string()
        .default('v1')
        .description('API version number'),
    JWT_SECRET: Joi.string()
        .required()
        .description('Secret key for JWT token generation and verification'),
    JWT_EXPIRATION: Joi.string()
        .default('1d')
        .description('JWT token expiration time (e.g., 1d, 7d, 24h)'),
    CORS_ORIGIN: Joi.string()
        .default('*')
        .description('CORS allowed origins (use * for all origins)'),

    // Database
    DB_HOST: Joi.string()
        .default('localhost')
        .description('Database host address'),
    DB_PORT: Joi.number()
        .default(5432)
        .description('Database port number'),
    DATABASE_USER: Joi.string()
        .required()
        .description('Database username'),
    DATABASE_PASSWORD: Joi.string()
        .required()
        .description('Database password'),
    DATABASE_NAME: Joi.string()
        .required()
        .description('Database name'),

    // Feature Flags
    FEATURE_FLAGS: Joi.object({
        ENABLE_SWAGGER: Joi.boolean()
            .default(true)
            .description('Enable/disable Swagger API documentation'),
    }).default()
        .description('Feature flags for enabling/disabling application features'),
}); 