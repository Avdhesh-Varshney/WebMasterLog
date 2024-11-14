const typewriterText = 'Sigma - DSA + Web Development';
        let index = 0;
        const speed = 150;

        function typeWriter() {
            if (index < typewriterText.length) {
                document.getElementById('typewriter').innerHTML += typewriterText.charAt(index);
                index++;
                setTimeout(typeWriter, speed);
            }
        }

        window.onload = typeWriter;

        // Modal handling for Signup
        const signupModal = document.getElementById('signupModal');
        const openSignup = document.getElementById('openSignup');
        const closeSignup = document.getElementById('closeSignup');

        openSignup.onclick = function () {
            signupModal.style.display = 'flex';
        }

        closeSignup.onclick = function () {
            signupModal.style.display = 'none';
        }

        // Modal handling for Login
        const loginModal = document.getElementById('loginModal');
        const openLogin = document.getElementById('openLogin');
        const closeLogin = document.getElementById('closeLogin');

        openLogin.onclick = function () {
            loginModal.style.display = 'flex';
        }

        closeLogin.onclick = function () {
            loginModal.style.display = 'none';
        }

        // Close modals when clicking outside of them
        window.onclick = function (event) {
            if (event.target == signupModal) {
                signupModal.style.display = 'none';
            }
            if (event.target == loginModal) {
                loginModal.style.display = 'none';
            }
        }