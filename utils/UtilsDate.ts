import { days } from "../constaints/days";
import { formatDate } from "./formatDate";
type dates = {
  [key: string]: string;
};
export class UtilDate {
  private date: Date;
  private dates: dates;
  constructor(currentDate: Date) {
    this.date = currentDate;
    this.dates = this.generateDates();
  }

  public getMark() {
    const result =
      this.dates[formatDate(this.date)] || days[this.date.getDay() - 1];
    return result;
  }
  private generateDates() {
    const today = new Date();
    const yesterday = new Date(today.getDate() - 1);
    const tommorow = new Date(today.getDate() + 1);

    return {
      [formatDate(yesterday)]: "Yesterday",
      [formatDate(today)]: "Today",
      [formatDate(tommorow)]: "Tommorow",
    };
  }
  public getDate() {
    return this.date;
  }
  public getDay() {
    return days[this.date.getDay()];
  }
}
