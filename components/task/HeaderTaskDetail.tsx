import { Entypo, EvilIcons } from "@expo/vector-icons";
import React from "react";
import { Text, View } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

const HeaderTaskDetail = ({ onEdit }: { onEdit: () => void }) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <Menu>
        <MenuTrigger>
          <Entypo name="dots-three-horizontal" size={24} color="gray" />
        </MenuTrigger>
        <MenuOptions>
          <MenuOption
            style={{ padding: 10 }}
            onSelect={onEdit}
            text="Edit"
            
          />
          <MenuOption
            style={{ padding: 10 }}
            onSelect={() => console.log("1")}
            text="Delete"
          />
        </MenuOptions>
      </Menu>
    </View>
  );
};

export default HeaderTaskDetail;
