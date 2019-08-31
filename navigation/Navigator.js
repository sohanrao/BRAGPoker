import React from 'react';
import { View, Image } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator } from 'react-navigation';

import ChooseGames from '../screens/ChooseGamesScreen';
import ThreeCardPoker from '../screens/ThreeCardPoker';
import TexasHoldEm from '../screens/TexasHoldEm';
import StartupScreen from '../screens/StartupScreen';
import { Utils } from '../components/constants';
import Logo from '../assets/logo.png';

const Navigator = createStackNavigator({
    chooseGames: ChooseGames,
    threeCardPoker: ThreeCardPoker,
    texasHoldEm: TexasHoldEm,
}, {
    defaultNavigationOptions: {
        headerTitle: (<View style={{flex: 1}}><Image source={Logo} style={{ alignSelf: 'center' }}/></View>),
        headerStyle: {
            backgroundColor: Utils.headerBackgroundColor
        },
        headerTintColor: Utils.defaultColor,
        headerTitleStyle: { 
            textAlign:"center", 
            flex:1 
        },
    }
});

const MainNavigator = createSwitchNavigator({
    Startup: StartupScreen,
    Games: Navigator
});

export default createAppContainer(MainNavigator);