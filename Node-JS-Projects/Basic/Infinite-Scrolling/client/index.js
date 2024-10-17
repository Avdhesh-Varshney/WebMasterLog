const API_URL = 'http://localhost:5000/list';
let scrollLock=false;

function getPosts(offset){
    if(!offset){
        //offset is after limit loading new posts numbers
        //if offset is undefined or null we will set it to 0
        offset=0;
    }
    fetch(`${API_URL}?offset=${offset}`)
    .then(response => response.json())
    .then(data => loadPostsIntoSection(data));
}

function loadPostsIntoSection(postsArray){
    let html = "";
    postsArray.forEach(function (post){
        html += `<div class="post-card">`;
        html += `<header class="post-header">`;
        html += `<h3>${post.id}. ${post.title}</h3>`;
        html += `</header>`;
        html += `<p class="post-body">${post.body}</p>`;
        html += `</div>`;
    });

    //LOADING..
    createLoadingElement();

    //since loading too fast so to slow it down setTimeout
    setTimeout(function(){
        document.querySelector('.post-container').
        insertAdjacentHTML('beforeend',html); //beforeend manne at last insert karne ka
        
        destroyLoadingElement();     //to destroy loading after inserting

        scrollLock=false;   //to have nos in order and not repeat
    },1500);
}

window.onscroll =function(){
    if(scrollLock) return;
    //onscroll is event that gets triggered every time you scroll up and down
    if(this.innerHeight + this.scrollY >= document.
    body.scrollHeight){ 
        scrollLock=true;
        //if this condition is true that means we are near the
        //bottom and ready to get more data 
        //or in simple words we can get more data now LOADING..

        //pageYOffset -> scrollY
        let postsLength= document.querySelectorAll
        ('.post-card').length;  //this will give us the length of the posts how many total posts are there 

        getPosts(postsLength);
    }
}

function createLoadingElement(){
    let p=document.createElement('p');
    p.innerText="LOADING.........";
    p.classList.add('loading-element');

    document.querySelector('.post-container').
    insertAdjacentElement('beforeend',p);
}

function destroyLoadingElement(){
    document.querySelector('.loading-element').remove();
}
getPosts();
