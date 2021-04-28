import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'

import { IDateProvider, IDateCompare } from '../IDateProvider'

dayjs.extend(utc)

export class DayJSDateProvider implements IDateProvider {
  getHoursDiff({ start_date, end_date }: IDateCompare): number {
    const start = this.convertToUTC(start_date)
    const end = this.convertToUTC(end_date)

    return dayjs(end).diff(start, 'hours')
  }

  convertToUTC(date: Date): string {
    return dayjs(date).utc().local().format()
  }

  getNow(): Date {
    return dayjs().toDate()
  }

  getDayAhead(value: number): Date {
    return dayjs().add(value, 'day').toDate()
  }
}
