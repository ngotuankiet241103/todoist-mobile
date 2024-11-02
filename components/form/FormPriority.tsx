
import React, { useEffect} from "react";

import useOpenModal from "../../hooks/useOpenModal";
import { colorFlag, flag } from "../../constaints/flag";
import BoxTitle from "./BoxTitle";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";
import useTheme from "../../hooks/useTheme";
import { hoverMode, sidebarMode } from "../../utils/theme";
import IconMenu from "../icon/IconMenu";
import { Keyboard, Pressable, Text, View } from "react-native";
export type priority = {
  id: number;
  name: string;
  code: string;
  level: string;
};

type Priorities = priority[] | [];
type formPriority = {
  onclick: (priority: priority) => void;
  isDefault: boolean;
  priority: priority | undefined;
  isList: boolean,
};
const FormPriority = React.memo (({ onclick, isDefault, priority,isList }: formPriority) => {
  const priorities = useSelector((state: state) => state.priority);
 
  const { isShow, handleToggleModel } = useOpenModal(false);
  
  useEffect(() => {
    if (isDefault) {
      const priority = priorities.length > 0 &&  priorities.find(
        (priority) => priority.level === "default"
      ) || { id: 0, name: "priority", code: "priority", level: "default" };
      
      onclick(priority);
    }
  }, [priorities]);

  const handleClick = (priority: priority) => {
    onclick(priority);
    handleToggleModel();
  };

  return (
    <>
      <View style={{position: 'relative'}}>
        {priority && (
          
            <Pressable onPress={() => {
              Keyboard.dismiss();
              handleToggleModel();
            }} style={{flexDirection: 'row',alignItems: 'center',gap: 2,paddingHorizontal: 12,paddingVertical: 4,borderRadius: 8,borderWidth: 1,borderColor: '#fafafa'}} >
              <IconMenu icon={flag[`${priority.level}`]} color={colorFlag[`${priority.level}`]}/>
              <Text>{isList && priority.name}</Text>
            </Pressable>
         
        )}
        {isShow && (
          <PriorityList
            onclick={handleClick}
            priorities={priorities}
          ></PriorityList>
        )}
      </View>
    </>
  );
});
const PriorityList = ({
  priorities,
  onclick,
}: {
  priorities: Priorities;
  onclick: (priority: priority, isVisible?: boolean) => void;
}) => {
  const {theme} = useTheme();
  return (
    <>
      <View style={{
        position: 'absolute',
        width: 120,
        zIndex: 20,
        top: 40,
        left: 0,
        backgroundColor: `${sidebarMode[theme.mode]()}`,
        borderRadius: 8
      }}>
        {priorities.length > 0 &&
          priorities.map((priority) => (
            <PriorityItem
              onClick={() => onclick(priority)}
              id={priority.id}
              key={priority.id}
              name={priority.name}
              level={priority.level}
              code={priority.code}
            ></PriorityItem>
          ))}
      </View>
    </>
  );
};
type priorityItem = priority & {
  onClick: () => void;
};
const PriorityItem = ({ name, level, onClick }: priorityItem) => {
  const {theme} = useTheme();
  return (
    <>
      <Pressable
        style={{
          paddingVertical: 4,
          paddingHorizontal: 2,
          flexDirection: 'row',
          gap: 2,
          alignItems: 'center'
        }}
        
        onPress={onClick}
      >
        <IconMenu icon={flag[`${level}`]} color={colorFlag[`${level}`]}></IconMenu>
       
        <Text>
          {name}
        </Text>
      </Pressable>
    </>
  );
};

export default FormPriority;
