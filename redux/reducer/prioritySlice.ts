import { createSlice } from "@reduxjs/toolkit";

export type priority = {
    id: number,
    name: string,
    code: string,
    level: string
}
export type PrioritySlice = priority[]
const initialValue : PrioritySlice  = []
const prioritySlice = createSlice(
    {
        name: "priority",
        initialState: initialValue,
        reducers: {
            setPriority: (state, actions) => {
                console.log(actions);
                
                state = [
                    ...actions.payload
                ]
                return state;
            },
           
        }

    }
)
export const {setPriority} = prioritySlice.actions;
export default prioritySlice.reducer;