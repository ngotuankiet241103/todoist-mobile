import { color } from "../redux/reducer/stateSlice";
export const primary = "#DC4C3E";
const second = "rgb(252,250,248)";
const secondary = "rgb(252,250,248)";
const sidebarDark = "rgb(38,38,38)";
const dark = "#1E1E1E";
const thirdary = "rgb(214,132,0)";
const fill = "rgb(255,239,229)";

export const textColor = {
  todoist: primary,
  moonstone:  secondary,
  tangerine: thirdary,
};
export const bgColor = {
  todoist: primary,
  moonstone: secondary,
  tangerine: thirdary,
};
export const borderColor = {
    todoist: primary,
    moonstone:  secondary,
    tangerine: thirdary,
};
export const borderMode = {
  light: () => "border border-gray-400",
  dark: () => "border border-white",
  custom: () => {
    const date = new Date();
    const time = date.getHours();
    return time > 18 ? "border border-white" : "border border-gray-400";
  },
};
export const bgMode = {
  light: () => "bg-white",
  dark: () => "bg-[#1E1E1E]",
  custom: () => {
    const date = new Date();
    const time = date.getHours();
    return time > 18 ? "bg-[#1E1E1E]" : "bg-white";
  },
};
export const textMode = {
  light: () => "text-black",
  dark: () => "text-white",
  custom: () => {
    const date = new Date();
    const time = date.getHours();
    return time > 18 ? "text-white" : "text-black";
  },
};
export const sidebarMode = {
  light: () => second,
  dark: () => sidebarDark,
  custom: () => {
    const date = new Date();
    const time = date.getHours();

    return time > 18 ? sidebarDark : second;
  },
};
export const hoverMode = {
  light: () => "hover:bg-gray-100 transition-all cursor-pointer ",
  dark: () => "hover:bg-dark transition-all cursor-pointer",
  custom: () => {
    const date = new Date();
    const time = date.getHours();

    return time < 18
      ? "hover:bg-gray-100 transition-all cursor-pointer "
      : "hover:bg-[#1E1E1E] transition-all cursor-pointer";
  },
};
export const hoverColor = {
  todoist: () => "hover:bg-primary transition-all cursor-pointer ",
  moonstone: () => "hover:bg-secondary transition-all cursor-pointer",
  tangerine: () => "hover:bg-thirdary transition-all cursor-pointer ",
};
export const hoverBox = {
  light: () => `hover:bg-gray-200 transition-all cursor-pointer `,
  dark: () => `hover:bg-dark transition-all cursor-pointer`,
  custom: () => {
    const date = new Date();
    const time = date.getHours();

    return time < 18
      ? "hover:bg-gray-200 transition-all cursor-pointer "
      : "hover:bg-dark transition-all cursor-pointer";
  },
};
export const hoverMenu = {
  light: () => `hover:bg-gray-200 transition-all cursor-pointer `,
  dark: (color: color) =>
    `hover:${bgColor[color]} transition-all cursor-pointer`,
  custom: (color: color) => {
    const date = new Date();
    const time = date.getHours();

    return time < 18
      ? "hover:bg-gray-200 transition-all cursor-pointer "
      : `hover:${bgColor[color]} transition-all cursor-pointer`;
  },
};
