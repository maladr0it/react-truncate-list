if (process.env.NODE_ENV === "production") {
  module.exports = require("./build/prod");
} else {
  module.exports = require("./build/dev");
}
