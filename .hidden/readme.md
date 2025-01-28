# Workshop steps

## Step 1: Build a Dockerfile, exposing port 3001

- Once built start the 'docker compose up' command
- You should see the 'web' service running
- You can now access the application at http://localhost:3001

## Step 2: Including the database

- Complete the docker-compose.yaml file
- Run the 'docker compose up' command
- Services should be up and running
- You can now access the application at http://localhost:3001
- Uncomment route GET and DB related code in ./src/server.ts
- Run the 'docker compose up' command again
  - Potential error because of depends-on AND/OR healthcheck
