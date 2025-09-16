import { loginUser } from "../api/auth.js"
import { getToken, saveToken } from "../storage/local.js";

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event)=> {
    event.preventDefault();

    const credentials = {
        email: loginForm.email.value,
        password: loginForm.password.value,
    }

    try {
        const result = await loginUser(credentials);
        console.log("Login result:", result);

        if(result.accessToken){
            saveToken(result.data.accessToken);
            console.log('Login Successful');
            window.location.href = "../../pages/feed.html";
        } else if (result.errors[0]){
            alert(result.errors[0].message);
        }
    } catch {
        throw new Error(error);
        alert("Login Invalid, try again");
    }
})

