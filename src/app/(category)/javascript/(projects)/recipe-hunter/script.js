
const inputBox = document.getElementById("searchinput");
const searchBtn = document.getElementsByClassName("btn")[0];
const resultDiv = document.getElementById("result");

function createCard(id, baseURL, image, title, sourceUrl,min) {
    return `
            <div key="${id}" class="card">
                <div class="icard">
                    <img class="img" src="${baseURL}${image}" alt="" />
                    <p class="name">${title}</p>
                    <p class="time">${min} min</p>
                </div>
                <a href="${sourceUrl}">
                    <button class="btnde">
                        View Recipe
                    </button>
                </a>
            </div>
            `
}

const search = async () => {
    var searchInput = inputBox.value.toLowerCase();
    console.log(searchInput)
    const apiUrl = `https://api.spoonacular.com/recipes/search?query=${searchInput}&number=20&apiKey=2ab606a3174a49fe8399fed5cb3f775d`;
    const resp = await fetch(apiUrl);
    const data = await resp.json();
    console.log(data);
    resultDiv.innerHTML = "";
    const resultsData = data.results;
    resultsData.map((item, id) => {
        resultDiv.innerHTML += createCard(id, data.baseUri, item.image, item.title,item.sourceUrl, item.readyInMinutes);
    });
    if(resultsData.length==0){
        resultDiv.innerHTML = "No Result Found";
    }
}

inputBox.addEventListener('input', search());
inputBox.addEventListener('input', () => search());

