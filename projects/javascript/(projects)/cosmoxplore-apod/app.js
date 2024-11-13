// NASA API CALL 1 : APoD

fetch('https://api.nasa.gov/planetary/apod?api_key=eISHzmGbQk7EMWv9NTlVtvzZVmeLKPUoL3uKMSPJ')
.then((response) => {
    return response.json()
}).then((data) => {
    //console.log(data)
    
    displayData(data.url, data.explanation, data.title, data.date, data.copyright )
   
})
.catch((error) => console.log(error))


//function to display data in apod section
function displayData(image, info, title, date, copyright){
  document.getElementById("apod_img").src = image
  document.getElementById("apod_info").textContent = info
  document.getElementById("title").textContent = title
  document.getElementById("date").textContent = date
  document.getElementById("copyright").textContent = copyright

}

