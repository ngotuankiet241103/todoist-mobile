import React from 'react';
import { Login } from './OAuth2';
import { View } from 'react-native';
import OAuth2Item from './OAuth2Item';
type LoginList = {
    list:  Login[]
}
const OAuth2List = (props: LoginList) => {
   const {list} = props
    return (
       <View >
        {list.length > 0 && list.map((item,index) => <OAuth2Item key={index} item={item}></OAuth2Item>)}
       </View>
    );
};

export default OAuth2List;