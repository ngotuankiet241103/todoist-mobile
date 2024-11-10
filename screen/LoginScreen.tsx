import React, { useState } from 'react';
import { Text, View } from 'react-native';
import BaseAuthPage from '../components/auth/BaseAuthPage';
import OAuth2 from '../components/auth/OAuth2';
import { Menu, MenuOption, MenuOptions, MenuTrigger } from 'react-native-popup-menu';
import { Fontisto } from '@expo/vector-icons';

const LoginScreen = ({route,navigation}) => {
    const [isSubmitting,setSubmitting] = useState(false);
    
   
  
    // const redirect = useNavigate();
    
    // const handleLogin  = async (value : FormData)   => {
    //     try {
    //         setSubmitting(true);
    //         console.log(value);
            
    //         console.log(JSON.stringify(value));
            
    //         const response = await methodPost("/auth/login",value);
    //         console.log(response);
            
    //         if(response.status === 200){
    //             const token : Token = response.data;
    //             setToken(token)
    //             console.log(param);
    //             toastMessage("success","Login success",handleToastClose,500,"top-right");
                
    //         }
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    //     finally{
    //         setSubmitting(false);
            
    //     }
        
    // }
        
    // const handleToastClose = () => {
    //     if(param){
    //         window.location.href = `${param}`
    //     }
    //     else{
    //         redirect("/")
    //     }
    // }
    const handleRouteLogin = () => {
        navigation.navigate("Login");
      };
      const handleRouteSignUp= () => {
        navigation.navigate("SignUp");
      };
    return (
        <>
        <BaseAuthPage>
            <View style={{marginBottom: 10}}>
                
                <OAuth2/>
                <View style={{  }}>
                    <Menu>
                        <MenuTrigger>
                        <View style={{flexDirection: 'row',width: 'auto',justifyContent: 'center',alignItems: 'center',gap: 4,borderRadius: 10,borderWidth: 1,borderColor: 'gray',paddingVertical: 10}}>
                            <Fontisto name="email" size={24} color="black" />
                            <Text>Continue with email</Text>
                        </View>
                        </MenuTrigger>
                        <MenuOptions>
                            
                            <MenuOption style={{padding: 10}} onSelect={handleRouteLogin} text="Login" />
                            <MenuOption style={{padding: 10}} onSelect={handleRouteSignUp} text="Sign up" />
                        
                        </MenuOptions>
                    </Menu>
                </View>
            </View>
            {/* <div className='mb-2'>
                <BaseForm isSubmitting={isSubmitting} onclick={handleLogin}></BaseForm>
            </div>
            <div>
                Don’t have an account? 
                <NavLink to={`/auth/register?success_page=${enCodeParam}`} className="underline" >Sign up</NavLink>
            </div> */}
        </BaseAuthPage>
       
        </>
    );
};

export default LoginScreen;