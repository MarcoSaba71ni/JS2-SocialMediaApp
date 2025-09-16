import {apiPost} from './api.js';

export async function loginUser (credentials) {
    return apiPost('/auth/login', credentials);
}


export async function registerUser(userData) {
    return apiPost('/auth/register', userData);
}