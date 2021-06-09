import { AppError } from "@shared/errors/appError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticateUserService } from "./AuthenticateUserService";
import { IUsersRepository } from "@modules/accounts/repositories/IUsersRepository";
import { IUsersTokenRepository } from "@modules/accounts/repositories/IUsersTokenRepository";
import { DayjsDateProvider } from "@shared/container/providers/DateProvider/DayjsDateProvider";
import { UsersTokenRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersTokenRepositoryInMemory";


let authenticateUserService: AuthenticateUserService;
let createUserService: CreateUserService;
let usersRepositoryInMemory: IUsersRepository;
let usersTokenRepository: IUsersTokenRepository;
let dateProvider: IDateProvider;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        usersTokenRepository = new UsersTokenRepositoryInMemory();
        dateProvider = new DayjsDateProvider();
        authenticateUserService = new AuthenticateUserService(usersRepositoryInMemory, usersTokenRepository, dateProvider);
        createUserService = new CreateUserService(usersRepositoryInMemory);
    })

    it("should be able to authenticate an existent user", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000123",
            email: "user@test.com",
            password: "1234",
            name: "User Test",
        };

        await createUserService.execute(user);

        const result = await authenticateUserService.execute({
            email: user.email,
            password: user.password
        });

        expect(result).toHaveProperty("token");
    });

    it("should not be able to authenticate an unexistent user", async () => {
        expect(
            authenticateUserService.execute({
                email: "false@email.com",
                password: "1234",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", async () => {
        const user: ICreateUserDTO = {
            driver_license: "000124",
            email: "user2@test.com",
            password: "12345",
            name: "User Test Wrong Password",
        };

        await createUserService.execute(user);

        expect(
            authenticateUserService.execute({
                email: "user2@test.com",
                password: "1234",
            })
        ).rejects.toBeInstanceOf(AppError);
    });

});