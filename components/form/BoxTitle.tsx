import React from 'react';
import useTheme from '../../hooks/useTheme';
import { hoverMode } from '../../utils/theme';
import { Pressable, StyleProp, Text, ViewStyle } from 'react-native';
type BoxTile = {
    isBorder: boolean,
    onClick?: () => void,
    style?: StyleProp<ViewStyle>
    children: React.ReactNode
}
const BoxTitle = ({isBorder,style,onClick,children}: BoxTile ) => {
    const {theme} = useTheme();
    return (
        <Pressable
        style={{paddingVertical:4,paddingHorizontal: 2,borderColor: isBorder ? '#9CA3AF' : 'transparent',flexDirection: 'row',gap: 4,alignContent: 'center',...style}}
        onPress={onClick ? () => onClick() : undefined}>
            <Text>{children}</Text>
        </Pressable>
    );
};

export default BoxTitle;