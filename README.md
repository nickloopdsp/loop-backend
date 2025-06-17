# Loop Backend

Backend server AI-Powered Music Career Management Platform

## Features

- 🚀 Built with NestJS
- 📚 API Documentation with Swagger/ReDoc
- 🔒 JWT Authentication
- 🛡️ Environment-based Configuration
- 📝 Structured Logging with Pino
- ⚡ Exception Handling
- 🎯 TypeScript Support

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL
- npm

## Installation

```bash
# Clone the repository
git clone https://github.com/nickloopdsp/loop-backend.git

# Navigate to project directory
cd loop-backend

# Install dependencies
npm install

# Configure your API keys for platform integrations
cp .env.example .env
```

## Building SDK

The project includes a TypeScript SDK that is automatically generated from the OpenAPI specification.

```bash
# Generate and build the SDK
./scripts/generate-sdk.sh

# The SDK will be generated in the .sdk directory
# After generation, you can use it in your projects by:
npm install ./sdk
```

The SDK generation script will:
1. Generate TypeScript types and API clients
2. Build the SDK package
3. Update package.json with correct version and metadata
4. Format the generated code
5. Install dependencies and build the package

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
| MUSICAI_API_KEY | string | Yes | - | Music AI API key |

## Running the Application

```bash
# Docker
docker-compose up --build -d

# Development
npm run start:dev

# Debug
npm run start:debug

# Production
npm run build
npm run start:prod
```

## API Documentation

Once the application is running, you can access the API documentation at:

- Swagger UI: [http://localhost:3001/api/docs](http://localhost:3001/api/docs)
- ReDoc: [http://localhost:3001/redocs](http://localhost:3001/redocs)

## Project Structure

```
src/
├── config/             # Configuration files
├── core/              # Core functionality
│   ├── exceptions/    # Exception filters
│   ├── logger/        # Logging service
│   └── redoc/         # API documentation
├── modules/           # Feature modules
│   ├── sound-chart/   # Sound chart analysis and management
│   ├── mock/         # Mock data and testing utilities
│   ├── music-ai/     # AI-powered music analysis
│   ├── dashboard-layout/ # Dashboard UI layout management
│   └── chat/         # Chat functionality
└── main.ts           # Application entry point
```

## Error Handling

The application uses a global exception filter that provides consistent error responses:

```json
{
  "success": false,
  "statusCode": 400,
  "message": "Error message",
  "error": null,
  "timestamp": "2024-01-17T12:00:00.000Z",
  "path": "/api/v1/endpoint",
  "method": "GET"
}
```

## Logging

The application uses Pino for structured logging with the following levels:
- error
- warn
- info
- debug
- verbose

## Testing

```bash
# Unit tests
npm run test

# e2e tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, email support@loop.com or join our Slack channel.
