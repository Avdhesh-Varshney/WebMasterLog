const bcrypt = require("bcryptjs");

const generateHashedPassword = async (password) => {
  //  Hashing the password
  const salt = await bcrypt.genSaltSync(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  return hashedPassword;
};

module.exports = generateHashedPassword;
