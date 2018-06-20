// import { createStore } from 'redux';
// import rootReducer from '../reducers';


// export default function configureStore(initialState) {
//     const store = createStore(rootReducer, initialState);

//     if (module.hot) {
//         module.hot.accept('../reducers', () => {
//             const nextRootReducer = require('../reducers/index');
//             store.replaceReducer(nextRootReducer);
//         });
//     }

//     return store;
    
// }

import { createStore } from 'redux'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
    const store = createStore(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            const nextRootReducer = require('../reducers')
            store.replaceReducer(nextRootReducer)
        })
    }

    return store
}