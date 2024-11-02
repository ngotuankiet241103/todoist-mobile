import TaskItem, { taskItem, TaskResponse } from "./TaskItem";
import { Draggable } from "react-beautiful-dnd";
import useOpenModal from "../../hooks/useOpenModal";
import { Suspense, lazy } from "react";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import TaskAdd from "./TaskAdd";
import FormTask from "../form/FormTask";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import DraggableFlatList, {
  RenderItemParams,
  ScaleDecorator,
} from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import useChangeView from "../../hooks/useChangeView";
// const TaskAdd = lazy(() => import("./TaskAdd"));

// const FormTask = lazy(() => import("../form/FormTask"));
export type TaskListResponse = TaskResponse[];
export const grid = 8;
// export const getItemStyle = (draggableStyle, isDragging, isDraggingOver) => {
//   return {
//     // some basic styles to make the items look a bit nicer
//     userSelect: "none",
//     padding: grid * 2,
//     marginBottom: grid,
//     width: "100%",
//     // change background colour if dragging
//     background: isDragging ? "lightgreen" : "white",

//     // styles we need to apply on draggables
//     ...draggableStyle,
//   };
// };
export type taskList = {
  tasks: TaskListResponse;
  isList?: boolean;
  isUpcoming: string;
  onDragEnd: (data: TaskResponse[]) => void,
  start?: number,
  itemRefs?: any
};
const TaskList = ({ tasks, isList, isUpcoming,onDragEnd,itemRefs,start }: taskList) => {
  const isDragging = useSelector((state: state) => state.status.isDragging);
 
  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<TaskResponse>) => {
    console.log(isActive);
    
    return (
      <ScaleDecorator >
       
          <TaskItem
            isActive={isActive}
            task={item}
            isList={isList}
            onLongPress={drag}
            disabled={!isActive}
            style={[styles.rowItem, { backgroundColor: isActive ? "red" : item }]}
          />
       
      </ScaleDecorator>
    );
  };
  // const renderItem = ({ item, drag, isActive }: RenderItemParams<TaskResponse>) => {
  //   return (
  //     <ScaleDecorator>
  //       <TouchableOpacity
  //         onLongPress={drag}
  //         disabled={isActive}
  //         style={[
  //           styles.rowItem,
  //           { backgroundColor: isActive ? "red" : item.backgroundColor },
  //         ]}
  //       >
  //         <Text style={styles.text}>{item.title}</Text>
  //       </TouchableOpacity>
  //     </ScaleDecorator>
  //   );
  // };
  return (
    <GestureHandlerRootView  style={{ width: 'auto',height: 'auto' }}>
      <View
        style={{
          width: "auto",
          display: "flex",
          flexDirection: "column",
          gap: isList ? 0 : 2,
          height: "auto",
        }}
      >
        
          <DraggableFlatList
            data={tasks}
            onDragEnd={({ data }) => onDragEnd(data)}
            keyExtractor={(item) => item.id + ""}
            
            scrollEnabled={false}
            renderItem={renderItem}
            removeClippedSubviews={false}
          />
          {/* {tasks && tasks.length > 0 && tasks.map(task =>  <TaskItem
          key={task.id}
            isActive={true}
            task={task}
            onLongPress={() => console.log("123")
            }
            disabled={false}
            style={{...styles.rowItem}}
          />)} */}
        


      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  rowItem: {
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default TaskList;
