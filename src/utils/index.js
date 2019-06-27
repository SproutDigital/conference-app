const Baseurl = 'https://sprout-conference-app.herokuapp.com/spr/';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
const LoginEndpoint = `${Baseurl}user/login`,
    RegisterEndpoint = `${Baseurl}user/register`,
    VerificationStatusEndpoint = `${Baseurl}user/check_status`,
    VerifyUserEndpoint = `${Baseurl}user/confirmation/`,
    Forgetpassword = `${Baseurl}user/forgotPassword`,
    ResetPassword = `${Baseurl}user/resetPassword`,
    RequestNewTokenEndpoint = `${Baseurl}user/resendEmailCode`

export {
    LoginEndpoint,
    RegisterEndpoint,
    VerificationStatusEndpoint,
    Forgetpassword,
    ResetPassword,
    VerifyUserEndpoint,
    RequestNewTokenEndpoint
}

export const isEmailValid = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const  isEmpty =(str)  => {
    return (!str || 0 === str.trim().length);
}

export const postRoute = (endpoint, body) => {

    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {

        return res;
    })
    .catch((error) => {
        return error;
    });
}

export const post = (endpoint, body, token) => {

    return fetch(endpoint, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
        body: body
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {

        return res;
    })
    .catch((error) => {
        return error;
    });
}


export const getRoute = (endpoint, token) => {

    return fetch(endpoint, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token,
        },
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {
        return res;
    })
    .catch((error) => {
        return Alert.alert(error.toString())
    });

}

export const putRoute = (endpoint, body) => {

    return fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: body
    })
    .then((res) => {
        return res.json();
    })
    .then((res) => {

        return res;
    })
    .catch((error) => {
        return error;
    });
}

export const saveToken = async (sessionToken) => {
    return await AsyncStorage.setItem('sessionToken', sessionToken)
}

export const getToken = async () => {
    return await AsyncStorage.getItem('sessionToken')
        .then((value) => {
        if (value) {
            return value;
        } else {
            return false;
        }
    });
}


export const saveExpoToken = async (expoToken) => {  
    return await AsyncStorage.setItem('expoToken', expoToken);
}

export const getExpoToken = async () => {
    return await AsyncStorage.getItem('expoToken')
        .then((value) => {
            if (value) {
                return value;
            } else {
                return false;
            }
        });
}


export const saveRegistration = async () => {  
    return await AsyncStorage.setItem('registered', 'registered');
}

export const getRegistrationStatus = async () => {
    return await AsyncStorage.getItem('registered')
        .then((value) => {
            if (value) {
                return value;
            } else {
                return false;
            }
        });
}


export const saveEmail = async (email) => {  
    await AsyncStorage.setItem('email', email);
    return await AsyncStorage.setItem('registered', 'registered');
}

export const getEmail = async () => {
    return await AsyncStorage.getItem('email')
        .then((value) => {
            if (value) {
                return value;
            } else {
                return false;
            }
        });
}

export const logout = async()=> {
    let keys = ['email', 'expoToken', 'registered', 'sessionToken'];
     return AsyncStorage.multiRemove(keys, (err) => {
    
    })
}