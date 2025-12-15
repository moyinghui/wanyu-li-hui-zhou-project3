import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { connectDB } from "./backend/db.js";

import { userRoutes } from "./backend/routes/userRoutes.js";
import { sudokuRoutes } from "./backend/routes/sudokuRoutes.js";
import highscoreRoutes from "./backend/routes/highscoreRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();

const app = express();

// -------- middleware --------
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));

// CORS configuration - support both dev and production
// In production, allow all origins since frontend and backend are on same domain
app.use(
    cors({
        origin: process.env.NODE_ENV === "production" 
            ? true  // Allow all origins in production (same domain)
            : "http://localhost:5173",  // Specific origin in development
        credentials: true,
    })
);

// -------- routes --------
app.use("/api/user", userRoutes);
app.use("/api/sudoku", sudokuRoutes);
app.use("/api/highscore", highscoreRoutes);

// -------- serve static files from frontend/dist --------
app.use(express.static(join(__dirname, "frontend", "dist")));

// -------- serve index.html for all non-API routes (SPA routing) --------
// Express 5.x compatible: use app.use with a catch-all middleware
app.use((req, res, next) => {
    // Don't serve index.html for API routes
    if (req.path.startsWith("/api")) {
        return res.status(404).json({ error: "Not found" });
    }
    // Serve index.html for all other routes (SPA routing)
    res.sendFile(join(__dirname, "frontend", "dist", "index.html"));
});

// -------- start server --------
const PORT = process.env.PORT || 5050;

connectDB()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`🚀 Server running on http://localhost:${PORT}`);
        });
    })
    .catch((err) => {
        console.error("❌ Failed to start server:");
        console.error(err.message || err);
        console.error("\n💡 Troubleshooting tips:");
        console.error("   1. Check MONGO or MONGODB_URI environment variable is set");
        console.error("   2. Verify MongoDB connection string is correct");
        console.error("   3. Ensure MongoDB Atlas IP whitelist includes Render IP");
        process.exit(1);
    });

