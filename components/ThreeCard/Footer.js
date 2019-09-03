import React from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';

import GameButton from '../GameButton';
import { Utils } from '../constants';

import { setDealStart, setPlayStart } from '../../store/actions/cards';
import { doRebet } from '../../store/actions/money';

const Footer = () => {
    const betsActive = useSelector(state => state.cards.betsActive);
    const dealing = useSelector(state => state.cards.dealing);
    const reset = useSelector(state => state.money.reset);
    
    const dispatch = useDispatch();

    const dealHandler = () => {
        dispatch(setDealStart());
    }

    const playHandler = (play) => {
        if (!dealing) {
            return;
        }
        dispatch(setPlayStart(play));
    }

    const rebetHandler = () => {
        dispatch(doRebet());
    }

    return (
        <View style={styles.container}>
            <GameButton onPressed={dealHandler} disabled={!betsActive}>Deal</GameButton>
            <GameButton onPressed={() => playHandler(true)} disabled={!betsActive}>Play</GameButton>
            <GameButton onPressed={() => playHandler(false)} disabled={!betsActive}>Fold</GameButton>
            <GameButton onPressed={rebetHandler} disabled={(!betsActive && reset) ? false : true}>Rebet</GameButton>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: Utils.footerBackgroundColor,
        height: "18%",
        borderColor: Utils.footerBorderColor,
        borderTopWidth: 25,
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignItems: "center"
    }
});

export default Footer;