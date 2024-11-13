document.addEventListener('DOMContentLoaded', function () {

  const grid = document.getElementById("list-grid");


  const newRow = document.createElement("tr");
  for (let col = 0; col < 10; col++) {
    const cell = document.createElement("td");
    const input = document.createElement("input");
    input.type = "text";
    input.className = "list-cell";
    input.id = `cell-${col}`;
    input.addEventListener("keydown", function (e) {
      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
      }
    });
    input.addEventListener("input", (event) => {
      handleInput(event, col);
    });
    cell.appendChild(input);
    newRow.appendChild(cell);

  }
  grid.appendChild(newRow);


});

function handleInput(event, col) {
  const inputValue = event.target.value.replace(/[^0-9]/g, '');
  event.target.value = inputValue;
  let nodes = document.querySelectorAll(".cell");
  nodes[col].setAttribute("value", String(inputValue));
  nodes[col].style.height = `${3.8 * inputValue}px`;

}

"use strict";
const start = async () => {

  for (let col = 0; col < 10; col++) {
    const cellId = `cell-${col}`;
    document.getElementById(cellId).disabled = true;
  }

  let algoValue = Number(document.querySelector(".algo-menu").value);
  let speedValue = 0.5;

  if (speedValue === 0) {
    speedValue = 1;
  }
  if (algoValue === 0) {
    alert("No Algorithm Selected");
    return;
  }

  let algorithm = new sortAlgorithms(speedValue);
  if (algoValue === 1) await algorithm.BubbleSort();
  if (algoValue === 2) await algorithm.SelectionSort();
  if (algoValue === 3) await algorithm.InsertionSort();
  if (algoValue === 5) await algorithm.QuickSort();
};

const RenderScreen = async () => {

  for (let col = 0; col < 10; col++) {
    const cellId = `cell-${col}`;
    document.getElementById(cellId).disabled = false;
    document.getElementById(cellId).value = '';
  }

  let algoValue = Number(document.querySelector(".algo-menu").value);
  await RenderList();
};

const RenderList = async () => {
  let sizeValue = 10
  await clearScreen();

  let list = await randomList(sizeValue);

  for (let col = 0; col < 10; col++) {
    const cellId = `cell-${col}`;
    document.getElementById(cellId).value = list[col];
    // document.getElementById(cellId).disabled = true;
  }

  const arrayNode = document.querySelector(".array");
  console.log(arrayNode);
  console.log(list);
  for (const element of list) {
    const node = document.createElement("div");
    node.className = "cell";
    node.setAttribute("value", String(element));
    node.style.height = `${3.8 * element}px`;
    arrayNode.appendChild(node);
  }
};

const RenderArray = async (sorted) => {
  let sizeValue = 10;
  await clearScreen();

  let list = await randomList(sizeValue);
  if (sorted) list.sort((a, b) => a - b);

  const arrayNode = document.querySelector(".array");
  const divnode = document.createElement("div");
  divnode.className = "s-array";

  for (const element of list) {
    const dnode = document.createElement("div");
    dnode.className = "s-cell";
    dnode.innerText = element;
    divnode.appendChild(dnode);
  }
  arrayNode.appendChild(divnode);
};

const randomList = async (Length) => {
  let list = new Array();
  let lowerBound = 1;
  let upperBound = 100;

  for (let counter = 0; counter < Length; ++counter) {
    let randomNumber = Math.floor(
      Math.random() * (upperBound - lowerBound + 1) + lowerBound
    );
    list.push(parseInt(randomNumber));
  }
  return list;
};

const clearScreen = async () => {
  document.querySelector(".array").innerHTML = "";
};

const response = () => {
  let Navbar = document.querySelector(".navbar");
  if (Navbar.className === "navbar") {
    Navbar.className += " responsive";
  } else {
    Navbar.className = "navbar";
  }
};

document.querySelector(".icon").addEventListener("click", response);
document.querySelector(".start").addEventListener("click", start);
document.querySelector(".algo-menu").addEventListener("change", RenderScreen);
window.onload = RenderScreen;
