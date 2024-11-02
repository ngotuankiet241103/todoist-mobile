import { createSlice } from "@reduxjs/toolkit";
import { ProjectInfo } from "./projectSlice";
import { LabelSlice, SectionItem } from "./labelSlice";


export type openSearch = {
    type?: "projects" | "labels" | "sections",
    data?: ProjectInfo[] | LabelSlice | SectionItem[]
}
export type SearchSlice = {
    isAddTask: boolean,
    openSearch: openSearch,
    isOpen: boolean

}

const initialValue : SearchSlice = {
    isAddTask: false,
    openSearch: {},
    isOpen: false
}
const searchSlice = createSlice(
    {
        name: "search",
        initialState: initialValue,
        reducers: {
            updateSearch: (state, actions) => {
                state = {
                    ...state,
                    [actions.payload.key]: actions.payload.value
                }
                return state;
            },
            resetSearch: (state) =>{
                state = {
                    ...state,
                    openSearch: {}
                }
                return state;
            }
           
        }

    }
)
export const {updateSearch,resetSearch} = searchSlice.actions;
export default searchSlice.reducer;