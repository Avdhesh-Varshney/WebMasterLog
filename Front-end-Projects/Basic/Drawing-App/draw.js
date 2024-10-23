canvas.addEventListener("mousedown", start);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stop);
canvas.addEventListener("mouseout", stop);

function start(e) {
    closeAllTabs();
    if (e.button == 2 || e.button == 1) return;
    isDrawing = true;
    draw(e);
}

function draw({ clientX: x, clientY: y }) {
    if (!isDrawing) return;
    ctx.lineWidth = thickness;
    ctx.strokeStyle = color;
    if (mode == "pen") {
        ctx.globalCompositeOperation = "source-over";
        ctx.lineCap = "round";
        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    if (mode == "erase") {
        ctx.globalCompositeOperation = "destination-out";
        ctx.beginPath();
        ctx.arc(x, y, thickness, 0, Math.PI * 2, false);
        ctx.fill();
    }
    if (mode == "ellipse") {
        ctx.beginPath();
        ctx.lineCap = "round";
        ctx.arc(x, y, 20, 0, 2 * Math.PI, false);
        ctx.stroke();
    }
}
function stop() {
    isDrawing = false;
    ctx.beginPath();
    restore_array.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
}
