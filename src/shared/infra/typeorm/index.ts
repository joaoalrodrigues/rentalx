import { Connection, createConnection, getConnectionOptions } from 'typeorm';

export default async (): Promise<Connection> => {
    const defaultOptions = await getConnectionOptions();

    return createConnection(
        Object.assign(defaultOptions, {
            database:
                isTestEnvironment()
                    ? "rentalx_test"
                    : defaultOptions.database
        })
    );
}

function isTestEnvironment() {
    return process.env.NODE_ENV === "test";
}
