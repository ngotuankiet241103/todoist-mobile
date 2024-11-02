import { createSlice } from "@reduxjs/toolkit";
import storage, { expand_key } from "../../helper/storage";
import { ProjectGroupKey, ProjectGroupKeyEx } from "../../hooks/useTasks";

export const key = "isRender";
export const isList ="isList";
export const view = "isToday";
export type mode = "custom" | "light" | "dark";
export type color = "todoist" | "moonstone" | "tangerine";
type theme = {
    mode: mode,
    color: color
}
export type stateApp = {
    isExpand: boolean
    isRender: boolean,
    isDragging: boolean,
    projectAdd: {
        index?: number,
        isAddProject: boolean,
        
    },
    isFilter: boolean,
    theme: theme,
    isAddTask: boolean,
    [key: string]: {
        isList: boolean
        group: ProjectGroupKeyEx
        filter: Filter
    } | boolean | {[key: string]: string | number | boolean | ProjectGroupKeyEx | Filter} | undefined
}
type storageState = {
    [key: string]: boolean
}
export type Filter = {[key in "priorityCode" | "labelCode" ]: string[]}
const initialValue : stateApp= {
    isExpand: false,
    isRender:  false,
    isDragging: false,
    projectAdd: {
        isAddProject: false,
       
    },
    theme: {
        mode: "light",
        color: "todoist"
    },
    isFilter: false,
    isToday: {
        isList: storage.get<storageState>(view)?.isList || false,
        group: storage.get<{[key:string]: ProjectGroupKey}>(view)?.group || "default",
        filter: storage.get<{[key: string]: Filter}>(view)?.filter || {priorityCode: [] ,labelCode:[]}
    },
    isAddTask: false,
    

    
}
const statelSlice = createSlice(
    {
        name: "status",
        initialState: initialValue,
        reducers: {
           updateState: (state,actions) => {
            state = {
                ...state,
                [actions.payload.key] : actions.payload.value
                
            }
            return state;
           }

        }


    }
)
export const {updateState} = statelSlice.actions;
export default statelSlice.reducer;