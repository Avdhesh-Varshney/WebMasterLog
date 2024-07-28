function checkSubsequence() {
  const str1 = document.getElementById('string1').value;
  const str2 = document.getElementById('string2').value;
  const output = document.getElementById('output-text');

  if (isSubsequence(str1, str2)) {
    output.textContent = `"${str2}" is a subsequence of "${str1}".`;
    output.style.color = 'darkgreen';
  } else {
    output.textContent = `"${str2}" is not a subsequence of "${str1}".`;
    output.style.color = 'darkred';
  }
}

function isSubsequence(mainStr, subStr) {
  let i = 0;
  let j = 0;
  
  while (i < mainStr.length && j < subStr.length) {
    if (mainStr[i] === subStr[j]) {
      j++;
    }
    i++;
  }
  
  return j === subStr.length;
}
