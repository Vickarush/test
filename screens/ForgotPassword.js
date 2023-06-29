import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image
} from 'react-native';
import auth from '@react-native-firebase/auth';
import FormInputFontAwesome from '../components/FormInputFontAwesome';
import FormButton from '../components/FormButton';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState();
 
  handlePasswordReset = async (email) => {
 
    try {
        await auth().sendPasswordResetEmail(email)
        Alert.alert('Password reset email sent to email successfully')
        navigation.navigate('Login')
    } catch (error) {
      Alert.alert( error.message ) 
    }
  }

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.jpg')}
        style={styles.logo}
      />

<Text style={styles.text}>Fill in your email</Text>

    <FormInputFontAwesome
        labelValue={email}
        onChangeText={(r) => setEmail(r)}
        placeholderText="Email"
        iconType="envelope"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormButton
        buttonTitle="Reset"
        onPress={()=> handlePasswordReset(email)}
      />

    </View>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    paddingTop: 50
  },
  logo: {
    marginBottom: 50,
    height: 150,
    width: 150,
    resizeMode: 'cover',
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: '#051d5f',
  },
  navButton: {
    marginTop: 15,
  },
  forgotButton: {
    marginVertical: 35,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
});
