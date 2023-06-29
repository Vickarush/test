import React, {useState} from 'react';
import { Button, View, Text } from "react-native";
import {WebView} from 'react-native-webview';

export default function Account({navigation}) {

  return (
   <View>
     <View>
     <WebView
      source={{
        uri: 'https://nscc.org.ng/jobs/',
      }}
      style={{flex: 1 }}
    />
     </View>
     <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home Screen</Text>
      <Button
        title="Go to Inbox"
        onPress={() => navigation.navigate("Inbox")}
      />
    </View>
   </View>
  );
}