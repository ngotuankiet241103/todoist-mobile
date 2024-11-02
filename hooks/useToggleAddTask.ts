import React from 'react';
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import { useDispatch } from 'react-redux';
import { updateState } from '../redux/reducer/stateSlice';

const useToggleAddTask = () => {
    const isAddTask = useSelector((state: state) => state.status.isAddTask);
    const dispatch = useDispatch();
    const handleToggleAddTask = () => {
        dispatch(updateState({key: "isAddTask",value: !isAddTask}))
    }
    return {
        isAddTask,
        handleToggleAddTask
    }
};

export default useToggleAddTask;