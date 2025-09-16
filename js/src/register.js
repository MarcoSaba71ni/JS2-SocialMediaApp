import { registerUser } from "../api/auth.js";
import { saveToken } from "../storage/local.js";

const registerForm = document.getElementById('register-form');
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userData = {
        name: registerForm.name.value,
        email: registerForm.email.value,
        password: registerForm.password.value
    };
    console.log(userData);
    try {
        const response = await registerUser(userData);
        if(response.data?.name) {
            window.location.href = '../pages/login.html';           
        } else {
             throw new Error('Registration failed: no token received');
        }

    } catch (error) {
        console.error(error);
        alert('Account could not be registered');
    }
} );