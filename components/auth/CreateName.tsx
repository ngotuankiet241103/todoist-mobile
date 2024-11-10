import React, { useState } from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import BaseAuthPage from './BaseAuthPage';
import ErrorNoti from '../form/ErrorNoti';
import { primary } from '../../utils/theme';
import requestApi from '../../helper/api';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/reducer/userSlice';

const CreateName = ({route,navigation}) => {
    const [isSubmitting,setSubmitting] = useState(false);

    const [error,setError] = useState("");
    const [name,setName] = useState("");
    const dispatch = useDispatch();
    const handleUpdateInfo = async () => {
        if(!name){
            setError("Field is required")
            return;
        }
        try {
            
            const data : {name: string} = {
                name
            }
            setSubmitting(true);
            const response = await requestApi("/users/profile/name","POST",data);
            console.log(response);
            if(response.status === 200){
                dispatch(setUser({userInfo: response.data}))
            }
            
           
            
        } catch (error) {
            console.log(error);
            
        }
    }
    return (
        <BaseAuthPage>
            <View style={{flexDirection: 'column',gap: 4}} >
                <Text style={{fontSize: 28,fontWeight: 'bold',marginBottom: 10}}>Create your name</Text>
                <Text>Please enter your name</Text>
                <TextInput onChangeText={(value) => setName(value)} placeholder='Enter your name' style={{paddingHorizontal: 4,borderRadius: 8, borderWidth: 1,borderColor: 'gray',paddingVertical: 2}}/>

                {error && <ErrorNoti message={error}></ErrorNoti>}
                <Pressable  onPress={handleUpdateInfo}>
                    <Text  style={{paddingVertical: 8,paddingHorizontal: 2,backgroundColor: primary,color: '#fff',borderWidth: 1,textAlign: 'center',borderColor: 'gray',borderRadius: 8}}>Contune</Text>
                </Pressable>
                
            </View>
          
        </BaseAuthPage>
    );
};

export default CreateName;