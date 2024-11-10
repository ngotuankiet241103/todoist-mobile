import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from '../../screen/LoginScreen';
import LoginForm from './LoginForm';
const Stack = createNativeStackNavigator();
const AuthEmail = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Authentication">
            <Stack.Screen name="Authentication" component={LoginScreen} />
            <Stack.Screen name="Login" component={LoginForm} />
            <Stack.Screen name="SignUp" component={LoginScreen} />
           
            </Stack.Navigator>
      </NavigationContainer>
    );
};

export default AuthEmail;