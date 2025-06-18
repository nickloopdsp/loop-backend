import { Configuration } from './interfaces/config.interface';

export default (): Configuration => {
    const dbHost = process.env.DB_HOST || 'localhost';
    const dbPort = process.env.DB_PORT || '5432';
    const dbUsername = process.env.DATABASE_USER || 'postgres';
    const dbPassword = process.env.DATABASE_PASSWORD || 'postgres';
    const dbDatabase = process.env.DATABASE_NAME || 'postgres';

    const databaseUrl = `postgresql://${dbUsername}:${dbPassword}@${dbHost}:${dbPort}/${dbDatabase}`;

    return {
        port: parseInt(process.env.PORT || '3001', 10),
        apiPrefix: process.env.API_PREFIX || 'api',
        apiVersion: process.env.API_VERSION || 'v1',
        jwt: {
            secret: process.env.JWT_SECRET || 'default-secret-key-change-in-production',
            expiresIn: process.env.JWT_EXPIRATION || '1d',
        },
        cors: {
            origin: process.env.CORS_ORIGIN || '*',
        },
        database: {
            host: dbHost,
            port: parseInt(dbPort, 10),
            username: dbUsername,
            password: dbPassword,
            database: dbDatabase,
            url: databaseUrl,
        },
        nodeEnv: process.env.NODE_ENV || 'development',
        featureFlags: {
            enableSwagger: process.env.ENABLE_SWAGGER === 'true',
            enableRateLimit: process.env.ENABLE_RATELIMIT === 'true',
        },
        throttler: {
            ttl: parseInt(process.env.THROTTLE_TTL || '60', 10),
            limit: parseInt(process.env.THROTTLE_LIMIT || '10', 10),
        },
        openai: {
            apiKey: process.env.OPENAI_API_KEY || '',
            model: process.env.OPENAI_MODEL || 'gpt-3.5-turbo',
            maxTokens: parseInt(process.env.OPENAI_MAX_TOKENS || '1000'),
            temperature: parseFloat(process.env.OPENAI_TEMPERATURE || '0.7'),
        },
        musicAi: {
            apiKey: process.env.MUSICAI_API_KEY || '',
            baseUrl: process.env.MUSICAI_BASE_URL || '',
        },
    };
}; 