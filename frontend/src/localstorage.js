// localstorage.js
import axios from 'axios';

export const setAuthToken = (token) => {
    return localStorage.setItem('USER_TOKEN', token);
}
export const removeAuthToken = () => {
    return localStorage.removeItem('USER_TOKEN')
}

export const setAuthorization = (token) => {
    axios.defaults.headers.common['Authorization'] = token;
}

export const setAuthadminToken = (result) => {
    localStorage.setItem('ADMIN_DATA', JSON.stringify(result));
    localStorage.setItem("auth", true);
}

export const removeadminToken = () => {
    localStorage.removeItem('ADMIN_DATA');
    localStorage.removeItem("auth",false);
}
