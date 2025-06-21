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
./make_publish_sdk.sh

```

The SDK generation script will:
1. Generate TypeScript types and API clients
2. Build the SDK package
3. Update package.json with correct version and metadata
4. Format the generated code
5. Install dependencies and build the package

## Environment Variables

For detailed information about all available environment variables and configuration options, please refer to [Env Configuration Documentation](env-docs/configuration.md).

Copy the `.env.example` file to `.env` and configure the variables according to your environment:


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
│   └── openai/         # Openai provider
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
