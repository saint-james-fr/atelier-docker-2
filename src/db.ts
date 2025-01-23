import pg from "pg";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));

type DbConfig = {
  user: string;
  host: string;
  database: string;
  password: string;
  port: number;
};

// PostgreSQL connection pool
const dbConfig: DbConfig = {
  user: "postgres",
  host: "postgres",
  database: "atelierdocker",
  password: "postgres",
  port: 5432,
};

export const pool = new pg.Pool(dbConfig);

export const initializeDatabase = async () => {
  try {
    // First create migrations table if it doesn't exist
    await pool.query(`
      CREATE TABLE IF NOT EXISTS migrations (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL UNIQUE,
        executed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `);

    // Check if initial schema was already applied
    const { rows } = await pool.query(
      "SELECT name FROM migrations WHERE name = $1",
      ["initial_schema"]
    );

    // Only apply schema if it hasn't been run before
    if (rows.length === 0) {
      const schemaPath = join(__dirname, "1737640629_init_post_table.sql");
      const schema = await readFile(schemaPath, "utf-8");
      await pool.query(schema);

      // Record this migration
      await pool.query("INSERT INTO migrations (name) VALUES ($1)", [
        "initial_schema",
      ]);
      console.log("Database schema initialized successfully");
    } else {
      console.log("Database schema already initialized");
    }
  } catch (err) {
    console.error("Error initializing database schema:", err);
    throw err;
  }
};
