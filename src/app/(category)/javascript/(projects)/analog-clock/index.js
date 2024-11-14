setInterval(()=>{
    d=new Date();
    th=d.getHours();
    tm=d.getMinutes();
    ts=d.getSeconds();
    hrot=30*th + tm/2;
    mrot=6*tm;
    srot=6*ts;

    hour.style.transform=`rotate(${hrot}deg)`;
    min.style.transform=`rotate(${mrot}deg)`;
    sec.style.transform=`rotate(${srot}deg)`;

},1000)