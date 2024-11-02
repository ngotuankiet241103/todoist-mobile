import { Text, View } from 'react-native';
import { Label } from '../../redux/reducer/labelSlice';
import { AntDesign } from '@expo/vector-icons';

const TaskLabelItem = ({label} : {label: Label}) => {
    return (
        <View style={{flexDirection: 'row',alignItems: 'center'}} >
            <Text style={{marginRight: 2}}><AntDesign name="tago" size={20} color="black" /></Text >
            <Text >{label.name}</Text>
        </View>
    );
};

export default TaskLabelItem;