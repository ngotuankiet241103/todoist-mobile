
import OAuth2List from './OAuth2List';
import google from '../../assets/google.png'
import facebook from '../../assets/facebook.png'
import { env } from '../../helper/env';
import { View } from 'react-native';

export type Login = {
    url: string,
    item: string
    icon: string
}

const list: Login[] = [
    {url: generateUrl(env.EXPO_PUBLIC_LOGIN,"google",env.EXPO_PUBLIC_REDICRECT_LOGIN),item: `Connect with google`,icon: `${google}`},
    {url: generateUrl(env.EXPO_PUBLIC_LOGIN,"facebook",env.EXPO_PUBLIC_REDICRECT_LOGIN),item: `Connect with facebook`,icon: `${facebook}`}
    
]
function generateUrl(urlLogin?: string,provider?:string,url_redirect?: string) : string{
    return `${urlLogin}/${provider}?redirect_uri=${url_redirect}`
}
const OAuth2 = () => {
    
    
    return (
        <View>
            <OAuth2List list={list}></OAuth2List>
        </View>
    );
};

export default OAuth2;