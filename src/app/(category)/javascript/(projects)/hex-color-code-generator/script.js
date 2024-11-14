const colorBoxes = document.querySelectorAll('.colorBox');
const resultColor = document.getElementById('resultColor');
const hexButton = document.querySelector('button');

// Function to update result color
function updateResultColor() {
    const selectedColors = [...colorBoxes].filter(box => box.classList.contains('selected'));
    if (selectedColors.length === 0) {
        resultColor.style.backgroundColor = '';
        return;
    }

    const mixedColor = mixColors(selectedColors.map(box => box.style.backgroundColor));
    resultColor.style.backgroundColor = mixedColor;
}

// Function to mix colors
function mixColors(colors) {
    let r = 0, g = 0, b = 0;
    colors.forEach(color => {
        const [rVal, gVal, bVal] = color.match(/\d+/g).map(Number);
        r += rVal;
        g += gVal;
        b += bVal;
    });
    r = Math.round(r / colors.length);
    g = Math.round(g / colors.length);
    b = Math.round(b / colors.length);
    return '#' + r.toString(16).padStart(2, '0') + g.toString(16).padStart(2, '0') + b.toString(16).padStart(2, '0');
}

// Event listeners for color boxes
colorBoxes.forEach(box => {
    box.addEventListener('click', () => {
        box.classList.toggle('selected');
        updateResultColor();
    });
});

// Function to copy hex code to clipboard
function copyToClipboard() {
    const rgbColor = resultColor.style.backgroundColor;
    if (rgbColor) {
        // Convert RGB color to hexadecimal
        const hexCode = rgbToHex(rgbColor);
        navigator.clipboard.writeText(hexCode).then(() => {
            alert('Hex code copied to clipboard: ' + hexCode);
        }, () => {
            alert('Failed to copy hex code to clipboard.');
        });
    }
}

// Function to convert RGB color to hexadecimal
function rgbToHex(rgb) {
    // Split the RGB color into its components
    const [r, g, b] = rgb.match(/\d+/g).map(Number);
    // Convert each component to hexadecimal and pad with zeros if necessary
    const rHex = r.toString(16).padStart(2, '0');
    const gHex = g.toString(16).padStart(2, '0');
    const bHex = b.toString(16).padStart(2, '0');
    // Return the hexadecimal color code
    return `#${rHex}${gHex}${bHex}`;
}
