import requestApi from '../../helper/api';
import { setTasks } from '../reducer/taskSlice';



const taskThunk = (date: string)  => async (dispatch,state)  => {
  
    console.log(dispatch);
    try {
        const response = await requestApi(`/tasks?expired_at=${date}`,"GET","")
        console.log(response);
        if(response.status === 200 && response.data){
            dispatch(setTasks({key:date,data: response.data}))
        }
    } catch (error) {
        console.log(error);
    }
}
export const getTaskByProjectCodeThunk = (key: string,sectionCode?: string) => async (dispatch,state)  => {
  
    console.log(dispatch);
    try {
        if(!sectionCode){
            const response = await requestApi(`/tasks/${key}`,"GET","")
            console.log(response);
            if(response.status === 200 && response.data){
                dispatch(setTasks({key,data: response.data}))
            }
        }
        else{
            const response = await requestApi(`/tasks/${key}/${sectionCode}`,"GET","")
            console.log(response);
            if(response.status === 200 && response.data){
                dispatch(setTasks({key: sectionCode,data: response.data}))
            }
        }
       
    } catch (error) {
        console.log(error);
    }
}

export default taskThunk;