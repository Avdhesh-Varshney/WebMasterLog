let myBirthYear = 2002;
let myBirthMonth = 8;
let myBirthDay = 15;
let myBirthHour = 6;
let myBirthMinute = 30;
let myBirthSecond = 45;
let myBirthMilliSecond = 750;

const dayL = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const date = new Date();
let CurrYear = date.getFullYear();
let CurrMonth = date.getMonth() + 1;
let CurrDay = date.getDate();
let CurrHour = date.getHours();
let CurrMinute = date.getMinutes();
let CurrSecond = date.getSeconds();
let CurrMillisecond = date.getMilliseconds();

function checkLeapYear(y) {
    if (y % 400 === 0) return true;
    else {
        if (y % 100 === 0) return false;
        else {
            if (y % 4 === 0) return true;
            else return false;
        }
    }
}
function countLeapYear(y) {
    let cnt = 0;
    for (let i = 1; i < y; i++)
        if (checkLeapYear(i)) cnt++;
    return cnt;
}
function countDays(y, m, d) {
    let l = countLeapYear(y);
    let days = 365 * (y - l - 1) + 366 * l;
    for (let i = 0; i < m; i++) days += dayL[i];
    if (!checkLeapYear(y)) days--;
    days += d;
    return days;
}
function calcTime(y, m, d, h, mi, s, mil) {
    let days = countDays(y, m, d);
    let hour = days * 24 + h;
    let min = hour * 60 + mi;
    let sec = min * 60 + s;
    let milli = sec * 1000 + mil;
    return milli;
}
const initialTime = calcTime(myBirthYear, myBirthMonth, myBirthDay, myBirthHour, myBirthMinute, myBirthSecond, myBirthMilliSecond);
const finalTime = calcTime(CurrYear, CurrMonth, CurrDay, CurrHour, CurrMinute, CurrSecond, CurrMillisecond);
let myTime = finalTime - initialTime;

function finalYear(yI, yF, mI, mF, dI, dF) {
    let year = 0;
    for (let i = yI + 1; i < yF; i++) {
        if (checkLeapYear(i)) myTime -= 366;
        else myTime -= 365;
        year++;
    }
    if (mI < mF) {
        year++;
        if (checkLeapYear(yF)) myTime -= 366;
        else myTime -= 365;
    }
    else if (mI == mF) {
        if (dI <= dF) {
            year++;
            if (checkLeapYear(yF)) myTime -= 366;
            else myTime -= 365;
        }
    }
    return year;
}
function finalMonth(yI, yF, mI, mF) {
    let cnt = 0;
    if (mI == mF) return cnt;
    else if (mI < mF) {
        for (let i = mI; i < mF; i++) {
            cnt++;
            myTime -= dayL[i];
            if (i === 1 && !checkLeapYear(yI)) myTime++;
        }
    }
    else {
        for (let i = mI; i < 12; i++) {
            cnt++;
            myTime -= dayL[i];
            if (i === 1 && !checkLeapYear(yI)) myTime++;
        }
        for (let i = 0; i < mF - 1; i++) {
            cnt++;
            myTime -= dayL[i];
            if (i === 1 && !checkLeapYear(yF)) myTime++;
        }
    }
    if (myTime <= 0) {
        cnt--;
        myTime += dayL[mF - 1];
    }
    return cnt;
}

function updateHTML() {
    document.getElementById("milliseconds").innerHTML = myTime % 1000;
    myTime = Math.floor(myTime / 1000);
    document.getElementById("seconds").innerHTML = myTime % 60;
    myTime = Math.floor(myTime / 60);
    document.getElementById("minutes").innerHTML = myTime % 60;
    myTime = Math.floor(myTime / 60);
    document.getElementById("hours").innerHTML = myTime % 24;
    myTime = Math.floor(myTime / 24);
    document.getElementById("years").innerHTML = finalYear(myBirthYear, CurrYear, myBirthMonth, CurrMonth, myBirthDay, CurrDay);
    document.getElementById("months").innerHTML = finalMonth(myBirthYear, CurrYear, myBirthMonth, CurrMonth);
    document.getElementById("days").innerHTML = myTime + 1;
}
updateHTML();
function updateTime() {
    if (document.getElementById("milliseconds").innerHTML >= 999) {
        document.getElementById("milliseconds").innerHTML = 0;
        if (document.getElementById("seconds").innerHTML == 59) {
            document.getElementById("seconds").innerHTML = 0;
            if (document.getElementById("minutes").innerHTML == 59) {
                document.getElementById("minutes").innerHTML = 0;
                if (document.getElementById("hours").innerHTML == 23) {
                    document.getElementById("hours").innerHTML = 0;
                    document.getElementById("days").innerHTML++;
                }
                else document.getElementById("hours").innerHTML++;
            }
            else document.getElementById("minutes").innerHTML++;
        }
        else document.getElementById("seconds").innerHTML++;
    }
    else document.getElementById("milliseconds").innerHTML = Math.floor((parseFloat(document.getElementById("milliseconds").innerHTML) + 146.666)).toString();
}
setInterval(updateTime, 100);