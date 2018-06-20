import { combineReducers } from 'redux';
import getPlayers from './getPlayers'


const rootRedusers = combineReducers({
    players: getPlayers
})

export default rootRedusers;