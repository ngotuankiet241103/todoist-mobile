import React, { ReactEventHandler, Suspense, lazy, useEffect, useRef, useState } from "react";
import  FormTask, { Task } from "../form/FormTask";
import { ProjectInfo } from "../../redux/reducer/projectSlice";
import { SectionItem } from "../form/FormProject";
import { showTag } from "../../utils/tag";
import { Label } from "../../redux/reducer/labelSlice";
import TaskTime from "./TaskTime";
import TaskLabelItem from "./TaskLabelItem";
import { useDispatch } from "react-redux";
import { setDetailTask } from "../../redux/reducer/taskDetailSlice";
import { priority } from "../form/FormPriority";
import { bgColorPriority, colorPriority } from "../../constaints/flag";
import { updateMethod } from "../../helper/api";
import useOpenModal from "../../hooks/useOpenModal";
import { sidebarMode } from "../../utils/theme";
import useTheme from "../../hooks/useTheme";
import { Alert, GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
// const FormTask = lazy(() => import('../../components/form/FormTask'))


export type TaskResponse = Pick<Task, "title" | "description"> & {
  id: number;
  code: string;
  expiredAt: Date;
  priority: priority;
  project: ProjectInfo;
  section: SectionItem;
  labels: Label[];
 
};
export type taskItem = {
  task: TaskResponse;
  isList?: boolean,
  isActive: boolean,
  style: any;
  onLongPress: (event: GestureResponderEvent) => void 
  [key: string]: any;
};
const TaskItem = ({ task, isList, style,isActive,onLongPress }: taskItem) => {
  const { isShow, handleToggleModel } = useOpenModal(false);
  const dispatch = useDispatch();
  const [isHover, setHover] = useState(false);
  const {theme} = useTheme();
  const checkBoxRef = useRef<View>(null);
  useEffect(() => {
    if (checkBoxRef.current) {
      const element = checkBoxRef.current;
      const newStyle = {
        borderColor: colorPriority[task.priority.level],
        backgroundColor: bgColorPriority[task.priority.level],
      };
  
      // Use setNativeProps to directly modify styles
      element.setNativeProps({
        style: newStyle,
      });
    }
  }, [task.priority.level]);
  const handleClickTask = (value: TaskResponse) => {
    // const newURL = `/app/task/${task.code}`;
    // console.log(value);

    // // // Change URL without triggering a render
    // history.pushState({}, "", newURL);
    dispatch(setDetailTask(value));
  };
  const handleCompleteTask = async (id: number, cb: () => void) => {
    try {
      const response = await updateMethod("/tasks/completed", { id });
      if (response && response.status === 200) {
        console.log("task completed");
        cb();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleCheckComplete = (
    event: GestureResponderEvent
  ): void => {
    event.stopPropagation();
    const getParent = (e: HTMLElement | null, parentName: string) => {
      while (e && !e.classList.contains(parentName)) {
        e = e.parentElement;
      }
      return e;
    };
    const handleSuccess = () => {
      const element = getParent(checkBoxRef.current, "task-item");
      element?.remove();
    };
    handleCompleteTask(task.id, handleSuccess);
  };
  const onClickEdit =  (e: GestureResponderEvent) => {
    e.stopPropagation();
    handleToggleModel();
  }
  console.log("isList " +  isList);
  
  return (
    <>
      {!isShow ? (
        <TouchableOpacity
         
          style={{...styles.taskItem,borderWidth: 1,borderTopColor:  'gray',borderLeftColor: !isList ? 'gray' : 'transparent',borderRightColor: !isList ? 'gray' : 'transparent' ,borderBottomColor: !isList ? 'gray' : 'transparent',width: 'auto',marginBottom: isList ? 0 : 4}}
          onLongPress={onLongPress}
          disabled={isActive}
          onPress={(e) => {
          
            // e.preventDefault();
            handleClickTask(task)
          }}
        >
          <View style={{paddingHorizontal: 4}}>
          <View
              ref={checkBoxRef}
              style={[
                styles.checkBox,
                style.hover && styles.checkBoxHover, // Áp dụng style khi hover
              ]}
              onTouchStart={() => setHover(true)}  // Thay thế cho onMouseEnter
              onTouchEnd={() => setHover(false)}   // Thay thế cho onMouseLeave
            >
              <TouchableOpacity
              
                onPress={handleCheckComplete}
                style={{
                  position: 'absolute',
                  top: -2, // top[-2px]
                  left: '50%', // left[50%]
                  transform: [{ translateX: -50 }],
                  display: isHover ? 'flex' : 'none'
                }}
               
              >
               <Text><AntDesign name="check" size={22} color="black" /></Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{flex: 1}}>
            <Text style={{fontWeight: 'bold',color:'black'}}>{task.title}</Text>
            <View style={{display: 'flex',flexDirection: 'row',justifyContent: 'space-between'}} >
                <Text >{task?.description}</Text>
                <View style={{display: 'flex',gap: 4,flexDirection: 'row'}}>
                  <Text onPress={onClickEdit}><Feather name="edit-2" size={18} color="black" /></Text>
                </View>
            </View>
            <View style={{display: 'flex',justifyContent: 'space-between',flexDirection: 'row'}}>
              <View style={{display: 'flex',gap: 8,flexDirection: 'row'}}>
                {task.expiredAt && (
                  <TaskTime date={new Date(task.expiredAt)}></TaskTime>
                )}
                {task.labels &&
                  task.labels.length > 0 &&
                  task.labels.map((label) => (
                    <TaskLabelItem key={label.id} label={label} />
                  ))}
              </View>
              <Text style={{fontSize: 12}}>{showTag({ project: task.project, section: task.section })}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : (
       
        <>
          <View>
            <Suspense fallback={<Text>loading...</Text>}>

              {/* <FormTask isList={false} task={task}  isFixed={false} visibile={true} onclick={handleToggleModel}></FormTask> */}
            </Suspense>
          
          </View>
        </>
       
      )}
    </>
  );
};
const styles = StyleSheet.create({
  taskItem: {
    display: 'flex',
    gap: 2,
    justifyContent: 'flex-start',
    padding: 4,

    flexDirection: 'row'

  },
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
  checkBox: {
    width: 18,
    height: 18,
    borderRadius: 9, // Rounded full equivalent to rounded-full
    borderWidth: 3,
    borderColor: 'black', // Màu border
  },
  checkBoxHover: {
    // Style sẽ áp dụng khi hover
    borderColor: 'blue',
  },
});
export default TaskItem;
