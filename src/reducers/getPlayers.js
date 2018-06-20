import { ADD_PLAYERS } from '../actions/addPlayer'

const initialState = {
    players: []
}

function getPlayers(state = initialState, action) {

    switch (action.type) {
        case ADD_PLAYERS:
        return {
            ...state,
            players: [...action.players]
            // players: action.players
        }

        default:
            return state
    }
}

export default getPlayers;

