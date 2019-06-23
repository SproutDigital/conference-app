const Baseurl = 'https://sprout-conference-app.herokuapp.com/';
import { AsyncStorage } from 'react-native';
import { Alert } from 'react-native';
const LoginEndpoint = `${Baseurl}loginUser`,
    RegisterEndpoint = `${Baseurl}create`;

export {
    LoginEndpoint,
    RegisterEndpoint,
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

export const saveProfile = async (token, phone, profile_id, image, data) => {
    let profile = {
        'token': token,
        'phone': phone,
        'profile_id': profile_id,
        'image': image,
        'data': data
    };

    return await AsyncStorage.setItem('profile', JSON.stringify(profile))
}

export const getProfile = async () => {
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
    let token = {
        'token': expoToken
    };
    return await AsyncStorage.setItem('expoToken', JSON.stringify(token))
}

export const getExpoToken = async () => {
    return await AsyncStorage.getItem('expoToken')
        .then((value) => {
            if (value) {
                return JSON.parse(value);
            } else {
                return false;
            }
        });
}