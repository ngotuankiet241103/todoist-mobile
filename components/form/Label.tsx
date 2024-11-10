import React from 'react';
import { StyleProp, Text, TextStyle } from 'react-native';
type Label = {
    style?: StyleProp<TextStyle>,
    htmlfor: string,
    children: React.ReactNode | string
}
const Label = ({style,htmlfor,children}:Label) => {
    return (
        <Text style={style}>{children}</Text>
    );
};

export default Label;