const input = document.getElementById("todo-input");
const addButton = document.getElementById("add-btn");
const updateButton = document.getElementById("update-btn");

let selectedItem = null;

addButton.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = input.value;
    if (inputValue.trim()) {
        const newItem = document.createElement("li");
        newItem.innerHTML = `
      <span>${inputValue}</span>
      <button class="edit"><i class="fa-solid fa-pencil"></i></button>
      <button class="delete"><i class="fa-solid fa-trash"></i></button>
    `;
        document.getElementById("todo-list").appendChild(newItem);
        input.value = "";
    }
});

updateButton.addEventListener("click", function (e) {
    e.preventDefault();
    const inputValue = input.value;
    if (inputValue.trim() && selectedItem !== null) {
        selectedItem.querySelector("span").textContent = inputValue;
        input.value = "";
        selectedItem.classList.remove("selected");
        selectedItem = null;
        updateButton.style.display = "none";
        addButton.style.display = "inline-block";
    }
});

document.getElementById("todo-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("edit")) {
        selectedItem = e.target.parentNode.parentNode;
        input.value = selectedItem.querySelector("span").textContent;
        selectedItem.classList.add("selected");
        addButton.style.display = "none";
        updateButton.style.display = "inline-block";
    }
});

document.getElementById("todo-list").addEventListener("click", function (e) {
    if (e.target.classList.contains("delete")) {
        e.target.parentNode.remove();
    }
});