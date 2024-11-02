import { createSlice } from "@reduxjs/toolkit";
export type User = {
    isLogin: boolean,
    profile: Profile
} 
export type Profile = Info  | null
export type Info = {
    name: string,
    avatar: string,
    email: string
    provider: "google" | "facebook" | "local"
    connected: boolean
    
}
const initialValue: User = {
    isLogin: false,
    profile: null
}
const userSlice = createSlice(
    {
        name: "user",
        initialState: initialValue,
        reducers: {
            setUser: (state, actions) => {
                console.log(actions);
                
                state = {
                    isLogin: true,
                    profile: actions.payload.userInfo
                }
                return state;
            }
        }

    }
)
export const {setUser} = userSlice.actions;
export default userSlice.reducer;