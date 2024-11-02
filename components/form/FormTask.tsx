import { useCallback, useEffect, useRef, useState } from "react";
import FormCalendar, { Day } from "./FormCalendar";
import FormPriority, { priority } from "./FormPriority";
import FormProject, { SectionItem } from "./FormProject";
import { ProjectInfo } from "../../redux/reducer/projectSlice";
import requestApi from "../../helper/api";

import OtherForm from "./OtherForm";

import { Label } from "../../redux/reducer/labelSlice";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import BoxTitle from "./BoxTitle";

import ButtonList from "../button/ButtonList";
import useTask, { Data } from "../../hooks/useTask";
import { TaskResponse } from "../task/TaskItem";
import { UtilDate } from "../../utils/UtilsDate";
import useRender from "../../hooks/useRender";
import IconMenu from "../icon/IconMenu";
import {
  GestureResponderEvent,
  Keyboard,
  NativeSyntheticEvent,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  View,
} from "react-native";
import { Entypo, EvilIcons } from "@expo/vector-icons";
import { rgbaColor } from "react-native-reanimated/lib/typescript/reanimated2/Colors";
import useToggleAddTask from "../../hooks/useToggleAddTask";
type formTask = {
  isFixed?: boolean;
  visibile: boolean;
  onclick: () => void;
  task?: TaskResponse;
  isUpcoming?: string;
  isList: boolean;
};
export type Tag = {
  project?: ProjectInfo;
  section?: SectionItem;
};
export type Task = {
  title: string;
  description?: string;
  projectCode: string;
  sectionCode: string;
  labelCodes: string[];
  priorityCode: string;
  expiredAt: Date | null;
};

const FormTask = ({
  isFixed,
  visibile,
  onclick,
  task,
  isUpcoming,
  isList,
}: formTask) => {
  const [isKeyboardOpen, setKeyboardStatus] = useState(false);
  const { handleRender } = useRender();
  const inputTaskRef = useRef<TextInput>(null);
  const inputDesRef = useRef<TextInput>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const dateTask = task?.expiredAt
    ? new UtilDate(new Date(task.expiredAt))
    : isUpcoming
    ? new UtilDate(new Date(isUpcoming))
    : new UtilDate(new Date());
  const initialValue: Data = {
    date: {
      date: dateTask.getDate(),
      day: dateTask.getDay(),
      mark: dateTask.getMark(),
    },
    priority: task?.priority,
    tag: {
      project: task?.project,
      section: task?.section,
    },
  };
  const { isAddTask, handleToggleAddTask } = useToggleAddTask();
  const { state, setDate, setPriority, setTag, reset } = useTask(initialValue);
  const [isAllow, setAllow] = useState(!!task?.title);
  const [isToday, setIsToday] = useState(
    isUpcoming ? false : state.date?.mark === "Today"
  );
  const [isChooseLabel, setChooseLabel] = useState(false);
  const label = useSelector((state: state) => state.label);
  const [labelSelect, setSelected] = useState<Label[]>(task?.labels || []);
  const handleChooseDate = (date: Day) => {
    setDate(date);
  };
  const handleChoosePriority = useCallback((priority: priority) => {
    setPriority(priority);
  }, []);
  const handleChooseTag = (project?: ProjectInfo, section?: SectionItem) => {
    setTag({ project, section });
  };
  

  const commomCss = ` py-4`;
  function handleOnChange() {
    inputTaskRef.current && inputTaskRef.current?.value
      ? setAllow(true)
      : setAllow(false);
  }
  const handleAddTask = () => {
    if (!title) return;
    const projectCode = state.tag?.project?.code || "";
    const sectionCode = state.tag?.section?.code || "";
    const labelCodes = labelSelect.map((label) => label.code);
    const priorityCode = state.priority?.code || "";
    const expiredAt = state.date?.date || null;
    const task: Task = {
      title,
      description,
      projectCode,
      sectionCode,
      labelCodes,
      priorityCode,
      expiredAt,
    };
    console.log(task);
    addTask(task);
  };
  const addTask = async (data: Task) => {
    try {
      let response;
      if (task?.id) {
        response = await requestApi(`/tasks/${task.id}`, "PUT", data);
      } else {
        response = await requestApi("/tasks/add", "POST", data);
      }

      if (response.status === 200) {
        handleRender();
        reset();
        onclick();
        handleToggleAddTask()
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleKeyUp = (e: { nativeEvent: { key: string } }) => {
    if (e.nativeEvent.key === "@") {
      setChooseLabel(true);
    }
  };

  const handleChooseLabel = (label: Label) => {
    setChooseLabel(false);
    setSelected([...labelSelect, label]);
    renderLabel();
  };
  const renderLabel = () => {
    if (!title) return;

    const index = title.indexOf("@");

    console.log(index);
    if (index >= 0) {
      setTitle(title.replace("@", ""));
    }
  };
  useEffect(() => {
    if (inputTaskRef && inputTaskRef.current) {
      inputTaskRef.current.focus();
    }
  }, []);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        console.log("key open");

        setKeyboardStatus(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        console.log("key close");
        setKeyboardStatus(false);
      }
    );

    // Cleanup khi component bị huỷ bỏ
    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);
  const handleBlurForm = (event: GestureResponderEvent) => {
    event.preventDefault();
    if (isAddTask) {
      handleToggleAddTask();
    }
  };
  return (
    <>
      {visibile && (
        <Pressable
          onPress={handleBlurForm}
          style={isFixed ? styles.fixed : styles.default}
        >
          <Pressable
            onPress={(e) => e.preventDefault()}
            style={
              isFixed
                ? isKeyboardOpen
                  ? styles.keyboard
                  : styles.fixedChild
                : styles.defaultChild
            }
          >
            <View style={{ paddingVertical: 4 }}>
              <TextInput
                onKeyPress={handleKeyUp}
                onChangeText={(value) => setTitle(value)}
                ref={inputTaskRef}
                placeholder="Task Name"
                style={styles.inputTitle}
                defaultValue={task?.title}
              />
              <TextInput
                ref={inputDesRef}
                placeholder="Description"
                style={styles.description}
                onChangeText={(value) => setDescription(description)}
                defaultValue={task?.description}
              />
              <View
                style={{
                  flexDirection: "row",
                  gap: 8,
                  alignItems: "center",
                  paddingHorizontal: 6,
                }}
              >
                <View>
                  <FormCalendar
                    currentDay={state.date}
                    isToday={isToday}
                    onClick={handleChooseDate}
                    onChange={(value: boolean) => setIsToday(value)}
                  />
                </View>

                <View>
                  <FormPriority
                    priority={state.priority}
                    isDefault={true}
                    onclick={handleChoosePriority}
                    isList={isList}
                  />
                </View>
                {labelSelect.length > 0 && (
                  <LabelListSelect
                    setLabels={setSelected}
                    labels={labelSelect}
                  ></LabelListSelect>
                )}
                <View>
                  <OtherForm onclick={() => setChooseLabel(true)}></OtherForm>
                </View>
              </View>
            </View>
            <View
              style={{
                borderTopWidth: 2,
                paddingTop: 16,
                paddingBottom: 4,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <FormProject
                  onclick={handleChooseTag}
                  tag={state.tag}
                  isInbox={typeof task === "undefined"}
                />
              </View>
              <ButtonList
                isUpdated={!!task}
                isAllow={isAllow}
                clickCancle={handleToggleAddTask}
                clickSubmit={handleAddTask}
                isList={isList}
              />
            </View>
            {isChooseLabel && (
              <ListLabel
                onclick={handleChooseLabel}
                labels={
                  labelSelect.length > 0
                    ? filterLabel(label, labelSelect)
                    : label
                }
              />
            )}
          </Pressable>
        </Pressable>
      )}
    </>
  );
};
export const LabelListSelect = ({
  labels,
  setLabels,
}: {
  labels: Label[];
  setLabels: (data: Label[]) => void;
}) => {
  const handleRemoveLabel = (label: Label) => {
    const newArr = labels.filter((item) => item.id != label.id);
    setLabels(newArr);
  };
  return (
    <>
      {labels.length > 0 &&
        labels.map((label) => (
          <LabelItemSelect
            onClose={handleRemoveLabel}
            label={label}
            key={label.id}
         />
        ))}
    </>
  );
};
export const LabelItemSelect = ({
  label,
  onClose,
}: {
  label: Label;
  onClose: (label: Label) => void;
}) => {
  return (
    <>
      <View style={{padding: 4,flexDirection: 'row',alignItems: 'center'}}
      >
        <Text style={{fontSize: 18}}>{label.name}</Text>
        <Entypo name="bookmark" size={18} color="gray" />
      </View>
    </>
  );
};
const filterLabel = (labels: Label[], labelSelect: Label[]): Label[] => {
  return labels.filter((label) => !labelSelect.includes(label));
};
const ListLabel = ({
  labels,
  onclick,
}: {
  labels: Label[];
  onclick: (label: Label) => void;
}) => {
  const [selected, setSelected] = useState<Label>(labels[0]);
  const getSelected = (selectedId: number, idLabel: number) =>
    selectedId == idLabel;
  const handleMouseSelect = (label: Label) => {
    setSelected(label);
  };
  const handleClick = () => {
    onclick(selected);
  };
  return (
    <View
      style={{
        position: "absolute",
        top: 40,
        left: 0,
        right: 0,
        width: "auto",
      }}
    >
      <View style={styles.container}>
        {labels.length > 0 &&
          labels.map((label) => (
            <LabelItem
              onHover={handleMouseSelect}
              key={label.id}
              label={label}
              isSelected={getSelected(selected.id, label.id)}
              onclick={handleClick}
            ></LabelItem>
          ))}
      </View>
    </View>
  );
};
const LabelItem = ({
  isSelected,
  label,
  onHover,
  onclick,
}: {
  isSelected: boolean;
  label: Label;
  onHover: (label: Label) => void;
  onclick: () => void;
}) => {
  return (
    <Pressable
      style={
        isSelected
          ? { backgroundColor: "#D1D5DB" }
          : { padding: 4, flexDirection: "row", cursor: "pointer", gap: 4 }
      }
      onPressIn={() => onHover(label)}
      onPress={onclick}
    >
      <Text>
        <EvilIcons name="tag" size={20} color="black" />
      </Text>
      <Text>{label.name}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  fixed: {
    position: "absolute", // Equivalent to 'fixed'
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    zIndex: 80,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  default: {
    borderWidth: 1, // Equivalent to 'border'
    borderColor: "#D1D5DB", // Equivalent to 'border-gray-300'
    borderRadius: 8, // Approximate to 'rounded-lg'
  },
  fixedChild: {
    position: "absolute",
    top: 20,
    left: 0,
    right: 0,
    height: "auto", // Equivalent to 'h-[220px]'
    backgroundColor: "white", // Equivalent to 'bg-white'
    borderRadius: 8, // Equivalent to 'rounded-lg'
    shadowColor: "#4B5563", // Shadow color (Slate-600)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android shadow
    zIndex: 100, // Equivalent to 'z-[100]'
    padding: 8,

    // Add any additional styles from 'box-task' here if necessary
  },
  keyboard: {
    position: "absolute",
    top: 245,
    left: 0,
    right: 0,
    height: "auto", // Equivalent to 'h-[220px]'
    backgroundColor: "white", // Equivalent to 'bg-white'
    borderRadius: 8, // Equivalent to 'rounded-lg'
    shadowColor: "#4B5563", // Shadow color (Slate-600)
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5, // For Android shadow
    zIndex: 100, // Equivalent to 'z-[100]'
    padding: 8,
  },
  defaultChild: {
    width: "100%",
    paddingHorizontal: 8, // Equivalent to 'w-full'
    // Add any additional styles for the default state here
  },
  inputTitle: {
    fontSize: 26,
    fontWeight: "bold",
    backgroundColor: "transparent",
    width: "auto",
  },
  description: {
    width: "auto",
    fontSize: 16,
    backgroundColor: "transparent",
  },
  container: {
    width: "95%",
    marginHorizontal: "auto",
    backgroundColor: "white",
    borderRadius: 8,
    overflow: "hidden",
  },
});

export default FormTask;
