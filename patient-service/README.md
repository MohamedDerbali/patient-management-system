# Patient Service

Enterprise patient management microservice built with **NestJS** following **Hexagonal/Clean Architecture** principles. Implements **Domain-Driven Design (DDD)**, **Test-Driven Development (TDD)**, **RabbitMQ integration**, **Docker containerization**, and **Prisma ORM** with **PostgreSQL**.

## Features

- **Hexagonal Architecture**: Clean separation of concerns with Domain, Application, and Infrastructure layers
- **Domain-Driven Design**: Rich domain entities with business logic
- **Test-Driven Development**: Comprehensive unit tests with Jest
- **RabbitMQ Integration**: Event-driven architecture with message publishing/consuming
- **Docker Setup**: Complete containerized environment with PostgreSQL and RabbitMQ
- **Prisma ORM**: Type-safe database access with PostgreSQL
- **Swagger Documentation**: Interactive API documentation with OpenAPI 3.0

## Architecture

```
src/
├── domain/                 # Domain Layer (Entities, Interfaces)
│   ├── entities/
│   │   └── patient.entity.ts
│   └── interfaces/
│       ├── patient-repository.interface.ts
│       ├── event-publisher.interface.ts
│       └── injection-tokens.ts
├── application/            # Application Layer (Use Cases, DTOs)
│   ├── dto/
│   │   └── create-patient.dto.ts
│   └── use-cases/
│       ├── create-patient.use-case.ts
│       └── create-patient.use-case.spec.ts
└── infrastructure/         # Infrastructure Layer (Controllers, Database, Messaging)
    ├── controllers/
    │   └── patient.controller.ts
    ├── database/
    │   ├── prisma.service.ts
    │   └── patient.repository.ts
    └── messaging/
        ├── rabbitmq-event-publisher.ts
        └── notification.service.ts
```

## Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)

## Getting Started

### Environment Setup

```bash
# Copy environment configuration
cp .env.example .env

# Customize environment variables as needed
vim .env
```

### Running with Docker

```bash
# Start all services
docker-compose up --build
```

The application stack includes:
- Patient Service API (NestJS)
- PostgreSQL database with automatic migrations
- RabbitMQ message broker with management interface
- Event-driven notification system

### Service Endpoints

- **API**: http://localhost:3000
- **Swagger Documentation**: http://localhost:3000/api
- **RabbitMQ Management**: http://localhost:15672
  - Username: `admin`
  - Password: `admin123`

## API Reference

### Interactive Documentation

Access the interactive Swagger UI at **http://localhost:3000/api** for complete API documentation including:
- Endpoint specifications
- Request/response schemas
- Interactive testing capabilities
- Example payloads

### Patient Creation

```bash
curl -X POST http://localhost:3000/patients \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Smith",
    "email": "john.smith@example.com",
    "birthdate": "1990-01-01"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Smith",
    "email": "john.smith@example.com",
    "birthdate": "1990-01-01T00:00:00.000Z",
    "createdAt": "2024-03-15T14:30:00.000Z"
  },
  "message": "Patient created successfully"
}
```

## Event Processing

The service implements event-driven architecture with the following flow:

1. **API Request**: Patient creation request received
2. **Domain Processing**: Business logic validation and patient creation
3. **Data Persistence**: Patient data saved to PostgreSQL
4. **Event Publishing**: `patient.created` event published to RabbitMQ
5. **Event Consumption**: Notification service processes the event

### Message Queue Monitoring

View application events and processing:

```bash
# Application logs
docker-compose logs -f app

# RabbitMQ management interface
open http://localhost:15672
```

## Testing

### Unit Tests

```bash
# Run test suite
docker-compose exec app npm test

# Coverage report
docker-compose exec app npm run test:cov

# Watch mode
docker-compose exec app npm run test:watch
```

### Local Testing

```bash
npm install
npm test
```

## Development

### Local Environment

For local development without Docker:

```bash
# Install dependencies
npm install

# Start external services
docker-compose up postgres rabbitmq

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate dev

# Start development server
npm run start:dev
```

### Database Operations

```bash
# Open Prisma Studio
npx prisma studio

# Reset database
npx prisma migrate reset

# Deploy migrations
npx prisma migrate deploy
```

## Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://patient_user:patient_password@localhost:5432/patient_db?schema=public` |
| `RABBITMQ_URL` | RabbitMQ connection string | `amqp://localhost:5672` |
| `PORT` | Application port | `3000` |

### Application Structure

#### Domain Layer
- **Entities**: Core business objects with embedded validation
- **Interfaces**: Contracts for external dependencies
- **Injection Tokens**: Dependency injection identifiers

#### Application Layer
- **Use Cases**: Business operation orchestration
- **DTOs**: Data transfer objects with validation rules
- **Tests**: Comprehensive test coverage

#### Infrastructure Layer
- **Controllers**: HTTP API endpoints
- **Repositories**: Data access implementations
- **Messaging**: Event publishing and consumption
- **Services**: External integrations

## Architecture Patterns

- **Hexagonal Architecture**: Isolation of business logic from external concerns
- **Dependency Inversion**: High-level modules independent of low-level details
- **Repository Pattern**: Data access abstraction
- **Event-Driven Architecture**: Loose coupling via domain events
- **CQRS**: Command and query responsibility separation

## Monitoring

- Structured application logging
- RabbitMQ queue monitoring
- Database query logging
- Health check endpoints

## Production Deployment

Consider the following for production environments:

- Environment-specific configurations
- Database connection pooling
- Message broker clustering
- Comprehensive logging and monitoring
- Security middleware and authentication
- Performance monitoring and alerting
- Backup and disaster recovery procedures
