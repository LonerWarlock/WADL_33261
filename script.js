const form = document.getElementById("registrationForm");
let users = JSON.parse(localStorage.getItem("users")) || [];

document.addEventListener("DOMContentLoaded", () => {
    const logoutButton = document.getElementById("logoutButton");

    // If the user is logged in (you can check localStorage or sessionStorage)
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (!loggedInUser) {
        // If no user is logged in, redirect to login page
        window.location.href = "login.html";
    }

    // Handle logout
    if (logoutButton) {
        logoutButton.addEventListener("click", () => {
            // Clear user session data
            localStorage.removeItem("loggedInUser");

            // Redirect to login page
            window.location.href = "login.html";
        });
    }
});

