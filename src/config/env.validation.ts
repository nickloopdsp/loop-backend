import * as Joi from 'joi';

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid('development', 'production', 'test')
        .default('development'),
    PORT: Joi.number().default(3001),
    API_PREFIX: Joi.string().default('api'),
    API_VERSION: Joi.string().default('v1'),
    JWT_SECRET: Joi.string().required(),
    JWT_EXPIRATION: Joi.string().default('1d'),
    CORS_ORIGIN: Joi.string().default('*'),

    // Database
    DB_HOST: Joi.string().default('localhost'),
    DB_PORT: Joi.number().default(5432),
    DATABASE_USER: Joi.string().required(),
    DATABASE_PASSWORD: Joi.string().required(),
    DATABASE_NAME: Joi.string().required(),

    // Feature Flags
    FEATURE_FLAGS: Joi.object({
        ENABLE_SWAGGER: Joi.boolean()
            .default(true)
            .description('Enable Swagger documentation'),
    }).default(),
}); 