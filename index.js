require('dotenv').config()
const Engine = require("./src/web/Engine");

const engine = new Engine();

engine.loadBlocks().then(()=> require("./src/web/app"))

module.exports = {engine}