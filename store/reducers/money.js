import { PLACE_BET, SELECT_SLOT, REMOVE_LAST_BET, PLACE_PLAY_BET, SET_RESET_STATE, RESET_ALL_BETS, SET_RESULTS, SET_AVAILABLE_AMOUNT, DO_REBET, FOLD_PLAYER } from "../actions/money";
import { calculateBonuses, getSum, getSums } from './utility';

const initialState = {
    totalMoney: 0,
    totalWin: 0,
    totalLoss: 0,
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
    },
    reset: false,
    lastBets: {
        ab: [],
        ppb: [],
        scbb: []
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
            const totalBetsRetained = isPlayer ? (getSum(state.anteBets) * 2) : 0;
            const totalBonusBetsRetained = getSums([ 
                pairplusW ? state.pairplusBets : [],
                sixcardW ? state.sixcardbonusBets : []
             ]);
            const totalBets = getSums([
                state.anteBets, state.anteBets, state.pairplusBets, state.sixcardbonusBets
            ]);
            const totalNetBets = totalBets - totalBetsRetained - totalBonusBetsRetained;
            const totalW = anteW + playW + pairplusW + sixcardW;
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
                totalWin: totalW - totalNetBets,
                totalMoney: state.totalMoney + totalBetsRetained + totalBonusBetsRetained + totalW
            }
        case FOLD_PLAYER:
            const foldSixCardW = calculateBonuses('', action.sixcard, state).sixcardW;
            const foldSixCardBonusBetsRetained = foldSixCardW ? getSum(state.sixcardbonusBets) : 0;
            const foldTotalBets = getSums([
                state.anteBets, state.pairplusBets, state.sixcardbonusBets
            ]);
            const foldTotalNetBets = foldTotalBets - foldSixCardBonusBetsRetained;
            return {
                ...state,
                winnings: {
                    ...state.winnings,
                    sixcardbonus: foldSixCardW
                },
                totalWin: foldSixCardW - foldTotalNetBets,
                totalMoney: state.totalMoney + foldSixCardBonusBetsRetained + foldSixCardW
            }
        case SET_RESET_STATE:
            return {
                ...state,
                reset: true
            }
        case RESET_ALL_BETS:
            const money = state.totalMoney;
            const { anteBets, pairplusBets, sixcardbonusBets } = state;
            return {
                ...initialState,
                winnings: {
                    ...initialState.winnings
                },
                totalMoney: money,
                lastBets: {
                    ab: [...anteBets],
                    ppb: [...pairplusBets],
                    scbb: [...sixcardbonusBets]
                },
                reset: true
            }
        case DO_REBET:
            const { lastBets } = state;
            const { ab, ppb, scbb } = lastBets;
            const totalBetValue = getSums([ ab, ppb, scbb ]);
            return {
                ...state,
                reset: false,
                anteBets: [...ab],
                pairplusBets: [...ppb],
                sixcardbonusBets: [...scbb],
                totalMoney: state.totalMoney - totalBetValue,
                lastBets: {
                    ...initialState.lastBets
                }

            }
        default:
            return state;
    }
}

export default moneyReducer;