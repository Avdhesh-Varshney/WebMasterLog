function check() {
  const input = document.getElementById('string').value;
  const outputText = document.getElementById('output-text');

  if (isValidParenthesis(input)) {
    outputText.textContent = 'The string has valid Parenthesis.';
    outputText.style.color = 'green';
  } else {
    outputText.textContent = 'The string has invalid Parenthesis.';
    outputText.style.color = 'red';
  }
}

function isValidParenthesis(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };

  for (let char of s) {
    if (map[char]) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (map[top] !== char) {
        return false;
      }
    }
  }

  return stack.length === 0;
}
