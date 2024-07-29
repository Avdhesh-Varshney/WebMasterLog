document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("register-form");
    const button = document.getElementById("submit-button");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();
        console.log("clicked")


        // Clear previous error messages
        document.getElementById("username-error").textContent = "";
        document.getElementById("email-error").textContent = "";
        document.getElementById("pass-error").textContent = "";

        // Get form values
        const username = document.getElementById("username").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Validate form values
        let valid = true;

        if (username.length < 3) {
            document.getElementById("username-error").textContent = "Username must be at least 3 characters long.";
            valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            document.getElementById("email-error").textContent = "Invalid email address.";
            valid = false;
        }

        if (password.length < 8) {
            document.getElementById("pass-error").textContent = "Password must be at least 8 characters long.";
            valid = false;
        }
        // console.log(event.target.getAttribute("class"))


        if (!valid) {
            return;
        }

        // Send data to backend API
        console.log("st", valid)
        try {
            button.setAttribute("class", "flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 pointer-events-none opacity-50")
            const response = await fetch("http://localhost:9000/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, email, password })
            });

            if (!response.ok) {
                // console.log(response.json())
                const errorData = await response.json();
                console.log(errorData)
                if (errorData.response) {
                    const { email, username, password } = errorData.response;
                    document.getElementById("username-error").textContent = username || "";
                    document.getElementById("email-error").textContent = email || "";
                    document.getElementById("pass-error").textContent = password || "";
                } else {
                    alert("An error occurred. Please try again.");
                }
            } else {
                form.reset();
                alert("Account created successfully! Login now.");
                window.location.href = "../frontend/Login.html"
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
