import requestApi from "../../helper/api";
import { setLabel } from "../reducer/labelSlice";

const labelThunk = ()  => async (dispatch,state)  => {
  
    console.log(dispatch);
    try {
        const response = await requestApi(`/labels`,"GET","")
        console.log(response);
        if(response.status === 200 && response.data){
            dispatch(setLabel(response.data))
        }
    } catch (error) {
        console.log(error);
    }
}
export default labelThunk;