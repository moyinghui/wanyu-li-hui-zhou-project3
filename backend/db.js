import mongoose from "mongoose";

export async function connectDB() {
    // Support both MONGO (Render) and MONGODB_URI (local) environment variable names
    const uri = process.env.MONGO || process.env.MONGODB_URI;
    if (!uri) {
        throw new Error("❌ Missing MONGO or MONGODB_URI in environment variables");
    }

    await mongoose.connect(uri);
    console.log("✅ MongoDB connected");
}
