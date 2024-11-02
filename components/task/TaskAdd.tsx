import { useRef } from "react";
import useTheme from "../../hooks/useTheme";
import { bgColor, primary, textColor } from "../../utils/theme";
import { state } from "../../redux/store";
import { useSelector } from "react-redux";
import { Pressable, StyleSheet, Text, View } from "react-native";
import IconMenu from "../icon/IconMenu";

const TaskAdd = ({
  className,
  onclick,
  isFixed,
}: {
  className?: string;
  onclick: () => void;
  isFixed: boolean;
}) => {
  const { theme } = useTheme();
  const isDragging = useSelector((state: state) => state.status.isDragging);
  const buttonAddTask = useRef(null);

  // const getElement = () => {
  //     if(buttonAddTask.current){

  //         const element = buttonAddTask.current;
  //         const iconTaskButton  : HTMLSpanElement | null = element.querySelector('.icon-task-button');
  //         const contentTaskButton : HTMLSpanElement | null = element.querySelector('.content-task-button');
  //         if(iconTaskButton && contentTaskButton){
  //             return {
  //                 element,iconTaskButton,contentTaskButton
  //             }
  //         }

  //     }
  //     return null;
  // }
  // const handleHoverButton = () => {
  //     if(isDragging){
  //         return;
  //     }
  //     const elements = getElement();
  //     if(elements){
  //         const {element,iconTaskButton,contentTaskButton} = elements;
  //         element.classList.add('transition-all');
  //         iconTaskButton.classList.add('text-white');
  //         iconTaskButton.classList.add(`${bgColor[theme.color]}`);
  //         contentTaskButton.classList.add(`${textColor[theme.color]}`);
  //     }
  // }
  // const handleHoverOutButton = () => {
  //     if(isDragging){
  //         return;
  //     }
  //     const elements = getElement();
  //     if(elements){
  //         const {element,iconTaskButton,contentTaskButton} = elements;
  //         element.classList.add('transition-all');
  //         iconTaskButton.classList.remove('text-white')
  //         iconTaskButton.classList.add(`${textColor[theme.color]}`);
  //         iconTaskButton.classList.remove(`${bgColor[theme.color]}`);
  //         contentTaskButton.classList.remove(`${textColor[theme.color]}`);
  //     }
  // }
  return (
    <Pressable
      ref={buttonAddTask}
      style={isFixed ? styles.taskAdd :  {
        marginBottom: 4,
        flexDirection: "row",
        paddingVertical: 4,
        cursor: "pointer",
      }}
      onPress={onclick}
    >
      <Text
        style={{
          fontWeight: 'bold',
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          color: `${textColor[theme.color]}`,
          
        }}
      >
        <IconMenu icon="add" style={{fontWeight: 'bold',fontSize: 24}}  color={isFixed ? "#fff" : ""}/>
      </Text>
     {!isFixed &&  <Text style={{ color: "#ccc", fontWeight: "bold" }}>Add</Text>}
    </Pressable>
  );
};
const styles = StyleSheet.create({
  taskAdd: {
    position: 'absolute', // Đặt vị trí tuyệt đối
    bottom: 120,          // Khoảng cách từ đáy
    right: 30,  
    height: 52,
    width: 52,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: primary
  },
  text: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
  },
});
export default TaskAdd;
