import { StatusBar } from "expo-status-bar";
import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { NavigationContainer } from "@react-navigation/native";

import React, { FC, useLayoutEffect } from "react";
import HomeScreen from "./screen/HomeScreen";
import UpcomingScreen from "./screen/UpcomingScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { state, store } from "./redux/store";
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
import SearchPage, { SearchPageProps } from "./screen/SearchScreen";
import AuthEmail from "./components/auth/AuthEmail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./screen/LoginScreen";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import CreateName from "./components/auth/CreateName";
import { useDispatch } from "react-redux";
import userThunk from "./redux/thunk/userThunk";
import { useSelector } from "react-redux";
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();
type menu = {
  name: string;
  component: FC<any>;
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
  {
    name: "Search",
    component: SearchPage,
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
  const dispatch = useDispatch();
  const { isLogin } = useSelector((state: state) => state.user);
  useLayoutEffect(() => {
    dispatch(userThunk());
  }, []);
  return (
    <>
      {isLogin ? (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Authentication">
            <Stack.Screen name="Authentication" component={LoginScreen} />
            <Stack.Screen name="Login" component={LoginForm} />
            <Stack.Screen name="SignUp" component={SignUpForm} />
            <Stack.Screen name="CreateName" component={CreateName} />
            
          </Stack.Navigator>
        </NavigationContainer>
      ) : (
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              name="Home"
              component={Home}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      )}
    </>
  );
};
const Home = () => {
  const { theme } = useTheme();
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Today") {
            iconName = focused ? "today" : "today-outline"; // Icon for Home
          } else if (route.name === "Upcoming") {
            iconName = focused ? "calendar" : "calendar-outline"; // Icon for Settings
          } else if (route.name === "Search") {
            iconName = focused ? "search" : "search"; // Icon for Settings
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
