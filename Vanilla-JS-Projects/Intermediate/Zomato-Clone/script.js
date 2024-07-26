let word=document.querySelector("#dyna");
word.style='color:orange'
let count=0;
update();
function update(){
    count++;
    word.innerHTML=`Zomato`.slice(0,count);
    if(count=='Zomato'.length){
        count=0;
    }
    setTimeout(update,775);
}
const hamburger=document.querySelector('.hamburger');
const navbar=document.querySelector('.navbar');
const nav=document.querySelector('.nav');
const search=document.querySelector('.nav-search');
hamburger.addEventListener('click',()=>{
    navbar.classList.toggle('nav-h');
    nav.classList.toggle('vis-h');
    search.classList.toggle('vis-h');
})