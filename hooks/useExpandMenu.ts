
import storage, { expand_key } from "../helper/storage";
import { useSelector } from "react-redux";
import { state } from "../redux/store";
import { useDispatch } from "react-redux";
import { updateState } from "../redux/reducer/stateSlice";


const useExpandMenu = () => {
    const isExpand = useSelector((state: state) => state.status.isExpand);
    const dispatch = useDispatch();
    const handleExpandMenu = () => {
        console.log(isExpand);
        
       dispatch(updateState({key: expand_key,value: !isExpand}));
       storage.set(expand_key,!isExpand);
    }
    return {
        isExpand,
        handleExpandMenu
    }
};

export default useExpandMenu;