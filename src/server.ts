import "reflect-metadata";
import express, { json } from "express";
import swaggetUi from "swagger-ui-express";

import "./database";
import "./shared/container";

import { routes } from "./routes";
import swaggerFile from "./swagger.json";

const app = express();

app.use(json());

app.use("/api-docs", swaggetUi.serve, swaggetUi.setup(swaggerFile));

app.use(routes);

app.listen(3333, () => console.log("Server is running on port 3333."))