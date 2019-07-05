import * as types from '../actions/types';

const initialState = {
    profile:[]
}
export default function profileReducer(state = initialState, action) {
    switch(action.type){
        case types.ADD_PROFILE: 
       // state.profile.filter((item, i) => i !== action.profile.index),
            return Object.assign({}, state, {
               profile:[action.profile, ...state.profile]
                
            });
         default:
            return state;

    }
}