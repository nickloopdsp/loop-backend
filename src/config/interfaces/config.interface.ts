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

export interface FeatureFlagsConfig {
    enableSwagger: boolean;
    enableRateLimit: boolean;
}

export interface RateLimitConfig {
    ttl: number;
    limit: number;
}

export interface OpenAiConfig {
    apiKey: string;
    model: string;
    maxTokens: number;
    temperature: number;
}

export interface MusicAiConfig {
    apiKey: string;
    baseUrl: string;

}

export interface SoundChartConfig {
    apiKey: string;
    baseUrl: string;
    appId: string;
}

export interface Configuration {
    port: number;
    apiPrefix: string;
    apiVersion: string;
    jwt: JwtConfig;
    cors: CorsConfig;
    database: DatabaseConfig;
    throttler: RateLimitConfig;
    featureFlags: FeatureFlagsConfig;
    nodeEnv: string;
    openai: OpenAiConfig;
    musicAi: MusicAiConfig;
    soundChart: SoundChartConfig;
}
