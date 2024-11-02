import { useDispatch, useSelector } from "react-redux";
import { state } from "../redux/store";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { reorder } from "../utils/dragContext";
import DetaiTask from "../components/task/DetaiTask";
import useOpenModal from "../hooks/useOpenModal";

import useChangeView from "../hooks/useChangeView";
import useTasks from "../hooks/useTasks";
import TaskAdd from "../components/task/TaskAdd";
import FormTask from "../components/form/FormTask";
import { updateTask } from "../redux/reducer/tasksSlice";
import {
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import BaseApp from "../components/layout/BaseApp";
import SubProjectItem from "../components/project/SubProjectItem";
import { useEffect } from "react";
import axios from "axios";
import userThunk from "../redux/thunk/userThunk";
import labelThunk from "../redux/thunk/labelThunk";
import priorityThunk from "../redux/thunk/priorityThunk";
import TaskList from "../components/task/TaskList";
import { isList } from "../redux/reducer/stateSlice";
import ContextMenuView from "react-native-context-menu-view";
const key = "isToday";
const HomeScreen = () => {
  const { getState, getGroup, getFilter } = useChangeView(key);
  const detail = useSelector((state: state) => state.detail);
  const { task, titles } = useTasks("today", getGroup(), getFilter());
  const { isShow: showModal, task: taskDetail } = detail;
  const dispatch = useDispatch();
  const { isShow, handleToggleModel } = useOpenModal(false);
  const { isShow: openFormTask, handleToggleModel: toggleFormTask } =
    useOpenModal(false);
  // const onDragStart = () => {

  // };
  // const onDragEnd = (result : DropResult) => {

  //   if(task){
  //     if (!result.destination) {
  //       return;
  //     }
  //     const key = result.source.droppableId;
  //     const desKey = result.destination.droppableId;

  //     if (key !== desKey) {
  //       return;
  //     } else {

  //       const item = reorder(
  //         task[key],
  //         result.source.index,
  //         result.destination.index
  //       );
  //       console.warn(item);

  //       dispatch(
  //         updateTask({
  //           type: "today",
  //           value: { [key]: item },
  //         })
  //       );
  //     }
  //   }

  // };
  const handleClick = () => {
    if (isShow) {
      handleToggleModel();
    }
  };

  const Render = () => {
    return (
      <>
        {!task && <Text>Loading...</Text>}
        {task &&
          Object.entries(task).map(([key, value], index) => (
            <View
              key={index}
              style={{ ...styles.box, width: !getState() ? 240 : "auto" }}
            >
              <SubProjectItem
                type="today"
                isSection={false}
                isList={getState()}
                code={key}
                key={index}
                title={titles && titles[index]}
                tasks={value}
              ></SubProjectItem>
            </View>
          ))}
      </>
    );
  };

  // useEffect(() => {
  //   const getLocations = async () => {
  //     try {
  //       let headers = {
  //         "Accept": "application/json",
  //         "Content-type": "application/json",
  //         "Access-Control-Allow-Origin": "*",
  //         'Access-Control-Allow-Credentials': 'true'

  //     };
  //       const response = await fetch("http://192.168.1.108:8888/api/v1/location/locations/new",{method:"GET", headers})
  //       console.log("response: " + response);

  //     } catch (error) {
  //       console.log(error);

  //     }
  //   }
  //   getLocations()

  // },[])
  console.log("detail " + taskDetail);

  return (
    <View>
      {taskDetail ? (
        <DetaiTask task={taskDetail}></DetaiTask>
      ) : (
        <BaseApp page="today" label={key}>
          <Pressable onPress={handleClick}>
            <ScrollView
              horizontal={!getState()}
              style={{
                width: "auto",
                paddingHorizontal: !getState() ? 16 : 4,
                height: "auto",
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: getState() ? "column" : "row",
                  height: "auto",
                  gap: 4,
                  marginTop: 12,
                }}
              >
                <Render />
              </View>

              {/* 
          {task && Object.keys(task).length < 1 
            && (!openFormTask ? <TaskAdd onclick={() => toggleFormTask()}/>
            :
            (
              <div className={getState() ? 'w-full' : 'w-[280px]'}>
                 <FormTask
                  isList={getState()}
                  isFixed={false}
                  visibile={true}
                  onclick={toggleFormTask}
                ></FormTask>
              </div>
            ))
          } */}
            </ScrollView>
          </Pressable>
        </BaseApp>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskList: {
    flexDirection: "row",
  },
  taskItem: {
    minWidth: 260,
    maxWidth: 260,
    marginRight: 16, // Apply margin to create spacing
  },
  box: {
    marginBottom: 20,
  },
  "box-task": {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
          width: 0,
          height: 54,
        },
        shadowOpacity: 0.25,
        shadowRadius: 55,
      },
      android: {
        elevation: 8, // Adjust this value for desired effect
      },
    }), // Ensure elevation is set to 0 for iOS shadow
  },
  "box-calen": {
    ...Platform.select({
      ios: {
        shadowColor: "rgba(99, 99, 99, 0.2)",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.2,
        shadowRadius: 8,
      },
      android: {
        elevation: 3, // Adjust this value to simulate the shadow effect
      },
    }),
  },
});

export default HomeScreen;
