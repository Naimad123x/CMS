const BlockHandler = require("../utils/BlockHandler")

class Text extends BlockHandler{
  constructor() {
    super();
    this.name = "Text"
    this.description = "Add Text"
    this.options = {
      text: {
        type: String,
        default: "Text",
      },
    }
    this.text = this.options.text.default;
    this.setText = function(text) {
      if (typeof text !== "string")
        return false;
      this.text = text;
      return true;
    }
    this.render = function () {
      return `<div class="text-block"><p>${this.text}</p></div>`;
    }
    this.renderAdminUI = function() {
      return `
      <h1>Text Block Settings</h1>
      <form id="header-settings-form">
        <label for="text-input">Text:</label>
        <input type="text" id="text-input" placeholder="${this.options.text.default}">
      </form>
    `;
    }
  }

}

module.exports = Text;