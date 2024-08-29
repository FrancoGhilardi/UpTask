import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cors from "cors";
import { connectDB } from "./config/db";
import { corsConfig } from "./config/cors";
import authRoutes from "./routes/authRoutes";
import projectRoutes from "./routes/projectRoutes";

dotenv.config();

connectDB();

const app = express();

//LOGGING
app.use(morgan("dev"));

//LEER DATOS DE FORMULARIO
app.use(express.json());
app.use(cors(corsConfig));

//ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);

export default app;
