import {createStore, combineReducers, applyMiddleware} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import budgetReducer from './budgetReducer';
import userReducer from './userReducer';

//combine reducers will combine reducers into a single, 'root' reducer
//this root reducer will be used by the store
const rootReducer = combineReducers({
    budget: budgetReducer,
    user: userReducer
});

//create the store with createStore()
//exporting it so it can be used by the provider component later
export default createStore(rootReducer, applyMiddleware(promiseMiddleware))