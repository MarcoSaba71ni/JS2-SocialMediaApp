export function saveToken(token, user) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function getToken() {
    const token = localStorage.getItem('accessToken');
    console.log("token", token);    
    return token;
}

export function deleteToken() {
    localStorage.removeItem('accessToken');
     localStorage.removeItem("user");
}

export function getUser() {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
} 