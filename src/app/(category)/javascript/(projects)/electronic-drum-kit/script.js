let keys = document.getElementsByClassName("key");

for (let i = 0; i < keys.length; i++) {
    keys[i].onclick = function() {
        playSound(keys[i]);
    };
}

document.addEventListener('keydown', function(event) {
    let keyPressed = event.key.toUpperCase();
    console.log("Key pressed: " + keyPressed);

    for (let i = 0; i < keys.length; i++) {
        
        if (keys[i].innerText === keyPressed) {
            playSound(keys[i]);
        }
    }
});


function playSound(key) {
    let soundFile = key.getAttribute("data-sound");
    console.log("Playing sound for key: " + key.innerText);
    
    if (soundFile) {
        let sound = new Audio(soundFile);
        sound.play();
        key.classList.add('pressed'); 


        setTimeout(() => {
            key.classList.remove('pressed');
        }, 100); 
    } else {
        console.log("Sound file not found for this key");
    }
}

document.getElementById("menuButton").addEventListener("click", function() {
    const menu = document.getElementById("menu");
    menu.classList.toggle("hidden");
    menu.style.display = menu.style.display === 'none' ? 'block' : 'none'; 
});

