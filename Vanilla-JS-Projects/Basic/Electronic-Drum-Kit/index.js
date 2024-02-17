//DETECTS BUTTON PRESS
var noOfButtons = document.querySelectorAll(".drum").length;

for (var i=0 ; i<noOfButtons ; i++){
document.querySelectorAll("button")[i].addEventListener("click", function(){
    
    var button = this.innerHTML;

    playSound(button);
    buttonAnimation(button);

});
}


//DETECTS KEYBOARD PRESS
document.addEventListener("keydown", function(event){
    playSound(event.key);
    buttonAnimation(event.key);
})


//PLAYS SOUND
function playSound(key){

    switch(key){

          case "w":
            var audio = new Audio('./sounds/crash.mp3');
            audio.play();
          break; 
          
          case "a":
            var audio = new Audio('./sounds/kick-bass.mp3');
            audio.play();
          break;    

          case "s":
            var audio = new Audio('./sounds/snare.mp3');
            audio.play();
          break;

          case "d":
            var audio = new Audio('./sounds/tom-1.mp3');
            audio.play();
          break;

          case "j":
            var audio = new Audio('./sounds/tom-2.mp3');
            audio.play();
          break;

          case "k":
            var audio = new Audio('./sounds/tom-3.mp3');
            audio.play();
          break;

          case "l":
            var audio = new Audio('./sounds/tom-4.mp3');
            audio.play();
          break;

          default : console.log(this.innerHTML);
          break;
 

        }
}


function buttonAnimation(currentKey){
        
       var activeButton = document.querySelector("." + currentKey);

       activeButton.classList.toggle("pressed");

       setTimeout(function(){
        activeButton.classList.remove("pressed");
       }, 100);
}