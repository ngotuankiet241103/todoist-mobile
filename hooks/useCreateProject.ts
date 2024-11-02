import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import { useDispatch } from 'react-redux';
import { updateState } from '../redux/reducer/stateSlice';


const useCreateProject = (index?: number) => {
    const project  = useSelector((state : state )=> state.status.projectAdd);
    const dispatch = useDispatch();
    useEffect(() => {
        if(index){
            dispatch(updateState({key: 'projectAdd',value: {...project,index}}));
        }
    },[])
    const toggleProject = () => {
        dispatch(updateState({key: 'projectAdd',value: {...project,isAddProject: !project.isAddProject}}));

    }
    const resetProject = () => {
        dispatch(updateState({key: 'projectAdd',value: {isAddProject: false}}));
    }
    const setIndex = (index: number) =>  {
        dispatch(updateState({key: 'projectAdd',value: {...project,index,isAddProject: !project.isAddProject}}));
    }
   
    return {
        project,
        toggleProject,
        resetProject,
        setIndex,
        
    }
};

export default useCreateProject;