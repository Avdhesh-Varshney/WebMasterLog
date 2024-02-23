document.addEventListener("DOMContentLoaded", () => {
    const rounds = document.getElementById('rounds'),
          roundMinus = document.getElementById('roundMinus'),
          roundPlus = document.getElementById('roundPlus'),
          worktime = document.getElementById('worktime'),
          worktimeMinus = document.getElementById('worktimeMinus'),
          worktimePlus = document.getElementById('worktimePlus'),
          resttime = document.getElementById('resttime'),
          resttimeMinus = document.getElementById('resttimeMinus'),
          resttimePlus = document.getElementById('resttimePlus'),
          startBtn = document.querySelector('.btn_start'),
          timerWindow = document.querySelector('.timer'),
          startSound = document.getElementById('start'),
          pickSound = document.getElementById('pick'),
          finishSound = document.getElementById('finish');

    //Rounds counter
    roundMinus.addEventListener('click', () => {
        let roundsValue = +rounds.textContent;
        if (roundsValue == 1) {
            rounds.textContent = 99;
        } else {
            rounds.textContent = --roundsValue;
        }
    });

    roundPlus.addEventListener('click', () => {
        let roundsValue = +rounds.textContent;
        if (roundsValue == 99) {
            rounds.textContent = 1;
        } else {
            rounds.textContent = ++roundsValue;
        }
    });

    function addZero(item) {
        if (+item < 10) {
            item = `0${item}`;
        }
        return item;
    }

    //Time count functions
    function minus(time) {
        switch(+time.lastChild.textContent) {
            case 10:
                time.lastChild.textContent = '05';
                break;
            case 5:
                time.lastChild.textContent = '00';
                break;
            case 0:
            if (time.firstChild.textContent != 0) {
                time.lastChild.textContent = '55';
                if (time.firstChild.textContent <= 10) {
                    time.firstChild.textContent = `0${+time.firstChild.textContent - 1}`;
                } else {
                    time.firstChild.textContent = +time.firstChild.textContent - 1;
                }
            } else {
                time.lastChild.textContent = '00'
                if (+time.firstChild.textContent == 0) {
                    time.firstChild.textContent = '10';
                }
            }
                    break;
            default: time.lastChild.textContent = +time.lastChild.textContent - 5;
                break;
        }
    }

    function plus(time) {
        switch(+time.lastChild.textContent) {
            case 55:
                time.lastChild.textContent = '00'
            if (time.firstChild.textContent < 9) {
                time.firstChild.textContent = `0${+time.firstChild.textContent + 1}`;
            } else {
                time.firstChild.textContent = +time.firstChild.textContent + 1;
            }
                break;
            case 0: 
            if (+time.firstChild.textContent == 10) {
                time.firstChild.textContent = '00';
                time.lastChild.textContent = '00';
            } else {
                time.lastChild.textContent = '05';
            }
                break;
            default: time.lastChild.textContent = +time.lastChild.textContent + 5;
                break;
        }
    }

    //Work time counter
    worktimeMinus.addEventListener('click', () => {
        minus(worktime);
    });

    worktimePlus.addEventListener('click', () => {
        plus(worktime);
    });

    //Rest time counter
    resttimeMinus.addEventListener('click', () => {
        minus(resttime);
    });

    resttimePlus.addEventListener('click', () => {
        plus(resttime);
    });

    //timer
    function stopTimer(timerId) {
        clearInterval(timerId);
        finishSound.play();
        timerWindow.classList.remove('timer_active');
    }

    function timerRest(round) {
        let i = round;
        timerWindow.style.background = '#407DD6';
        timerWindow.firstElementChild.innerHTML = `Rest <br> ${i} / ${+rounds.textContent}`;
        timerWindow.lastElementChild.textContent = ((+resttime.firstChild.textContent * 60) + +resttime.lastChild.textContent);
        let timerId = setInterval(() => {
            if (+timerWindow.lastElementChild.textContent != 0) {
                switch(+timerWindow.lastElementChild.textContent) {
                case 3: pickSound.play();
                    break;
                case 2: pickSound.play();
                    break;
                case 1: pickSound.play();
                    break;
                }
                timerWindow.lastElementChild.textContent = +timerWindow.lastElementChild.textContent - 1;
            } else {
                ++i;
                if (i > +rounds.textContent) {
                    stopTimer(timerId);
                } else {
                    clearInterval(timerId);
                    timerWork(i);
                }   
            }
        }, 1000);
    }

    function timerWork(round) {
        let i = round;
        timerWindow.style.background = '#000';
        timerWindow.firstElementChild.innerHTML = `Work <br> ${i} / ${+rounds.textContent}`;
        timerWindow.lastElementChild.textContent = ((+worktime.firstChild.textContent * 60) + +worktime.lastChild.textContent);
        let timerId = setInterval(() => {
            if (+timerWindow.lastElementChild.textContent != 0) {
                switch(+timerWindow.lastElementChild.textContent) {
                case 3: pickSound.play();
                    break;
                case 2: pickSound.play();
                    break;
                case 1: pickSound.play();
                    break;
                }
                timerWindow.lastElementChild.textContent = +timerWindow.lastElementChild.textContent - 1;
            } else {
                clearInterval(timerId);
                timerRest(i);
            }
        }, 1000);
    }

    function timer(item) {
        timerWindow.classList.add('timer_active');
        timerWindow.style.background = `rgb(52, 134, 79)`;
        timerWindow.firstElementChild.innerHTML = `Get Ready`;
        timerWindow.lastElementChild.innerHTML = '7';
        startSound.play();
        let timerId = setInterval(() => {
            if (+item.textContent != 0) {
                item.textContent = +item.textContent - 1;
            } else {
                clearInterval(timerId);
                pickSound.play();
                timerWork(1);
            }
        }, 1000);
    }

    function start() {
        timer(timerWindow.lastElementChild);
    }

    startBtn.addEventListener('click', start);



});




// function timerWork(min, sec) {
//     let timerId = setInterval(() => {
//         if (+sec.textContent != 0) {
//             sec.textContent = +sec.textContent - 1;
//         } else if (+sec.textContent <= 0 && +min.textContent != 0) {
//             sec.textContent = '59';
//             min.textContent = +min.textContent - 1;
//         } else {    
//             clearInterval(timerId);
//         }
//     }, 1000);
// }