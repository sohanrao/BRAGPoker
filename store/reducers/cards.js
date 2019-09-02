import { SET_BETS_ACTIVE, SET_DEAL_START, SET_PLAY_START, RESET_DEAL, SET_CARDS } from "../actions/cards";

const initialState = {
    dealing: false,
    playing: false,
    folded: false,
    betsActive: false,
    showCards: false,
    cards: {
        playerCards: [],
        dealerCards: []
    }
};

const cardsReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_BETS_ACTIVE:
            return {
                ...state,
                betsActive: action.active
            }
        case SET_DEAL_START:
            return {
                ...state,
                dealing: true,
                playing: false
            }
        case SET_PLAY_START:
            return {
                ...state,
                playing: action.play,
                folded: !action.play
            }
        case RESET_DEAL:
            return initialState;
        case SET_CARDS:
            return {
                ...state,
                cards: action.deal,
                showCards: true
            }
        default:
            return state;
    }
}

export default cardsReducer;