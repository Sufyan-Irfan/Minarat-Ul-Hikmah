document.addEventListener("DOMContentLoaded", function () {
    // Token check
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); // Signup/Login ka naam
    let authButton = document.getElementById("auth-button");

    if (authButton) {
        if (token && username) {
            // Agar user logged in hai to naam dikhayein aur dashboard link dein
            authButton.innerHTML = `<button class="btn login-btn" type="button">${username}</button>`;
            authButton.href = "./dashboard.html";
        } else {
            // Agar login nahi kiya to "لاگ ان" button wapas login page par le jaye
            authButton.innerHTML = `<button class="btn login-btn" type="button">لاگ ان</button>`;
            authButton.href = "./login.html";
        }
    }

    // Islamic Date Update
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
});
