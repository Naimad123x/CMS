const storage = require("../utils/storage");

class Engine {

  siteName = "NodePress Site";
  blocks = [];
  admins = []

  constructor(
    siteName = "NodePress Site",
  ) {
    this.siteName = siteName;
  }

  loadBlocks(){
    this.blocks = require("../utils/loadBlocks")
    return this;
  }

  loadAdmins(){

    const admins = new Promise((resolve, reject) => {
      resolve(storage.getAdmins());
    });

    admins.then(admins => this.admins = admins)
  }

}

module.exports = Engine;