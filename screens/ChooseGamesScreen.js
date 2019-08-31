import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

import GameButton from '../components/GameButton';
import { Utils } from '../components/constants';

const chooseGames = props => {
    const { navigate } = props.navigation;
    return (
        <View style={styles.container}>
            <Text>{Utils.text.casino}</Text>
            <Text style={styles.title}>{Utils.text.choose}</Text>
            <GameButton onPressed={() => navigate('threeCardPoker')} style={styles.button}>{Utils.text.threeCard}</GameButton>
            <GameButton onPressed={() => navigate('texasHoldEm')} style={styles.button}>{Utils.text.texas}</GameButton>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        ...Utils.defaultLayout,
        backgroundColor: Utils.chooseGamesScreenBackgroundColor,
    },
    title: {
        fontFamily: Utils.defaultFont,
        fontSize: Utils.defaultFontSize
    },
    button: {
        marginTop: 20,
    }
});

export default chooseGames;