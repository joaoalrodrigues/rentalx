import "reflect-metadata";
import express, { json } from "express";
import "express-async-errors";
import swaggetUi from "swagger-ui-express";

import "@shared/container";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { routes } from "./routes";
import { handleErrors } from "./middlewares/handleErrors";

createConnection();
const app = express();

app.use(json());

app.use("/api-docs", swaggetUi.serve, swaggetUi.setup(swaggerFile));

app.use(routes);

app.use(handleErrors);

export { app }
