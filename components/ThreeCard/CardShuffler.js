const suits = ['heart', 'spade', 'club', 'diamond'];
const cards = [
    {key: '2', value: 2, name:'Two'},
    {key: '3', value: 3, name:'Three'},
    {key: '4', value: 4, name:'Four'},
    {key: '5', value: 5, name:'Five'},
    {key: '6', value: 6, name:'Six'},
    {key: '7', value: 7, name:'Seven'},
    {key: '8', value: 8, name:'Eight'},
    {key: '9', value: 9, name:'Nine'},
    {key: '10', value: 10, name:'Ten'},
    {key: 'J', value: 11, name:'Jack'},
    {key: 'Q', value: 12, name:'Queen'},
    {key: 'K', value: 13, name:'King'},
    {key: 'A', value: 14, isAce: true, name:'Ace'}
];

const getDeck = () => {
    //uncomment below for test deal
    //const testCards = ['8-spade','8-diamond','11-spade','7-spade','10-heart', '11-spade'];
    //return addCardsToDeck(testCards);

    //prepare deck
    const deck = [];
    for(let s=0; s < suits.length; s++) {
        for(let c=0; c < cards.length; c++) {
            const card = {
                ...cards[c],
                suit: suits[s],
                label: `${cards[c].name} of ${suits[s]}`
            }
            deck.push(card);
        }
    }

    //shuffle deck
    let m = deck.length, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        [deck[m], deck[i]] = [deck[i], deck[m]];
    }

    return deck;
}

/* Called when test deal is activated above */
const addCardsToDeck = testCards => {
    const deck = [];
    for(let i=0; i < testCards.length; i++) {
        const [ num, suit ] = testCards[i].split('-');
        const card = {
            ...cards[+num - 2],
            suit,
            label: `${cards[+num - 2].name} of ${suit}`
        }
        deck.push(card);
    }
    return deck;
}

export {
    getDeck
}