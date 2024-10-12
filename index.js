import express from 'express';
import sequelize from './config/db.js';
import dotenv from 'dotenv'; 

// Load env variables
dotenv.config();

const app = express();

const port = process.env.PORT || 8080;
const DB_NAME = process.env.DB_NAME || "libraryManagementSystem";


app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.get('/', (req, res) => {
    res.send('<h1>This is Get request!</h1>')
});

const createDatabaseIfNotExists = async () => {
    try {
        // Use raw SQL query to create the database
        await sequelize.query(`CREATE DATABASE "${DB_NAME}"`);
        console.log(`Database "${DB_NAME}" created successfully.`);
    } catch (error) {
        if (error.original && error.original.code === '42P04') {
            // Error code '42P04' means the database already exists
            console.log(`Database "${DB_NAME}" already exists.`);
        } else {
            console.error('Error creating database:', error);
        }
    }
};

// Main function to initialize the database and server
const startServer = async () => {
    await createDatabaseIfNotExists(); // Create the database if it doesn't exist

    try {
        // Synchronize the models with the database
        await sequelize.sync({ force: true }); // Use { force: true } to recreate tables (for development/testing)
        console.log("Database synced and tables created");

        // Start the server
        app.listen(port, () => {
            console.log(`Node server is running on port ${port}`);
        });
    } catch (error) {
        console.error("Error while connecting to database: ", error);
    }
};

// Run the main function
startServer();
