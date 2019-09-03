import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Dealer from '../components/ThreeCard/Dealer';
import Bets from '../components/ThreeCard/Bets';
import Payouts from '../components/ThreeCard/Payouts';
import Footer from '../components/ThreeCard/Footer';
import ResetOverlay from '../components/ThreeCard/ResetOverlay';
import ResultMarquee from '../components/ThreeCard/ResultMarquee';

import Money from '../components/Money';
import HeaderButton from '../components/HeaderButton';

import { setBetsActive } from '../store/actions/cards';

import { Utils } from '../components/constants';

const threeCardPoker = props => {
    const [showPayouts, setShowPayouts] = useState(false);

    const anteBets = useSelector(state => state.money.anteBets);
    const totalMoney = useSelector(state => state.money.totalMoney);

    const playing = useSelector(state => state.cards.playing);
    const folded = useSelector(state => state.cards.folded);

    const dispatch = useDispatch();

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

    useEffect(() => {
        props.navigation.setParams({
            money: totalMoney
        })
    }, [totalMoney]);

    useEffect(() => {
        dispatch(setBetsActive(anteBets.length > 0));
    }, [anteBets]);

    const dealCompleteHandler = () => {
        setDealing(false);
    }

    return (
        <View style={styles.container}>
            <Payouts visible={showPayouts} onClose={closeModalHandler} />
            <Dealer dealComplete={dealCompleteHandler} />
            <Bets />
            <Footer />
            <ResultMarquee />
            {(playing || folded) ? (
                <ResetOverlay />
            ) : null}
        </View>
    )
}

threeCardPoker.navigationOptions = navigationData => {
    const navData = navigationData;
    const { getParam } = navData.navigation;
    return {
        headerTitle: (<View style={{flex: 1}}><Money amt={getParam('money')} /></View>),
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item 
                title={Utils.text.btnPayouts}
                iconName={Utils.btnPayoutsIcon}
                onPress={() => { getParam('toggle')();}} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Utils.threeCardScreenBackgroundColor,
        flex: 1,
    }
});

export default threeCardPoker;