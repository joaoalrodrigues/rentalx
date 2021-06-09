import { Router } from 'express';
import { ensureAuthenticated } from '../middlewares/ensureAuthenticated';
import { CreateRentalController } from '@modules/rentals/useCases/createRental/CreateRentalController';
import { FinalizeRentalController } from '@modules/rentals/useCases/finalizeRental/FinalizeRentalController';
import { ListRentalsByUserController } from '@modules/rentals/useCases/listRentalsByUser/ListRentalsByUserController';

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();
const finalizeRentalController = new FinalizeRentalController();
const listRentalsByUserController = new ListRentalsByUserController();

rentalsRoutes.get("/user", ensureAuthenticated, listRentalsByUserController.handle);
rentalsRoutes.post("/", ensureAuthenticated, createRentalController.handle);
rentalsRoutes.post("/:id/finalize", ensureAuthenticated, finalizeRentalController.handle);

export { rentalsRoutes }
