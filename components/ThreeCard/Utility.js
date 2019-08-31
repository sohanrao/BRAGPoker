const hands = {
    HIGH_CARD: 0,
    PAIR: 1,
    TWO_PAIR: 2,
    STRAIGHT: 3,
    FLUSH: 4,
    TRIPS: 5,
    FULL_HOUSE: 6,
    QUADS: 7,
    STRAIGHT_FLUSH: 8,
    ROYAL_FLUSH: 9
};

const isStraight = values => {
    const [first, sec, third] = values;
    if(sec === (first + 1) && third === (sec + 1)) {
        return true;
    }
    if(third === 14) { //ace
        if(first === 2 && sec === 3) {
        return true;
        }
    }
    return false;
}

const isFlush = suits => {
    return [...new Set(suits)].length === 1;
}

const isPair = values => {
    return [...new Set(values)].length === 2;
}

const isTrips = values => {
    return [...new Set(values)].length === 1;
}

const isRoyal = values => {
    const [first, sec, third] = values;
    if(first === 12 && sec === 13 && third === 14) {
        return true;
    }
    return false;
}

const isSixCardStraight = values => {
    const uniq = [...new Set(values)];
    const [a, b, c, d, e, f] = uniq;
    if (uniq.length > 4) {
        if (!checkSequence([a, b, c, d, e]) && !checkSequence([b, c, d, e, f])) {
            //check cyclical for ace
            if (a === 2 && f === 14) {
                return checkSequence([1, a, b, c, d]);
            }
        } else {
            return true;
        }
    }
    return false;
}

const isSixCardFlush = suits => {
    const uniq = [...new Set(suits)];
    return repeatCount(uniq, suits) === 5;
}

const isSixCardStraightFlush = (values, suits) => {
    const uniq = [...new Set(values)];
    const [a, b, c] = uniq;
    let slicedSuits = [], slicedValues = [], isRoyal = false;
    if (b === (a + 1)) {
        slicedSuits = [...suits].slice(0, 4);
        slicedValues = [...uniq].slice(0, 4);
    } else if (c === (b + 1)) {
        slicedSuits = [...suits].slice(1, 5);
        slicedValues = [...uniq].slice(1, 5);
    }

    const result = [...new Set(slicedSuits)].length === 1;

    if (result) {
        const [last, secondLast] = [...slicedValues].reverse();
        if (last === 14 && secondLast === 13) {
            isRoyal = true;
        }
    }

    return {
        result,
        isRoyal
    }
}

const isSixCardTrips = values => {
    const uniq = [...new Set(values)];
    return repeatCount(uniq, values) === 3;
}

const isFullHouse = values => {
    return [...new Set(values)].length === 1;
}

const isQuads = values => {
    const uniq = [...new Set(values)];
    return repeatCount(uniq, values) === 4;
}

const resolveHighCard = (dealer, player) => {
    console.log('resolveHighCard');
    const [dFirst, dSec, dThird] = [...dealer].reverse();
    const [pFirst, pSec, pThird] = [...player].reverse();

    if (pFirst === dFirst) {
        if (pSec === dSec) {
            if (pThird && (pThird === dThird)) {
                return true; //player wins in a tie TODO: push condition
            } else {
                return pThird > dThird //higher third card wins    
            }
        } else {
            return pSec > dSec //higher second card wins
        }
    } else {
        return pFirst > dFirst; //higher first card wins
    }
}

//when both dealer and player get pair or better
const resolveHand = (dealer, player) => {
    console.log('resolveHand');
    const { handValue } = player; //both have equal handvalue
    const [pFirst, pSec, pThird] = player.values;
    const [dFirst, dSec, dThird] = dealer.values;

    switch (handValue) {
        case hands.PAIR:
            const playerPair = getPairValue(player.values);
            const dealerPair = getPairValue(dealer.values);
            return playerPair > dealerPair;
        case hands.TRIPS:  
            return pFirst > dFirst;
        case (hands.STRAIGHT || hands.STRAIGHT_FLUSH):
            if (pFirst === dFirst) {
                //either push or a case of A, 2, 3 vs 2, 3, 4
                if (pThird > dThird) {
                    return false;
                }
                return true; //player wins in a tie TODO: push condition
            } else {
                return pFirst > dFirst;
            }
        case hands.FLUSH:
            return resolveHighCard(dealer.values, player.values);
        case hands.ROYAL_FLUSH:
            return true;
        default:
            return true;
    }
}

//HELPERS
const getPairValue = values => {
    const [duplicate] = values.filter((item, index) => values.indexOf(item) !== index);
    return duplicate;
}

const repeatCount = (uniq, values) => {
    let count = 0;
    for(let i=0; i < uniq.length; i++) {
        count = values.filter(item => item === uniq[i]).length;
        if (count === 4) {
            return 4;
        } else if (count === 3) {
            return 3;
        } else if (count === 5 || count === 6) { //6 card flush
            return 5;
        }
    }
	return count;
}

const checkSequence = uniq => {
    const [a, b, c, d, e] = uniq;
    if (b === (a + 1) && c === (b + 1) && d === (c + 1) && e === (d + 1)) {
        return true;
    }
    return false;
}

/*** */

export {
    hands,
    isStraight,
    isFlush,
    isPair,
    isTrips,
    isRoyal,
    resolveHand,
    resolveHighCard,
    isSixCardStraight,
    isSixCardFlush,
    isSixCardStraightFlush,
    isSixCardTrips,
    isQuads,
    isFullHouse
}
  