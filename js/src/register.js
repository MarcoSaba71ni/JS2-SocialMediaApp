import { registerUser } from "../api/auth.js";
import { ApiError } from "../api/api.js";
import { saveToken } from "../storage/local.js";

const registerForm = document.getElementById('register-form');
registerForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const userData = {
        name: registerForm.name.value,
        email: registerForm.email.value,
        password: registerForm.password.value
    };

    if (!userData.name || !userData.email || !userData.password) {
    alert("All fields are required!");
    return;
}

    if(userData.password.length < 8) {
            alert("Password must be at least 8 characters long.");
        return; 
    }

    const fieldset = document.querySelector("fieldset");
    const registerBtn = document.getElementById("register-btn");
    const originalBtnText = registerBtn.textContent;

    try {
        registerBtn.textContent = "Registering...";
        fieldset.disabled = true;

        const response = await registerUser(userData);

        if(response.data?.name) {
            alert('Registration succesfull. You are being redirected to the log in page.');
            window.location.href = '../pages/login.html';       
        } else {
            alert('There was an error with you log in');
        }

    } catch (error) {
        handleRegistrationError(error);
    }

    finally {
        fieldset.disabled = false;
        registerBtn.textContent = originalBtnText;
    }
} );

    function handleRegistrationError(error) {
        if(error instanceof ApiError) {
            if(error.status === 400) {
                alert(error.message);
            } else {
                alert("Unexpected error: " + error.message);
            }
        }
    }  