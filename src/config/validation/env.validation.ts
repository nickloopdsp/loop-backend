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

    // Rate Limiter
    THROTTLE_TTL: Joi.number()
        .default(60)
        .description('Rate limiter time window in seconds'),
    THROTTLE_LIMIT: Joi.number()
        .default(10)
        .description('Maximum number of requests per time window'),

    // Feature Flags

    ENABLE_SWAGGER: Joi.boolean()
        .default(true)
        .description('Enable/disable Swagger API documentation'),
    ENABLE_RATELIMIT: Joi.boolean()
        .default(true)
        .description('Enable/disable Rate Limit'),

    // OpenAI
    OPENAI_API_KEY: Joi.string()
        .allow('')
        .description('OpenAI API key'),
    OPENAI_MODEL: Joi.string()
        .default('gpt-3.5-turbo')
        .description('OpenAI model'),
    OPENAI_MAX_TOKENS: Joi.number()
        .default(1000)
        .description('OpenAI max tokens'),
    OPENAI_TEMPERATURE: Joi.number()
        .default(0.7)
        .description('OpenAI temperature'),

    // Music AI
    MUSICAI_API_KEY: Joi.string()
        .allow('')
        .description('Music AI API key'),
    MUSICAI_BASE_URL: Joi.string()
        .allow('')
        .default('')
        .description('Music AI base URL'),
}); 