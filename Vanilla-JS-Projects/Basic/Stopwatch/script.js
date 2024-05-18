// selecting elements from the DOM
let h = document.querySelector("#hour");
let m = document.querySelector("#min");
let s = document.querySelector("#sec");

// selecting buttons from the DOM
let playBtn = document.querySelector("#play");
let pauseBtn = document.querySelector("#pause");
let resetBtn = document.querySelector("#reset");

// global variable to keep track of stopwatch
let started = false;

// event listener for play button
playBtn.addEventListener("click", ()=>{
    started = true; //starting the timer
    startTimer();
})

// event listener for pause button
pauseBtn.addEventListener("click", ()=>{
    started = false; //setting started to false stops the timer
})

// event listener for reset button
resetBtn.addEventListener("click", ()=>{
    started = false;
    // reseting values to default values
    s.innerText = "00";
    m.innerText = "00";
    h.innerText = "00";
})

// function that starts the timer
let startTimer = function(){
    // checking if timer has been started
    if(started === true){
        // extracting current time
        var seconds = parseInt(s.innerText);
        var minutes = parseInt(m.innerText);
        var hours = parseInt(h.innerText);

        if(minutes==59 && seconds==59){
            // time is x: 59: 59 so the next time should be x+1:00:00
            s.innerText = "00";
            m.innerText = "00";
            h.innerText = (hours+1).toString(); //incrementing hours
        }
        else if(seconds<=8){
            // if seconds <=8 it must start with a zero
            s.innerText = "0" + (seconds + 1).toString();
        }
        else if (seconds<59){
            //incrementing seconds
            s.innerText = (seconds + 1).toString();
        }
        else if (seconds==59){
            // time is x: y: 59 so the next time should be x:y+1:00
            s.innerText = "00";
            if(minutes<=8){
                // if minutes <=8 it must start with a zero
                m.innerText = "0" + (minutes+1).toString();
            }
            else{
                // incrementing minutes
                m.innerText = (minutes + 1).toString();
            }
        }
        // recursively calling startTimer with a delay of one second
        setTimeout(startTimer,1000);
    }
    
}    