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

// Log errors on the pool
pool.on("error", (err) => {
  console.error("Database pool error:", err);
});

// Function to create necessary tables in the database
const createTables = async () => {
  try {
    // Create images table if not exists
    const imageTableQuery = `CREATE TABLE IF NOT EXISTS
      images(
        id SERIAL PRIMARY KEY,
        title VARCHAR(128) NOT NULL,
        dropbox_id VARCHAR(128) NOT NULL,
        image_url VARCHAR(128) NOT NULL
      )`;

    // Execute the query to create the images table
    const res = await pool.query(imageTableQuery);
    console.log("Images table created successfully:", res.rows);
  } catch (err) {
    console.error("Error creating images table:", err);
  }
};

// Function to query images from the database
const queryImages = async () => {
  try {
    const result = await pool.query("SELECT * FROM images");
    console.log("Query result:", result.rows);
    return result.rows; // Return the result for further processing if needed
  } catch (error) {
    console.error("Error querying images:", error);
    throw error; // Re-throw the error for better error handling in calling code
  }
};

// Export the connection pool directly
module.exports = pool;

// Function to initialize the database connection pool and create tables
const initializeDatabase = async () => {
  try {
    await createTables();
  } catch (error) {
    console.error("Error initializing database:", error);
  } finally {
    // Close the database connection pool after creating tables
    // pool.end(); // Do not close the pool here to keep it open for other operations
  }
};

// Make the module runnable using the make-runnable package
require("make-runnable");

// Export additional functions for external use
module.exports = {
  initializeDatabase,
  queryImages,
};
