// dbConnect.js

const pg = require("pg");

// Database configuration
const config = {
  user: "tutorial",
  database: "tutorial",
  password: "tutorial",
  port: 5432,
  max: 10,
  idleTimeoutMillis: 30000,
};

// Create a connection pool
const pool = new pg.Pool(config);

// Log a message when a connection to the database is established
pool.on("connect", () => {
  console.log("Connected to the Database");
});

// Function to create necessary tables in the database
const createTables = async () => {
  try {
    // Create images table if not exists
    const imageTableQuery = `CREATE TABLE IF NOT EXISTS
      images(
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        cloudinary_id VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL
      )`;

    // Execute the query to create the images table
    const res = await pool.query(imageTableQuery);
    console.log("Images table created successfully:", res.rows);
  } catch (err) {
    console.error("Error creating images table:", err);
  } finally {
    // Close the database connection pool after creating tables
    pool.end();
  }
};

// Additional database-related functions or configurations can be added here...
// For example, you might want to include a function to query data from the images table.

const queryImages = async () => {
  try {
    const result = await pool.query("SELECT * FROM images");
    console.log("Query result:", result.rows);
  } catch (error) {
    console.error("Error querying images:", error);
  } finally {
    // Close the database connection pool after the query
    pool.end();
  }
};

// Export the connection pool and createTables function
module.exports = {
  createTables,
  queryImages,
  pool,
};

// Make the module runnable using the make-runnable package
require("make-runnable");
