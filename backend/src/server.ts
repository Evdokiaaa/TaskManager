import express from "express";
import cors from "cors";
import "dotenv/config";
import { connectDB } from "./config/db";
import authRouter from "./routes/authRoute";
const PORT = parseInt(process.env.PORT, 10) || 4000;
const app = express();

const corsOptions = {
  origin: process.env.ORIGIN || "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

/* Middleware */
app.use(cors(corsOptions));
app.use(express.json());

/* Routes */

app.use("/api/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Helooo");
});
app.get("/user", (req, res) => {
  res.send("Hello user");
});

async function start() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log(error);
  }
}

start().catch((error) => {
  console.log(error);
});
