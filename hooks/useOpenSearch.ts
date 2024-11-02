import React from 'react';
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import { openSearch, resetSearch, updateSearch } from '../redux/reducer/searchSlice';
import { useDispatch } from 'react-redux';

const useOpenSearch = () => {
    const openSearch = useSelector((state: state) => state.search.openSearch);
    const dispatch = useDispatch();
    const handleChooseSearch = (value : openSearch) => {
        
        dispatch(updateSearch({key: "openSearch",value}))
    }
    const reset = () => {
        dispatch(resetSearch());
    }
    return {
        openSearch,
        handleChooseSearch,
        reset
    }
};

export default useOpenSearch;