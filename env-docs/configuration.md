# Configuration Documentation

This document describes all available configuration options for the application.

## Environment Variables

| Variable | Type | Required | Default | Description |
|----------|------|----------|---------|-------------|
| NODE_ENV | string | No | development | Application environment (development, production, test) |
| PORT | number | No | 3001 | Port number for the application server |
| API_PREFIX | string | No | api | Prefix for all API routes |
| API_VERSION | string | No | v1 | API version number |
| JWT_SECRET | string | Yes | - | Secret key for JWT token generation and verification |
| JWT_EXPIRATION | string | No | 1d | JWT token expiration time (e.g., 1d, 7d, 24h) |
| CORS_ORIGIN | string | No | * | CORS allowed origins (use * for all origins) |
| DB_HOST | string | No | localhost | Database host address |
| DB_PORT | number | No | 5432 | Database port number |
| DATABASE_USER | string | Yes | - | Database username |
| DATABASE_PASSWORD | string | Yes | - | Database password |
| DATABASE_NAME | string | Yes | - | Database name |
| THROTTLE_TTL | number | No | 60 | Rate limiter time window in seconds |
| THROTTLE_LIMIT | number | No | 10 | Maximum number of requests per time window |
| ENABLE_SWAGGER | boolean | No | true | Enable/disable Swagger API documentation |
| ENABLE_RATELIMIT | boolean | No | true | Enable/disable Rate Limit |
| OPENAI_API_KEY | string | Yes | - | OpenAI API key |
| OPENAI_MODEL | string | No | gpt-3.5-turbo | OpenAI model |
| OPENAI_MAX_TOKENS | number | No | 1000 | OpenAI max tokens |
| OPENAI_TEMPERATURE | number | No | 0.7 | OpenAI temperature |
| MUSICAI_API_KEY | string | Yes | - | Music AI API key |
