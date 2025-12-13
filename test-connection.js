// 快速测试 MongoDB Atlas 连接
import mongoose from "mongoose";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, "server", ".env") });

const uri = process.env.MONGODB_URI;

if (!uri) {
    console.error("❌ MONGODB_URI not found in .env");
    process.exit(1);
}

console.log("🔄 Attempting to connect to MongoDB Atlas...");
console.log("📍 Your current IP should be whitelisted in Atlas");

mongoose
    .connect(uri)
    .then(() => {
        console.log("✅ Successfully connected to MongoDB Atlas!");
        console.log("✅ IP whitelist is configured correctly.");
        process.exit(0);
    })
    .catch((err) => {
        console.error("❌ Connection failed:");
        if (err.message.includes("whitelist") || err.message.includes("IP")) {
            console.error("\n💡 Solution:");
            console.error("   1. Go to: https://cloud.mongodb.com/v2#/security/network/whitelist");
            console.error("   2. Click 'Add IP Address'");
            console.error("   3. Add your current IP: 216.9.31.161");
            console.error("   4. Wait 1-2 minutes for it to activate");
        } else {
            console.error(err.message);
        }
        process.exit(1);
    });



