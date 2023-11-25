let counter_display = document.getElementById('count');
let inc = document.getElementById('inc');
let dec = document.getElementById('dec');
let reset = document.getElementById('reset');

let count = 0;

function Increment() {
    count++;
    counter_display.innerHTML = count;
}

function Decrement() {
    count--;
    counter_display.innerHTML = count;
}

function Reset() {
    count = 0;
    counter_display.innerHTML = count;
}