import  { useReducer } from "react";
import { Day } from "../components/form/FormCalendar";
import { priority } from "../components/form/FormPriority";
import { Tag } from "../components/form/FormTask";
export type Data = {
  priority?: priority;
  date?: Day;
  tag?: Tag;
};

enum TaskActionKind {
  SETDATE = "SETDATE",
  SETTAG = "SETTAG",
  SETPRIORITY = "SETPRIORITY",
  RESET = "RESET",
}

// An interface for our actions
interface TaskAction<T> {
  type: TaskActionKind;
  payload?: T;
}
type TaskData = Day | Tag | priority;
function reducer<T extends TaskData | undefined>(
  state: Data,
  actions: TaskAction<T>
) {
  const { type, payload } = actions;
  switch (type) {
    case TaskActionKind.SETDATE: {
      state = {
        ...state,
        date: payload,
      };
      return state;
    }
    case TaskActionKind.SETPRIORITY: {
      state = {
        ...state,
        priority: payload,
      };
      return state;
    }
    case TaskActionKind.SETTAG: {
      state = {
        ...state,
        tag: payload,
      };
      return state;
    }
    case TaskActionKind.RESET: {
      state = {
        date: {
          date: new Date(),
          day: "",
          mark: "Today",
        },
        priority: undefined,
        tag: undefined,
      };
      return state;
    }
    default:
      return state;
  }
}
const initialValue: Data = {
  date: {
    date: new Date(),
    day: "",
    mark: "Today",
  },
  priority: undefined,
  tag: undefined,
};
const useTask = (initial: Data = initialValue ) => {
 const [state, dispatch] = useReducer(reducer, initial);
 const setTag = (tag: Tag) => {
    dispatch({type: TaskActionKind.SETTAG,payload: tag})
 }
 const  setDate = (date: Day) => {
    dispatch({type: TaskActionKind.SETDATE,payload: date})
 }
 const setPriority = (priority: priority) => {
    dispatch({type: TaskActionKind.SETPRIORITY,payload: priority})
 }
 const reset = () => {
    dispatch({type: TaskActionKind.RESET})
 }
  return {
    state,
    setTag,
    setDate,
    setPriority,   
    reset
  };
};

export default useTask;
