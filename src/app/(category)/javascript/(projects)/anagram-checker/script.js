function check() {

  var string1 = document.getElementById("string1").value;
  var string2 = document.getElementById("string2").value;


  string1 = string1.replace(/[^a-zA-Z]/g, '').toLowerCase();
  string2 = string2.replace(/[^a-zA-Z]/g, '').toLowerCase();

  string1 = string1.split('').sort().join('');
  string2 = string2.split('').sort().join('');

  var result = (string1 === string2);

  if (result) {
    document.getElementById("output-text").innerText = "The strings are anagrams.";
  } else {
    document.getElementById("output-text").innerText = "The strings are not anagrams.";
  }
}
