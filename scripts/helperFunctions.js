import { Container, Image, Button } from "./elements";

const AutoResize = (root, mainImage) => {
  const width = root.clientWidth;
  const height = (width / 3) * 2;
  mainImage.style.width = width + "px";
  mainImage.style.height = height + "px";
};

const AnimateMainImage = (image, options) => {
  image.style.animation = `${options.type || "appear"} ${
    options.speed || 0.7
  }s ${options.timingFunction || "linear"}`;
  setTimeout(
    () => (image.style.animation = "none"),
    (options.speed && options.speed * 1000 + 10) || 710
  );
};

const changeCurrent = (current, incrementValue, max, min, loop) => {
  if (loop === true) {
    if (incrementValue > 0 && current >= max) {
      return min;
    } else if (incrementValue < 0 && current <= min) {
      return max;
    } else {
      return current + incrementValue;
    }
  } else {
    return __clamp(current + incrementValue, min, max);
  }
};

const __clamp = (num, min, max) => {
  if (num < min) {
    return min;
  }
  if (num > max) {
    return max;
  }
  return num;
};

const loadUI = (root, options) => {
  const galleryContainer = new Container(root, "gallery").element;
  const mainViewerContainer = new Container(galleryContainer, "main-viewer")
    .element;
  const selectionViewerContainer = new Container(
    galleryContainer,
    "selection-viewer"
  ).element;
  const controllerContainer = new Container(mainViewerContainer, "controller")
    .element;

  const mainImage = new Image(mainViewerContainer, {
    src: options.images[0].url,
    alt: "picture gallery",
    width: "900px",
    height: "600px",
  }).element;

  const captionContainer = new Container(
    mainViewerContainer,
    "caption-container"
  ).element;

  options.images.forEach((image, i) => {
    new Image(selectionViewerContainer, {
      src: image.url,
      alt: "picture gallery selection",
      width: "300px",
      height: "200px",
      id: i,
    });
  });

  const leftBtn = new Button(controllerContainer, "");
  const rightBtn = new Button(controllerContainer, "");

  return {
    galleryContainer,
    mainViewerContainer,
    selectionViewerContainer,
    controllerContainer,
    mainImage,
    leftBtn,
    rightBtn,
    captionContainer,
  };
};

module.exports = { AutoResize, AnimateMainImage, changeCurrent, loadUI };
