// Video Slider
let currentVideoIndex = 0;
const videos = document.querySelectorAll(".video");

function displayVideo(index) {
  videos.forEach((video, idx) => {
    video.style.display = idx === index ? "block" : "none";
    idx === index ? video.play() : video.pause();
  });
}

function nextVideo() {
  currentVideoIndex = (currentVideoIndex + 1) % videos.length;
  displayVideo(currentVideoIndex);
}

function previousVideo() {
  currentVideoIndex = (currentVideoIndex - 1 + videos.length) % videos.length;
  displayVideo(currentVideoIndex);
}

videos.forEach((video) => video.addEventListener("ended", nextVideo));

displayVideo(currentVideoIndex);

// Image Slider
let currentSlideIndex = 1;
displaySlides(currentSlideIndex);

function changeSlide(n) {
  displaySlides((currentSlideIndex += n));
}

function setSlide(n) {
  displaySlides((currentSlideIndex = n));
}

function displaySlides(n) {
  const slides = document.querySelectorAll(".mySlides");
  const dots = document.querySelectorAll(".demo");
  const caption = document.getElementById("caption");

  if (n > slides.length) currentSlideIndex = 1;
  if (n < 1) currentSlideIndex = slides.length;

  slides.forEach((slide) => (slide.style.display = "none"));
  dots.forEach((dot) => (dot.className = dot.className.replace(" active", "")));

  slides[currentSlideIndex - 1].style.display = "block";
  dots[currentSlideIndex - 1].className += " active";
  caption.textContent = dots[currentSlideIndex - 1].alt;
}

// Form Submission
document
  .getElementById("consultationForm")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Form submitted!");
  });

// Mobile Menu
const menu = document.querySelector(".menu1");
const mainMenu = menu.querySelector(".menu-main");
const backButton = menu.querySelector(".go-back");
const menuButton = document.querySelector(".mobile-menu-trigger");
const closeButton = menu.querySelector(".mobile-menu-close");
let subMenu;

mainMenu.addEventListener("click", (e) => {
  if (!menu.classList.contains("active")) return;

  const parentMenuItem = e.target.closest(".menu-item-has-children");
  if (parentMenuItem) {
    showSubMenu(parentMenuItem);
  }
});

backButton.addEventListener("click", hideSubMenu);
menuButton.addEventListener("click", toggleMenu);
closeButton.addEventListener("click", toggleMenu);
document.querySelector(".menu-overlay").addEventListener("click", toggleMenu);

function toggleMenu() {
  menu.classList.toggle("active");
  document.querySelector(".menu-overlay").classList.toggle("active");
}

function showSubMenu(parent) {
  subMenu = parent.querySelector(".sub-menu");
  subMenu.classList.add("active");
  subMenu.style.animation = "slideLeft 0.5s ease forwards";
  const menuTitle =
    parent.querySelector("i").parentNode.childNodes[0].textContent;
  menu.querySelector(".current-menu-title").textContent = menuTitle;
  menu.querySelector(".mobile-menu-head").classList.add("active");
}

function hideSubMenu() {
  subMenu.style.animation = "slideRight 0.5s ease forwards";
  setTimeout(() => subMenu.classList.remove("active"), 300);
  menu.querySelector(".current-menu-title").textContent = "";
  menu.querySelector(".mobile-menu-head").classList.remove("active");
}

window.addEventListener("resize", () => {
  if (window.innerWidth > 991 && menu.classList.contains("active")) {
    toggleMenu();
  }
});
