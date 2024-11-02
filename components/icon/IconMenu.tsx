import { Ionicons } from "@expo/vector-icons";
import { StyleProp, Text, TextStyle } from "react-native";


const IconMenu = ({icon, style,onClick,color} : {icon: string,style?: StyleProp<TextStyle>,onClick?:() => void,color?: string}) => {
    return (
        <Text style={{fontSize: 14,...style}}   onPress={onClick ? onClick : undefined}>
            <Ionicons style={{...style}}  name={icon} size={14} color={color || 'black'} />
        </Text>
    );
};

export default IconMenu;