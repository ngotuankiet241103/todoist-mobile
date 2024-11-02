import axios from "axios";
import { env } from "../../helper/env";
import { setPriority } from "../reducer/prioritySlice";


const priorityThunk = () =>  async (dispatch,actions) => {
    
    try {
      const response = await axios.get(`${env.EXPO_PUBLIC_API}/priorities`);
      if (response.status === 200) {
        console.log(response.data);
        
        dispatch(setPriority(response.data));
        
      }
    } catch (error) {
      console.log(error);
    }
}
export default priorityThunk;