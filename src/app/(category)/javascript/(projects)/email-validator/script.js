const resultCard= document.getElementById("resultcard");
resultCard.style.display = 'none';

const result= document.getElementById("result");
const ulElement = document.getElementById("cardlist"); // Or querySelector if needed

function validateEmail() {
    
    const email = document.getElementById("emailInput").value;
    resultCard.style.display = 'block';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!email){
        ulElement.style.borderColor = "#f92f60"; 
        result.innerText = "❌ Please Enter an Email Address";
        return; 
    }
    if (!emailRegex.test(email)) {
        ulElement.style.borderColor = "#f92f60"; 
        result.innerText = "❌ Invalid email format. Example: user@example.com";
        return;
    }
    if(isDisposableEmail(email)){
        ulElement.style.borderColor = "#f92f60"; 
        result.innerText = "❌ Temporary email domain not allowed.";
        return;
    }

    // Send email to Node.js for further validation
    fetch("http://localhost:3000/validate?email=" + encodeURIComponent(email))
        .then(response => response.json())
        .then(data => {
            if (data.valid) {
                ulElement.style.borderColor = "#caf438"; 
                result.innerText = "✅ Valid Email & Domain Exists!";
            } else {
                ulElement.style.borderColor = "#ffb02e"; 
                result.innerText = "⚠️ The domain does not exist or has no mail server!";
            }
        })
        .catch(error => console.error("Error:", error));
}

const disposableDomains = ["mailinator.com", "temp-mail.org", "guerrillamail.com"];

function isDisposableEmail(email) {
    const domain = email.split("@")[1];
    return disposableDomains.includes(domain);
}
