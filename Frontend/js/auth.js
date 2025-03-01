function updateIslamicDate() {
    let today = new Date();
    let options = { year: 'numeric', month: 'long', day: 'numeric' };

    let gregorianDate = today.toLocaleDateString('ur-PK', options).replace("،", "").trim();
    let islamicDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', options).format(today);
    islamicDate = islamicDate.replace("هـ", "ھ").replace("ھ ھ", "ھ");

    let dateElement = document.getElementById("islamic-date");
    if (dateElement) {
        dateElement.innerHTML = islamicDate + " | " + gregorianDate + " ء";
    }
}

updateIslamicDate();

const API_URL = "http://localhost:5000/api/auth"; // Backend API

// Function to handle signup
async function handleSignup(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    const response = await fetch(`${API_URL}/createuser`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
    });

    const data = await response.json();
    if (response.ok) {
        alert("Signup Successful! Please login.");
        window.location.href = "login.html";
    } else {
        alert(data.error || "Signup Failed");
    }
}

// Function to handle login
async function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (response.ok) {
        localStorage.setItem("token", data.authtoken);  // ✅ Token store karein
        localStorage.setItem("username", data.username); // ✅ Username store karein
        alert("Login Successful!");
        window.location.href = "../index.html";
    } else {
        alert(data.error || "Login Failed");
    }
}

// Event Listeners for Forms
document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");
    if (signupForm) {
        signupForm.addEventListener("submit", handleSignup);
    }

    const loginForm = document.getElementById("login-form");
    if (loginForm) {
        loginForm.addEventListener("submit", handleLogin);
    }
});
