// import dayjs from "dayjs";

import { AppError } from "@shared/errors/appError"

class DayjsDateProvider implements IDateProvider {

    now(): Date {
        throw new AppError("Method not implemented");
        // return dayjs().toDate();
    }

    compareHours(start_date: Date, end_date: Date): number {
        throw new AppError("Method not implemented");
        // return dayjs(end_date).diff(start_date, "hours");
    }

    convertToUTC(date: Date): string {
        throw new AppError("Method not implemented");
        // return dayjs(date).utc().local().format();
    }

}

export { DayjsDateProvider }
