import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { AuthContext } from '../AuthProvider';

const Logout = () => {

        const { setIsUserLoggedIn } = useContext(AuthContext);
      
        const handleLogout = async () => {
          // Clear the JWT token from AsyncStorage or your preferred storage mechanism
          try {
            await AsyncStorage.removeItem('jwtToken');
            // Update the logged-in state to false
            setIsUserLoggedIn(false);
          } catch (error) {
            console.error('Error while logging out:', error);
          }
        };
  
    }

export default Logout