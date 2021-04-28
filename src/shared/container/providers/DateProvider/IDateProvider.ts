export interface IDateCompare {
  start_date: Date
  end_date: Date
}

export interface IDateProvider {
  getHoursDiff({ start_date, end_date }: IDateCompare): number
  convertToUTC(date: Date): string
  getNow(): Date
  getDayAhead(value: number): Date
}
