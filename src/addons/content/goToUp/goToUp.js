const Addon = require("../../Addon");
const path = require("node:path");


class goToUp extends Addon{
  constructor() {
    super("go to up", "adds button to return to top of page", path.dirname);
  }
}

module.exports = goToUp;