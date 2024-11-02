import { useState } from "react";
import { Label } from "../../redux/reducer/labelSlice";
import useTheme from "../../hooks/useTheme";
import { hoverMode, textColor } from "../../utils/theme";
import { Pressable, Text, View } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Checkbox } from "react-native-paper";


type LabelTaskItem = {
  className?: string;
  label: Label;
  isSelected: boolean;
  index: number;
  onClick: (label: Label, index: number, isExist: boolean) => void;
};
const LabelTaskItem = ({
  label,
  className,
  isSelected,
  index,
  onClick,
}: LabelTaskItem) => {
  const [isCheck, setCheck] = useState(isSelected);
  const { theme } = useTheme();
  const handleCheckLabel = (label: Label, index: number, isExist: boolean) => {
    onClick(label, index, isExist);
    setCheck(!isCheck);
  };
  return (
    <Pressable
      style={{
        backgroundColor: "transparent",
        padding: 4,
        flexDirection: "row",
        justifyContent: "space-between",
      }}
     
      onPress={() => handleCheckLabel(label, index, isCheck)}
    >
      <View style={{flexDirection: 'row',gap: 2}} >
        <AntDesign name="tago" size={24} color="black" />
        <Text>{label.name}</Text>
      </View>
      <Checkbox
      status={isCheck ? 'checked' : 'unchecked'}
        color={`${textColor[theme.color]}`}
    
      />
    </Pressable>
  );
};

export default LabelTaskItem;
