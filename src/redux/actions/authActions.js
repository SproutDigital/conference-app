import * as types from './types';


export const setExpoToken = (expoToken) => dispatch => {
   dispatch({
    type: types.SET_EXPO_TOKEN,
    expoToken,
  });
}

export const setProfile = (profile) => dispatch => {
  dispatch({
    type: types.SET_PROFILE,
    profile,
  });
}

export const setSessionToken = (sessionToken) => dispatch => {
  dispatch({
    type: types.SET_SESSION_TOKEN,
    sessionToken,
  });
}


export const logout = () => dispatch => {
    dispatch({
      type: types.LOG_OUT,
    });
  }
  export const login = (sessionToken) => dispatch => {
    dispatch({
      type: types.LOGIN,
      sessionToken
    });
  }
  


export const queryProducts = () => {
  return async dispatch => {
    //dispatch(fetchAssistantRequest());
    try {

          // let response =  await productQuery; 
          // console.log({'response':response})
          //  await dispatch(fetchProducts(response));
        // }
      
     // });
    } catch (error) {
      console.log({error})
     // dispatch(fetchAssistantFailure(error));
    }
  };
};

