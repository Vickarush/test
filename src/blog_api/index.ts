import axios from 'axios';
//import { useEffect , useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
const BASE_URL = 'https://nscc.org.ng/wp-json/wp/v2/posts/'; //wordpress rest api

const loginData = {
  username: "NSCC",
  password: "4IH0589p#k"
};

axios.post('https://nscc.org.ng/wp-json/jwt-auth/v1/token', loginData)
.then((res) => {
  async () => {
    try {
      await AsyncStorage.setItem('token', res.data.token)
    } catch (e) {
      console.log(e);
    }
  }
  console.log(res.data);
 // window.localStorage.setItem("user_nicename", res.data.user_nicename);
 // window.localStorage.setItem("user_email", res.data.user_email);
 // window.localStorage.setItem("user_display_name", res.data.user_display_name);
})
.catch((err) => {
  console.log(err);
});

export const apiClient = async() =>{
  const value = await AsyncStorage.getItem('token');
  console.log( "success" );
  
    return axios.create({
      baseURL: BASE_URL,
      timeout: 10000,
      headers: {
        'Authorization': value,
      },
    });

}