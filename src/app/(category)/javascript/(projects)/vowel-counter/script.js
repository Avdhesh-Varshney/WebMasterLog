const vow = ['a','e','i','o','u']
let count = 0;
const countVowel = () =>{
    const text = document.getElementById('inputStr').value;
    const newText = text.toLowerCase();
    if(text === ""){
        alert("Please enter a string");
        count = 0;
    }
    for(let i of newText){
        if(vow.includes(i)){
            count = count+1;
        }
    }
    document.getElementById('output-text').innerHTML = `Total Vowels = ${count}`;
}