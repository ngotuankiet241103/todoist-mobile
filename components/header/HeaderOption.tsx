import React from "react";
import { Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useDispatch } from "react-redux";
import { updateState } from "../../redux/reducer/stateSlice";
import { useSelector } from "react-redux";
import { state } from "../../redux/store";

const HeaderOption = () => {
  const dispatch = useDispatch();
  const handleOpenFilter = () => {
    dispatch(updateState({key: 'isFilter',value: true}))
  }
  console.log("view " +  useSelector((state: state) => state.status.isFilter));
  
  return (
    <View style={{ paddingRight: 20 }}>
      <Menu>
        <MenuTrigger>
          <Text style={{ fontSize: 26 }}>⋮</Text>
        </MenuTrigger>
        <MenuOptions>
         
         <MenuOption style={{padding: 10}} onSelect={handleOpenFilter} text="View" />
         <MenuOption style={{padding: 10}} onSelect={() => console.log("1")} text="Delete" />
         
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HeaderOption;
