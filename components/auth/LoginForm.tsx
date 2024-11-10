import React from 'react';
import { View } from 'react-native';
import BaseForm from './BaseForm';

const LoginForm = ({route,navigation}) => {
    return (
        <View>
           <BaseForm route={route} navigation={navigation} isLogin/>
        </View>
    );
};

export default LoginForm;