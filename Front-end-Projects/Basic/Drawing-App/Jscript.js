const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const colorPicker = document.querySelector(".colorPicker");
const backgroundPicker = document.querySelector(".backgroundPicker");
const downloadBtn = document.querySelector(".downloadBtn");
const toolBox = document.querySelector(".toolbox");
const tabs = document.querySelectorAll(".tab");
let isDrawing = false;
let restore_array = [];
let index = -1;
let color = "white";
let mode = "pen";
let thickness;

downloadBtn.addEventListener("click", download);
function download() {
    downloadBtn.href = canvas.toDataURL();
}

function undo() {
    if (index <= 0) {
    } else {
        index -= 1;
        restore_array.pop();
        ctx.putImageData(restore_array[index], 0, 0);
    }
}

window.addEventListener("resize", resizeCanvas);
function resizeCanvas() {
    let height = window.innerHeight;
    let width = window.innerWidth;

    canvas.height = height;
    canvas.width = width;

    try {
        ctx.putImageData(restore_array[index], 0, 0);
    } catch (err) {
        console.warn(err);
    }
}

function closeAllTabs() {
    for (const tab of tabs) {
        tab.style.display = "none";
    }
}

function openTab(tab) {
    if (!tab) return;
    closeAllTabs();
    const el = document.querySelector(`.${tab}`);
    el.style.display = "block";
    el.style.left = toolBox.offsetWidth + 10 + "px";
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function updateColor() {
    color = colorPicker.value;
    cursor.backgroundColor = color;
}

function updateBgColor() {
    canvas.style.backgroundColor = backgroundPicker.value;
}

document.addEventListener("keydown", (e) => {
    console.log(e);
    const keys = ["z", "s", "c", "e"];
    const key = e.key.toLowerCase();
    const ctrl = e.ctrlKey;
    if (keys.includes(key)) e.preventDefault();
    // Ctrl Shortcuts
    if (key == "z" && ctrl) return undo();
    if (e.key == "s" && ctrl) return downloadBtn.click();
    // Key shortcuts
    if (key == "c") return openTab("colorTab");
    if (key == "e") return changeBrush("erase");
});

const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", ({ clientX: x, clientY: y }) => {
    cursor.style.left = x + "px";
    cursor.style.top = y + "px";
});

const thicknessBtn = document.querySelector(".thickness");
thicknessBtn.addEventListener("change", updateThickness);
function updateThickness() {
    thickness = thicknessBtn.value;

    if (thickness > 4) {
        cursor.style.display = "block";
        canvas.style.cursor = "none";
    } else {
        cursor.style.display = "none";
        canvas.style.cursor = "crosshair";
    }
    cursor.style.setProperty("--cursor-width", thickness + "px");
}
function changeBrush(brush) {
    if (!brush) return;
    mode = brush;
}

function init() {
    restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
    resizeCanvas();
    colorPicker.value = "#ffffff";
    color = colorPicker.value;
    updateThickness();
}
init();
