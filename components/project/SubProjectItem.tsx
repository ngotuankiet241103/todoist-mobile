import React, { useEffect, useState } from "react";
import TaskList, { taskList, TaskListResponse } from "../task/TaskList";
import { Droppable } from "react-beautiful-dnd";
import { getListStyle, reorder } from "../../utils/dragContext";
import { SectionItem } from "../form/FormProject";
import requestApi, { deleteMethod, updateMethod } from "../../helper/api";
import useOpenModal from "../../hooks/useOpenModal";
import AddSection from "../task/AddSection";
import useRender from "../../hooks/useRender";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Feather, FontAwesome6 } from "@expo/vector-icons";
import { RenderItemParams, ScaleDecorator } from "react-native-draggable-flatlist";
import { TaskResponse } from "../task/TaskItem";
import { useDispatch } from "react-redux";
import { updateTask } from "../../redux/reducer/tasksSlice";

const SubProjectItem = ({
  title,
  tasks,
  code,
  isList,
  isUpcoming,
  isSection,
  type,
  itemRefs,
  start,
  index
}: {
  title?: string;
  tasks: TaskListResponse | [];
  code: string;
  isList: boolean;
  isUpcoming?: string
  isSection?: boolean
  type: string,
  start?: number,
  index?: number,
  itemRefs?: any
}) => {
  const dispatch = useDispatch();
  const [section,setSection] = useState<SectionItem>();
  const {isShow,handleToggleModel} = useOpenModal(false);
  const [isAction,setAction] = useState(false);
  const {handleRender} = useRender();
  useEffect(() => {
    const getSection = async () => {
      try {
        const response = await requestApi(`/sections/code/${code}`,"GET");
      
        if(response.status === 200){
          setSection(response.data);
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    if(isSection){
      getSection();
    }
  },[])
  const handleUpdateSection = (name: string) => {
    async function updateSection<T>(url: string,data: T){
      try {
        const response = await updateMethod(url,data);
     
        if(response && response.status === 200){
          handleToggleModel();
          handleRender();
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    const data = {
      id: section?.id,
      name
    }
    updateSection("/sections",data);
  }
  const handleRemoveSection = () => {
    async function removeSection<T>(url: string,data: T){
      try {
        const response = await deleteMethod(url,data);
        if(response && response.status === 200){
          handleToggleModel();
          handleRender();
        }
      } catch (error) {
        console.log(error);
        
      }
    }
    const data = {id: section?.id}
    removeSection("/sections",data);
  }
  const onDragEnd = (data: TaskResponse[]) => {
    
    if(data.length >= 2){
      // // if (!result.destination) {
      // //   return;
      // // }
      // // const key = result.source.droppableId;
      // // const desKey = result.destination.droppableId;
      
      
      //   const item = reorder(
      //     tasks,
      //     tasks.findIndex(task => task.id === data[1].id),
      //     tasks.findIndex(task => task.id === data[0].id)
      //   );
      //   console.warn(item);
        
        dispatch(
          updateTask({
            type,
            value: { [code]: data },
          })
        );
      }
    }
   

  
  return (

    <View style={{width: 'auto'}}>
      <Text  ref={(ref) => itemRefs ?  (itemRefs.current[index] = ref) : null} style={{marginBottom: 20,fontWeight: 'bold'}}>{title}</Text>
      <TaskList  onDragEnd={onDragEnd} isUpcoming={isUpcoming || ""} isList={isList} tasks={tasks}/>
      {/* {!isShow ?
      <TouchableOpacity style={{...styles.flex}} onPressIn={() => setAction(true)} onPressOut={() => setAction(false)}>
        
        <Text style={{marginBottom: 4,fontWeight: 'bold'}}>{title}</Text>
        {isSection && section &&  <View style={{display: isAction ? 'flex' : 'none',gap: 2,...styles.text }} >
          <Text onPress={handleToggleModel}><Feather name="edit-2" size={20} color="black" /></Text>
          <Text onPress={handleRemoveSection}><FontAwesome6 name="trash-can" size={20} color="black" /></Text>
        </View>
        }
      </TouchableOpacity>
      :
        <View>
           <AddSection
      section={section}
      clickCancle={handleToggleModel}
      clickSubmit={handleUpdateSection}
      ></AddSection>
        </View>
      }
        <TaskList isUpcoming={isUpcoming || ""} isList={isList} tasks={tasks}/>
      <Droppable droppableId={`${ code}`}>
        {(provided, snapshot) => (
          <>
            <View
              ref={provided.innerRef}
              style={getListStyle(snapshot.isDraggingOver)}
            >
             
              {provided.placeholder}
            </View>
          </>
        )}
      </Droppable> */}
    </View>
  );
};
const styles = StyleSheet.create({
  flex: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  text: {
    fontSize: 16
  }
});

export default SubProjectItem;
