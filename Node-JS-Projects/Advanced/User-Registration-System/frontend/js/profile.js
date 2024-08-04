document.addEventListener("DOMContentLoaded", () => {
    const beforeLogin = document.getElementById("before-login");
    const afterLogin = document.getElementById("after-login");

    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)

    if (user && user.accessToken) {
        // Assuming user information is also stored in localStorage
        const username = user?.username || "Unknown";
        const email = user?.email || "";

        document.getElementById("username").textContent = username;
        document.getElementById("email").textContent = email;

        beforeLogin.style.display = "none";
        afterLogin.style.display = "block";
    } else {
        beforeLogin.style.display = "block";
        afterLogin.style.display = "none";
    }

    afterLogin.querySelector("button").addEventListener("click", () => {
        localStorage.removeItem("user");

        beforeLogin.style.display = "block";
        afterLogin.style.display = "none";
    });
});
