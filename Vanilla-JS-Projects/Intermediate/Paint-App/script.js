document.addEventListener("DOMContentLoaded", function () {
  // Running main function
  main();

  // Adding event listeners
  canvas.addEventListener("touchmove", handleTouchMove);
  canvas.addEventListener("touchstart", handleTouchStart);
  canvas.addEventListener("touchend", handleTouchEnd);
  canvas.addEventListener("mousemove", handleMouseMove);
  canvas.addEventListener("mousedown", handleMouseDown);
  canvas.addEventListener("mouseup", handleMouseUp);
  canvas.addEventListener("mouseout", handleMouseOut);

  document.getElementById("selectPen").addEventListener("click", function () {
    changeTool("pen");
  });

  document
    .getElementById("selectEraser")
    .addEventListener("click", function () {
      changeTool("eraser");
    });

  document.getElementById("clear").addEventListener("click", function () {
    clear();
  });

  document
    .getElementById("settings")
    .addEventListener("click", function (event) {
      event.preventDefault();
      toggleOptions();
    });

  document
    .getElementById("strokeSlider")
    .addEventListener("input", function () {
      setStroke();
    });

  // Simple example, see optional options for more configuration.
  const pickr = Pickr.create({
    el: "#selectColor",
    theme: "nano", // or 'monolith', or 'nano'
    container: "body",
    swatches: [
      "rgba(244, 67, 54, 1)",
      "rgba(233, 30, 99, 0.95)",
      "rgba(156, 39, 176, 0.9)",
      "rgba(103, 58, 183, 0.85)",
      "rgba(63, 81, 181, 0.8)",
      "rgba(33, 150, 243, 0.75)",
      "rgba(3, 169, 244, 0.7)",
      "rgba(0, 188, 212, 0.7)",
      "rgba(0, 150, 136, 0.75)",
      "rgba(76, 175, 80, 0.8)",
      "rgba(139, 195, 74, 0.85)",
      "rgba(205, 220, 57, 0.9)",
      "rgba(255, 235, 59, 0.95)",
      "rgba(255, 193, 7, 1)",
    ],
    default: "#0000ff",
    components: {
      // Main components
      opacity: false,
      hue: true,
      // Input / output options
      interaction: {
        hex: false,
        rgba: false,
        input: false,
        save: false,
      },
    },
  });

  pickr.on("change", function (color, instance) {
    setColor(`${color.toRGBA()}`);
    pickr.applyColor(true);
  });
});

var canvas, ctx;
var settings = {
  currentTool: "pen",
  backgroundColor: "white",
  width: 5,
  pen: {
    name: "pen",
    color: "blue",
    lineCap: "round",
  },
  eraser: {
    name: "eraser",
    color: "white",
    lineCap: "round",
  },
};
let cord = { x: 0, y: 0 };
var isPainting = false;

function main() {
  document.getElementById("loader").style.animation = "fade .3s linear 1s";
  setTimeout(() => {
    document.getElementById("loader").style.display = "none";
  }, 1300);
  canvas = document.getElementById("canvas");
  resizeCanvas();
  ctx = canvas.getContext("2d");
  ctx.lineJoin = "round";
  document.getElementById("c-border").style.backgroundColor =
    settings.pen.color;
}

function getPosition(e) {
  cord.x = e.clientX - canvas.offsetLeft;
  cord.y = e.clientY - canvas.offsetTop;
}

function resizeCanvas() {
  canvas.width = document.getElementById("canvas-container").clientWidth;
  canvas.height = document.getElementById("canvas-container").clientHeight;
}

function clear() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function changeTool(e) {
  if (e == "pen") {
    canvas.style.cursor = "crosshair";
    document.getElementById("selectPen").style.backgroundColor = "#ccc";
    document.getElementById("selectEraser").style.backgroundColor = "#fff";
  } else if (e == "eraser") {
    canvas.style.cursor = "eraser";
    document.getElementById("selectEraser").style.backgroundColor = "#ccc";
    document.getElementById("selectPen").style.backgroundColor = "#fff";
  }
  settings.currentTool = e;
}

function currentTool() {
  if (settings.currentTool === "pen") {
    return settings.pen;
  } else if (settings.currentTool === "eraser") {
    return settings.eraser; // Assuming you have an eraser tool defined in your settings object
  }
}

function setValue(e, t) {
  return (settings[settings.currentTool][e] = t);
}

function setColor(e) {
  settings.pen.color = e;
}

function setStroke() {
  var e = document.getElementById("strokeSlider");
  var t = document.getElementById("stroke-preview");
  t.style.width = e.value + "px";
  t.style.height = e.value + "px";
  settings.width = e.value;
}

function openSettings() {
  var e = document.getElementById("options");
  e.style.animation = "goUp .2s ease-in ";
  setTimeout(() => {
    e.style.bottom = "70px";
    e.style.zIndex = "123";
    e.style.opacity = "1";
  }, 200);
}

function closeSettings() {
  var e = document.getElementById("options");
  e.style.animation = "goDown .2s ease-out ";
  setTimeout(() => {
    e.style.bottom = "-50px";
    e.style.zIndex = "5";
    e.style.opacity = "0";
  }, 200);
}

setTimeout(() => {
  if (settings.currentTool == "pen") {
    canvas.style.cursor = "crosshair";
    document.getElementById("selectPen").style.backgroundColor = "#ccc";
    document.getElementById("selectEraser").style.backgroundColor = "#fff";
  } else {
    canvas.style.cursor = "eraser";
    document.getElementById("selectEraser").style.backgroundColor = "#ccc";
    document.getElementById("selectPen").style.backgroundColor = "#fff";
  }
}, 10);

var isSettOpen = false;

function toggleOptions() {
  if (isSettOpen) {
    closeSettings();
    isSettOpen = false;
  } else {
    openSettings();
    isSettOpen = true;
  }
}

function handleTouchMove(e) {
  e.preventDefault();
  var t, n;
  t = e.touches[0].clientX - canvas.offsetLeft;
  n = e.touches[0].clientY - canvas.offsetTop;
  ctx.lineTo(t, n);
  ctx.strokeStyle = currentTool().color;
  ctx.lineWidth = settings.width;
  ctx.lineCap = currentTool().lineCap;
  ctx.stroke();
}

function handleTouchStart(e) {
  e.preventDefault();
  var t, n;
  t = e.touches[0].clientX - canvas.offsetLeft;
  n = e.touches[0].clientY - canvas.offsetTop;
  ctx.beginPath();
  ctx.lineTo(t, n);
  ctx.strokeStyle = currentTool().color;
  ctx.lineWidth = settings.width;
  ctx.lineCap = currentTool().lineCap;
  ctx.stroke();
}

function handleTouchEnd(e) {
  e.preventDefault();
}

function handleMouseMove(e) {
  if (isPainting) {
    console.log("Current Tool:", currentTool()); // Log the current tool object
    ctx.beginPath();
    ctx.strokeStyle = currentTool().color;
    ctx.lineWidth = settings.width;
    ctx.lineCap = currentTool().lineCap;
    ctx.moveTo(cord.x, cord.y);
    getPosition(e);
    ctx.lineTo(cord.x, cord.y);
    ctx.stroke();
  }
}

function handleMouseDown(e) {
  isPainting = true;
  getPosition(e);
}

function handleMouseUp(e) {
  isPainting = false;
}

function handleMouseOut(e) {
  isPainting = false;
}
