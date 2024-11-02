
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { key, updateState } from '../redux/reducer/stateSlice';
import storage from '../helper/storage';
import { state } from '../redux/store';

const useRender = () => {
    const isRender = useSelector((state: state) => state.status.isRender);
    const dispatch = useDispatch();
    const handleRender = () => {
        console.log(isRender);
        
       dispatch(updateState({key,value: !isRender}));
       storage.set(key,!isRender);
    }
    return {
        isRender,
        handleRender
    }
};

export default useRender;