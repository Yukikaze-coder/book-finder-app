const { Pool } = require("pg");

let pool;

if (process.env.DATABASE_URL) {
  // ✅ Use Render-hosted Postgres in production
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
  });
} else {
  // ✅ Use local Postgres in development
  pool = new Pool({
    user: process.env.DATABASE_USER || "postgres",
    host: process.env.DATABASE_HOST || "localhost",
    database: process.env.DATABASE_NAME || "book_finder",
    password: process.env.DATABASE_PASSWORD || "",
    port: process.env.DATABASE_PORT || 5432,
  });
}

module.exports = pool;
