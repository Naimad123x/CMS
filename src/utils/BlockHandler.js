class BlockHandler {
  name;
  id;
  size;
  text;
  renderAdminUI = function (){};
  render = function (){};
  constructor(isInstance = false) {

    if(isInstance)
      this.id = 0;
    else {
      // let existingIds = engine.placedBlocks.map(a => {
      //   return a.id
      // });
      this.id = this.randomId(10)
    }

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
    // generate a unique id
    this.getId = function({ length, existing = [] }) {
      const limit = 100; // max tries to create unique id
      let attempts = 0; // how many attempts
      let id = false;
      while(!id && attempts < limit) {
        id = this.randomId(length); // create id
        if(!this.checkId(id, existing)) { // check unique
          id = false; // reset id
          attempts++; // record failed attempt
        }
      }
      return id; // the id or false if did not get unique after max attempts
    };

    this.checkId = function (id, existing = []) {
      let match = existing.find(function(item) {
        return item === id;
      });
      return !match;
    };

  }

  randomId(length = 6) {
    return Math.random().toString(36).substring(2, length+2);
  };
}

module.exports = BlockHandler;