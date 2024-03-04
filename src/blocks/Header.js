class Header {
  name = "Header"
  description = "Add header"
  options = {
    size: {
      type: Number,
      values: [1, 2, 3, 4, 5, 6],
      default: 1,
    },
    text: {
      type: String,
      default: "Header Text",
    },
  }


  size = this.options.size.default
  text = this.options.text.default

  /**
   * @param {Number} number
   * @type {boolean}
   * */
  setSize(number) {
    if (!this.options.size.values.includes(number))
      return false;
    this.size = number;
    return true;
  }

  /**
   * @param {String} text
   * @type {boolean}
   * */
  setText(text) {
    if (typeof text !== "string")
      return false;
    this.text = text;
    return true;
  }

  render() {
    return `<div class="header-block"><h${this.size}>${this.text}</h${this.size}></div>`;
  }

  renderAdminUI() {
    return `
      <h1>Header Block Settings</h1>
      <form id="header-settings-form">
        <label for="size-input">Size:</label>
        <select id="size-input">
          ${this.options.size.values.map((value) => `<option value="${value}">${value}</option>`).join('')}
        </select>
        <br>
        <label for="text-input">Text:</label>
        <input type="text" id="text-input" placeholder="${this.options.text.default}">
        <br>
        <button type="button" id="update-settings-btn">Update Settings</button>
      </form>
    `;
  }
}

module.exports = Header;