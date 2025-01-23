# Docker Compose Tutorial

A step-by-step guide to set up a multi-container application using Docker Compose.

## Prerequisites

Before starting, ensure you have:

- Docker installed on your machine
- Basic understanding of Docker concepts (containers, images)
- This repository cloned locally

## Step 1: Understanding Our Application Structure

Our application consists of three services:

1. Main application (`web`) - A Node.js application
2. Redis cache - For session management
3. PostgreSQL database - For data persistence

## Step 2: Setting Up Docker Compose

Create a `docker-compose.yaml` file in your project root with the following structure:

```yaml
services:
  web:
    # web service configuration
  redis:
    # redis configuration
  postgres:
    # postgres configuration
```

## Step 3: Configuring the Main Application

Add the web service configuration:

```yaml
web:
  image: web
  ports:
    - 3001:3001
  volumes:
    - ./src:/app/src
    - ./package.json:/app/package.json
    - ./package-lock.json:/app/package-lock.json
  build:
    context: .
    dockerfile: Dockerfile
  depends_on:
    postgres:
      condition: service_healthy
    redis:
      condition: service_healthy
  environment:
    - REDIS_HOST=redis
    - POSTGRES_HOST=postgres
    - POSTGRES_USER=postgres
    - POSTGRES_PASSWORD=postgres
    - POSTGRES_DB=atelierdocker
    - POSTGRES_PORT=5432
```

## Step 4: Adding Redis Service

Configure Redis for caching:

```yaml
redis:
  image: redis:latest
  ports:
    - 6379:6379
```

## Step 5: Setting Up PostgreSQL with Persistence

Configure PostgreSQL with data persistence and health checks:

```yaml
postgres:
  image: postgres:latest
  ports:
    - 5432:5432
  environment:
    - POSTGRES_PASSWORD=postgres
    - POSTGRES_DB=atelierdocker
    - POSTGRES_USER=postgres
    - POSTGRES_PORT=5432
  volumes:
    - postgres_data:/var/lib/postgresql/data
  healthcheck:
    test: ["CMD-SHELL", "pg_isready -U postgres"]
    interval: 5s
    timeout: 5s
    retries: 5
```

Don't forget to declare the volume at the root level:

```yaml
volumes:
  postgres_data:
```

## Step 6: Understanding Key Components

### Volume Persistence

The `postgres_data` volume ensures:

- Data survives container restarts
- Better portability across environments
- Proper permission handling

Manage your volumes with:

```bash
# List volumes
docker volume ls

# Inspect volume
docker volume inspect your-project-name_postgres_data
```

### Health Checks

Health checks in `docker-compose.yaml` ensure:

- Services start in the correct order
- Dependencies are fully operational
- Reliable application startup

## Step 7: Running the Application

1. Start all services:

```bash
docker-compose up
```

2. Start in detached mode:

```bash
docker-compose up -d
```

3. Stop all services:

```bash
docker-compose down
```

## Step 8: Development Workflow

1. Make code changes in your local `src` directory
2. Changes are reflected automatically due to volume mounting
3. For dependency changes:

```bash
docker-compose down
docker-compose build
docker-compose up
```

## Troubleshooting Guide

If you encounter issues:

1. Service won't start:

   ```bash
   # Check logs
   docker-compose logs

   # Check specific service
   docker-compose logs service_name
   ```

2. Database connection issues:

   - Verify PostgreSQL is healthy:

   ```bash
   docker-compose ps
   docker-compose logs postgres
   ```

   - Check connection from web service:

   ```bash
   docker-compose exec web nc -zv postgres 5432
   ```

3. Data persistence issues:
   - Check volume status:
   ```bash
   docker volume ls
   docker volume inspect your-project-name_postgres_data
   ```

## Additional Commands

View running containers:

```bash
docker-compose ps
```

Rebuild specific service:

```bash
docker-compose build service_name
```

Access service logs:

```bash
docker-compose logs -f service_name
```

## Next Steps

- Explore adding more services
- Configure production settings
- Implement backup strategies
- Set up CI/CD pipelines
