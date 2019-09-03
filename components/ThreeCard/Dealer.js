import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import CardsLayout from './CardsLayout';
import { getDeck } from './CardShuffler';
import { determineWinner, determineBonus } from './Result';
import { setResults, foldPlayer } from '../../store/actions/money';
import { setCards } from '../../store/actions/cards';

const Dealer = () => {
    const [size, setSize] = useState('lg');
    const dealing = useSelector(state => state.cards.dealing);
    const playing = useSelector(state => state.cards.playing);
    const folded = useSelector(state => state.cards.folded);
    const showCards = useSelector(state => state.cards.showCards);
    const cards = useSelector(state => state.cards.cards);

    const dispatch = useDispatch();

    const dealCards = () => {
        const deck = getDeck();
        //draw player cards
        const playerCards = deck.slice(0, 3);
        //draw dealer cards
        const dealerCards = deck.slice(3, 6);
        const deal = {
            playerCards: [...playerCards],
            dealerCards: [...dealerCards]
        }
        dispatch(setCards(deal));
    }

    useEffect(() => {
        if (dealing && !showCards) {
            dealCards();
        }
    }, [dealing, showCards]);

    useEffect(() => {
        if (playing || folded) {
            const winner = determineWinner(cards);
            const {threeCardBonus, sixCardBonus} = determineBonus(cards);
            const action = playing ? setResults(winner, threeCardBonus, sixCardBonus) : foldPlayer(sixCardBonus);

            dispatch(action);
        }
    }, [playing, folded]);

    const computeHeight = event => {
        const { height } = event.nativeEvent.layout;
        const availableHeight = height > 220 ? 'lg' : (height > 175 && height < 220) ? 'md' : 'sm';
        setSize(availableHeight);
    }

    if (!showCards) {
        return <View style={styles.main} onLayout={computeHeight}></View>
    }

    return (
        <View style={styles.main}>
            <CardsLayout size={size} cards={cards.dealerCards} reveal={playing || folded} dealer />
            <CardsLayout size={size} cards={cards.playerCards} />
        </View>
    )
}

const styles = StyleSheet.create({
    main: {
        padding: 10,
        flex: 1,
    }
});

export default Dealer;