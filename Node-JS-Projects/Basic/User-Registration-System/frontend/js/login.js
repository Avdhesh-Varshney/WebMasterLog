document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("login-form");
    const button = document.getElementById("submit-button");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        document.getElementById("login-error").textContent = "";

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById("login-error").textContent = "Invalid email address.";
            return;
        }

        if (password.length < 8) {
            document.getElementById("login-error").textContent = "Password must be at least 8 characters long.";
            return;
        }

        try {
            button.setAttribute("class", "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 pointer-events-none opacity-50")
            const response = await fetch("http://localhost:9000/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                const errorData = await response.json();
                console.log(errorData)
                if (errorData.message) {
                    document.getElementById("login-error").textContent = errorData.message || "";
                } else {
                    alert("An error occurred. Please try again.");
                }
            } else {
                form.reset();
                alert("Login successful!");
                const userData = await response.json();
                localStorage.setItem("user", JSON.stringify(userData.response))
                window.location.href = "../frontend/index.html"
            }
        } catch (error) {
            alert("An error occurred. Please try again.");
            console.error("Error:", error);
        }finally {
            button.setAttribute("class", "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600")

            console.log("end")
        }
    });
});
