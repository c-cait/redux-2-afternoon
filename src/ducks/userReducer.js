import axios from 'axios';

const initialState = {
    email: null, 
    firstName: null, 
    lastname: null
}

//action constatnt
const REQUEST_USER_DATA = 'REQUEST_USER_DATA'

//action creator 
export const requestUserData = () =>{
    const data = axios.get('/auth/user-data').then(res => res.data)
    return {
        type: REQUEST_USER_DATA,
        payload: data
    }
}

//REDUCER FXN
//this returns object to the store
//using switch inside of the fxn enables the redux store to update its state
//dynamically based on the action type passed in
//this function runs when the action creators are invoked in a component

export default function Reducer(state = initialState, action){
    switch(action.type){
        case REQUEST_USER_DATA + '_FULFILLED':
        const { email, firstName, lastName } = action.payload.user
        return { email, firstName, lastName };
    default: 
        return state;
    }
}