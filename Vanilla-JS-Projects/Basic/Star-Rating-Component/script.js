function stars(){
  value=1;
  const select=document.querySelector('.one');
  select.classList.add('change');
  const show=document.querySelector('.display');
  show.innerHTML=`You selected ${value} out of 5`;

}
function stars2(){
  value=2;
  const select=document.querySelector('.two');
  select.classList.add('change');
  const show=document.querySelector('.display');
  show.innerHTML=`You selected ${value} out of 5`;
}

function stars3(){
  value=3;
  const select=document.querySelector('.three');
  select.classList.add('change');

  const show=document.querySelector('.display');
  show.innerHTML=`You selected ${value} out of 5`;
}
function stars4(){
  value=4;
  const select=document.querySelector('.four');
  select.classList.add('change');
  const show=document.querySelector('.display');
  show.innerHTML=`You selected ${value} out of 5`;
}
function stars5(){
  value=5;
  const select=document.querySelector('.five');
  select.classList.add('change');
  const show=document.querySelector('.display');
  show.innerHTML=`You selected ${value} out of 5`;
}
function hide(){
  const sel=document.querySelector('.container');
  const sel2=document.querySelector('.container2');
  sel.style='visibility:hidden';
  sel2.style='visibility:visible';
}