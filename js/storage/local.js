export function saveToken(token) {
    localStorage.setItem('accessToken', token);
}

export function getToken() {
    const token = localStorage.getItem('accessToken');
    console.log("token", token);    
    return token;
}

export function deleteToken() {
    localStorage.removeItem('accessToken');
}