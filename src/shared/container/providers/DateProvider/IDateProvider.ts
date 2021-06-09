

interface IDateProvider {

    now(): Date;
    compareHours(start_date: Date, end_date: Date): number;
    compareDays(start_date: Date, end_date: Date): number;
    isExpired(end_date: Date): boolean;
    convertToUTC(date: Date): string;
    addDays(days: number): Date;
    addHours(hours: number): Date;

}