import express from "express";
import "dotenv/config";
import { connectDB } from "./config/db";
import routes from "./routes/index.routes";
import cors from "cors"

const app = express();

app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(express.json());

// Debug test route
app.get("/test", (req, res) => res.send("✅ Server test OK"));

// Mount all routes
app.use("/api/v1", routes);

const startServer = async () => {
    await connectDB();
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`🚀 Server running at http://localhost:${PORT}`);
    });
};

startServer();
