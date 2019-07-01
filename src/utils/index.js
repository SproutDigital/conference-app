const Baseurl = 'https://sprout-conference-app.herokuapp.com/spr/';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
const LoginEndpoint = `${Baseurl}user/login`,
    RegisterEndpoint = `${Baseurl}user/register`,
    VerificationStatusEndpoint = `${Baseurl}user/check_status`,
    VerifyUserEndpoint = `${Baseurl}user/confirmation/`,
    Forgetpassword = `${Baseurl}user/forgotPassword`,
    ResetPassword = `${Baseurl}user/resetPassword`,
    RequestNewTokenEndpoint = `${Baseurl}user/resendEmailCode`,
    ProfileUpdateEndpoint = `${Baseurl}profile/`,
    ImageUploadEndpoint = `${Baseurl}upload/`

export {
    LoginEndpoint,
    RegisterEndpoint,
    VerificationStatusEndpoint,
    Forgetpassword,
    ResetPassword,
    VerifyUserEndpoint,
    RequestNewTokenEndpoint,
    ProfileUpdateEndpoint,
    ImageUploadEndpoint
}

export const isEmailValid = (email) => {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

export const  isEmpty =(str)  => {
    return (!str || 0 === str.trim().length);
}

export const sendRoute = (endpoint, body, method) => {

    return fetch(endpoint, {
        method: method,
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

export const putRoute = (endpoint, body, token) => {
    console.log({endpoint})
    console.log({body})
    console.log({'': `JWT ${token}`})
    return fetch(endpoint, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'access_token': `JWT ${token}`,
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

export const saveProfile = async(id, name, sessionToken) => {
    let profile = {
        id, name, sessionToken
    };

    return await AsyncStorage.setItem('profile', JSON.stringify(profile))
}


export const getProfile = async() => {
    return await AsyncStorage.getItem('profile')
        .then((value) => {
            if (value) {
                return JSON.parse(value);
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

export const saveEmail = async (email, location) => {  
    await AsyncStorage.setItem('email', email);
    if(location) {
        await AsyncStorage.setItem('notVerified', JSON.stringify(true))
        await AsyncStorage.setItem('isLoggedIn', JSON.stringify(true))
    }
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

export const getVerification = async () => {
    return await AsyncStorage.getItem('notVerified')
        .then((value) => {
            if (value) {
               
                return JSON.parse(value);
            } else {
                return false;
            }
        });
}

export const getLoggedInStatus = async () => {
    return await AsyncStorage.getItem('isLoggedIn')
        .then((value) => {
            if (value) {
               
                return JSON.parse(value);
            } else {
                return false;
            }
        });
}

export const updateVerification = async() => {
    return await AsyncStorage.setItem('notVerified', JSON.stringify(false));
}

export const logout = async()=> {
    let keys = ['email', 'expoToken', 'registered', 'profile', 'notVerified', 'isLoggedIn'];
     return AsyncStorage.multiRemove(keys, (err) => {
    
    })
}