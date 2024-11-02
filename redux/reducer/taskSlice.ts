import { createSlice } from "@reduxjs/toolkit";
import { formatDate } from "../../utils/formatDate";
import { TaskResponse } from "./taskDetailSlice";

export type TaskListResponse = TaskResponse[]
export type TaskSlice = {
    [key: string]: TaskListResponse 
}
const date = new Date();
const today : string = formatDate(date);
const initialValue : TaskSlice = {
    [today] : []
};
const taskSlice = createSlice(
    {
        name: "task",
        initialState: initialValue,
        reducers: {
            setTasks: (state, actions) => {
                console.log("h13lor");
                console.log("actiones " + actions);
                
                state[actions.payload.key] = [
                    
                    ...actions.payload.data
                ]
                return state;
            },
            setTask: (state, actions) => {
               
                if(state[actions.payload.key]){
                    state[actions.payload.key] = [
                        ...state[actions.payload.key],
                        actions.payload.data
                    ]
                }
                else{
                    state[actions.payload.key] = [
                        actions.payload.data
                    ]
                }
                
                console.log(state);
                
                return state;
            },
            updateTask: (state,actions) => {
                state = {
                   ...state,
                    ...actions.payload
                }
                return state;
            }

        }

    }
)
export const {setTasks,setTask,updateTask} = taskSlice.actions;
export default taskSlice.reducer;

