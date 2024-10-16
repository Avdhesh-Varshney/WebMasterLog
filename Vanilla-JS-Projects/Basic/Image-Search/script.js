const accessKey = "br3JsLX4E4Lulzmn2XN_EDl8CzWA0AXENWDagUsD0ws";

const searchForm = document.getElementById("search-form");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const showMoreBtn = document.getElementById("show-more-btn");


let keyword = "";
let page = 1;

async function searchImages(){
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

    const response = await fetch(url);
    const data = await response.json();

    const results = data.results;
    console.log(results);
    if(page === 1){
        searchResult.innerHTML = "";
    }

    results.map((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;
        const imgLink = document.createElement("a");
        imgLink.href = result.links.html;
        imgLink.target = "_blank";

        imgLink.appendChild(image);
        searchResult.appendChild(imgLink);
    })

    showMoreBtn.style.display = "block";

}

searchForm.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImages();
})

showMoreBtn.addEventListener("click", ()=>{
    page++;
    searchImages();
})