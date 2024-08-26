import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';

import { connectDB } from "./db/connectDB.js";
import authRoutes from "./routes/auth.route.js";
import cartRoutes from "./routes/cart.route.js"; 
import orderRoutes from "./routes/order.route.js"; 
import paymentRouter from "./routes/payment.route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __dirname = path.resolve();

// Serve Swagger documentation
const swaggerDocument = JSON.parse(fs.readFileSync('./backend/swagger-output.json', 'utf8'));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Middleware setup
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json()); 
app.use(cookieParser()); 

// Use routes
app.use("/api/auth", authRoutes);
app.use("/api/cart", cartRoutes); 
app.use("/api/order", orderRoutes); 
app.use('/api/payment', paymentRouter);

// Serve frontend if in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on port: ${PORT}`);
});
