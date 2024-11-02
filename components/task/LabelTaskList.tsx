import React, { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import LabelTaskItem from "./LabelTaskItem";
import { Label, updateLabel } from "../../redux/reducer/labelSlice";
import requestApi from "../../helper/api";
import { useDispatch } from "react-redux";
import { Pressable, StyleProp, Text, TextInput, View, ViewStyle } from "react-native";

type LabelTaskList = {
  style?: StyleProp<ViewStyle>;
  labelSelect: Label[];
  onClick: (label: Label, index: number, isExist: boolean) => void;
};
const LabelTaskList = ({ style, labelSelect, onClick }: LabelTaskList) => {
  const [input, setInput] = useState("");
  const labels = useSelector((state: state) => state.label);
  const [labelCreated, setLabelCreated] = useState("");
  const dispatch = useDispatch();
  const [labelCurrent, setLabelCurrent] = useState<Label[]>(labels);

  const handleFindLabel = (value: string) => {
    const arr = labels.filter((label) => label.name.includes(value));
    if (arr.length < 1) {
      setLabelCurrent(labels);
      setLabelCreated(value);
    } else {
      setLabelCreated("");
      setLabelCurrent(arr);
    }
  };
  const createLabel = async (value: string) => {
    try {
      const response = await requestApi("/labels/add", "POST", { name: value });
      if (response.status === 200) {
        
        dispatch(updateLabel(response.data));
        setLabelCreated("");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Pressable
      style={style ? {...style}:  { paddingVertical: 2, borderRadius: 12, }}
      onPress={(e) => e.stopPropagation()}
    >
      <View style={{ paddingHorizontal: 4, marginBottom: 4 }}>
        <TextInput
          style={{
            paddingHorizontal: 4,
            paddingVertical: 2,
            borderWidth: 1,
            borderColor: "#A1A1A1",
            backgroundColor: "transparent",
          }}
          onChangeText={(e) => handleFindLabel(e.trim())}
          placeholder="Type a label"
        />
      </View>
      {labelCurrent.length > 0 &&
        labelCurrent.map((label, index) => (
          <LabelTaskItem
            index={index}
            onClick={onClick}
            isSelected={selectedLabel(labelSelect, label.id)}
            key={label.id}
            label={label}
          ></LabelTaskItem>
        ))}
      {labelCreated && (
        <Text
            style={{paddingHorizontal: 4,cursor: 'pointer'}}
        
          onPress={() => createLabel(labelCreated)}
        >
          Create + "{labelCreated}
        </Text>
      )}
    </Pressable>
  );
};
const selectedLabel = (labelSelect: Label[], id: number): boolean => {
  console.log(labelSelect);
  console.log(id);

  return labelSelect.some((label) => label.id === id);
};
export default LabelTaskList;
