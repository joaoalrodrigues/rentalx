import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.get("/", ensureAuthenticated, createRentalController.handle);

export { rentalsRoutes }
