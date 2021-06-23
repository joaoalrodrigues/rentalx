import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import { injectable } from "tsyringe";

@injectable()
class DayjsDateProvider implements IDateProvider {

    now(): Date {
        return dayjs().toDate();
    }

    compareHours(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "hours");
    }

    compareDays(start_date: Date, end_date: Date): number {
        const end_date_utc = this.convertToUTC(end_date);
        const start_date_utc = this.convertToUTC(start_date);

        return dayjs(end_date_utc).diff(start_date_utc, "days");
    }

    isExpired(end_date: Date): boolean {
        return dayjs(end_date).isBefore(this.now());
    }

    convertToUTC(date: Date): string {
        return dayjs(date).utc().local().format();
    }

    addDays(days: number): Date {
        return dayjs().add(days, "days").toDate();
    }

    addHours(hours: number): Date {
        return dayjs().add(hours, "hours").toDate();
    }

}

enum TimeType {
    SECONDS = "seconds",
    MINUTES = "minutes",
    HOURS = "hours",
    DAYS = "days",
    MONTHS = "months",
    YEARS = "years"
}

export { DayjsDateProvider, TimeType }
