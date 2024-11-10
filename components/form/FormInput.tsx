import React from 'react';
import { View } from 'react-native';

const FormInput = ({children} : {children: React.ReactNode}) => {
    return (
        <View style={{position: 'relative',paddingVertical: 2,paddingHorizontal: 1}} >
            {children}
        </View>
    );
};

export default FormInput;