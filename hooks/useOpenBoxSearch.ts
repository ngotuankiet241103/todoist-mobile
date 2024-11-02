
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import { useDispatch } from 'react-redux';
import { updateSearch } from '../redux/reducer/searchSlice';

const useOpenBoxSearch = () => {
    const isOpen = useSelector((state: state) => state.search.isOpen);
    const dispatch = useDispatch();
  
    const closeBox = () => {
        
        dispatch(updateSearch({key: "isOpen",value: !isOpen}))
    }
    return {
        isOpen,
        closeBox
    }
};

export default useOpenBoxSearch;