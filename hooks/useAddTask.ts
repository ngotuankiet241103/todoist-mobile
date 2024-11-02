
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import { useDispatch } from 'react-redux';
import { updateSearch } from '../redux/reducer/searchSlice';

const useAddTask = () => {
    const isShow = useSelector((state: state) => state.search.isAddTask);
    const dispatch = useDispatch();
    const handleToggleModal = () => {
        dispatch(updateSearch({key: "isAddTask", value: !isShow}))
    }
    return {
        isShow,
        handleToggleModal
    }
};

export default useAddTask;