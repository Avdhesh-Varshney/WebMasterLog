document.addEventListener('DOMContentLoaded', () => {
    const plantList = document.getElementById('plantList');
    const gridContainer = document.getElementById('gridContainer');
    const plantInfo = document.getElementById('plantInfo');
    const saveButton = document.getElementById('saveButton');
    const loadButton = document.getElementById('loadButton');
    const totalCostElement = document.getElementById('totalCost');
    let totalCost = 0;

    // Load plant data
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            data.plants.forEach(plant => {
                const div = document.createElement('div');
                div.textContent = plant.name;
                div.draggable = true;
                div.dataset.plant = JSON.stringify(plant);
                div.addEventListener('dragstart', e => {
                    e.dataTransfer.setData('text/plain', div.dataset.plant);
                });
                plantList.appendChild(div);
            });
        });

    // Create grid cells
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.addEventListener('dragover', e => {
            e.preventDefault();
        });
        cell.addEventListener('drop', e => {
            e.preventDefault();
            const plant = JSON.parse(e.dataTransfer.getData('text/plain'));
            cell.textContent = plant.name;
            cell.dataset.plant = JSON.stringify(plant);
            updateTotalCost();
        });
        cell.addEventListener('click', () => {
            const plant = cell.dataset.plant ? JSON.parse(cell.dataset.plant) : null;
            if (plant) {
                plantInfo.innerHTML = `Name: ${plant.name}<br>Description: ${plant.description}<br>Price: $1`;
            } else {
                plantInfo.textContent = 'No plant selected';
            }
        });
        gridContainer.appendChild(cell);
    }

    // Update total cost
    function updateTotalCost() {
        totalCost = 0;
        gridContainer.childNodes.forEach(cell => {
            if (cell.dataset.plant) {
                totalCost += 1; // Add $1 for each plant
            }
        });
        totalCostElement.textContent = totalCost.toFixed(2);
    }

    // Save layout to PC
    saveButton.addEventListener('click', () => {
        const layout = [];
        gridContainer.childNodes.forEach(cell => {
            layout.push(cell.dataset.plant || null);
        });
        const blob = new Blob([JSON.stringify(layout)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'gardenLayout.json';
        a.click();
        URL.revokeObjectURL(url);
    });

    // Load layout from PC
    loadButton.addEventListener('click', () => {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'application/json';
        input.onchange = e => {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = event => {
                const layout = JSON.parse(event.target.result);
                gridContainer.childNodes.forEach((cell, index) => {
                    const plant = layout[index];
                    if (plant) {
                        cell.textContent = JSON.parse(plant).name;
                        cell.dataset.plant = plant;
                    } else {
                        cell.textContent = '';
                        cell.dataset.plant = null;
                    }
                });
                updateTotalCost();
            };
            reader.readAsText(file);
        };
        input.click();
    });
});
