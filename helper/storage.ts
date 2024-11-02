
import AsyncStorage from '@react-native-async-storage/async-storage';
export const expand_key = "isExpand";
const storage = {
  set: async <T>(key: string,value: T) =>{ 
    AsyncStorage.setItem(key,JSON.stringify(value));
  },
  get: async function<T>(key: string) : T {
    try {
      const value  = await AsyncStorage.getItem(key);

      return value ? JSON.parse(value) : "";
    } catch (error) {
      console.log(error);
      
    }
  }
};

export default storage;