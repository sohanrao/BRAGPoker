import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Chip from '../Chip';
import Slot from '../Slot';
import { selectSlot, placeBet, removeLastBet, placePlayBet } from '../../store/actions/money';

const bets = props => {
    const activeSlot = useSelector(state => state.money.activeSlot);
    const anteBets = useSelector(state => state.money.anteBets);
    const playBets = useSelector(state => state.money.playBets);
    const pairplusBets = useSelector(state => state.money.pairplusBets);
    const sixcardbonusBets = useSelector(state => state.money.sixcardbonusBets);

    const dealing = useSelector(state => state.cards.dealing);
    const playing = useSelector(state => state.cards.playing);

    const dispatch = useDispatch();

    useEffect(() => {
        if (dealing) {
            dispatch(selectSlot(''));
        }
    }, [dealing]);

    useEffect(() => {
        if (playing) {
            dispatch(placePlayBet());
        }
    }, [playing]);

    const chipSelected = value => {
        if (!activeSlot || dealing) {
            return;
        }

        dispatch(placeBet(value));
    }

    return (
        <View style={styles.container}>
            <View style={styles.slotsContainer}>
                <View style={styles.marginBottom} >
                    <Slot 
                      name="pairplus"
                      label="Pair Plus" 
                      bets={pairplusBets} />
                </View>
                <View>
                    <Slot 
                        label="Ante" 
                        name="ante"
                        bets={anteBets} />
                    <Slot 
                        label="Play" 
                        name="play"
                        bets={playBets} />
                </View>
                <View style={styles.marginBottom}>
                    <Slot 
                        label="Six Card Bonus" 
                        name="sixcardbonus"
                        bets={sixcardbonusBets} />
                </View>
            </View>
            <View style={styles.playerStack}>
                <Chip value={1} pressed={() => chipSelected(1)} />
                <Chip value={5} pressed={() => chipSelected(5)} />
                <Chip value={25} pressed={() => chipSelected(25)} />
                <Chip value={100} pressed={() => chipSelected(100)} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    playerStack: {
        height: 70,
        alignItems: "flex-end",
        justifyContent: "space-evenly",
        flexDirection: "row",
        paddingHorizontal: 40,
        paddingBottom: 10,
    },
    slotsContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
        flexDirection: "row"
    },
    marginBottom: {
        marginBottom: 40
    }
});

export default bets;