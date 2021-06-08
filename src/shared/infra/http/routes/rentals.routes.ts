import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { FinalizeRentalController } from '@modules/rentals/useCases/finalizeRental/FinalizeRentalController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const finalizeRentalController = new FinalizeRentalController();

rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/:id/finalize", ensureAuthenticated, finalizeRentalController.handle);

export { rentalsRoutes }
