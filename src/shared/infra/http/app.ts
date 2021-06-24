import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";
import swaggetUi from "swagger-ui-express";

import "@shared/container";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { routes } from "./routes";
import { handleErrors } from "./middlewares/handleErrors";
import upload from "@config/upload";

createConnection();
const app = express();

app.use(express.json());

app.use("/api-docs", swaggetUi.serve, swaggetUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(routes);

app.use(handleErrors);

export { app }
