import "reflect-metadata";
import express, { json, NextFunction, Request, Response } from "express";
import "express-async-errors";
import swaggetUi from "swagger-ui-express";

import "@shared/container";
import { AppError } from "@shared/errors/appError";
import createConnection from "@shared/infra/typeorm";

import swaggerFile from "../../../swagger.json";
import { routes } from "./routes";

createConnection();
const app = express();

app.use(json());

app.use("/api-docs", swaggetUi.serve, swaggetUi.setup(swaggerFile));

app.use(routes);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
});

export { app }