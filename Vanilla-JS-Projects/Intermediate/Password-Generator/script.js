const passwordBox = document.getElementById("password");
const length = 12;
const upperCase = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerCase = "abcdefghijklmnopqrstuvwxyz";
const number = "01223456789";
const symbols = "@#$%^&*()_=~{}[]<>/-=";
const allChars=upperCase+lowerCase+number + symbols;
function generatePassword(){
    let password="";
    password+=upperCase[Math.floor(Math.random()*upperCase.length)];
    password+=lowerCase[Math.floor(Math.random()*lowerCase.length)];
    password+=number[Math.floor(Math.random()*number.length)];
    password+=symbols[Math.floor(Math.random()*symbols.length)];

    while(length>password.length){
        password+=allChars[Math.floor(Math.random()*allChars.length)];

    }

    passwordBox.value=password;

}

async function copyPassword(){
    const passwordBox = document.getElementById("password"); 
    passwordBox.select();

    try {
        const textToCopy = passwordBox.value;
        await navigator.clipboard.writeText(textToCopy);
        console.log("Password copied to clipboard");
    } catch (err) {
        console.error("Error copying password to clipboard", err);
    }

    window.getSelection().removeAllRanges();
}