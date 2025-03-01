document.addEventListener("DOMContentLoaded", function () {
    // Token check
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); // Signup/Login ka naam
    let authButton = document.getElementById("auth-button");

    if (authButton) {
        if (token && username) {
            // Agar user logged in hai to naam dikhayein aur dashboard link dein
            authButton.innerHTML = `<button class="btn login-btn" type="button">${username}</button>`;
            authButton.href = "./html/dashboard.html";
        } else {
            // Agar login nahi kiya to "لاگ ان" button wapas login page par le jaye
            authButton.innerHTML = `<button class="btn login-btn" type="button">لاگ ان</button>`;
            authButton.href = "./html/login.html";
        }
    }

    // Islamic Date Update
    function updateIslamicDate() {
        let today = new Date();
        let options = { year: 'numeric', month: 'long', day: 'numeric' };
    
        let gregorianDate = today.toLocaleDateString('ur-PK', options).replace("،", "").trim();
        let islamicDate = new Intl.DateTimeFormat('ar-TN-u-ca-islamic', options).format(today);
        islamicDate = islamicDate.replace("هـ", "ھ").replace("ھ ھ", "ھ");
    
        let dateElements = document.getElementsByClassName("islamic-date");
        
        for (let i = 0; i < dateElements.length; i++) {
            dateElements[i].innerHTML = islamicDate + " | " + gregorianDate + " ء ";
        }
    }

    updateIslamicDate();

    const apiUrl = "https://api.aladhan.com/v1/timingsByCity?city=Karachi&country=Pakistan&method=2";

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const timings = data.data.timings;

            // Mapping prayer times to their respective elements
            const prayerTimes = {
                "فجر": timings.Fajr,
                "طلوع": timings.Sunrise,
                "زوال": timings.Dhuhr,
                "عصر": timings.Asr,
                "مغرب": timings.Maghrib,
                "عشاء": timings.Isha
            };

            document.querySelectorAll(".namaz-okat li").forEach(li => {
                const prayerName = li.querySelector(".namaz").innerText.trim();
                if (prayerTimes[prayerName]) {
                    li.querySelector(".time").innerText = prayerTimes[prayerName];
                }
            });
        })
        .catch(error => console.error("Error fetching prayer times:", error));
        
});
