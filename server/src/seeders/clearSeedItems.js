const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Item = require("../items/items.schema.js");
const User = require("../users/users.schema.js");

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}` });

async function clearSeedItems() {
  await mongoose.connect(process.env.DATABASE_URL, {
    dbName: process.env.DATABASE_NAME,
  });

  const demoUser = await User.findOne({ email: "demo.student@campus.com" });

  if (!demoUser) {
    console.log("No demo seed data found.");
    return;
  }

  const result = await Item.deleteMany({ postedBy: demoUser._id });
  await User.deleteOne({ _id: demoUser._id });

  console.log(`Removed ${result.deletedCount} demo items and the demo user.`);
}

clearSeedItems()
  .catch((error) => {
    console.error("Failed to clear demo items:", error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
