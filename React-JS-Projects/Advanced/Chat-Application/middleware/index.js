const { notFound, errorHandler } = require("./errorMiddleware");
const protect = require("./authMiddleware")

module.exports = { notFound, errorHandler, protect };
