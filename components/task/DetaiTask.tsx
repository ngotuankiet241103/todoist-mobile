import React, { useRef, useState } from "react";
import { TaskResponse } from "./TaskItem";
import HeaderTaskDetail from "./HeaderTaskDetail";

import { showTag } from "../../utils/tag";
import { useDispatch } from "react-redux";
import {
  resetDetailTask,
  setDetailTask,
} from "../../redux/reducer/taskDetailSlice";
import ButtonList from "../button/ButtonList";
import { updateMethod } from "../../helper/api";
import FormProject, { SectionItem } from "../form/FormProject";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import { LabelListSelect, Tag } from "../form/FormTask";
import { ProjectInfo } from "../../redux/reducer/projectSlice";
import FormCalendar, { Day } from "../form/FormCalendar";
import { UtilDate } from "../../utils/UtilsDate";
import FormPriority, { priority } from "../form/FormPriority";
import useTask, { Data } from "../../hooks/useTask";
import useOpenModal from "../../hooks/useOpenModal";
import LabelTaskList from "./LabelTaskList";
import { Label } from "../../redux/reducer/labelSlice";
import { key, updateState } from "../../redux/reducer/stateSlice";
import useTheme from "../../hooks/useTheme";
import { bgColor, bgMode, hoverMode, sidebarMode } from "../../utils/theme";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { RadioButton } from "react-native-paper";
import IconMenu from "../icon/IconMenu";
import HeaderEditTask from "./HeaderEditTask";

const DetaiTask = ({ task }: { task: TaskResponse }) => {
  console.log(task);
  const dateTask = new UtilDate(new Date(task.expiredAt));
  const initialValue: Data = {
    date: {
      date: dateTask.getDate(),
      day: dateTask.getDay(),
      mark: dateTask.getMark(),
    },
    priority: task.priority,
    tag: {
      project: task.project,
      section: task.section,
    },
  };
  const { state, setDate, setPriority, setTag } = useTask(initialValue);
  const project = useSelector((state: state) => state.project);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const titleTaskRef = useRef<HTMLInputElement>(null);

  const [isAllow, setAllow] = useState(true);
  const [isEdit, setEdit] = useState(false);
  const [currentTask, setTask] = useState<TaskResponse>(task);
  const [isToday, setToday] = useState(state.date?.mark === "Today");
  const [labelSelect, setSelected] = useState(task.labels);
  const { isShow, handleToggleModel } = useOpenModal(false);
  const isRender = useSelector((state: state) => state.status.isRender);
  const dispatchRedux = useDispatch();

  const { theme } = useTheme();
  const handleCloseTask = async () => {
    history.back();

    if (labelSelect.length < 1) {
      const data: { [key: string]: number | string[] } = {
        id: currentTask.id,
        labelCodes: [],
      };
      await updateTask("/tasks/label", data);
    }

    dispatchRedux(updateState({ key: "isRender", value: !isRender }));
    dispatchRedux(resetDetailTask());
  };
  const handleMoveProject = () => {
    dispatchRedux(resetDetailTask());
  };
  const handleEditInfo = () => {
    setEdit(true);
  };
  async function updateTask<T>(url: string, data: T) {
    try {
      const response = await updateMethod(url, data);

      if (response && response.status === 200) {
        setTask(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUpdateTask = () => {
    console.log(titleTaskRef.current);

    if (title) {
      const data: { [key: string]: string | number | undefined } = {
        id: currentTask.id,
        title,
        description,
      };
      updateTask("/tasks/info", data);
      setEdit(false);
    }
  };
  const handleChoosePriority = (priority: priority) => {
    setPriority(priority);
    const data: { [key: string]: string | number | undefined } = {
      id: currentTask.id,
      priorityCode: priority.code,
    };
    updateTask("/tasks/priority", data);
  };
  const handleTitleInput = () => {
    if (titleTaskRef.current) {
      if (!titleTaskRef.current.value) {
        setAllow(false);
        return;
      } else {
        setAllow(true);
      }
    }
  };
  const handleChooseProject = (
    project?: ProjectInfo,
    section?: SectionItem
  ) => {
    const tag: Tag = { project, section };
    setTag(tag);
    const data: { [key: string]: string | number | undefined } = {
      id: currentTask.id,
      projectCode: project?.code,
      sectionCode: section?.code,
    };
    updateTask("/tasks/project", data);
  };
  const handleChooseDate = (date: Day) => {
    setDate(date);
    const data: { [key: string]: number | null | Date } = {
      id: currentTask.id,
      expiredAt: date.date,
    };
    updateTask("/tasks/expired-at", data);
  };

  const handleCheckLabel = (label: Label, index: number, isExist: boolean) => {
    console.log(isExist);
    if (isExist) {
      // let newArr: Label[];
      // if (labelSelect.length > 1) {
      //   labelSelect.splice(index, 1);
      //   newArr = labelSelect;
      // } else {
      //   newArr = [];
      // }
      // console.log(newArr);
      
      setSelected([...labelSelect.filter(la => la.id !== label.id)]);
    } else {
      setSelected([...labelSelect, label]);
    }
  };
  const onBlurBox = () => {
    if (isShow) {
      const data: { [key: string]: number | string[] } = {
        id: currentTask.id,
        labelCodes: labelSelect.map((label) => label.code),
      };
      updateTask("/tasks/label", data);
      handleToggleModel();
    }
    dispatchRedux(setDetailTask(undefined));
    dispatchRedux(updateState({key: "isRender",value: !isRender}))
  };

  return (
    <Pressable style={styles.container} onPress={onBlurBox}>
      <Pressable
        style={{
          position: "absolute",
          top: 20,
          left: 0,
          right: 0,
          height: "auto",
          backgroundColor: `${sidebarMode[theme.mode]()}`,
          borderRadius: 8,
          paddingHorizontal: 8,
          paddingVertical: 6,
        }}
        onPress={(e) => e.preventDefault()}
      >
        {isEdit ? (
          <HeaderEditTask
            isAllow={isAllow}
            onBack={() => setEdit(false)}
            onSubmit={handleUpdateTask}
          />
        ) : (
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            {/* <NavLink
            onClick={handleMoveProject}
            to={`/app/project/${task.project.code}`}
          >
            {state.tag && showTag(state.tag)}
          </NavLink> */}
            <Text>{state.tag && showTag(state.tag)}</Text>

            <HeaderTaskDetail onEdit={() => setEdit(!isEdit)} />
          </View>
        )}
        <View style={{}}>
          <View
            style={{ flexDirection: "row", alignContent: "flex-start", gap: 4 }}
          >
            <View>
              <RadioButton value="first" />
            </View>
            <Pressable
              style={{}}
              onPress={!isEdit ? handleEditInfo : undefined}
            >
              {!isEdit ? (
                <>
                  <Text style={{ fontSize: 24 }}>{currentTask.title}</Text>
                  <Text>{currentTask.description}</Text>
                </>
              ) : (
                <>
                  <TextInput
                    onChangeText={(value) => setTitle(value)}
                    placeholder="Task Name"
                    style={{
                      fontSize: 26,
                      backgroundColor: "transparent",
                      fontWeight: "bold",
                      width: "auto",
                    }}
                    defaultValue={currentTask.title}
                  />
                  <TextInput
                    onChangeText={(value) => setDescription(value)}
                    placeholder="Description"
                    style={{
                      fontSize: 16,
                      backgroundColor: "transparent",
                      fontWeight: "bold",
                      width: "auto",
                    }}
                    defaultValue={currentTask?.description}
                  />
                  {/* <View style={{flexDirection: 'row',justifyContent: 'flex-end'}}>
                    <ButtonList
                      isList={true}
                      isAllow={isAllow}
                      clickCancle={() => setEdit(false)}
                      clickSubmit={handleUpdateTask}/>
                  </View>
                   */}
                </>
              )}
            </Pressable>
          </View>
          <FormCalendar
            currentDay={state.date}
            onChange={(value: boolean) => setToday(value)}
            onClick={handleChooseDate}
            isToday={isToday}
          />
          <View style={{ flexDirection: "row", gap: 4 }}>
            <FormProject
              onclick={handleChooseProject}
              tag={state.tag}
              isInbox={currentTask.project.id === project.inbox?.id}
            />

            <FormPriority
              isList={true}
              onclick={handleChoosePriority}
              priority={state.priority}
              isDefault={false}
            />
            <TileTask>
              <Text
                style={{
                  paddingVertical: 4,
                  fontSize: 16,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  cursor: "pointer",
                }}
                onPress={() => handleToggleModel()}
              >
                <Text>Label</Text>
                <Text>
                  <IconMenu icon="add" />
                </Text>
              </Text>
              {isShow && (
                <LabelTaskList
                  onClick={handleCheckLabel}
                  labelSelect={labelSelect}
                  style={{
                    position: "absolute",
                    top: 40,
                    left: -50,
                    width: 200,
                    zIndex: 20,
                    paddingVertical: 4,
                    backgroundColor: `${sidebarMode[theme.mode]()}`,
                  }}
                />
              )}
            </TileTask>
          </View>
        </View>
        <View style={{ flexDirection: "row", gap: 2 }}>
          {!isShow && labelSelect.length > 0 && (
            <LabelListSelect setLabels={setSelected} labels={labelSelect} />
          )}
        </View>
      </Pressable>
    </Pressable>
  );
};

const BaseMoreInfo = ({
  label,
  className,
  children,
}: {
  label?: string;
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={{
        paddingVertical: 4,
        paddingHorizontal: 6,
      }}
    >
      {label && <TileTask>{label}</TileTask>}
      {children}
    </View>
  );
};
const TileTask = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => {
  return (
    <View
      style={{
        position: "relative",
        flexDirection: "row",
        alignItems: "center",
        gap: 2,
      }}
    >
      {children}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    position: "absolute", // Use 'absolute' for a similar effect as 'fixed'
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    height: 1000,
    zIndex: 10,
    justifyContent: "center",
    alignItems: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
export default DetaiTask;
