
const scriptURL = 'https://script.google.com/macros/s/AKfycbxzo8cvSyjB9Ad7cxfwYKMRnyUQ8W_ckB_nGTsE2InLaoTJaIVf8Wwz7-EuovV4AWWE/exec'
  const form = document.forms['submit-to-google-sheet']
const msg=document.getElementById("msg")
  form.addEventListener('submit', e => {
    e.preventDefault()
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(response => {
        msg.innerHTML="Thank You For Subscribing!"
        setTimeout(function(){
            msg.innerHTML=""
        },5000)
        form.reset()
      })
      .catch(error => console.error('Error!', error.message))
  })
