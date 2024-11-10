import React from 'react';

import { Image, View } from 'react-native';
import calendar from '../../assets/calendar.png';
const BaseAuthPage = ({children} : {children: React.ReactNode}) => {
    // const getImage = (imageName: string) => {
    //     return require(`./assets/${imageName}`);
    //   };
    return (
        <View style={{padding: 4}} >
            <View style={{}}>
                <Image style={{width: 'auto',height: 400}}   source={calendar}/>
                
           </View>
            <View>

                {children}
            </View>
           
        </View>
    );
};

export default BaseAuthPage;