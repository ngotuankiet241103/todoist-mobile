import { Feather } from '@expo/vector-icons';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
import useTheme from '../../hooks/useTheme';
import { textColor } from '../../utils/theme';

const HeaderEditTask = ({isAllow,onBack,onSubmit} : {isAllow: boolean,onBack: () => void,onSubmit: () => void}) => {
    const {theme} = useTheme()
    return (
        <View style={{flexDirection: 'row',justifyContent: 'space-between'}}>
            <Pressable onPress={onBack} style={{flexDirection: 'row',gap: 2}}>
                <Feather name="arrow-left" size={24} color="black" />
                <Text>Edit task</Text>
            </Pressable>
            <Text onPress={isAllow ? onSubmit : undefined} style={{color: isAllow ? `${textColor[theme.color]}` : '#ccc'}}>
                Save
            </Text>
        </View>
    );
};

export default HeaderEditTask;