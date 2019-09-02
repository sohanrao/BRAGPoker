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
import { resetBets, doRebet } from '../store/actions/money';

import { Utils } from '../components/constants';

const threeCardPoker = props => {
    const [showPayouts, setShowPayouts] = useState(false);
    const anteBets = useSelector(state => state.money.anteBets);
    const totalMoney = useSelector(state => state.money.totalMoney);
    const reset = useSelector(state => state.money.reset);

    const dealing = useSelector(state => state.cards.dealing);
    const playing = useSelector(state => state.cards.playing);
    const folded = useSelector(state => state.cards.folded);
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
        props.navigation.setParams({
            money: totalMoney
        })
    }, [totalMoney]);

    useEffect(() => {
        dispatch(setBetsActive(anteBets.length > 0));
    }, [anteBets]);

    const dealHandler = () => {
        dispatch(setDealStart());
    }

    const playHandler = (play) => {
        if (!dealing) {
            return;
        }
        dispatch(setPlayStart(play));
    }

    const dealCompleteHandler = () => {
        setDealing(false);
    }

    const doReset = () => {
        dispatch(resetDeal());
        dispatch(resetBets());
    }

    const rebetHandler = () => {
        dispatch(doRebet());
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
                <GameButton onPressed={() => playHandler(true)} disabled={!betsActive}>Play</GameButton>
                <GameButton onPressed={() => playHandler(false)} disabled={!betsActive}>Fold</GameButton>
                <GameButton onPressed={rebetHandler} disabled={(!betsActive && reset) ? false : true}>Rebet</GameButton>
            </View>
            {(playing || folded) ? (
                <TouchableWithoutFeedback onPress={doReset}>
                    <View style={styles.overlay}></View>
                </TouchableWithoutFeedback>
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