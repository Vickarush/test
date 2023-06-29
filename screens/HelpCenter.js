import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Dimensions
} from 'react-native';

import { WebView } from 'react-native-webview';

const deviceHeight = Dimensions.get('window').height;
const deviceWidth = Dimensions.get('window').width;

export default class HelpCenter extends Component {

  render() {
    return (
<View style={{flex:1}}>
  <WebView
   style={styles.webview}
   source={{uri: 'https://nscc.org.ng/help-center/'}}
   javaScriptEnabled={true}
   domStorageEnabled={true}
   startInLoadingState={false}
   scalesPageToFit={true} />
</View>
    );
  }
}

const styles = StyleSheet.create({
  webview: {
    width: deviceWidth,
    height: deviceHeight
  }
});