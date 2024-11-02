
import { useSelector } from 'react-redux';
import { state } from '../redux/store';
import storage from '../helper/storage';
import { Filter, updateState} from '../redux/reducer/stateSlice';
import { useDispatch } from 'react-redux';
import { ProjectGroupKey, ProjectGroupKeyEx } from './useTasks';

const useChangeView = (label: string) => {
    let state  = useSelector((state: state) => state.status[`${label}`]);
    console.log(state);
    
    const dispatch = useDispatch();
    if(typeof state == "boolean"){
        state = {
            isList: true,
            group: "default",
            filter: {
                priorityCode: [],
                labelCode: []
            }
        }
    }
    if(state){
        const check =  Object.values(state).every(value => typeof value == "string");
        if(check){
            state = {
                isList: true,
                group: "default",
                filter: {
                    priorityCode: [],
                    labelCode: []
                }
            }
        }
    }
    if(!state){
        const value : {[key:string]: any } =   {
            isList: false,
            group: "default",
            filter: {
                priorityCode: [],
                labelCode: []
            }
        };
        state = value;
        dispatch(updateState({key: label,value}))
    }
   
    
    const handleChangeView = () => {
        if(typeof state !== 'boolean'){
            
            storage.set(label,{isList: !state.isList,group: state.group,filter: state.filter});
            dispatch(updateState({key: label,value:  {...state,isList: !state.isList}}))
        }
    }
    const handleChangeGroup = (group: ProjectGroupKey) => {
        if(typeof state !== 'boolean'){
            storage.set(label,{isList: state.isList,group,filter: state.filter});
            
            dispatch(updateState({key: label,value:  {...state,group}}));
        }
    }
    const handleChangeFilter = (filter: Filter) => {
        if(typeof state !== 'boolean'){
            storage.set(label,{isList: state.isList,group: state.group,filter})
            dispatch(updateState({key: label,value:  {...state,filter}}));
        }
    }
    const getState = () : boolean  => {
        return typeof state.isList != "boolean" ? false : state.isList;
    }
    const getGroup = () : ProjectGroupKeyEx => {
        
        return  getValueIfProjectGroupKeyEx(state.group) || "default";
    } 
    function hasProjectGroupKeyEx(obj: ProjectGroupKeyEx | string | number | boolean | Filter): obj is ProjectGroupKeyEx  {
        return obj === "default" || obj === "due date" || obj === "priority" || obj === "project";
    }
    
    // Function to get the value of group if it's of type ProjectGroupKeyEx
    function getValueIfProjectGroupKeyEx(obj: ProjectGroupKeyEx | string | number | boolean | Filter ): ProjectGroupKeyEx | null {
        if (hasProjectGroupKeyEx(obj)) {
            return obj;
        } else {
            return null;
        }
    }
    const getFilter = () : Filter => {
        return  getFilterFromObj(state.filter) || {labelCode: [],priorityCode: []};
    }
    function checkFilter(obj: ProjectGroupKeyEx | string | number | boolean | Filter): obj is Filter  {
        return typeof obj === "object";
    }
    
    // Function to get the value of group if it's of type ProjectGroupKeyEx
    function getFilterFromObj(obj: ProjectGroupKeyEx | string | number | boolean | Filter ): Filter | null {
        if (checkFilter(obj)) {
            return obj;
        } else {
            return null;
        }
    }
   return {
    state,
    handleChangeView,
    handleChangeGroup,
    handleChangeFilter,
    getState,
    getGroup,
    getFilter
   }
};

export default useChangeView;