
import requestApi from '../../helper/api';
import { setUser } from '../reducer/userSlice';



const userThunk = ()  => async (dispatch,state)  => {
  
    console.log(dispatch);
    try {
        const response = await requestApi("/users/profile","GET","",true)
        console.log(response);
        if(response.status === 200 && response.data){
            
            
            dispatch(setUser({userInfo: response.data}))
        }
    } catch (error) {
        console.log(error);
    }
}

export default userThunk;