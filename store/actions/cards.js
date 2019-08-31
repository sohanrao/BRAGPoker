export const SET_BETS_ACTIVE = "SET_BETS_ACTIVE";
export const SET_DEAL_START = "SET_DEAL_START";
export const SET_PLAY_START = "SET_PLAY_START";
export const RESET_DEAL = "RESET_DEAL";
export const SET_CARDS = "SET_CARDS";

export const setBetsActive = active => {
    return {
        type: SET_BETS_ACTIVE,
        active
    }
}

export const setDealStart = () => {
    return {
        type: SET_DEAL_START
    }
}

export const setPlayStart = () => {
    return {
        type: SET_PLAY_START
    }
}

export const resetDeal = () => {
    console.log('<-------| RESET |------>');
    return {
        type: RESET_DEAL
    }
}

export const setCards = deal => {
    return {
        type: SET_CARDS,
        deal
    }
}