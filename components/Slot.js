import React from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Chip from './Chip';
import { selectSlot, removeLastBet } from '../store/actions/money';

const slot = props => {
    const { name, bets, label } = props;
    const last = bets.length - 1;

    const dealing = useSelector(state => state.cards.dealing);

    const activeSlot = useSelector(state => state.money.activeSlot);
    const winner = useSelector(state => state.money.winner);
    const winnings = useSelector(state => state.money.winnings);
    
    const active = activeSlot === name;

    const dispatch = useDispatch();

    const slotSelected = () => {
        if (dealing || name === 'play') {
            return;
        }
        dispatch(selectSlot(name));
    }

    const removeBetHandler = () => {
        if (dealing) {
            return;
        }
        dispatch(removeLastBet(name));
    }

    const showResult = () => {
        const { disqualify, pairplus, sixcardbonus } = winnings;
        if (name === 'ante') {
            return winner;
        } else if (name === 'play') {
            return winner && !disqualify;
        } else if (name === 'pairplus') {
            return pairplus > 0;
        } else if (name === 'sixcardbonus') {
            return sixcardbonus > 0;
        }
    }

    return (
        <TouchableWithoutFeedback onPress={slotSelected}>
            <View style={[styles.container, active ? styles.activeColor : null]}>
                {bets.length > 0 ?
                    <View>
                        { showResult() ? 
                            <Chip style={{position: 'absolute', top: -25, left: -45}} 
                                value={winnings[name]} /> : null
                        }
                        <Chip value={bets[last]} pressed={removeBetHandler} />
                    </View> :
                    <Text style={[styles.label, active ? styles.activeLabel : null]}>{label}</Text>
                }
            </View>
        </TouchableWithoutFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        borderColor: "white",
        borderWidth: 2,
        borderRadius: 40,
        width: 80,
        height: 80,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 5,
        marginHorizontal: 10,
    },
    activeColor: {
        borderColor: "orange",
        elevation: 2
    },
    label: {
        color: "white",
        textAlign: "center"
    },
    activeLabel: {
        color: "orange"
    }
});

export default slot;