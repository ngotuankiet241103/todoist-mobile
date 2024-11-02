import { Pressable, Text, View } from "react-native";
import useTheme from "../../hooks/useTheme";
import { bgColor } from "../../utils/theme";
import { AntDesign, Feather } from "@expo/vector-icons";

type ButtonList = {
    clickCancle: () => void,
    clickSubmit: () => void,
    isAllow: boolean
    isUpdated?: boolean
    isList: boolean;
    
}
const ButtonList = ({clickCancle,clickSubmit,isAllow,isUpdated,isList}: ButtonList) => {
  const {theme} = useTheme();
  return (
    <View style={{flexDirection: 'row',gap: 8}} >
      <Pressable
        style={{
          paddingVertical: isList ? 8 : 4,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: '#e5e7eb'
        }}
      
        onPress={clickCancle}
      >
         <AntDesign name="close" size={20} color="black" />
       
      </Pressable>
      <Pressable
        style={{
          paddingVertical: isList ? 8 : 8,
          paddingHorizontal: 12,
          borderRadius: 8,
          backgroundColor: `${bgColor[theme.color]}`,
          cursor: !isAllow ?  'auto' : 'pointer'
        }}
      
        onPress={clickSubmit}
      >
        <Text style={{fontSize: isList ? 16 : 20,color: '#fff'}}> 
          {isUpdated ? "Save" : <Feather name="send" size={20} color="#fff" />}
          </Text>
       
      </Pressable>
      {/* <button
        className={`${isList ? 'px-4 text-[16px] ': 'px-2 text-[20px]'} py-1 rounded-lg ${bgColor[theme.color]} text-white  ${
          !isAllow ? `cursor-not-allowed opacity-50` : `cursor-pointer`
        }`}
        onClick={clickSubmit}
      >
        
      </button> */}
    </View>
  );
};

export default ButtonList;
