import { AppError } from "@shared/errors/appError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../createUser/CreateUserService";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/implementations/DayjsDateProvider";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";
import { SendForgotPasswordMailService } from "./SendForgotPasswordMailService";
import { IMailProvider } from "@shared/container/providers/MailProvider/IMailProvider";
import { MailProviderInMemory } from "@shared/container/providers/MailProvider/MailProviderInMemory";

let sendForgotPasswordMailService: SendForgotPasswordMailService;
let usersRepository: IUsersRepository;
let usersTokenRepository: IUsersTokenRepository;
let dateProvider: IDateProvider;
let mailProvider: IMailProvider;

describe("Send Forgot Password Mail", () => {
    beforeEach(() => {
        usersRepository = new UsersRepositoryInMemory();
        usersTokenRepository = new UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        mailProvider = new MailProviderInMemory();
        sendForgotPasswordMailService = new SendForgotPasswordMailService(usersRepository, usersTokenRepository, dateProvider, mailProvider);
    })

    it("should be able to send an email to reset password", async () => {
        const sendMail = spyOn(mailProvider, "sendMail");

        const user: ICreateUserDTO = {
            driver_license: "974027",
            email: "gi@fupvozkob.cy",
            password: "wIQWAYJy",
            name: "Pauline Coleman",
        };

        await usersRepository.create(user);

        await sendForgotPasswordMailService.execute(user.email);

        expect(sendMail).toHaveBeenCalled();
    });

    it("should not be able to send an email to an unexistent user", async () => {
        await expect(
            sendForgotPasswordMailService.execute("wasvabcu@se.rw")
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should be able to create an user token", async () => {
        const createToken = spyOn(usersTokenRepository, "create");

        const user: ICreateUserDTO = {
            driver_license: "974027",
            email: "od@faze.nu",
            password: "wIQWAYJy",
            name: "Catherine Sherman",
        };

        await usersRepository.create(user);

        await sendForgotPasswordMailService.execute(user.email);

        expect(createToken).toBeCalled();
    });

});