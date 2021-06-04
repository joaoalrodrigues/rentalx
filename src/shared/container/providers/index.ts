import { container } from "tsyringe";
import { DayjsDateProvider } from "./DateProvider/DayjsDateProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
)