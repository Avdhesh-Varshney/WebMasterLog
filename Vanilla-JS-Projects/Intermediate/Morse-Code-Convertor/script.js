const morseToEnglishMap = {
    ".-": "A", "-...": "B", "-.-.": "C", "-..": "D", ".": "E",
    "..-.": "F", "--.": "G", "....": "H", "..": "I", ".---": "J",
    "-.-": "K", ".-..": "L", "--": "M", "-.": "N", "---": "O",
    ".--.": "P", "--.-": "Q", ".-.": "R", "...": "S", "-": "T",
    "..-": "U", "...-": "V", ".--": "W", "-..-": "X", "-.--": "Y",
    "--..": "Z", "-----": "0", ".----": "1", "..---": "2", "...--": "3",
    "....-": "4", ".....": "5", "-....": "6", "--...": "7", "---..": "8",
    "----.": "9", ".-.-.-": ".", "--..--": ",", "..--..": "?", "-.-.--": "!"
};

function convertToEnglish() {
    const morseInput = document.getElementById("morseInput").value.trim();
    const morseArray = morseInput.split(" ");
    let englishOutput = "";

    for (let i = 0; i < morseArray.length; i++) {
        if (morseToEnglishMap[morseArray[i]]) {
            englishOutput += morseToEnglishMap[morseArray[i]];
        } else {
            document.getElementById("errorMessage").innerText = "Invalid Morse Code!";
            return;
        }
    }

    document.getElementById("englishOutput").value = englishOutput;
    document.getElementById("errorMessage").innerText = "";
}
