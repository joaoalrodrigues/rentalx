import { Router } from "express";
import multer from "multer";
import uploadConfig from "@config/upload"

import { CreateCarController } from "@modules/cars/useCases/createCar/CreateCarController";
import { CreateCarSpecificationController } from "@modules/cars/useCases/createCarSpecification/CreateCarSpecificationController";
import { ListAvailableCarsController } from "@modules/cars/useCases/listAvailableCars/ListAvailableCarsController";
import { UploadCarImageController } from "@modules/cars/useCases/uploadCarImage/UploadCarImageController";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";

const carsRoutes = Router();
const upload = multer(uploadConfig);

const createCarController = new CreateCarController();
const createCarSpecificationController = new CreateCarSpecificationController();
const listAvailableCarsController = new ListAvailableCarsController();
const uploadCarImageController = new UploadCarImageController();

carsRoutes.get("/", listAvailableCarsController.handle);
carsRoutes.post("/", ensureAuthenticated, ensureAdmin, createCarController.handle);
carsRoutes.patch("/:id/specifications", ensureAuthenticated, ensureAdmin, createCarSpecificationController.handle);
carsRoutes.post("/:id/images", ensureAuthenticated, ensureAdmin, upload.array("images"), uploadCarImageController.handle);

export { carsRoutes }
