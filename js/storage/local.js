
/**
 * 
 * @param {string} token - accessToken autorization colected from localStorage  
 * @param {Object} user - object collected from the localStorage that gets stringified.
 * @returns {void} the function does not returns a value. It sends data to the localStorage.
 * 
 * @example
 * // Save the token and the username in the localStorage
 * saveToken('abcd1234', {name: 'emiliano', email: 'emiliano@stud.noroff.no'})
 */
export function saveToken(token, user) {
    localStorage.setItem('accessToken', token);
    localStorage.setItem('user', JSON.stringify(user));
}

export function getToken() {
    const token = localStorage.getItem('accessToken');
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