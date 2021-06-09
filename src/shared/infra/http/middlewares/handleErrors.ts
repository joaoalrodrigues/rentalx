import { AppError } from "@shared/errors/appError";
import { NextFunction, Request, Response } from "express";

export function handleErrors(err: Error, request: Request, response: Response, next: NextFunction) {
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            message: err.message
        });
    }

    return response.status(500).json({
        status: "error",
        message: `Internal server error - ${err.message}`
    });
}