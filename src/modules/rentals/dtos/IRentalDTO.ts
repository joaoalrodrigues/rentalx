interface IRentalDTO {
    user_id: string;
    car_id: string;
    start_date: Date;
    expected_return_date: Date;
    end_date?: Date;
    total?: number;
    id?: string;

}

export { IRentalDTO }
