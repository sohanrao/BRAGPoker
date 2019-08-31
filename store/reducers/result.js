import { SET_WINNER } from "../actions/result";

const initialState = {
    winner: {
        isPlayer: false,
        disqualify: false //dealer did not qualify
    },
    pairPlusBonus: "",
    sixCardBonus: ""
}

const resultReducer = (state = initialState, action) => {
    switch(action.type) {
        case SET_WINNER:
            const { pairPlusBonus, sixCardBonus } = action;
            return {
                ...state,
                winner: {...action.winner},
                pairPlusBonus,
                sixCardBonus
            };
        default:
            return state;
    }
}

export default resultReducer;

