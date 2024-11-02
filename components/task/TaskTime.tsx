import { StyleSheet, Text, View } from "react-native";
import { months } from "../../constaints/month";
import useTheme from "../../hooks/useTheme";
import { textColor } from "../../utils/theme";
import { AntDesign } from "@expo/vector-icons";


const TaskTime = ({date} : {date: Date}) => {
    const {theme} = useTheme();
    const month = months[date.getMonth()];
    const day =  date.getDate();
    return (
       <>
        <View style={{flexDirection: 'row',gap: 1,alignItems: 'center'}}>
            <Text style={{color: `${textColor[theme.color]}`}}><AntDesign name="calendar" size={20} color={`${textColor[theme.color]}`} /></Text>
            <Text style={{color: `${textColor[theme.color]}`}}>{day}</Text>
            <Text style={{color: `${textColor[theme.color]}`}}>{month}</Text>
        </View>
       </>
    );
};
const styles = StyleSheet.create({
    
})
export default TaskTime;