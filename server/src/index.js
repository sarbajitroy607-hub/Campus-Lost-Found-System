const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const configureApp = require("./settings/config.js");
const seedAdmin = require("./seeders/seedAdmin.js");

process.env.NODE_ENV = process.env.NODE_ENV || "development";
console.log(`Current Environment: ${process.env.NODE_ENV}`);

const envFile = `.env.${process.env.NODE_ENV}`;
console.log(`Loading environment variables from: ${envFile}`);
dotenv.config({ path: envFile });

const app = express();
const port = parseInt(process.env.PORT, 10) || 3001;

app.use(express.json());
configureApp(app);

async function bootstrap() {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      dbName: process.env.DATABASE_NAME,
    });
    console.log("Connected to MongoDB");

    // The admin seed reuses the existing connection and does nothing if it exists.
    await seedAdmin();

    app.listen(port, "0.0.0.0", () => {
      console.log(`App listening on port ${port}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

bootstrap();
