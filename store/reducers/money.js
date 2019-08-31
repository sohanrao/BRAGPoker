import { PLACE_BET, SELECT_SLOT, REMOVE_LAST_BET, PLACE_PLAY_BET, RESET_ALL_BETS, SET_RESULTS, SET_AVAILABLE_AMOUNT } from "../actions/money";
import { calculateBonuses, getSum, getSums } from './utility';

const initialState = {
    totalMoney: 0,
    anteBets: [],
    playBets: [],
    pairplusBets: [],
    sixcardbonusBets: [],
    activeSlot: '',
    winner: false,
    winnings: {
        disqualify: false,
        ante: 0,
        play: 0,
        pairplus: 0,
        sixcardbonus: 0
    }
};

const moneyReducer = (state = initialState, action) => {
    let slot = action.slot ? action.slot + 'Bets' : state.activeSlot + 'Bets'; //common usage
    let amounts;

    switch (action.type) {
        case SET_AVAILABLE_AMOUNT:
            return {
                ...state,
                totalMoney: action.amt
            }
        case SELECT_SLOT:
            const newName = action.name === state.activeSlot ? '' : action.name;
            return {
                ...state,
                activeSlot: newName
            }
        case PLACE_BET:
            slot = state.activeSlot + 'Bets';
            amounts = [...state[slot]];
            return {
                ...state,
                [slot]: amounts.concat(action.amount),
                totalMoney: state.totalMoney - action.amount
            }
        case REMOVE_LAST_BET:
            slot = action.slot + 'Bets';
            amounts = [...state[slot]];
            const removedAmount = amounts.splice(-1, 1);
            return {
                ...state,
                [slot]: amounts,
                totalMoney: +removedAmount + state.totalMoney
            }
        case PLACE_PLAY_BET:
            const bets = [...state.anteBets];
            const amt = getSum(bets);
            return {
                ...state,
                playBets: bets,
                totalMoney: state.totalMoney - amt
            }
        case SET_RESULTS:
            const { winner, pairplus, sixcard } = action;
            const { isPlayer, disqualify } = winner;
            const { pairplusW, sixcardW } = calculateBonuses(pairplus, sixcard, state);
            const anteW = isPlayer ? getSum([...state.anteBets]) : 0;
            const playW = !disqualify ? anteW : 0;
            const totalBets = isPlayer ? (getSum(state.anteBets) * 2) : 0;
            const totalBonusBets = getSums([ 
                pairplusW ? state.pairplusBets : [],
                sixcardW ? state.sixcardbonusBets : []
             ]);
            const totalW = pairplusW + sixcardW + anteW + playW;
            return {
                ...state,
                winner: isPlayer,
                winnings: {
                    disqualify,
                    ante: anteW,
                    play: playW,
                    pairplus: pairplusW,
                    sixcardbonus: sixcardW
                },
                totalMoney: state.totalMoney + totalBets + totalBonusBets + totalW
            }
        case RESET_ALL_BETS:
            const money = state.totalMoney;
            return {
                ...initialState,
                winnings: {
                    ...initialState.winnings
                },
                totalMoney: money
            }
        default:
            return state;
    }
}

export default moneyReducer;