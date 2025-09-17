import { loginUser } from "../api/auth.js"
import { saveToken } from "../storage/local.js";
import { ApiError } from "../api/api.js";

const loginForm = document.getElementById('login-form');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    const credentials = {
        email: loginForm.email.value,
        password: loginForm.password.value,
    };

    try {
        const result = await loginUser(credentials);
        console.log("Login result:", result);

        if (result.accessToken) {
            saveToken(result.accessToken);
            window.location.href = "../../pages/feed.html";
        } else if (result.errors?.[0]) {
            alert(result.errors[0].message);
        }
    } catch (error) {
        if (error instanceof ApiError) {
            if (error.status === 400) {
                alert('Please fill in all inputs.');
            } else if (error.status === 401) {
                alert("Wrong password or email.");
            } else if (error.status === 404) {
                alert('User does not exist.');
            } else {
                alert('Unexpected error: ' + error.message);
            }
        } else {
            alert('Network error: ' + error.message);
        }
    }
});

