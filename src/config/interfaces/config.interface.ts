export interface ApiConfig {
    prefix: string;
    version: string;
}

export interface JwtConfig {
    secret: string;
    expiresIn: string;
}

export interface CorsConfig {
    origin: string;
}

export interface DatabaseConfig {
    host: string;
    port: number;
    username: string;
    password: string;
    database: string;
    url: string;
}

export interface Configuration {
    port: number;
    api: ApiConfig;
    jwt: JwtConfig;
    cors: CorsConfig;
    database: DatabaseConfig;
    nodeEnv: string;
}
