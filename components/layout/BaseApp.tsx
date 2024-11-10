import React, { useEffect, useState } from 'react';
import ViewFilter from '../filter/ViewFilter';
import useOpenModal from '../../hooks/useOpenModal';
import { ProjectGroupKey } from '../../hooks/useTasks';
import useChangeView from '../../hooks/useChangeView';
import { Filter, updateState } from '../../redux/reducer/stateSlice';
import { TaskSliceKey } from '../../redux/reducer/tasksSlice';
import { Dimensions, Pressable, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { state } from '../../redux/store';
import TaskAdd from '../task/TaskAdd';
import FormTask from '../form/FormTask';
import userThunk from '../../redux/thunk/userThunk';
import labelThunk from '../../redux/thunk/labelThunk';
import priorityThunk from '../../redux/thunk/priorityThunk';
import projectThunk, { projectInfoThunk } from '../../redux/thunk/projectThunk';
import useToggleAddTask from '../../hooks/useToggleAddTask';
const { width, height } = Dimensions.get('window');
type BaseWeb  = {
    
    children: React.ReactNode,
    label: string,
    page: TaskSliceKey
}
const BaseApp = ({page,children,label} : BaseWeb) => {
  
    const {state,handleChangeGroup,handleChangeFilter} = useChangeView(label);
    const [group,setGroup] = useState<ProjectGroupKey>(state.group);
    const [filter,setFilter] = useState<Filter>(state.filter);
    const [isFFilter,setIsFilter] = useState(false);
    const dispatch = useDispatch();
    const isFilter = useSelector((state: state) => state.status.isFilter);
    const {isAddTask} = useToggleAddTask();
    const isRender = useSelector((state: state) => state.status.isRender);
    const handleClick = () => {
        // if(isShow) {
        //     handleToggleModel();
        //     if(group != state.group){
        //         handleChangeGroup(group);
        //     }
        //     // if(isFilter) {
        //     //     console.log(filter);
                
                
        //     // }
        // }
    }
    useEffect(() =>  {
       
        dispatch(labelThunk());
        dispatch(priorityThunk());
    
      },[])
      useEffect(() => {
        dispatch(projectThunk());
        dispatch(projectInfoThunk());
      }, [isRender]);
    useEffect(()=> {
        // function log(event : React.KeyboardEvent){
        //     if(event.key === 'Escape'){
        //         if(isShow) {
        //             handleToggleModel();
        //             if(group != state.group){
        //                 handleChangeGroup(group);
        //             }
        //             if(isFilter) {
        //                 console.log(filter);
        //                 setIsFilter(false);
        //                 handleChangeFilter(filter);
                        
        //             }
        //         }
        //     }
        //   }
        // window && window.addEventListener("keyup", log);
    },[])
    const handleOpenTask = () =>{
        dispatch(updateState({key: "isAddTask",value: !isAddTask}))
    }
    const handleToggleFilter = () => {
        dispatch(updateState({key: "isFilter",value: !isFilter}))
        handleChangeFilter(filter);
    }
    return (
        <View>

        <Pressable  style={styles.base} onPress={handleClick} >
         
              <ViewFilter handleToggleFilter={handleToggleFilter} filter={{filter,setFilter}} setIsFilter={setIsFilter} group={{group,setGroup}} type={page} label={label}  isShow={isFilter}></ViewFilter>
            
            
            {children}
            {isAddTask ? <FormTask visibile isFixed isList onclick={() => console.log("123")
            }/> :  <TaskAdd isFixed  onclick={handleOpenTask
            }/> }
           
        </Pressable>
        
        </View>
    );
};
const styles = StyleSheet.create({

    base: {
        
        width: 'auto',
       height: height
    },
    
})
export default BaseApp;