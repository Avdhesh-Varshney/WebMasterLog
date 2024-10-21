const menuIcon = document.querySelector('#menu-icon');
const navbar = document.querySelector('.navbar');

menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

function showMore() {
    var moreContent = document.getElementById("more-content");
    if (moreContent.style.display === "none") {
        moreContent.style.display = "block";
    } else {
        moreContent.style.display = "none";
    }
}
