const { User } = require("../models");
const {
  generateToken,
  generateHashedPassword,
  verifyPassword,
} = require("../config");

// @description     Register new user
// @route           POST /api/user/
// @access          Public
const registerUser = async (req, res) => {
  const { name, email, password, pic } = req.body;

  // Check if any of them is undefined
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Please enter all the fields",
    });
  }

  // Check if user already exists in our DB
  const userExists = await User.findOne({ email }).exec();

  if (userExists) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "User already exists",
    });
  }

  // Register and store the new user
  const userCreated = await User.create(
    // If there is no picture present, remove 'pic'
    pic === undefined || pic.length === 0
      ? {
          name,
          email,
          password: await generateHashedPassword(password),
        }
      : {
          name,
          email,
          password: await generateHashedPassword(password),
          pic,
        }
  );

  if (userCreated) {
    return res.status(201).json({
      success: true,
      statusCode: 201,
      _id: userCreated._id,
      name: userCreated.name,
      email: userCreated.email,
      pic: userCreated.pic,
      token: generateToken(userCreated._id, userCreated.email),
      message: "User Created Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Failed to create the User",
    });
  }
};

// @description     Auth the user
// @route           POST /api/users/login
// @access          Public
const authUser = async (req, res) => {
  const { email, password } = req.body;

  // Check if any of them is undefined
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Please enter all the fields",
    });
  }

  // Check if user already exists in our DB
  const userExists = await User.findOne({ email }).exec();

  // If user exists and password is verified
  if (userExists && (await verifyPassword(password, userExists.password))) {
    return res.status(200).json({
      success: true,
      statusCode: 200,
      _id: userExists._id,
      name: userExists.name,
      email: userExists.email,
      pic: userExists.pic,
      token: generateToken(userExists._id, userExists.email),
      message: "Authenticated Successfully",
    });
  } else {
    return res.status(400).json({
      success: false,
      statusCode: 400,
      message: "Invalid Email or Password",
    });
  }
};

// @description     Get or Search all users
// @route           GET /api/user?search=
// @access          Public
const allUsers = async (req, res) => {
  // Keyword contains search results
  const keyword = req.query.search
    ? {
        $or: [
          { name: { $regex: req.query.search, $options: "i" } },
          { email: { $regex: req.query.search, $options: "i" } },
        ],
      }
    : {};

  // Find and return users except current user
  const userExists = await User.find(keyword)
    .find({ _id: { $ne: req.user._id } })
    .exec();

  return res.status(200).json(userExists);
};

module.exports = { registerUser, authUser, allUsers };
