import React from 'react';
//import axios from 'axios';
import {ActivityIndicator} from 'react-native';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {persistor, store} from '../src/redux/Store';
import {Feed} from '../src/blog_screens/Feed';

/*axios.get('https://nscc.org.ng/wp-json/wp/v2/posts/')
  .then(function (response) {
      console.log(response);
  })
  .catch(function (error) {
      console.log(error);
  })
  .then(function () {
     
  });  */

const SponsoredArticles = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<ActivityIndicator size={'large'} color={'#000'} />}
        persistor={persistor}>
        <Feed />
      </PersistGate>
    </Provider>
  );
};
export default SponsoredArticles;