import React from 'react';
import BoxTitle from './BoxTitle';
import useOpenModal from '../../hooks/useOpenModal';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import IconMenu from '../icon/IconMenu';
import { AntDesign, Entypo } from '@expo/vector-icons';

const OtherForm = ({onclick}: {onclick: () => void}) => {
    const {isShow,handleToggleModel} = useOpenModal(false);
    return (
        <View style={{position: 'relative'}} >
            <BoxTitle isBorder={true} style={{padding: 4}}  onClick={() => handleToggleModel()}>
                <Entypo name="dots-three-horizontal" size={20} color="black" />
            </BoxTitle>
            {isShow && <ListOtherForm onClick={onclick}/>}
        </View>
    );
};
const ListOtherForm = ({onClick}:{onClick: () => void}) => {
    return (
        <View style={styles.container}>
            <View style={{
                paddingVertical: 4,
                borderRadius: 8,
                paddingHorizontal: 2,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Pressable style={{flexDirection: 'row',gap: 2,paddingHorizontal: 8}} onPress={onClick}>
                    <AntDesign name="tago" size={20} color="gray" />
                    <Text>Label</Text>
                </Pressable>
                <Text>@</Text>
            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
      position: 'absolute', // Equivalent to 'absolute'
      width: 300, // Equivalent to 'w-[300px]'
      paddingVertical: 8, // Equivalent to 'py-2' (8 pixels)
      paddingHorizontal: 4, // Equivalent to 'px-1' (4 pixels)
      zIndex: 50, // Equivalent to 'z-50'
      left: 0, // Equivalent to 'left-0'
      top: 40, // Equivalent to 'top-[40px]'
      borderRadius: 8, // Equivalent to 'rounded-lg'
      backgroundColor: 'white', // Equivalent to 'bg-white'
      // Add any additional styles from 'box-calen' here if necessary
    },
  });
export default OtherForm;