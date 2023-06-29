import React, {useContext, useState} from 'react';
import {
  View,
  SafeAreaView,
  Button,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ImageBackground,
  Image,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import auth from '@react-native-firebase/auth';
import * as ImagePicker from 'react-native-image-picker';
import storage from '@react-native-firebase/storage';
import FormInput from '../components/FormInput';
import FormInputFontAwesome from '../components/FormInputFontAwesome';
import FormButton from '../components/FormButton';

//import { ImagePickerHeader } from '../components/ImagePickerHeader';
//import { ImagePickerModal } from '../components/ImagePickerModal';
//import { ImagePickerAvatar } from '../components/ImagePickerAvatar';

const SignupScreen = ({navigation}) => {
  const [names, setnames] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pickerResponse, setPickerResponse] = useState(null);
  //const [visible, setVisible] = useState(false);
  const [image, setImage] = useState(null);

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchImageLibrary(options, setPickerResponse);
  }, []);

  const onCameraPress = React.useCallback(() => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
      includeBase64: false,
    };
    ImagePicker.launchCamera(options, setPickerResponse);
  }, []);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  if( uri ) {
    setImage(uri)
  }
  console.log( uri );

  /*const choosePhotoFromLibrary = () => {
    var options = {
      title: 'Select Image',
      mediaType: 'photo',
      includeBase64: false,
      maxHeight: 200,
      maxWidth: 200,
      storageOptions: {
        skipBackup: true,
        path: 'images'
      }
    };
   
    ImagePicker.launchImageLibrary(options, (response)  => {
  
      console.log('Response = ', response);
  
      if (response.didCancel) {
        console.log('User cancelled image picker');
      }
      else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      }
      else {
            console.log(response);
            setImage(response.uri);
        }
      });
  };  */

  const uploadImage = async () => {
    if( image == null ) {
      return null;
    }
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);

    // Add timestamp to File Name
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;

    //setUploading(true);
    //setTransferred(0);

    const storageRef = storage().ref(`photos/${filename}`);
    const task = storageRef.putFile(uploadUri);

    // Set transferred state
    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();
      //setUploading(false);
      setImage(null);

      // Alert.alert(
      //   'Image uploaded!',
      //   'Your image has been uploaded to the Firebase Cloud Storage Successfully!',
      // );
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };  

  register = async (email, password) => {
    let imgUrl = await uploadImage();

    if( imgUrl == null ) {
      imgUrl = '';
    }

    var fullName = names.split(' '),
    firstName = fullName[0],
    lastName = fullName[fullName.length - 1];

    const result = await auth().createUserWithEmailAndPassword(email, password).then(() => {
      //Once the user creation has happened successfully, we can add the currentUser into firestore
      //with the appropriate details.
      firestore().collection('users').doc(auth().currentUser.uid)
      .set({
          fname: firstName,
          lname: lastName,
          email: email,
          createdAt: firestore.Timestamp.fromDate(new Date()),
          userImg: imgUrl,
      })
      //ensure we catch any errors at this stage to advise us if something does go wrong
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        if (errorCode == 'auth/weak-password') {
         Alert.alert(errorMessage)
        } else {
          Alert.alert(errorMessage)
        }
      })
        }).catch(error => {
          Alert.alert(error);
      });

      if (result) {
      //  uploadImage
        navigation.navigate('Login')
      }
    }

    console.log(image)
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create an account</Text>

      <FormInput
        labelValue={names}
        onChangeText={(e) => setnames(e)}
        placeholderText="First Last"
        iconType="user"
        keyboardType="default"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInputFontAwesome
        labelValue={email}
        onChangeText={(r) => setEmail(r)}
        placeholderText="Email"
        iconType="envelope"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />

      <FormInput
        labelValue={password}
        onChangeText={(userPassword) => setPassword(userPassword)}
        placeholderText="Password"
        iconType="lock"
        secureTextEntry={true}
      />

      <FormInput
        labelValue={confirmPassword}
        onChangeText={(userPassword) => setConfirmPassword(userPassword)}
        placeholderText="Confirm Password"
        iconType="lock"
        secureTextEntry={true}
      />

  <Text style={{fontWeight: 600, fontSize: 20, marginBottom: 1, marginTop: 1, color: 'green'}}>Add a Photo</Text>      
  <View style={{flex: 1}}>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={onCameraPress}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
       </TouchableOpacity>
      <TouchableOpacity
        style={styles.selectButton}
        onPress={onImageLibraryPress}>
        <Text style={styles.panelButtonTitle}>Choose From Library</Text>
      </TouchableOpacity>
      </View>
      {/** Image Output */}
      <View style={styles.imageContainer}>
        <Image 
        style={{ width: 200,
         height: 100}} 
          source={image} />
      {image !== null ? (
          <TouchableOpacity>
            <View
              style={{
                height: 100,
                width: 100,
                borderRadius: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <ImageBackground
                source={{ uri: image }}
                style={{height: 100, width: 100}}
                imageStyle={{borderRadius: 15}}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <MaterialCommunityIcons
                    name="camera"
                    size={35}
                    color="#fff"
                    style={{
                      opacity: 0.7,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1,
                      borderColor: '#fff',
                      borderRadius: 10,
                    }}
                  />
                </View>
              </ImageBackground>
            </View>
          </TouchableOpacity>
            ) : null}
        </View>

      <FormButton
        buttonTitle="Sign Up"
        onPress={() => register(email, password)}
      />

      <View style={styles.textPrivate}>
        <Text style={styles.color_textPrivate}>
          By registering, you confirm that you accept our{' '}
        </Text>
        <TouchableOpacity onPress={() => alert('Terms Clicked!')}>
          <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
            Terms of service
          </Text>
        </TouchableOpacity>
        <Text style={styles.color_textPrivate}> and </Text>
        <Text style={[styles.color_textPrivate, {color: '#e88832'}]}>
          Privacy Policy
        </Text>
      </View>

      <TouchableOpacity
        style={styles.navButton}
        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.navButtonText}>Have an account? <Text style={{color: '#333'}}>Sign In</Text></Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f9fafd',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontFamily: 'Kufam-SemiBoldItalic',
    fontSize: 28,
    marginBottom: 10,
    color: 'green',
  },
  navButton: {
    marginTop: 15,
  },
  navButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#2e64e5',
    fontFamily: 'Lato-Regular',
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  textPrivate: {
    flexDirection: 'row',
    display: 'none',
    flexWrap: 'wrap',
    marginVertical: 35,
    justifyContent: 'center',
  },
  color_textPrivate: {
    fontSize: 13,
    fontWeight: '400',
    fontFamily: 'Lato-Regular',
    color: 'grey',
  },
  selectButton: {
    borderRadius: 5,
    marginTop: 5,
    width: 200,
    height: 50,
    backgroundColor: 'grey',
    alignItems: 'center',
    justifyContent: 'center'
  },
  uploadButton: {
    borderRadius: 5,
    width: 150,
    height: 50,
    backgroundColor: '#ffb6b9',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageContainer: {
    marginTop: 30,
    marginBottom: 50,
    alignItems: 'center'
  },
  progressBarContainer: {
    marginTop: 20
  },
  imageBox: {
    width: 300,
    height: 300
  }
});