import * as types from './types';

export const setEventDetails = (data) => dispatch => {
    //console.log({data})
   dispatch({
    type: types.SET_EVENT_DETAILS,
    data,
  });
}


  

