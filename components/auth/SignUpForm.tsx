import React from 'react';
import { View } from 'react-native';
import BaseForm from './BaseForm';

const SignUpForm = ({route,navigation}) => {
    return (
       <View>
        <BaseForm isLogin={false} route={route} navigation={navigation}/>
       </View>
    );
};

export default SignUpForm;