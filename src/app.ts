import express from "express";
import cors from "cors";

import consultationRoutes from "./modules/consultation/consultation.routes";
import { db } from "./config/db";
import { categories } from "./db/schema/categories";
import { consultations } from "./db/schema/consultations";
import authRoutes from "./modules/auth/auth.routes";
import slotRoutes from "./modules/slot/slot.routes";
import slotBlockRoutes from "./modules/slot-block/slotBlock.routes";


const app = express();

/**
 * Middlewares
 */
app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

/**
 * Health Check
 */
app.get("/", async (_req, res) => {
  const consultation = await db
        .select()
        .from(consultations);
  res.status(200).json({
    success: true,
    message: "Curis Backend Running 🚀",
    data: consultation
  });
});

/**
 * Routes
 */
app.use(
  "/api/consultations",
  consultationRoutes
);
app.use(
  "/api/auth",
  authRoutes
);

app.use(
  "/api/slots",
  slotRoutes
);
app.use(
  "/api/slot-blocks",
  slotBlockRoutes
);


/**
 * 404 Handler
 */
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

/**
 * Global Error Handler
 */
app.use(
  (
    err: any,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
  ) => {
    console.error(err);

    res.status(500).json({
      success: false,
      message:
        err?.message ||
        "Internal Server Error"
    });
  }
);

export default app;