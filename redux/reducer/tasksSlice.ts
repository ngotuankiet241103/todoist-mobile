import { createSlice } from "@reduxjs/toolkit";
import { TaskListResponse } from "./taskSlice";


export type TaskSliceKey = "today" | "project" | "upcoming" | "label"
export type TasksSlice = {
    [key in TaskSliceKey]?: {
        [key: string]: TaskListResponse | []
    }
   
}
const initialValue : TasksSlice = {};
const tasksSlice = createSlice(
    {
        name: "tasks",
        initialState: initialValue,
        reducers: {
            setTasks: (state, actions) => {
                
                state = {
                    [actions.payload.key]: {
                        ...actions.payload.data
                    }
                    
                }
                console.log(state);
                
                return state;
            },
            updateTask: (state,actions) => {
                
                const currentData = state[actions.payload.type];
                state = {
                    ...state,
                    [actions.payload.type]: {
                        
                        ...currentData,
                        ...actions.payload.value
                        
                    }
                    
                    
                }
               
                console.log(state);
                
                return state;
            }
            

        }

    }
)
export const {setTasks,updateTask} = tasksSlice.actions;
export default tasksSlice.reducer;

