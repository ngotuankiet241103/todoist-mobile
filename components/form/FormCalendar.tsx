import React, { useEffect, useRef, useState } from "react";
import { days } from "../../constaints/days";
import { months } from "../../constaints/month";

import { colorMark, mark } from "../../constaints/mark";
import useOpenModal from "../../hooks/useOpenModal";
import BoxTitle from "./BoxTitle";
import useTheme from "../../hooks/useTheme";
import { hoverMode, sidebarMode, textColor } from "../../utils/theme";
import dayjs, { Dayjs } from 'dayjs';
import { DemoContainer, DemoItem } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { DateRange } from '@mui/x-date-pickers-pro/models';
import IconMenu from "../icon/IconMenu";
import { Dimensions, Keyboard, Pressable, Text, TextInput, View } from "react-native";
const { width, height } = Dimensions.get('window');
export type Day = {
  day:
    | "sunday"
    | "monday"
    | "tuesday"
    | "wednesday"
    | "thursday"
    | "friday"
    | "saturday"
    | string;
  date: Date | null;
  mark:
    | "Today"
    | "Tommorow"
    | "Later this week"
    | "This week"
    | "Next week"
    | "No date"
    | string;
};
type FormCalendar = Day[];
const generateFormCalendar = (isToday: boolean): FormCalendar => {
  let calendars: FormCalendar;

  if (isToday) {
    const marks = [
      "Tommorow",
      "Later this week",
      "This week",
      "Next week",
      "No date",
    ];
    calendars = marks.map((mark) => generateDate(new Date(), mark));
  } else {
    const marks = ["Today", "Tommorow", "This week", "Next week", "No date"];
    calendars = marks.map((mark) => generateDate(new Date(), mark));
  }
  return calendars;
};
const generateDate = (currentDay: Date, mark: string): Day => {
  switch (mark.toLowerCase()) {
    case "today": {
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "tommorow": {
      currentDay.setDate(currentDay.getDate() + 1);
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "later this week": {
      currentDay.setDate(currentDay.getDate() + 2);
      const now = currentDay.getDay();

      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "this week": {
      const dayToAdd = 6 - currentDay.getDay();
      currentDay.setDate(currentDay.getDate() + dayToAdd);
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    case "next week": {
      const dayToAdd = 7 - currentDay.getDay() + 1;
      currentDay.setDate(currentDay.getDate() + dayToAdd);
      const now = currentDay.getDay();
      return {
        day: days[now],
        date: currentDay,
        mark,
      };
    }
    default: {
      return {
        day: "",
        date: null,
        mark,
      };
    }
  }
};

type Calendar = {
  isToday: boolean;
  onClick: (date: Day) => void;
  onChange: (value: boolean) => void;
  currentDay?: Day;
};
const getDay = (date: Day): string => {
  if (date.mark === "Next week" || date.mark == "") {
    const month: number = date.date?.getMonth() ? date.date?.getMonth() : 1;

    return `${date.day.substring(0, 3)} ${date.date?.getDate()} ${
      months[month]
    }`;
  }
  return date.day.substring(0, 3);
};
const getCurrentDay = (date: Day) => {
  const month: number = date.date?.getMonth() ? date.date?.getMonth() : 1;
  return `${date.date?.getDate()} ${months[month]}`;
};
const FormCalendar = ({
  isToday,
  onClick,
  onChange,

  currentDay,
}: Calendar) => {
  const dates: FormCalendar = generateFormCalendar(isToday);
  const inputRef = useRef<TextInput>(null);
  const [searchDate, setSearchDate] = useState<Day>();
  const { isShow: show, handleToggleModel } = useOpenModal(false);
  const {theme} = useTheme();
  const value : Dayjs | null = dayjs(currentDay?.date);


  useEffect(() => {
    if (isToday) {
      onClick(generateDate(new Date(), "Today"));
    }
  }, []);
  const handleClick = (date: Day) => {
    if (date.mark != "Today") {
      onChange(false);
    } else {
      console.log("today");

      onChange(true);
    }
    onClick(date);
    handleToggleModel();
  };
  function handleChange(): void {
    if (inputRef.current && inputRef.current.value) {
      const date = new Date();
      const value = inputRef.current.value;
      const index = days.findIndex((day) =>
        day.toLocaleLowerCase().includes(value.toLocaleLowerCase())
      );
      let plusDay = 0;
      if (date.getDay()) {
        const currentIndex = date.getDay();
        if (currentIndex > index) {
          plusDay = 7 - currentIndex + index;
        } else if (currentIndex == index) {
          plusDay = 0;
        } else {
          plusDay = index - currentIndex;
        }
      }
      date.setDate(date.getDate() + plusDay);
      const newDate: Day = {
        day: days[date.getDay()],
        date,
        mark: "",
      };
      setSearchDate(newDate);
    }
  }
  const handleChooseCalendar = (date: Dayjs) => {
    console.log(date);
    
    const dateChoose  = new Date(date.toDate())
    const day : Day = {
      date: dateChoose,
      day: days[dateChoose.getDay()],
      mark: ""
    }
    console.log(dateChoose);
    
    handleClick(day);
  }
  // className={`${colorMark[`${currentDay?.mark}`]}`}
  return (
    <>
      <View style={{}}>
        {currentDay && 
      
            <Pressable onPress={() => {
              Keyboard.dismiss();
              handleToggleModel();
            }} style={{flexDirection: 'row',alignItems: 'center',gap: 2,paddingVertical: 4,borderWidth: 2,borderRadius: 8,borderColor: `#fafafa`}}>
              {currentDay?.date && (
                  <IconMenu
                  style={{fontSize: 16}}
                  icon={mark[`${currentDay.mark}`] || "calendar-outline"}
                  color={colorMark[`${currentDay.mark}`] || `${textColor[theme.color]}`}/>
              )}
              <Text style={{color: `${colorMark[`${currentDay.mark}`]}`}}>
              {currentDay && currentDay.mark === "Today" || currentDay?.mark === "No date"
                  ? currentDay.mark
                  : currentDay?.day}
              </Text>
            </Pressable>
            
       
        }
        {show && (
         
             <View
            style={{
              position: 'absolute',
              width: 300,
              paddingHorizontal: 4,
              zIndex: 50,
              left: 0,
              borderRadius: 10,
              backgroundColor: `${sidebarMode[theme.mode]()}`,
              shadowColor: 'rgba(99, 99, 99, 0.2)', // Shadow color
              shadowOffset: { width: 0, height: 2 }, // Offset in x and y directions
              shadowOpacity: 0.2, // Opacity of the shadow
              shadowRadius: 8, // Radius of the shadow
              elevation: 4, // Required for Android shadow
            
          
            }}
          
          >
            <View style={{paddingHorizontal: 4}}>
              {currentDay && currentDay.day ? (
                <Text style={{flexDirection: 'row',gap: 2,paddingVertical: 4}}>
                  {getCurrentDay(currentDay)}
                </Text>
              ) : (
                <View>
                  <TextInput
                    ref={inputRef}
                    onChange={() => handleChange()}
                    style={{paddingVertical: 4}}
                
                    placeholder="Type a due date"
                  />
                  {searchDate && (
                    <Pressable
                      style={{paddingHorizontal: 8,
                        borderTopWidth: 1,
                        borderColor: '#E5E7EB',
                        paddingVertical: 8,
                        flexDirection: 'row', 
                        justifyContent: 'space-between', 
                        alignItems: 'center', 
                        }}
                      onPress={() => handleClick(searchDate)}
                    >
                      <Text style={{fontSize: 15}}>{getDay(searchDate)}</Text>
                    </Pressable>
                  )}
                </View>
              )}
            </View>
            <View style={{flexDirection: 'column',borderTopWidth: 2,borderBottomWidth: 2,borderColor: '#E5E7EB'}}>
              {dates.length > 0 &&
                dates.map((date, index) => (
                  <CalendarItem
                    key={index}
                    date={date}
                    onclick={() => handleClick(date)}
                  />
                ))}
            </View>
            {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar value={value} onChange={handleChooseCalendar} />
          </LocalizationProvider> */}
          </View>
      
          
        )}
      </View>
    </>
  );
};
const CalendarItem = ({
  date,
  onclick,
}: {
  date: Day;
  onclick: () => void;
}) => {
  const {theme} = useTheme();
  return (
    <Pressable
      style={{
        padding: 4,
        flexDirection: 'row',
        justifyContent: 'space-between',
        
      }}
      onPress={onclick}
    >
      <View style={{flexDirection: 'row',gap: 4,alignItems: 'center'}} >
        <IconMenu color={colorMark[`${date.mark}`]} icon={mark[`${date.mark}`]}></IconMenu>
        <Text>{date.mark}</Text>
      </View>
      <Text>{getDay(date)}</Text>
    </Pressable>
  );
};
export default FormCalendar;
