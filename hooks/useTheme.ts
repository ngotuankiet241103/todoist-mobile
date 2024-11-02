
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import { useDispatch } from 'react-redux';
import { color, mode, updateState } from '../redux/reducer/stateSlice';
import storage from '../helper/storage';


const useTheme = () => {
    const theme = useSelector((state : state) => state.status.theme);
    const dispatch = useDispatch();
    const updateMode = (mode: mode) => {
        dispatch(updateState({key: 'theme',value: {...theme, mode}}));
        storage.set("theme",{...theme, mode});
    }
    const updateColor = (color: color) => {
        dispatch(updateState({key: 'theme',value: {...theme,color}}));
    }
    const confirmUpdate = () => {
        storage.set("theme", theme)
    }
    return {
        theme,
        updateMode,
        updateColor,
        confirmUpdate
    }
};

export default useTheme;