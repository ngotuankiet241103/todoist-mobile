import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import React from "react";
import HomeScreen from "./screen/HomeScreen";
import UpcomingScreen from "./screen/UpcomingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuProvider,
  MenuTrigger,
} from "react-native-popup-menu";
import HeaderOption from "./components/header/HeaderOption";
import useTheme from "./hooks/useTheme";
import { textColor } from "./utils/theme";
const Tab = createBottomTabNavigator();
type menu = {
  name: string;
  component: () => React.JSX.Element;
};
const menus: menu[] = [
  {
    name: "Today",
    component: HomeScreen,
  },
  {
    name: "Upcoming",
    component: UpcomingScreen,
  },
];
export default function App() {
  return (
    <MenuProvider>
      <Provider store={store}>
        <CustomApp />
      </Provider>
    </MenuProvider>
  );
}
const CustomApp = () => {
  const { theme } = useTheme();
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === "Today") {
              iconName = focused ? "today" : "today-outline"; // Icon for Home
            } else if (route.name === "Upcoming") {
              iconName = focused ? "calendar" : "calendar-outline"; // Icon for Settings
            }

            // Return the icon component
            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: `${textColor[theme.color]}`, // Color of active tab
          tabBarInactiveTintColor: "gray", // Color of inactive tab
        })}
      >
        {menus.map((menu, index) => (
          <Tab.Screen
            key={index}
            name={menu.name}
            options={({ navigation }) => ({
              headerRight: HeaderOption,
            })}
            component={menu.component}
            initialParams={{}}
          />
        ))}
      </Tab.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
