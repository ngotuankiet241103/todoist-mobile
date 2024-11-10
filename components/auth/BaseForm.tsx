import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import FormInput from '../form/FormInput';
import Label from '../form/Label';
import Input from '../form/Input';
import { methodPost, postMethod, setToken } from '../../helper/api';
import { primary } from '../../utils/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch } from 'react-redux';
import userThunk from '../../redux/thunk/userThunk';
type auth = {
    email?: string,
    password?: string
}
type errorAuth = auth
const BaseForm = ({isLogin,route,navigation} : {isLogin: boolean,route: any,navigation: any}) => {
    const [data,setData] = useState<auth>({})
    const [errors,setErrors] = useState<errorAuth>({})
    const dispatch = useDispatch();
    const handleSubmit = async  () => {
        console.log(data);
        
        if(!data.email || !data.password){
            if(!data.email){
                setErrors({...errors,email: "Field is required"});
            }
            if(!data.password){
                setErrors({...errors,password: "Field is required"});
            }
            return;
        }
        setErrors({})
        try {
            const response = await methodPost(isLogin ? `/auth/login` : `/auth/sign-up`, data);
            
            if(response && response.status == 200){
                
                setToken(response.data);
                if(isLogin)
                dispatch(userThunk());
                else
                navigation.navigate("CreateName")
                
                
                   
               
            } 
            
        } catch (error) {
            console.log(error);
            
        }
    }    
    return (
        <View style={{paddingHorizontal: 8}}>
            <View>
                <View style={{marginBottom: 10,}}>
                    <FormInput>
                    <Label htmlfor="password" style={{paddingHorizontal:1,paddingVertical: 2}}>Email</Label>
                        <TextInput onChangeText={(value) => setData({...data,email: value})} placeholder='Enter your email' style={{paddingHorizontal: 4,borderRadius: 8, borderWidth: 1,borderColor: 'gray',paddingVertical: 2}}/>
                        
                    </FormInput>
                    {/* {errors.email && <ErrorNoti message={errors.email?.message}></ErrorNoti>} */}
                </View>
                <View style={{marginBottom: 10}}>
                    <FormInput>
                        <Label htmlfor="password" style={{paddingHorizontal:1,paddingVertical: 2}}>Password</Label>
                        <TextInput onChangeText={(value) => setData({...data,password: value})} placeholder='Enter your password' style={{paddingHorizontal: 4,borderRadius: 8, borderWidth: 1,borderColor: 'gray',paddingVertical: 2}}/>
                    </FormInput>
                    {/* {errors.password && <ErrorNoti message={errors.password?.message}></ErrorNoti>} */}
                </View>
                <Pressable  onPress={handleSubmit}>
                    <Text  style={{paddingVertical: 8,paddingHorizontal: 2,backgroundColor: primary,color: '#fff',borderWidth: 1,textAlign: 'center',borderColor: 'gray',borderRadius: 8}}>{isLogin ? 'Login' : 'Sign up'}</Text>
                </Pressable>
                
            </View>
        </View>
    );
};

export default BaseForm;