function areIsomorphic(str1, str2) {
  if (str1.length !== str2.length) return false;

  let map1 = {}, map2 = {};

  for (let i = 0; i < str1.length; i++) {
    let char1 = str1[i], char2 = str2[i];

    if ((map1[char1] && map1[char1] !== char2) || (map2[char2] && map2[char2] !== char1)) {
      return false;
    }

    map1[char1] = char2;
    map2[char2] = char1;
  }
  return true;
}

function checkIsomorphism() {
  const string1 = document.getElementById('string1').value;
  const string2 = document.getElementById('string2').value;
  const output = document.getElementById('output');

  if (areIsomorphic(string1, string2)) {
    output.textContent = 'The strings are isomorphic.';
    output.style.color = 'darkgreen';
  } else {
    output.textContent = 'The strings are not isomorphic.';
    output.style.color = 'darkred';
  }
}
