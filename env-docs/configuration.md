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
| FEATURE_FLAGS | object | No | [object Object] | Feature flags for enabling/disabling application features |

## Configuration Sections

### api

```typescript
interface ApiConfig {
}
```

### database

```typescript
interface DatabaseConfig {
}
```

### cors

```typescript
interface CorsConfig {
}
```

### featureFlags

```typescript
interface FeatureFlagsConfig {
}
```

### jwt

```typescript
interface JwtConfig {
}
```

### port

```typescript
interface PortConfig {
}
```

### nodeEnv

```typescript
interface NodeEnvConfig {
}
```

