function showtime() {
    let date = new Date();
    let h = date.getHours();
    let m = date.getMinutes();
    let s = date.getSeconds();
    let session = "AM";

    if (h == 0)
        h = 12;

    if (h > 12) {
        h = h - 12;
        session = "PM";
    }

    if (h < 10)
        h = "0" + h;
    if (m < 10)
        m = "0" + m;
    if (s < 10)
        s = "0" + s;

    let time = h + ":" + m + ":" + s + " " + session;
    document.getElementById('myclock').innerHTML = time;

    setTimeout(showtime, 500);
}

showtime();