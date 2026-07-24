const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const Item = require("../items/items.schema.js");
const User = require("../users/users.schema.js");

const environment = process.env.NODE_ENV || "development";
dotenv.config({ path: `.env.${environment}` });

const demoUser = {
  firstname: "Demo",
  lastname: "Student",
  email: "demo.student@campus.com",
  password: "Demo@1234",
  role: "user",
};

const demoItems = [
  {
    title: "Black Leather Wallet",
    description: "Black wallet with a student ID card inside.",
    category: "wallet",
    type: "lost",
    location: "Central Library, Ground Floor",
    date: "2026-07-20",
    keywords: ["black", "wallet", "student id"],
  },
  {
    title: "Blue Water Bottle",
    description: "Reusable blue bottle found near the basketball court.",
    category: "others",
    type: "found",
    location: "Sports Complex",
    date: "2026-07-21",
    keywords: ["blue", "bottle", "sports"],
  },
  {
    title: "Wireless Earbuds Case",
    description: "White wireless earbuds charging case without earbuds.",
    category: "electronics",
    type: "found",
    location: "Computer Lab 2",
    date: "2026-07-22",
    keywords: ["earbuds", "white", "electronics"],
  },
  {
    title: "Campus ID Card",
    description: "Student identity card found outside the cafeteria.",
    category: "id",
    type: "found",
    location: "Main Cafeteria",
    date: "2026-07-23",
    keywords: ["id", "student", "card"],
  },
  {
    title: "Grey Backpack",
    description: "Grey backpack with notebooks and a charging cable.",
    category: "bag",
    type: "lost",
    location: "Engineering Block, Room 204",
    date: "2026-07-19",
    keywords: ["grey", "backpack", "notebooks"],
  },
  {
    title: "Android Mobile Phone",
    description: "Black Android phone found near the bus stop.",
    category: "phone",
    type: "found",
    location: "Campus Bus Stop",
    date: "2026-07-24",
    keywords: ["android", "phone", "black"],
  },
  {
    title: "Silver House Keys",
    description: "Three silver keys on a red campus keychain.",
    category: "others",
    type: "found",
    location: "Hostel A Entrance",
    date: "2026-07-18",
    keywords: ["keys", "red", "keychain"],
  },
 
];

async function seedItems() {
  await mongoose.connect(process.env.DATABASE_URL, {
    dbName: process.env.DATABASE_NAME,
  });

  let user = await User.findOne({ email: demoUser.email });

  if (!user) {
    user = await User.create({
      ...demoUser,
      password: await bcrypt.hash(demoUser.password, 10),
    });
  }

  await Promise.all(
    demoItems.map((item) =>
      Item.updateOne(
        { title: item.title, postedBy: user._id },
        {
          $set: {
            ...item,
            postedBy: user._id,
            status: "approved",
            verifiedByAdmin: true,
            isActive: true,
          },
        },
        { upsert: true }
      )
    )
  );

  console.log(`Seeded ${demoItems.length} demo items.`);
}

seedItems()
  .catch((error) => {
    console.error("Failed to seed demo items:", error);
    process.exitCode = 1;
  })
  .finally(() => mongoose.disconnect());
