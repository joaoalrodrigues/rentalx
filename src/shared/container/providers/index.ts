import { container } from "tsyringe";
import { DayjsDateProvider } from "./DateProvider/DayjsDateProvider";
import { EtherealMailProvider } from "./MailProvider/EtherealMailProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";

container.registerSingleton<IDateProvider>(
    "DateProvider",
    DayjsDateProvider
)

container.registerInstance<IMailProvider>(
    "MailProvider",
    new EtherealMailProvider()
)