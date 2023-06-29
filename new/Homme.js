import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Background from './Background';
import Btn from './Btn';
import { darkGreen, green } from './Constants';

const Homme = (props) => {
  return (
    <Background>
    <View style={{ flex: 1, marginLeft: 30, marginRight: 20, width: '100%', alignItems: 'center', marginTop: 100 }}>
      <Text style={{ color: 'white', fontSize: 64 }}>Start</Text>
      <Text style={{ color: 'white', fontSize: 64, marginBottom: 40 }}>Here</Text>
      <Btn bgColor={green} textColor='white' btnLabel="Login" Press={() => props.navigation.navigate("Loggin")} />
      <Btn bgColor='white' textColor={darkGreen} btnLabel="Signup" Press={() => props.navigation.navigate("Siggnup")} />
    </View>
    </Background>
  );
}

const styles = StyleSheet.create({})

export default Homme;
