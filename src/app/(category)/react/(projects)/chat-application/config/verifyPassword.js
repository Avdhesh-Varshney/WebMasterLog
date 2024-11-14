const bcrypt = require("bcryptjs");

const verifyPassword = async (enteredPassword, existingPassword) => {
  // Returns True if the password entered by the user matches
  return await bcrypt.compare(enteredPassword, existingPassword);
};

module.exports = verifyPassword;
