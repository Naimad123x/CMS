const BlockHandler = require("../utils/BlockHandler");

class Button extends BlockHandler {
    constructor() {
        super();
        this.name = "Button";
        this.description = "Add Button";
        this.options = {
            text: {
                type: String,
                default: "Click me",
            },
            backgroundColor: {
                type: String,
                default: "#4CAF50",
            },
            textColor: {
                type: String,
                default: "#FFFFFF",
            },
            fontSize: {
                type: Number,
                default: 16,
            },
            height: {
                type: Number,
                default: 40,
            },
            width: {
                type: Number,
                default: 120,
            },
        };
        this.text = this.options.text.default;
        this.backgroundColor = this.options.backgroundColor.default;
        this.textColor = this.options.textColor.default;
        this.fontSize = this.options.fontSize.default;
        this.height = this.options.height.default;
        this.width = this.options.width.default;

        this.setText = function(text) {
            if (typeof text !== "string") return false;
            this.text = text;
            return true;
        };

        this.setBackgroundColor = function(color) {
            if (typeof color !== "string") return false;
            this.backgroundColor = color;
            return true;
        };

        this.setTextColor = function(color) {
            if (typeof color !== "string") return false;
            this.textColor = color;
            return true;
        };

        this.setFontSize = function(size) {
            if (typeof size !== "number") return false;
            this.fontSize = size;
            return true;
        };

        this.setHeight = function(height) {
            if (typeof height !== "number") return false;
            this.height = height;
            return true;
        };

        this.setWidth = function(width) {
            if (typeof width !== "number") return false;
            this.width = width;
            return true;
        };

        this.render = function() {
            return `<div class="button-block"><button style="background-color:${this.backgroundColor}; color:${this.textColor}; font-size:${this.fontSize}px; height:${this.height}px; width:${this.width}px;">${this.text}</button></div>`;
        };

        this.renderAdminUI = function() {
            return `
                <h1>Button Block Settings</h1>
                <form id="button-settings-form">
                    <label for="button-text-input">Button Text:</label>
                    <input type="text" id="button-text-input" placeholder="Enter button text"><br/>
                    
                    <label for="button-bg-color">Background Color:</label>
                    <input type="color" id="button-bg-color"><br/>
                    
                    <label for="button-text-color">Text Color:</label>
                    <input type="color" id="button-text-color"><br/>
                    
                    <label for="button-font-size">Font Size:</label>
                    <input type="number" id="button-font-size" placeholder="Enter font size"><br/>
                    
                    <label for="button-width">Width:</label>
                    <input type="number" id="button-width" placeholder="Enter width"><br/>
                    
                    <label for="button-height">Height:</label>
                    <input type="number" id="button-height" placeholder="Enter height"><br/>
                    <br>
                </form>
            `;
        };
    }
}

module.exports = Button;
