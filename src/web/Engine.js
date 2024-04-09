const storage = require("../utils/storage");
const fs = require("fs");
const path = require("path");
const {getNewestBuildBlocks} = require("../utils/storage");
const {engine} = require("../../index");
const {nanoid} = require("nanoid");

class Engine {

  siteName = "NodePress Site";
  blocks = [];
  admins = [];
  placedBlocks = [];
  settings = {};
  snippets = [];
  addonsElements = []
  addons = []
  tokens = []
  addonsCodes = []

  constructor(
    siteName = "NodePress Site",
  ) {
    this.hashes = [];
    this.siteName = siteName
    this.loadSettings().then(()=>{})

    this.loadBlocksSettings().then(()=>{})
    // Load AdminUser users
    this.loadAdmins().then(()=>{});

    this.addHash = function(client, hash){
      let obj = {client: client, hash: hash, date: Date.now()}
      this.hashes.push(obj)
      return obj;
    }

    this.setSiteName = function(siteName) {
      this.siteName = siteName
    }

    this.evalSnippets()

    this.fetchAddons()
  }

  fetchAddons(){
    const addonsFiles = fs.readdirSync(path.join(__dirname, `../snippets/content`), {recursive: true})
      .filter(file => file.endsWith('.js'));

    for (const file of addonsFiles) {
      const elements = require(path.join(__dirname, `../snippets/content/${file}`));
      let addon = new elements()
      this.addonsCodes = this.addonsCodes.concat(addon.getHtmlElements())
      this.addons.push(addon)
      this.addonsElements.push(elements)
    }
  }

  getNodePress(){
    return {
      siteName: this.siteName,
      blocks: this.blocks,
      placedBlocks: this.placedBlocks,
      settings: this.settings,
      setSiteName: this.setSiteName
    }
  }

  evalSnippets(){
    function createFunction(funcString, argument) {
      // Wrap the function string in a function constructor and return it
      const func = new Function('nodePress', funcString);
      return func(argument); // Call the function with the argument
    }
    this.snippets.forEach(func =>{
      createFunction(func, this.getNodePress())
    })
  }

  addToken(user){
    let exist = this.tokens.find(a=>a.user === user)
    if(exist)
      return exist;
    let data = {
      user: user,
      token: nanoid(16),
    }
    this.tokens.push(data)
    return data;
  }

  getToken(user){
    return this.tokens.find(a=>a.user === user);
  }

  removeToken(user){

  }

  // Load all block files
  async loadBlocks() {
    return new Promise((resolve, reject) => {
      try {
        const eventFiles = fs.readdirSync(path.join(__dirname, `../blocks`)).filter(file => file.endsWith('.js'));

        this.blocks = eventFiles.map(file => {
          console.log("loading block:", file);
          try {
            const BlockClassModule = require(path.join(__dirname, `../blocks/${file}`));

            return BlockClassModule.default || BlockClassModule; // Create an instance of the block class
          } catch (e) {
            console.error(`Block ${file}:`, e);
            return null;
          }
        });

        // Filter out any failed instantiations
        this.blocks = this.blocks.filter(block => block !== null);

        resolve(this.blocks);
      } catch (error) {
        console.error("Error loading blocks:", error);
        reject(error);
      }
    });
  }

  // Add placed block to array
  addBlock(block) {
    this.placedBlocks.push(block);
  }

  // Fetch admins from database
  async loadAdmins(){

    const admins = new Promise((resolve, reject) => {
      resolve(storage.getAdmins());
    });

    admins.then(admins => this.admins = admins)
  }

  // Fetching settings from database
  async loadSettings(){

    const settings = new Promise((resolve, reject) => {
      resolve(storage.getSettings());
    });

    settings.then(settings => {
      this.settings = settings
      this.reloadSettings();
    })
  }

  async loadBlocksSettings(){
    this.placedBlocks = [];
    getNewestBuildBlocks().then((blocksRaw) =>{
      blocksRaw.forEach(async (block) =>{
        const Block = await this.blocks.find(a => a.name === block.type);

        const newBlock = new Block();
        // console.log(newBlock)
        // console.log(block.options)
        for(let a in block.options) {
          // console.log(1, newBlock[a])
          newBlock[a] = block.options[a]
          // console.log(2, newBlock[a])
        }
        // console.log(newBlock)
        this.placedBlocks.push(newBlock)
      })
    })
  }

  // Change values of Engine
  reloadSettings(){
    this.siteName = this.settings.siteName ? this.settings.siteName : "NodePress Site";
  }

  // Fetch all blocks serialized data
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