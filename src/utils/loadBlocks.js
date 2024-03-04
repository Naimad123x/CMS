const fs = require("fs");
const path = require("path");

const eventFiles = fs.readdirSync(path.join(__dirname, `../blocks`)).filter(file => file.endsWith('.js'));

const blocks = []

for (const file of eventFiles) {
  console.log("loading block:", file)
  try{
    const block = require(path.join(__dirname, `../blocks/${file}`));
    blocks.push(block);
  }catch(e){
    console.error(`Block ${file}:`, e)
  }
}

console.log("Blocks fetching completed")
return blocks;