// Script for header-slider functionality

const imgs = document.querySelectorAll('.header-slider ul img');
const prev_btn = document.querySelector('.control-prev');
const next_btn = document.querySelector('.control-next');

let n = 0;

function changeSlide() {
    for (let i = 0; i < imgs.length; i++) {
        imgs[i].style.display = 'none';
    }
    imgs[n].style.display = 'block';
}

function autoSlide() {
    n = (n + 1) % imgs.length; // Increment and loop back to 0
    changeSlide();
}

changeSlide();

// Set interval for automatic sliding every 3 seconds
setInterval(autoSlide, 3000);

prev_btn.addEventListener('click', () => {
    if (n > 0) {
        n--;
    } else {
        n = imgs.length - 1;
    }
    changeSlide();
});

next_btn.addEventListener('click', () => {
    if (n < imgs.length - 1) {
        n++;
    } else {
        n = 0;
    }
    changeSlide();
});
