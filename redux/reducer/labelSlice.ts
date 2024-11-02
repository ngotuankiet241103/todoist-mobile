import { createSlice } from "@reduxjs/toolkit";

export type SectionItem = {
    id: number,
    name: string,
    code: string
}
export type Label = {
    [Property in keyof SectionItem]: SectionItem[Property]
}
export type LabelSlice = Label[] | []
const initialValue : Label[] = []
const labelSlice = createSlice(
    {
        name: "label",
        initialState: initialValue,
        reducers: {
            setLabel: (state, actions) => {
        
                state = [
                    ...actions.payload
                ]
                return state;
            },
            updateLabel: (state,actions) => {
                state =[
                    actions.payload,
                    ...state
                    
                ]
                console.log(state);
                
                return state;
            },
            deleteLabel: (state,actions) => {
            
                return state.filter(state => state.id != actions.payload);
            }
           
        }

    }
)
export const {setLabel,updateLabel,deleteLabel} = labelSlice.actions;
export default labelSlice.reducer;