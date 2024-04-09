const {engine} = require("../../../index");

class siteName extends Setting{
  constructor() {
    super("siteName",engine.siteName ? engine.siteName : "NodePress Site", String);
  }
}

module.exports = siteName;