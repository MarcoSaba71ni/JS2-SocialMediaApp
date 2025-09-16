import { checkAuth } from "../utils/checkAuth.js";

const loginBtn = document.getElementById('login-index');
const registerBtn = document.getElementById('register-index');

loginBtn.addEventListener("click", ()=> {
    checkAuth();
    window.location.href = "../../pages/login.html";
})

registerBtn.addEventListener("click", ()=> {
    checkAuth();
    window.location.href =  "../../pages/register.html";
})