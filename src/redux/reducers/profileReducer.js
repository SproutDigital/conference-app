import * as types from '../actions/types';

const initialState = {
    profile:[],
}
export default function profileReducer(state = initialState, action) {
    switch(action.type){
        case types.ADD_PROFILE: 
            return Object.assign({}, state, {
                profile: [action.profile, ...profile]
            });
        
         default:
            return state;

    }
}