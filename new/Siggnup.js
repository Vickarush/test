import React from 'react';
import {View, Text, Touchable, TouchableOpacity, StyleSheet } from 'react-native';
import { ScrollView } from 'react-native';
import Background from './Background';
import Btn from './Btn';
import {darkGreen} from './Constants';
import Field from './Field';
//import { AuthProvider } from '../AuthProvider';
//import { AxiosProvider } from '../AxiosProvider';

const Siggnup = props => {
 // const { onRegister } = useAuth;

  const register = async () => {
    const result = await onRegister(email, password);
    if( result && result.error){
      alert(result.msg);
    } else {
      props.navigation.navigate('Loggin');
    }
  }

  return (
    <Background>
        <Text
          style={{
            color: 'white',
            fontSize: 64,
            fontWeight: 'bold',
            marginTop: 20,
          }}>
          Register
        </Text>
        <Text
          style={{
            color: 'white',
            fontSize: 19,
            fontWeight: 'bold',
            marginBottom: 20,
          }}>
          Create a new account
        </Text>
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
            height: 700,
            width: '100%',
            borderTopLeftRadius: 130,
            paddingTop: 50,
            alignItems: 'center'
          }}>
          <ScrollView  contentContainerStyle={styles.contentContainer}>
          <Field placeholder="First Name" />
          <Field placeholder="Last Name" />
          <Field
            placeholder="Email / Username"
            keyboardType={'email-address'}
          />
          <Field placeholder="Contact Number" keyboardType={'number'} />
          <Field placeholder="Password" secureTextEntry={true} />
          <Field placeholder="Confirm Password" secureTextEntry={true} />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              width: 300,
              paddingRight: 16
            }}>
            <Text style={{color: 'grey', fontSize: 16, paddingRight: 10}}>
              By signing in, you agree to our{' '}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Terms & Conditions
            </Text>
          </View>

          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent :"center",
              width: '78%',
              paddingRight: 16,
              marginBottom: 10
            }}>
            <Text style={{color: 'grey', fontSize: 16}}>
              and {" "}
            </Text>
            <Text style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
              Privacy Policy
            </Text>
          </View>
          <Btn
            textColor="white"
            bgColor={darkGreen}
            btnLabel="Signup"
            Press={() => alert('welcome')}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <Text style={{fontSize: 16, fontWeight: 'bold'}}>
              Already have an account ?{' '}
            </Text>
            <TouchableOpacity
              onPress={() => props.navigation.navigate('Loggin')}>
              <Text
                style={{color: darkGreen, fontWeight: 'bold', fontSize: 16}}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
          </ScrollView>
        </View>
    </Background>
  );
};

export default Siggnup;

const styles = StyleSheet.create({
  contentContainer: {
    height: 900,
    width: 350,
    alignItems: "center"
  }
});
