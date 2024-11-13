const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");

// Event listener for the search button
btn.addEventListener("click", () => {
  const inpWord = document.getElementById("inp-word").value;

  fetch(`${url}${inpWord}`)
    .then(response => response.json())
    .then(data => {
      const wordData = data[0];
      const meaning = wordData.meanings[0];
      const definition = meaning.definitions[0];

      result.innerHTML = `
        <div class="word">
          <h3>${inpWord}</h3>
          <button onclick="playSound()">
            <i class="fas fa-volume-up"></i>
          </button>
        </div>
        <div class="details">
          <p>${meaning.partOfSpeech}</p>
          <p>/${wordData.phonetic}/</p>
        </div>
        <p class="word-meaning">
          ${definition.definition}
        </p>
        <p class="word-example">
          ${definition.example || ""}
        </p>
      `;

      sound.setAttribute("src", `https:${wordData.phonetics[0].audio}`);
    })
    .catch(error => {
      result.innerHTML = `
        <h3 class="error">Couldn't Find The Word!</h3>
      `;
    });
});

// Function to play the sound
function playSound() {
  sound.play();
}
