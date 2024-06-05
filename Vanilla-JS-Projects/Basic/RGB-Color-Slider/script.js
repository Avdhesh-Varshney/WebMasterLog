
var sliderR = document.getElementById("R");
var sliderG = document.getElementById("G");
var sliderB = document.getElementById("B");
var Square =  document.getElementById("square");

var outputR = document.getElementById("OutputR");
var outputG = document.getElementById("OutputG");
var outputB = document.getElementById("OutputB");


outputR.innerHTML = sliderR.value;
outputG.innerHTML = sliderG.value;
outputB.innerHTML = sliderB.value;


sliderR.oninput = function() {
  outputR.innerHTML = this.value;
  changeColor();
}

sliderG.oninput = function() {
  outputG.innerHTML = this.value;
  changeColor();
}

sliderB.oninput = function() {
  outputB.innerHTML = this.value;
  changeColor();
}

function changeColor() {
  var r = sliderR.value;
  var g = sliderG.value;
  var b = sliderB.value;
  Square.style.backgroundColor = `rgb(${r},${g},${b})`;
}


changeColor();