import { AppError } from "@shared/errors/appError";
import { ICreateUserDTO } from "@modules/accounts/dtos/ICreateUserDTO";
import { UsersRepositoryInMemory } from "@modules/accounts/repositories/in-memory/UsersRepositoryInMemory";
import { CreateUserService } from "../createUser/CreateUserService";
import { AuthenticateUserService } from "./AuthenticateUserService";


let authenticateUserService: AuthenticateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserService: CreateUserService;

describe("Authenticate User", () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserService = new AuthenticateUserService(usersRepositoryInMemory);
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
        expect(async () => {
            await authenticateUserService.execute({
                email: "false@email.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it("should not be able to authenticate with incorrect password", async () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: "000124",
                email: "user2@test.com",
                password: "12345",
                name: "User Test Wrong Password",
            };

            await createUserService.execute(user);

            await authenticateUserService.execute({
                email: "user2@test.com",
                password: "1234",
            });
        }).rejects.toBeInstanceOf(AppError);
    });

});