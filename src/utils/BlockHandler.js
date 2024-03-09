class BlockHandler {
  name;
  id;
  size;
  text;
  renderAdminUI = function (){};
  render = function (){};
  constructor(isInstance) {
    if(isInstance)
      this.id = 0;
    this.serialize = function () {
      return {
        id: this.id,
        type: this.name,
        size: this.size,
        text: this.text,
        render: this.render().toString(),
        renderAdminUI: this.renderAdminUI().toString()
      };
    }
  }
}

module.exports = BlockHandler;