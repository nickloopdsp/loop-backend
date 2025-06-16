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
        api: {
            prefix: process.env.API_PREFIX || 'api',
            version: process.env.API_VERSION || 'v1',
        },
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
            enableSwagger: process.env.FEATURE_FLAGS__ENABLE_SWAGGER === 'true',
        },
    };
}; 