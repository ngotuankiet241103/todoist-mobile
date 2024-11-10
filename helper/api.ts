import axios, { ResponseType } from "axios";
import { env } from "./env";
import * as Keychain from 'react-native-keychain';
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function requestApi<T>(endpoint:string,method:string,body?:T,isRedirect = false,responseType : ResponseType = "json",header?: {"Content-type": string}){
    const url = env.EXPO_PUBLIC_URL_FONTEND;
    const api : string = env.EXPO_PUBLIC_API;
    let headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
        'Access-Control-Allow-Credentials': 'true'
        
    };
    console.log(url);
    console.log(api+endpoint);
    
    
    if(header) {
        headers = {
            ...headers,
            ...header
        }
    }
    const instance = axios.create({headers})
    // check endpoint api 
    if(endpoint !== '/login' && endpoint !== '/register' && !endpoint.includes("/register/confirm") ){
        // add token when call request api
        instance.interceptors.request.use(
           async  (config) => {
                    const token = JSON.parse(await AsyncStorage.getItem("accessToken") ?? "");
                
                if(!token && isRedirect){
                    const url = window.location.pathname;
                    const param = encodeURIComponent(url);
                    window.location.href = env.EXPO_PUBLIC_URL_FONTEND + `/auth/login?success_page=${param}`;
                }
                console.log("token" + token);
                if(token) {
                    config.headers['Authorization'] = `Bearer ${token}`
                }
                return config;
            },
            (error) => {
                return Promise.reject(error)
            }
        )
        // handle response when token expired
        instance.interceptors.response.use(
            (response) => response,
            async (error) => {
                const originalConfig = error.config
                console.log(error);
                console.log(error.response.status === 401);
                if( error.response.status === 401){
                    
                    try {
                      
                        const refeshToken = JSON.parse(await AsyncStorage.getItem("refreshToken") ?? "");
                        const data = {
                            refresh_token: refeshToken
                        }
                        if(refeshToken && isRedirect){
                            window.location.href = url + "/auth/login";
                        }
                        const response = await axios.post(`${api}/refresh-token`,data)
                        if(response.status === 200){

                            setToken(response.data);
                        }
                        return instance(originalConfig)
                    } catch (error) {
                        console.log(error);
                        
                        
                       

                        return Promise.reject(error);
                    }
                }
                return Promise.reject(error);
            }
        )
    }
   
    return instance.request(
        {
            method,
            url: `${api}${endpoint}`,
            data: body,
            responseType
        }
    )
}
export type Token = {
    access_token: string | null,
    refresh_token: string | null
}
export const setToken = async (token : Token) => {
    try {
        if(!token.access_token || !token.refresh_token) return;
         AsyncStorage.setItem('accessToken', JSON.stringify(token.access_token) );
         AsyncStorage.setItem('refreshToken', JSON.stringify(token.refresh_token));
        console.log('Tokens stored successfully');
      } catch (error) {
        console.log('Could not store tokens', error);
      }
}

export function getCookieValue(key:string) {
	// Tách chuỗi cookie thành mảng các cặp key-value
	const cookies = document.cookie.split(";");
	console.log(cookies);
	// Duyệt qua mảng cookies
	for (let i = 0; i < cookies.length; i++) {
		// Tách từng cặp key-value
		const cookie = cookies[i].split("=");

		// Lấy key và value
		const cookieKey = cookie[0].trim();
		const cookieValue = cookie[1];

		// Kiểm tra xem key có trùng với key mong muốn không
		if (cookieKey === key) {
			// Trả về giá trị tương ứng với key
			return cookieValue;
		}
	}

	// Trả về undefined nếu không tìm thấy key
	return undefined;
}
export function deleteToken(){
    localStorage.removeItem("access_token")
    deleteCookie("refresh_token")
}
function deleteCookie(name:string) {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}
export const methodPost = async <T>(endpoint: string,data : T ) => {
    const headers = {
        "Accept": "application/json",
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*"
    };
    const config = {
        headers
    }
    console.log(`${env.EXPO_PUBLIC_API}${endpoint}`);
    
    const response = await axios.post(`${env.EXPO_PUBLIC_API}${endpoint}`,JSON.stringify(data),config);
    return response;
    

}
export async function updateMethod<T>(url: string, value: T)  {
    try {
      
      const response = await requestApi(url, "PUT", value);
      return response;

      
    } catch (error) {
      console.log(error);
    }
  }
  export async function postMethod<T>(url: string, value: T)  {
    try {
      
      const response = await requestApi(url, "POST", value);
      return response;

      
    } catch (error) {
      console.log(error);
    }
  }
  export async function deleteMethod<T>(url: string, value: T)  {
    try {
      
      const response = await requestApi(url, "DELETE", value);
      return response;

      
    } catch (error) {
      console.log(error);
    }
  }