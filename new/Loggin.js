import React, { useState,  useContext, Component } from 'react';
import {View, Text, Touchable, TouchableOpacity, StyleSheet , ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import * as Keychain from 'react-native-keychain';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
//import { user_login } from '../api/user_login';
import { AuthProvider } from '../AuthProvider';
import { AxiosProvider } from '../AxiosProvider';
import { login, clearMessages, pullData } from "../src/store/actions/app";

class Loggin extends Component {
  handleLoginFormSubmit = values => {
		this.props.clearMessages();
		this.props.login(values.username, values.password);
	};

	componentDidUpdate() {
		const { user } = this.props;

		// We have a user and a token, so user just logged in.
		if (user && user.token) {
			this.props.clearMessages();
			this.props.navigation.navigate("Home");
			this.props.pullData();
		}
	}

/*
const handleUpdateProfile = () => {
    const loginData = {
      username: email.toLocaleLowerCase(),
      password: password,
    };
axios.post('https://nscc.org.ng/wp-json/jwt-auth/v1/token', loginData)
.then((res) => {
  async () => {
    try {
      await AsyncStorage.setItem('AccessToken', res.data.token);
    } catch (e) {
      console.log(e);
    }
  }
  if (res.status == 200) {
    alert('succces');

    console.log(res);
   console.log(props);
  } else {
    alert( 'Please check your details and try again');
  }
})
.catch((err) => {
  console.log(err);
});

  };

  const [seePassword, setSeePassword] = useState(true);
  const [checkValidEmail, setCheckValidEmail] = useState(true);

  const handleCheckEmail = text => {
    setEmail(text);
    setCheckValidEmail(true);
  };

  const isValidEmail = () => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (re.test(email) || regex.test(email)) {
      setCheckValidEmail(true);
    } else {
      setCheckValidEmail(false);
    }

  }



  const checkPasswordValidity = value => {
    const isNonWhiteSpace = /^\S*$/;
    if (!isNonWhiteSpace.test(value)) {
      return 'Password must not contain Whitespaces.';
    }

    const isContainsUppercase = /^(?=.*[A-Z]).*$/;
    if (!isContainsUppercase.test(value)) {
      return 'Password must have at least one Uppercase Character.';
    }

    const isContainsLowercase = /^(?=.*[a-z]).*$/;
    if (!isContainsLowercase.test(value)) {
      return 'Password must have at least one Lowercase Character.';
    }

    const isContainsNumber = /^(?=.*[0-9]).*$/;
    if (!isContainsNumber.test(value)) {
      return 'Password must contain at least one Digit.';
    }

    const isValidLength = /^.{8,16}$/;
    if (!isValidLength.test(value)) {
      return 'Password must be 8-16 Characters Long.';
    }

     const isContainsSymbol =   /^(?=.*[~`!@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_₹]).*$/;
     if (!isContainsSymbol.test(value)) {
       return 'Password must contain at least one Special Symbol.';
     }

    return true;
  };

  const makeAuthenticatedRequest = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    
    try {
      const response = await axios.get('https://nscc.org.ng/wp-json/wp/v2/posts/');
      console.log(response.data);
      navigation.replace('Home');
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleLogin = () => {
    const checkPassowrd = checkPasswordValidity(password);
    if (checkPassowrd) {
      user_login({
        email: email.toLocaleLowerCase(),
        password: password,
      })
        .then(result => {
          if (result.status == 200) {
            async () => {
               
            }
    
          }
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      alert(checkPassowrd);
    } 
   
  }; */
	render() {
  return (
    <Background>
      <View style={{alignItems: 'center', width: 350}}>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginVertical: 20,
          }}>
          Login
        </Text>
        <View
          style={{
            backgroundColor: 'white',
            height: 700,
            width: 330,
            borderTopLeftRadius: 130,
            paddingTop: 70,
            alignItems: 'center',
          }}>
          <ScrollView  contentContainerStyle={styles.contentContainer}>
          <Text style={{fontSize: 40, color: darkGreen, fontWeight: 'bold'}}>
            Welcome Back
          </Text>
          <Text
            style={{
              color: 'grey',
              fontSize: 19,
              fontWeight: 'bold',
              marginBottom: 20,
            }}>
            Login to your account
          </Text>
          
          {!checkValidEmail ? (
          <Text style={styles.textFailed}>Wrong email format</Text>
          ) : (
            <Text style={styles.textFailed}></Text>
          )}

          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
            onChangeText={text => handleCheckEmail(text)}
          />
          <Field 
          placeholder="Password"
          onFocus={isValidEmail}
          secureTextEntry={true}
          value={password}
          onChangeText={text => setPassword(text)}
           />
          <View
            style={{alignItems: 'flex-end', width: '78%', paddingRight: 16, marginBottom: 30}}>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Forgot Password ?
            </Text>
          </View>
      {email == '' || password == '' || checkValidEmail == false ? (
        <Btn disabled={this.props.loading} textColor='white' width='50' bgColor={darkGreen} btnLabel="Login" />
      ) : (
        <Btn textColor='white' width='50' bgColor={darkGreen} btnLabel="Login" Press={this.handleLoginFormSubmit}/>
      )}
          <View style={{ display: 'flex', flexDirection :'row', justifyContent: "center", marginTop: 10 }}>
            <Text style={{ fontSize: 16, fontWeight:"bold" }}>Don't have an account ? </Text>
            <TouchableOpacity onPress={() => props.navigation.navigate("Siggnup")}>
            <Text style={{ color: darkGreen, fontWeight: 'bold', fontSize: 16 }}>Signup</Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
      </View>
    </Background>
  );
};
}
export default Loggin;


const styles = StyleSheet.create({
  text: {
    color: 'black',
    alignSelf: 'flex-start',
    paddingLeft: 8,
    fontWeight: '700'
  },
  textFailed: {
    alignSelf: 'center',
    color: 'red',
  },
  contentContainer: {
    height: 900,
    width: 350,
    alignItems: "center",
  },
  hideOpacity: {
    opacity: 6,
  }
});