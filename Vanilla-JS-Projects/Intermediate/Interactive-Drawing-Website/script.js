document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    const toolbar = document.querySelector('.toolbar');
    const penButton = document.getElementById('pen');
    const eraserButton = document.getElementById('eraser');
    const clearButton = document.getElementById('clear');
    const colorPicker = document.getElementById('colorPicker');
    const brushSize = document.getElementById('brushSize');
    const undoButton = document.getElementById('undo');
    const redoButton = document.getElementById('redo');
    const saveButton = document.getElementById('save');
    const loadButton = document.getElementById('load');

    canvas.width = window.innerWidth - 40;
    canvas.height = window.innerHeight - 160;

    let painting = false;
    let erasing = false;
    let undoStack = [];
    let redoStack = [];

    const startPosition = (e) => {
        painting = true;
        redoStack = [];
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        if (erasing) {
            ctx.strokeStyle = '#fff';
        }
    };

    const endPosition = () => {
        painting = false;
        ctx.beginPath();
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    };

    const draw = (e) => {
        if (!painting) return;
        ctx.lineWidth = brushSize.value;
        ctx.lineCap = 'round';
        if (!erasing) {
            ctx.strokeStyle = colorPicker.value;
        }
        ctx.lineTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(e.clientX - canvas.offsetLeft, e.clientY - canvas.offsetTop);
    };

    canvas.addEventListener('mousedown', startPosition);
    canvas.addEventListener('mouseup', endPosition);
    canvas.addEventListener('mousemove', draw);

    penButton.addEventListener('click', () => {
        erasing = false;
        penButton.classList.add('active');
        eraserButton.classList.remove('active');
    });

    eraserButton.addEventListener('click', () => {
        erasing = true;
        eraserButton.classList.add('active');
        penButton.classList.remove('active');
    });

    clearButton.addEventListener('click', () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        undoStack.push(ctx.getImageData(0, 0, canvas.width, canvas.height));
    });

    undoButton.addEventListener('click', () => {
        if (undoStack.length > 0) {
            redoStack.push(undoStack.pop());
            const imgData = undoStack[undoStack.length - 1];
            ctx.putImageData(imgData, 0, 0);
        }
    });

    redoButton.addEventListener('click', () => {
        if (redoStack.length > 0) {
            undoStack.push(redoStack.pop());
            const imgData = undoStack[undoStack.length - 1];
            ctx.putImageData(imgData, 0, 0);
        }
    });

    saveButton.addEventListener('click', () => {
        const dataURL = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = dataURL;
        link.download = 'drawing.png';
        link.click();
    });

    loadButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
        input.onchange = (e) => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (event) => {
                const img = new Image();
                img.onload = () => {
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        };
        input.click();
    });

    window.addEventListener('resize', () => {
        const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth - 40;
        canvas.height = window.innerHeight - 160;
        ctx.putImageData(imgData, 0, 0);
    });
});
