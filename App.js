import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { AppLoading } from 'expo';
import * as Font from 'expo-font';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';

import cardsReducer from './store/reducers/cards';
import moneyReducer from './store/reducers/money';
import resultReducer from './store/reducers/result';

import Navigator from './navigation/Navigator';

import * as firebase from 'firebase';
import { config } from './firebase-config';

//firebase.initializeApp(config);
//firebase.auth().signInAnonymously();

const rootReducer = combineReducers({
  cards: cardsReducer,
  money: moneyReducer,
  result: resultReducer
});
const store = createStore(rootReducer);

const fetchFonts = () => {
  return Font.loadAsync({
    'bree-serif': require('./assets/fonts/BreeSerif-Regular.ttf'),
    'lobster': require('./assets/fonts/Lobster-Regular.ttf'),
    'card-characters': require('./assets/fonts/cardCharacters.ttf')
  });
}

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading startAsync={fetchFonts} onFinish={() => setFontLoaded(true)} />
    )
  }

  return (
    <Provider store={store}><Navigator /></Provider>
  );
}