import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import {PayWithFlutterwave} from 'flutterwave-react-native';
import VideoCall from './VideoCall';

function Pay() {
const[hasPaid, setHasPaid] = useState(false);
  const handleOnRedirect = () => {
    setHasPaid(true);
  }
  
  const generateRef = (length) => {
     var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
     var b = [];  
     for (var i=0; i<length; i++) {
         var j = (Math.random() * (a.length-1)).toFixed(0);
         b[i] = a[j];
     }
     return b.join("");
  }

 /* useEffect(() => {
    setHasPaid(true);
  }, [hasPaid]);*/
  
  return (
    <>
    { !hasPaid?
      (<View style={{flex: 1}}>
      <PayWithFlutterwave
   onRedirect={handleOnRedirect}
   options={{
        tx_ref: generateRef(11),
        authorization: 'FLWPUBK_TEST-31b195b973f9342f9eb799c74ccd0cb7-X',
        customer: {
            email: 'user@gmail.com'
        },
        amount: 500,
        currency: 'NGN',
        payment_options: 'card'
     }}
  />
    </View> ) : ( <VideoCall /> ) }
    </>
  );
}

export default Pay