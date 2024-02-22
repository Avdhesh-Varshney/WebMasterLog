function fetchRandomJoke() {
    fetch("https://icanhazdadjoke.com/", {
        headers: {
        Accept: "application/json",
        },
    })
        .then((response) => response.json())
        .then((data) => {
        const jokeContainer = document.querySelector(".joke-container");
        const jokeText = data.joke;
        jokeContainer.querySelector("p").textContent = jokeText;
        })
        .catch((error) => {
        console.error("Error fetching joke:", error);
        });

        document.getElementById("copyJoke").style.display = "";
    }


const generateButton = document.getElementById("generateJoke");
generateButton.addEventListener("click", fetchRandomJoke);
  
function copyJokeToClipboard() {
    const jokeContainer = document.querySelector(".joke-container");
    const jokeText = jokeContainer.querySelector("p").textContent;
  
    const textArea = document.createElement("textarea");
    textArea.value = jokeText;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  
    alert("Joke copied to clipboard!");
}
  
  const copyButton = document.getElementById("copyJoke");
  copyButton.addEventListener("click", copyJokeToClipboard);
  