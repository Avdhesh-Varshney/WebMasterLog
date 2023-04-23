const body = document.querySelector('body');
const bg_colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'thistle', 'aqua', 'aquamarine', 'beige', 'darkorchid'];

function ChangeColor() {
    let num = Math.random();
    console.log("Random Number", num);

    let len = bg_colors.length;
    console.log("Colors List Length", len);

    let index = num * len;
    console.log("Multiply Random Number and Colors Length", index);

    let int_index = parseInt(index);
    console.log("Integer Rounded", int_index);

    body.style.backgroundColor = bg_colors[int_index];
}

const text_colors = ["white", "black", "blue", "red", 'crimson', 'deeppink', 'forestgreen', 'indigo', 'teal'];

function ChangeTextColor() {
    const text = document.getElementById('text');
    const color_index = parseInt(Math.random() * text_colors.length);
    text.style.color = text_colors[color_index];
}