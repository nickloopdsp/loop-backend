# Loop Backend

# AI-Powered Music Career Management Platform

## Features

- 🚀 Built with NestJS
- 📚 API Documentation with Swagger/ReDoc
- 🔒 JWT Authentication
- 🛡️ Environment-based Configuration
- 📝 Structured Logging with Pino
- ⚡ Exception Handling
- 🎯 TypeScript Support

## Prerequisites

- Node.js (v16 or higher)
- PostgreSQL
- npm or yarn

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

- Swagger UI: `http://localhost:3001/api/docs`
- ReDoc: `http://localhost:3001/redocs`

## Project Structure

```
src/
├── config/             # Configuration files
├── core/              # Core functionality
│   ├── exceptions/    # Exception filters
│   ├── logger/        # Logging service
│   └── redoc/         # API documentation
├── modules/           # Feature modules
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

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
