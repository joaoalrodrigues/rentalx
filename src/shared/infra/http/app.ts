import "reflect-metadata";
import "dotenv/config";
import cors from "cors";
import express from "express";
import "express-async-errors";
import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";
import swaggetUi from "swagger-ui-express";

import rateLimiter from "@shared/infra/http/middlewares/rateLimiter";
import "@shared/container";
import createConnection from "@shared/infra/typeorm";
import { handleErrors } from "./middlewares/handleErrors";
import upload from "@config/upload";

import swaggerFile from "../../../swagger.json";
import { routes } from "./routes";

createConnection();
const app = express();

app.use(rateLimiter);

Sentry.init({
    dsn: process.env.SENTRY_DSN,
    integrations: [
        new Sentry.Integrations.Http({ tracing: true }),
        new Tracing.Integrations.Express({ app }),
    ],
    tracesSampleRate: 1.0,
});

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());

app.use(express.json());

app.use("/api-docs", swaggetUi.serve, swaggetUi.setup(swaggerFile));

app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`));
app.use("/cars", express.static(`${upload.tmpFolder}/cars`));

app.use(cors());
app.use(routes);

app.use(Sentry.Handlers.errorHandler());

app.use(handleErrors);

export { app }
