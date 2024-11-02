import { createSlice } from "@reduxjs/toolkit";

export type ProjectInfo = {
    id: number,
    name: string,
    code: string,
    task_all?: number
}
export type Project = {
    all: ProjectInfo[]
    inbox: ProjectInfo | undefined,
    myProject: ProjectInfo[]
    detail?: ProjectInfo
}
const initialValue : Project = {
    all: [],
    inbox: undefined,
    myProject: []
};
const projectSlice = createSlice(
    {
        name: "project",
        initialState: initialValue,
        reducers: {
            setProject: (state, actions) => {
        
                state = {
                    ...state,
                    myProject: actions.payload
                }
                return state;
            },
            setInboxProject: (state,actions) => {
                state = {
                    ...state,
                    inbox: actions.payload
                    
                }
                return state;
            },
            setAllProject: (state,actions) => {
                state = {
                    ...state,
                    all: [...state.all,...actions.payload]
                }
                return state;
            },
            setProjectDetail: (state,actions) => {
              
                state = {
                    ...state,
                    detail: actions.payload
                }
                return state;
            }

        }

    }
)
export const {setProject,setInboxProject,setAllProject,setProjectDetail} = projectSlice.actions;
export default projectSlice.reducer;