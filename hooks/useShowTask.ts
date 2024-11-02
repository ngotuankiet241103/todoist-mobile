import  { useState } from 'react';
import { TaskResponse } from '../components/task/TaskItem';

const useShowTask = () => {
    const [isShow,setShow] = useState(false);
    const [task,setTask] = useState<TaskResponse>();
    const handleClickTask = (value : TaskResponse) => {
       
        
        setTask(value);
        setShow(true);
    }
    return {
        isShow,
        task,
        handleClickTask
        
    }
};

export default useShowTask;