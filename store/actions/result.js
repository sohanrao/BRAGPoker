export const SET_WINNER = "SET_WINNER";

export const setWinner = (winner, pairPlusBonus, sixCardBonus) => {
    return {
        type: SET_WINNER,
        winner,
        pairPlusBonus,
        sixCardBonus
    }
}