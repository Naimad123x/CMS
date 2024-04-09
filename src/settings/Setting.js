
class Setting {

  constructor(name, default_value, type) {
    if(this.constructor === Setting) {
      throw new Error("Class is of abstract type and can't be instantiated");
    }
    this.name = name
    this.type = type
    this.default_value = default_value
  }

  get getName() { return this.name }
  get getType() { return this.type }
  get getDefaultValue() { return this.default_value}
}