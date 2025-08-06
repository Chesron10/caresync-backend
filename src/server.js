import express from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

// IMPORT ROUTES
import userRoutes from "./routes/userRoutes.js";
import utilRoutes from "./routes/utilRoutes.js";
import doctorRoutes from "./routes/doctorRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";
import allergyRoutes from "./routes/allergyRoutes.js";
import reportRoutes from "./routes/reportRoutes.js";
import testRoutes from "./routes/testRoutes.js";
import prescriptionRoutes from "./routes/prescriptionRoutes.js";

// CONFIGURATIONS
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

// ROUTES
app.use("/api/users", userRoutes);
app.use("/api/utils", utilRoutes);
app.use("/api/doctors", doctorRoutes);
app.use("/api/profiles", profileRoutes);
app.use("/api/allergies", allergyRoutes);
app.use("/api/reports", reportRoutes);
app.use("/api/tests", testRoutes);
app.use("/api/prescriptions", prescriptionRoutes);

// SERVER
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
