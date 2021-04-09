import component from "./component";

class Container extends component {
  constructor(root, className) {
    super({
      root: root,
      attributes: { class: className },
      innerText: "",
    });
  }
}

class Button extends component {
  constructor(root, value) {
    super({
      root: root,
      attributes: {},
      innerText: value,
      type: "button",
    });
  }

  on(event, fn) {
    this.element.addEventListener(event, fn);
  }
}

class Image extends component {
  constructor(root, attributes) {
    super({
      root: root,
      attributes: attributes,
      type: "img",
      innerText: "",
    });
  }
}

module.exports = { Container, Button, Image };
