const labels = document.querySelectorAll(".hidebottom ,.hidemiddle");
labels.forEach((label) => {
  label.addEventListener("click", () => {
    alert("This is just a UI clone");
  });
});

function hidemiddle() {
  console.log("working");
  // const vall=document.getElementById('topics');
  const middle = document.getElementsByClassName("middlelevel")[0];
  const arrow = document.getElementById("arrow");
  const hidemiddle = document.querySelectorAll(".hidemiddle");
  if (middle.style.height === "500px") {
    middle.style.height = "50px";
    arrow.style.transform = "rotateZ(0deg)";
    hidemiddle.forEach((button) => {
      button.style.opacity = "0";
    });
  } else {
    middle.style.height = "500px";
    arrow.style.transform = "rotateZ(180deg)";
    hidemiddle.forEach((button) => {
      button.style.opacity = "1";
    });
  }
}

function hidebottom() {
  console.log("working");
  // const vall=document.getElementById('topics');
  const bottom = document.getElementsByClassName("bottomlevel")[0];
  const arrow = document.getElementById("arrow2");
  const hidebottom = document.querySelectorAll(".hidebottom");
  if (bottom.style.height === "500px") {
    bottom.style.height = "50px";
    arrow.style.transform = "rotateZ(0deg)";
    hidebottom.forEach((button) => {
      button.style.opacity = "0";
    });
  } else {
    bottom.style.height = "500px";
    arrow.style.transform = "rotateZ(180deg)";
    hidebottom.forEach((button) => {
      button.style.opacity = "1";
    });
  }
}

function clickk(){
    alert('This is just a UI Clone.');
}