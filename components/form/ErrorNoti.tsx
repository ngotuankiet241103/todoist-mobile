import { Text } from "react-native";

const ErrorNoti = ({message } : {message:string | undefined}) => {
    return (
    
       <Text style={{color: 'red',paddingHorizontal: 4}}>{message}</Text>
    );
};

export default ErrorNoti;