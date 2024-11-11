let btn = document.querySelector(".pass");
let btn1 = document.querySelector(".Spass");
let loginPass = document.querySelector("#login-password");
let signupPass = document.querySelector("#signup-password");

//for login password toggle
btn.onclick = () => {
    if(loginPass.type === 'text'){
        loginPass.type = 'password'
        btn.classList.remove('fa-lock-open');
        btn.classList.add('fa-lock');
    }
    else{
        loginPass.type = 'text'
        btn.classList.remove('fa-lock');
        btn.classList.add('fa-lock-open');
    }
}

//for singup password toggle
btn1.onclick = () => {
    if(signupPass.type === 'text'){
        signupPass.type = 'password'
        btn1.classList.remove('fa-lock-open');
        btn1.classList.add('fa-lock');
    }
    else{
        signupPass.type = 'text'
        btn1.classList.remove('fa-lock');
        btn1.classList.add('fa-lock-open');
    }
}
