import React from 'react';
import {View, Text} from 'react-native';
import Background from '../new/Background';
import Btn from '../new/Btn';
import { darkGreen, green } from '../new/Constants';

const Start= ({navigation}) => {
  return (
    <Background>
    <View style={{ flex: 1, marginLeft: 30, marginRight: 20, width: '100%', alignItems: 'center', marginTop: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>Start</Text>
      <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Here</Text>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => navigation.navigate('Login')} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => navigation.navigate('Signup')} />
    </View>
    </Background>
  );
}

export default Start;
