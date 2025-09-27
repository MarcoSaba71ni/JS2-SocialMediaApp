import { deleteToken } from "../storage/local.js";

// logout.js
document.addEventListener("DOMContentLoaded", () => {
  const logoutBtn = document.querySelector("#logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      window.location.href = "../../pages/index.html"; 
    });
  }
});
