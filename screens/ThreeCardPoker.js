import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import Dealer from '../components/ThreeCard/Dealer';
import Bets from '../components/ThreeCard/Bets';
import Payouts from '../components/ThreeCard/Payouts';

import GameButton from '../components/GameButton';
import Money from '../components/Money';
import HeaderButton from '../components/HeaderButton';

import { setBetsActive, setDealStart, setPlayStart, resetDeal } from '../store/actions/cards';
import { resetBets } from '../store/actions/money';

import { Utils } from '../components/constants';

const threeCardPoker = props => {
    const [showPayouts, setShowPayouts] = useState(false);
    const anteBets = useSelector(state => state.money.anteBets);
    const totalMoney = useSelector(state => state.money.totalMoney);

    const dealing = useSelector(state => state.cards.dealing);
    const playing = useSelector(state => state.cards.playing);
    const betsActive = useSelector(state => state.cards.betsActive);

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
        console.log(anteBets.toString());
        dispatch(setBetsActive(anteBets.length > 0));
    }, [anteBets]);

    const dealHandler = () => {
        dispatch(setDealStart());
    }

    const playHandler = () => {
        if (!dealing) {
            return;
        }
        dispatch(setPlayStart());
    }

    const dealCompleteHandler = (person, threeCardBonus, sixCardBonus) => {
        setDealing(false);
    }

    const doReset = () => {
        dispatch(resetDeal());
        dispatch(resetBets());
    }

    return (
        <View style={styles.container}>
            <Payouts visible={showPayouts} onClose={closeModalHandler} />
            <Dealer dealComplete={dealCompleteHandler} />
            <View style={styles.main}>
                <Bets />
            </View>
            <View style={styles.footer}>
                <GameButton onPressed={dealHandler} disabled={!betsActive}>Deal</GameButton>
                <Money amt={totalMoney} />
                <GameButton onPressed={playHandler} disabled={!betsActive}>Play</GameButton>
            </View>
            {playing ? (
                <TouchableWithoutFeedback onPress={doReset}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
            ) : null}
        </View>
    )
}

threeCardPoker.navigationOptions = navigationData => {
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
        backgroundColor: Utils.threeCardScreenBackgroundColor,
        flex: 1,
    },
    main: {
        flex: 1,
        marginTop: 10,
    },
    footer: {
        backgroundColor: Utils.footerBackgroundColor,
        height: "18%",
        borderColor: Utils.footerBorderColor,
        borderTopWidth: 25,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    },
    overlay: {
        flex: 1,
        position: "absolute",
        left: 0,
        top: 0,
        opacity: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width
    }
});

export default threeCardPoker;