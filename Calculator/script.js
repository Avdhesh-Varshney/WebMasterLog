function clr() {
    document.getElementById('textval').value = "";
}

function display(val) {
    document.getElementById('textval').value = document.getElementById('textval').value + val;
}

function Calculate() {
    let x = document.getElementById('textval').value;
    let y = eval(x);
    document.getElementById('textval').value = y;
}