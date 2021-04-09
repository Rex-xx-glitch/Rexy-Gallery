class component {
  constructor(options) {
    (this.root = options.root),
      (this.element = null),
      (this.type = options.type || "div"),
      (this.attributes = options.attributes || {}),
      (this.innerText = options.innerText || "");
    this.__create();
  }

  __create() {
    try {
      this.element = document.createElement(this.type);

      for (let name in this.attributes) {
        this.element.setAttribute(name, String(this.attributes[name]));
      }

      this.element.append(document.createTextNode(this.innerText));

      this.root.append(this.element);
    } catch (e) {
      throw new Error("Invalid root element");
    }
  }
}

export default component;
