import { getToken } from "../storage/local.js";

export function checkAuth() {
    const token = getToken();
    if(!token) {
        window.location.href = '../../pages/index.html';
    }
};


