
import requestApi from '../../helper/api';
import { setAllProject, setInboxProject, setProject } from '../reducer/projectSlice';




const projectThunk = ()  => async (dispatch,state)  => {
  
    try {
        const response = await requestApi("/projects","GET")
        console.log(response);
        if(response.status === 200 && response.data){
            dispatch(setProject(response.data))
            dispatch(setAllProject(response.data));
        }
    } catch (error) {
        console.log(error);
    }
}
export const projectInfoThunk = ()  => async (dispatch,state)  => {
    try {
        const response = await requestApi("/projects/inbox","GET")
        console.log(response);
        if(response.status === 200 && response.data){
            dispatch(setInboxProject(response.data))
            dispatch(setAllProject([response.data]));
        }
    } catch (error) {
        console.log(error);
    }
}


export default projectThunk;
