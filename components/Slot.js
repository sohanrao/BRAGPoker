import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Animated } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from "prop-types";

import Chip from './Chip';
import { selectSlot, removeLastBet } from '../store/actions/money';

const Slot = props => {
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

    useEffect(() => {
        const { disqualify, pairplus, sixcardbonus } = winnings;
        let show = false;
        switch (name) {
            case 'ante':
                show = winner;
                break;
            case 'play':
                show = winner && !disqualify;
                break;
            case 'pairplus':
                show = pairplus > 0;
                break;
            case 'sixcardbonus':
                show = sixcardbonus > 0;
                break;
        }
        if (show) {
            Animated.timing(chipWonAnim, {
                toValue: 1,
                duration: 500
            }).start();
        } else {
            setChipWonAnim(new Animated.Value(0));
        }
    }, [winnings]);

    //Anim states
    const [chipWonAnim, setChipWonAnim] = useState(new Animated.Value(0));

    return (
        <TouchableWithoutFeedback onPress={slotSelected}>
            <View style={[styles.container, active ? styles.activeColor : null]}>
                {bets.length > 0 ?
                    <View>
                        <Animated.View style={{
                            opacity: chipWonAnim,
                            transform: [
                                {
                                    translateY: chipWonAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [-500, 0]
                                    })
                                }
                            ]
                        }}>
                            <Chip 
                                position={{position: 'absolute', top: -25, left: -45}} 
                                value={winnings[name]} />
                        </Animated.View>
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
        borderRadius: 35,
        width: 70,
        height: 70,
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

Slot.propTypes = {
    name: PropTypes.string.isRequired,
    bets: PropTypes.array.isRequired,
    label: PropTypes.string.isRequired
};

Slot.defaultProps = {
    name: '',
    bets: [],
    label: ''
}

export default Slot;