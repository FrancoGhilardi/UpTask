import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";
import cors from "cors";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors(corsConfig));

//ROUTES
app.use("/api/projects", projectRoutes);

export default app;
