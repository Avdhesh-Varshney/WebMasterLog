// First Dice Random Number:
var randomNumber1 = Math.floor(Math.random() * 6) + 1;
// var path1 = "./Images/Computer" + randomNumber1 + ".PNG";
var path1 = "https://github.com/Avdhesh-Varshney/Dice-Game/blob/main/Images/Computer" + randomNumber1 + ".png?raw=true";
document.firstElementChild.lastElementChild.querySelectorAll("img")[0].setAttribute("src", path1);

// Second Dice Random Number:
var randomNumber2 = Math.floor(Math.random() * 6) + 1;
// var path2 = "./Images/Dice" + randomNumber2 + ".PNG";
var path2 = "https://github.com/Avdhesh-Varshney/Dice-Game/blob/main/Images/Dice" + randomNumber2 + ".png?raw=true";
document.firstElementChild.lastElementChild.querySelectorAll("img")[1].setAttribute("src", path2);

// Checking Condition and showing Results
if (randomNumber1 > randomNumber2) {
    document.firstElementChild.lastElementChild.querySelector("h2").innerHTML = "🚩 COMPUTER WINS";
}
else if (randomNumber1 < randomNumber2) {
    document.firstElementChild.lastElementChild.querySelector("h2").innerHTML = "PLAYER WINS 🚩";
}
else {
    document.firstElementChild.lastElementChild.querySelector("h2").innerHTML = "DRAW";
}