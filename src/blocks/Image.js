const BlockHandler = require("../utils/BlockHandler")

class Image extends BlockHandler{
    constructor() {
        super();
        this.name = "Image"
        this.description = "Add Image"
        this.options = {
            image: {
                type: String,
                default: "https://placehold.co/600x400?text=Placeholder",
            },
        }
        this.image = this.options.image.default;
        this.setImage = function(image) {
            if (typeof image !== "string")
                return false;
            this.text = image;
            return true;
        }
        this.render = function () {
            return `<div class="text-block"><p><img src="${this.image}"></p></div>`;
        }
        this.renderAdminUI = function() {
            return `
      <h1>Image Block Settings</h1>
      <form id="image-settings-form">
        <label for="image-input">Image link:</label>
        <input type="text" id="image-input" placeholder="send link"><br/>
        
        <label for="image-width">width:</label>
        <input type="text" id="image-width" placeholder="600"><br/>
        
        <label for="image-lenght">lenght:</label>
        <input type="text" id="image-lenght" placeholder="600"><br/>
        <br>
      </form>
    ` ;
        }
    }

}

module.exports = Image;