const path = require("path")
const fs = require("fs")

class Addon {

  constructor(name, description, pckg) {
    if(this.constructor === Addon) {
      throw new Error("Class is of abstract type and can't be instantiated");
    }
    this.name = name;
    this.description = description;
    this.package = pckg;
    this.htmlElements = []
    this.getHtmlElements = function() {
      const elementsFiles = fs.readdirSync(path.join(__dirname, `./content/`), {recursive: true}).filter(file => file.includes("htmlElements") && file.endsWith('.html'));

      for (const file of elementsFiles) {
        const data = fs.readFileSync(path.join(__dirname, `./content/${file}`), 'utf8');
        this.htmlElements.push(data)
      }

      return this.htmlElements
    }
  }
  getName(){ return this.name }
  getDescription(){ return this.description }
}

module.exports = Addon