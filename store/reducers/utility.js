
const payouts = {
    pairplus: {
        PAIR: 1,
        STRAIGHT: 6,
        FLUSH: 3,
        TRIPS: 30,
        STRAIGHTFLUSH: 40,
        ROYALFLUSH: 100
    },
    sixcardbonus: {
        TRIPS: 7,
        STRAIGHT: 10,
        FLUSH: 20,
        FULLHOUSE: 40,
        QUADS: 100,
        STRAIGHTFLUSH: 400,
        ROYALFLUSH: 1000
    }
}

export const getSums = all => {
    let sum = 0;
    for(let i=0; i < all.length; i++) {
        sum += getSum([...all[i]]);
    }
    return sum;
}
export const getSum = arr => arr.reduce((a,b) => a + b, 0);

export const calculateBonuses = (pairplus, sixcard, state) => {

    const getAmount = (item, value) => {
        const bet = getSum(state[item+'Bets']);
        const hands = payouts[item];
        return (value && bet > 0) ? bet * hands[value] : 0;
    }
    const pairplusW = getAmount('pairplus', pairplus);
    const sixcardW = getAmount('sixcardbonus', sixcard);

    return {
        pairplusW,
        sixcardW
    }
}