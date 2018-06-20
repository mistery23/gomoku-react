export const ADD_PLAYERS = 'ADD_PLAYERS'
 
export function addPlayers(players) {
    
    return {
        type: ADD_PLAYERS,
        players
    }
}

