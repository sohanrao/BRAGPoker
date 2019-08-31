export const SET_AVAILABLE_AMOUNT = "SET_AVAILABLE_AMOUNT";
export const SELECT_SLOT = "SELECT_SLOT";
export const PLACE_BET = "PLACE_BET";
export const REMOVE_LAST_BET = "REMOVE_LAST_BET";
export const PLACE_PLAY_BET = "PLACE_PLAY_BET";
export const RESET_ALL_BETS = "RESET_ALL_BETS";
export const SET_RESULTS = "SET_RESULTS";

export const setAvailableAmount = amt => {
    return {
        type: SET_AVAILABLE_AMOUNT,
        amt
    }
}

export const selectSlot = name => {
    return {
        type: SELECT_SLOT,
        name
    }
}

export const placeBet = (amount) => {
    return {
        type: PLACE_BET,
        amount
    }
};

export const removeLastBet = slot => {
    return {
        type: REMOVE_LAST_BET,
        slot
    }
}

export const placePlayBet = () => {
    return {
        type: PLACE_PLAY_BET
    }
}

export const resetBets = () => {
    return {
        type: RESET_ALL_BETS
    }
}

export const setResults = (winner, pairplus, sixcard) => {
    return {
        type: SET_RESULTS,
        winner,
        pairplus,
        sixcard
    }
}