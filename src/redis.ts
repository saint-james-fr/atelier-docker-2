import Redis from "ioredis";

// Redis client configuration
const redisConfig = {
  host: process.env.REDIS_HOST || "localhost",
  port: 6379,
};

// Create Redis client instance
export const redis = new Redis(redisConfig);

// Cache TTL in seconds
export const CACHE_TTL = 30;

// Cache key prefix
export const CACHE_KEY_PREFIX = "posts:";

// Helper function to get cache key for all posts
export const getPostsCacheKey = () => `${CACHE_KEY_PREFIX}all`;
