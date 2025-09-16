import { deleteToken } from "../storage/local.js";

const logOutBtn = document.getElementById('logout-btn');

logOutBtn.addEventListener("click", ()=> {
    deleteToken();
    window.location.href = '../../pages/index.html';
});