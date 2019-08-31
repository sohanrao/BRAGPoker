import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Payouts from '../components/Texas/Payouts';
import HeaderButton from '../components/HeaderButton';
import { Utils } from '../components/constants';

const texasHoldem = props => {
    const [showPayouts, setShowPayouts] = useState(false);

    const toggleModal = () => {
        return setShowPayouts(true);
    }

    const closeModalHandler = () => {
        setShowPayouts(false);
    }

    useEffect(() => {
        props.navigation.setParams({
            toggle: toggleModal
        });
    }, []);

    return (
        <View style={styles.container}>
            <Payouts visible={showPayouts} onClose={closeModalHandler} />
            <Text style={styles.text}>Ultimate Texas Hold 'em coming soon...</Text>
        </View>
    )
}

texasHoldem.navigationOptions = navigationData => {
    const navData = navigationData;
    return {
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title={Utils.text.btnPayouts}
                iconName={Utils.btnPayoutsIcon}
                onPress={() => { navData.navigation.getParam('toggle')();}} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        fontFamily: 'bree-serif',
        fontSize: 20
    }
});

export default texasHoldem;