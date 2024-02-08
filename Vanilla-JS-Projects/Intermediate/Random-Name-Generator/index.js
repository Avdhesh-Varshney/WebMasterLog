
let btn = document.querySelector('.submit-btn');
let btn2 = document.querySelector('.submit-btn2');
let output = document.querySelector('.output-section');

async function generateName() {
    try {

        const setHeader = {
            headers: {
                Accept: 'application/json',
                'X-Api-Key': 'wddsDiKaCoBmtMJ/jncLsw==p2hdLPEQ3413AqAz'
            }
        }

        let select = document.querySelector('select');

        if (select.value == "") {
            output.innerHTML = "Enter the Gender !!";
        } else {
            output.innerHTML = "Generating...";
            const res = await fetch(`https://api.api-ninjas.com/v1/babynames?gender=${select.value}`, setHeader);
            const data = await res.json();
            let ind = Math.floor(Math.random() * (data.length));
            output.innerHTML = data[ind];
            console.log(data[ind]);
        }
    }
    catch (err) {
        output.innerHTML = `There is an Error`;
        console.log(err);
    }
}


function serveName() {
    let name = document.querySelector('.output-section');
    name.classList.remove("hide");
    btn2.classList.remove("hide");
    btn.classList.add("hide");

    generateName();
}

function reset() {
    let name = document.querySelector('.output-section');
    name.classList.add("hide");
    btn2.classList.add("hide");
    btn.classList.remove("hide");
    output.innerHTML = "";
}

btn.addEventListener('click', serveName);

btn2.addEventListener("click", reset);