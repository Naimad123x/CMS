const storage = require("../utils/storage");
const fs = require("fs");
const path = require("path");

class Engine {

  siteName = "NodePress Site";
  blocks = [];
  admins = [];
  placedBlocks = [];

  constructor(
    siteName = "NodePress Site",
  ) {
    this.siteName = siteName;

    // Load Admin users
    this.loadAdmins();
  }

  async loadBlocks() {
    return new Promise((resolve, reject) => {
      try {
        const eventFiles = fs.readdirSync(path.join(__dirname, `../blocks`)).filter(file => file.endsWith('.js'));

        this.blocks = eventFiles.map(file => {
          console.log("loading block:", file);
          try {
            const BlockClassModule = require(path.join(__dirname, `../blocks/${file}`));

            // Make sure to get the default export if it's an ES6 module
            const BlockClass = BlockClassModule.default || BlockClassModule;

            return BlockClass; // Create an instance of the block class
          } catch (e) {
            console.error(`Block ${file}:`, e);
            return null;
          }
        });

        // Filter out any failed instantiations
        this.blocks = this.blocks.filter(block => block !== null);

        // console.log(this.blocks);
        resolve(this.blocks);
      } catch (error) {
        console.error("Error loading blocks:", error);
        reject(error);
      }
    });
  }

  addBlock(block) {
    this.placedBlocks.push(block);
  }

  loadAdmins(){

    const admins = new Promise((resolve, reject) => {
      resolve(storage.getAdmins());
    });

    admins.then(admins => this.admins = admins)
  }

  async getBlocksData() {
    return new Promise((resolve, reject) => {
      const serialized = this.blocks.map((block) => {
        return new block(true).serialize()
      });
      resolve(serialized)
    });
  }

}

module.exports = Engine;