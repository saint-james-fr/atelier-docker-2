import fastify from "fastify";
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox";
import { pool, initializeDatabase } from "./db";
import { startSeeding } from "./seeder";
import { redis, CACHE_TTL, getPostsCacheKey } from "./redis";

// Create Fastify instance with TypeBox for better type safety
const server = fastify().withTypeProvider<TypeBoxTypeProvider>();

// Define the posts route
server.get("/posts", async (request, reply) => {
  try {
    const start = performance.now();
    // Try to get data from Redis cache first
    const cacheKey = getPostsCacheKey();
    const cachedPosts = await redis.get(cacheKey);

    if (cachedPosts) {
      const end = performance.now();
      console.log(`Cache hit: Served posts from Redis in ${(end - start).toFixed(2)}ms`);
      return JSON.parse(cachedPosts);
    }

    console.log("Cache miss: Fetching posts from database");
    const result = await pool.query(
      "SELECT id, author, title, content, created_at FROM posts ORDER BY created_at DESC"
    );

    // Store the result in Redis with expiration
    await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(result.rows));
    
    const end = performance.now();
    console.log(`Cache miss: Served posts from database in ${(end - start).toFixed(2)}ms`);

    return result.rows;
  } catch (err) {
    console.error("Error fetching posts:", err);
    throw err;
  }
});

// Start the server
const start = async () => {
  try {
    // Initialize database schema
    await initializeDatabase();

    // Start the seeder
    startSeeding();

    // Start the server
    await server.listen({ port: 3000 });
    console.log("Server is running on http://localhost:3000");
  } catch (err) {
    console.error("Error starting server:", err);
    process.exit(1);
  }
};

start();
