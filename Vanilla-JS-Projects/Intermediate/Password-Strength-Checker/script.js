function checkPasswordStrength() {
  const password = document.getElementById("input-box").value;
  let passwordStrength = 0;
  let upperCount = 0;
  let lowerCount = 0;
  let numCount = 0;
  let spaceCount = 0;
  let specialCharacterCount = 0;

  for (let i = 0; i < password.length; i++) {
    let char = password.charAt(i);
    if (char.match(/[A-Z]/)) {
      upperCount++;
    } else if (char.match(/[a-z]/)) {
      lowerCount++;
    } else if (char.match(/[0-9]/)) {
      numCount++;
    } else if (char === " ") {
      spaceCount++;
    } else {
      specialCharacterCount++;
    }
  }

  if (upperCount >= 1) {
    passwordStrength++;
  }
  if (lowerCount >= 1) {
    passwordStrength++;
  }
  if (numCount >= 1) {
    passwordStrength++;
  }
  if (spaceCount >= 1) {
    passwordStrength++;
  }
  if (specialCharacterCount >= 1) {
    passwordStrength++;
  }

  let review = "";
  if (passwordStrength === 1) {
    review = "That's a very easy password, Not good for use";
  } else if (passwordStrength === 2) {
    review = "That's a weak password, You should change it to some strong password.";
  } else if (passwordStrength === 3) {
    review = "Your password is just okay, you may change it.";
  } else if (passwordStrength === 4) {
    review = "Your password is hard to guess.";
  } else if (passwordStrength === 5) {
    review = "Its the strong password, No one can guess this password ";
  }

  document.getElementById("output-text").textContent = review;
}
