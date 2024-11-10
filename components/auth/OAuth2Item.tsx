import { Pressable, View } from "react-native";
import { Login } from "./OAuth2";
import { Image } from "react-native";
import { Text } from "react-native";
import { WebView } from "react-native-webview";
import { useState } from "react";
const OAuth2Item = (props: { item: Login }) => {
  const { item } = props;
  const [isLogin, setLogin] = useState(false);
  const GoogleLoginWebView = () => setLogin(true);
  console.log(item.url);
  
  return (
    <View>
      {isLogin ? (
        <WebView
          source={{ uri: item.url }}
          onNavigationStateChange={(navState) => {
            if (navState.url.includes("redirect_uri_after_login")) {
              // Lấy token và xử lý sau khi đăng nhập thành công
            }
          }}
        />
      ) : (
        <Pressable
          onPress={GoogleLoginWebView}
          style={{
            flexDirection: "row",
            justifyContent: "center",
            paddingVertical: 10,
            alignItems: "center",
            gap: 4,
            borderRadius: 10,
            borderWidth: 1,
            borderColor: "gray",
            marginBottom: 4,
          }}
        >
          <Image style={{ width: 26, height: 26 }} source={item.icon} />
          <Text style={{ fontWeight: "bold" }}>{item.item}</Text>
        </Pressable>
      )}
    </View>
  );
};

export default OAuth2Item;
