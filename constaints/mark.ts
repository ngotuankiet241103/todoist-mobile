import { primary } from "../utils/theme"

type mark = {
   [key: string]: string

}
export const mark : mark = {
    "Today": `calendar-outline`,
    "Tommorow": `partly-sunny`,
    "Later this week": `book`,
    "This week": `calendar-clear-outline`,
    "Next week": `calendar-clear`,
    "No date": `ban`
    
}
export const colorMark : mark = {
    "Today": `#4ade80`,
    "Tommorow": primary,
    "Later this week": `#a78bfa`,
    "This week": `#3b82f6`,
    "Next week": `#7c3aed`,
    "No date": `#d1d5db`
    
}
""
// export const colorMark : mark = {
//     "Today": `text-green-400`,
//     "Tommorow": `text-primary`,
//     "Later this week": `text-purple-300`,
//     "This week": `text-blue-400`,
//     "Next week": `text-purple-400`,
//     "No date": `text-gray-300`
// }