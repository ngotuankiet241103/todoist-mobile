import { days } from "../constaints/days"
import { months } from "../constaints/month"

export const formatDate = (date: Date) : string  => {
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
}
export const formatMonthComing = (date: Date): string => {
    return `${months[date.getMonth()]} ${date.getFullYear()}`
}
export const formatDayComing = (date: Date) : string => {
   const day = `${days[date.getDay()]}`.substring(0,3);
    
    return date.getDate() ?  `${day} ${date.getDate()}` : "overdate";
}
