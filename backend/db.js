import mongoose from "mongoose";

export async function connectDB() {
    // Support both MONGO (Render) and MONGODB_URI (local) environment variable names
    const uri = process.env.MONGO || process.env.MONGODB_URI;
    if (!uri) {
        console.error("❌ Missing MONGO or MONGODB_URI in environment variables");
        console.error("   Please set MONGO or MONGODB_URI in your environment variables.");
        throw new Error("Missing MONGO or MONGODB_URI in environment variables");
    }

    try {
        await mongoose.connect(uri);
        console.log("✅ MongoDB connected successfully");
    } catch (error) {
        console.error("❌ MongoDB connection failed:");
        console.error("   Error:", error.message);
        console.error("   Please check:");
        console.error("   1. MongoDB connection string is correct");
        console.error("   2. MongoDB Atlas IP whitelist includes Render IP (or 0.0.0.0/0)");
        console.error("   3. MongoDB username and password are correct");
        throw error;
    }
}
