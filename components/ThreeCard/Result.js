import { 
    hands, 
    isStraight, 
    isFlush, 
    isPair, 
    isTrips, 
    isRoyal, 
    resolveHighCard, 
    resolveHand,
    isSixCardStraight,
    isSixCardFlush,
    isSixCardStraightFlush,
    isSixCardTrips,
    isQuads,
    isFullHouse
} from './Utility';

const getCardValues = hand => {
    return hand.map(h => h.value).sort((a, b) => a - b);
}
const getCardSuits = hand => {
    return hand.map(h => h.suit);
}
const validateHand = hand => {
    const values = getCardValues(hand);
    const suits = getCardSuits(hand);
    let handValue = hands.HIGH_CARD;

    if (isStraight(values)) {
        console.log('isStraight');
        handValue = hands.STRAIGHT;
        if (isFlush(suits)) {
            console.log('isStraightFlush');
            handValue = hands.STRAIGHT_FLUSH;
            if (isRoyal(values)) {
                console.log('isRoyalFlush');
                handValue = hands.ROYAL_FLUSH;
            }
        }
    } else if (isFlush(suits)) {
        console.log('isFlush');
        handValue = hands.FLUSH;
    } else if (isPair(values)) {
        console.log('isPair');
        handValue = hands.PAIR;
    } else if (isTrips(values)) {
        console.log('isTrips');
        handValue = hands.TRIPS;
    }

    return {
        values,
        suits,
        handValue
    };
};

const validateSixCardHand = (dealer, player) => {
    const fullValues = getCardValues(dealer).concat(getCardValues(player));
    const values = [...fullValues].sort((a, b) => a - b);
    const suits = getCardSuits(dealer).concat(getCardSuits(player));
    let handValue = 0;
    
    if (isSixCardStraight(values)) {
        handValue = hands.STRAIGHT;
        const bigger = isSixCardStraightFlush(values, suits);
        if (bigger.result) {
            handValue = hands.STRAIGHT_FLUSH;
            if (bigger.isRoyal) {
                handValue = hands.ROYAL_FLUSH;
            }
        }
    } else if (isSixCardFlush(suits)) {
        handValue = hands.FLUSH;
    } else if (isSixCardTrips(values)) {
        handValue = hands.TRIPS;
    } else if (isQuads(values)) {
        handValue = hands.QUADS;
    } else if (isFullHouse(values)) {
        handValue = hands.FULL_HOUSE;
    }

    return handValue;
}

const determineWinner = cards => { //return true if player won
    const {dealerCards, playerCards} = cards;
    const dealer = validateHand(dealerCards);
    let disqualify = false, isPlayer = false;

    if (dealer.handValue === hands.HIGH_CARD) {
        const [last] = [...getCardValues(dealerCards)].reverse();
        if (last < 12) {
            disqualify = true;
            return {
                isPlayer: true,
                disqualify
            };
        }
    }
    const player = validateHand(playerCards);
    if (player.handValue !== dealer.handValue) {
        isPlayer = player.handValue > dealer.handValue; //one scored more than the other so clear winner
    } else {
        if (player.handValue === 0) {
            isPlayer = resolveHighCard(dealer.values, player.values); //return true if player wins by high card or kicker
        } else {
            isPlayer = resolveHand(dealer, player); //return true if player wins by comparing higher hand value
        }
    }
    return {
        isPlayer,
        disqualify
    }
}

const determineBonus = cards => {
    const {dealerCards, playerCards} = cards;
    const { handValue } = validateHand(playerCards);
    const sixCardValue = validateSixCardHand(dealerCards, playerCards);
    let threeCardBonus = '', sixCardBonus = '';

    if (handValue) {
        threeCardBonus = Object.keys(hands).find(key => hands[key] === handValue);
        threeCardBonus = threeCardBonus.replace('_', ' ');
    }

    if (sixCardValue) {
        sixCardBonus = Object.keys(hands).find(key => hands[key] === sixCardValue);
        sixCardBonus = sixCardBonus.replace('_', ' ');
    }

    return {
        threeCardBonus,
        sixCardBonus
    }
}

export {
    determineWinner,
    determineBonus
}