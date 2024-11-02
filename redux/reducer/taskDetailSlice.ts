import { createSlice } from "@reduxjs/toolkit";
import { priority } from "./prioritySlice";
import { ProjectInfo } from "./projectSlice";
import { Label, SectionItem } from "./labelSlice";
export type Task = {
    title: string;
    description?: string;
    projectCode: string;
    sectionCode: string;
    labelCodes: string[];
    priorityCode: string;
    expiredAt: Date | null;
  };

export type TaskResponse = Pick<Task, "title" | "description"> & {
    id: number;
    code: string;
    expiredAt: Date;
    priority: priority;
    project: ProjectInfo;
    section: SectionItem;
    labels: Label[];
  };
export interface TaskDetail {
    isShow: boolean,
    task: TaskResponse | undefined,
    
}
const initialValue : TaskDetail  = {
    isShow: false,
    task: undefined
}
const taskDetailSlice = createSlice(
    {
        name: "task",
        initialState: initialValue,
        reducers: {
            setDetailTask: (state,actions) => {
                state = {
                    isShow: true,
                    task: actions.payload
                }
                return state;
            },
            resetDetailTask: (state) => {
                state = {
                    isShow: false,
                    task: undefined
                }
                return state;
            }

        }


    }
)
export const {setDetailTask,resetDetailTask} = taskDetailSlice.actions;
export default taskDetailSlice.reducer;