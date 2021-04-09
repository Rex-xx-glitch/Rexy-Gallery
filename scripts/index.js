import {
  AutoResize,
  AnimateMainImage,
  changeCurrent,
  loadUI,
} from "./helperFunctions";

export default class Rexy {
  constructor(root, options) {
    this.root = root;
    this.options = {
      images: options.images || [],
      speed: options.speed || 10000,
      loop: options.loop === undefined ? true : options.loop,
      animate: options.animate === undefined ? true : options.animate,
      autoPlay: options.autoPlay === undefined ? true : options.autoPlay,
    };
    this.current = 0;
    this.__load();
    this.options.autoPlay === true && this.__play();
  }

  __load() {
    const uiElements = loadUI(this.root, this.options);
    AutoResize(this.root, uiElements.mainImage);
    uiElements.leftBtn.on("click", () => {
      this.previous();
    });

    uiElements.rightBtn.on("click", () => {
      this.next();
    });

    const setCaption = () => {
      if (this.options.images[this.current].caption) {
        uiElements.captionContainer.innerText = this.options.images[
          this.current
        ].caption;
        uiElements.captionContainer.style.padding = "20px";
      } else {
        uiElements.captionContainer.innerText = "";
        uiElements.captionContainer.style.padding = "0";
      }
    };

    //handling imageChange event
    this.root.addEventListener("imageChange", (e) => {
      const selectionImages = document.querySelectorAll(
        ".selection-viewer img"
      );

      selectionImages.forEach((image) => {
        if (image.id != this.current) {
          image.classList.remove("selected");
        } else {
          image.classList.add("selected");
          image.scrollIntoView();
        }
      });

      //animate
      if (this.options.animate === true) {
        if (e.detail.direction === "right") {
          AnimateMainImage(uiElements.mainImage, {
            type: "slideInLeft",
            speed: 0.4,
          });
        } else if (e.detail.direction === "left") {
          AnimateMainImage(uiElements.mainImage, {
            type: "slideInRight",
            speed: 0.4,
          });
        } else {
          AnimateMainImage(uiElements.mainImage, { speed: 0.2 });
        }
      }

      //set caption if any
      setCaption();
      //change image url
      uiElements.mainImage.src = this.options.images[this.current].url;
    });

    //auto resize at window width change
    window.addEventListener("resize", () =>
      AutoResize(this.root, uiElements.mainImage)
    );

    //adding a delegate click event for selection images
    const selectionHandler = (e) => {
      if (e.target.tagName === "IMG") {
        this.current = parseInt(e.target.id);
        this.root.dispatchEvent(
          new CustomEvent("imageChange", {
            detail: { direction: "none" },
          })
        );
        this.options.autoPlay && this.play();
      }
    };
    uiElements.selectionViewerContainer.addEventListener(
      "click",
      selectionHandler
    );

    //select the first selection image
    const selectionImage = uiElements.selectionViewerContainer.querySelectorAll(
      "img"
    )[0];
    selectionImage.classList.add("selected");

    //set caption on load
    setCaption();
  }

  next() {
    this.current = changeCurrent(
      this.current,
      1,
      this.options.images.length - 1,
      0,
      this.options.loop
    );

    this.root.dispatchEvent(
      new CustomEvent("imageChange", { detail: { direction: "right" } })
    );
    this.options.autoPlay === true && this.__play();
  }

  previous() {
    this.current = changeCurrent(
      this.current,
      -1,
      this.options.images.length - 1,
      0,
      this.options.loop
    );

    this.root.dispatchEvent(
      new CustomEvent("imageChange", { detail: { direction: "left" } })
    );
    this.options.autoPlay === true && this.__play();
  }

  __play() {
    if (this.__clearCode) {
      clearTimeout(this.__clearCode);
      this.__clearCode = null;
    }
    if (this.options.autoPlay === true) {
      if (
        this.options.loop === false &&
        this.current === this.options.images.length - 1
      ) {
        return;
      }

      const autoChange = () => {
        this.next();
      };
      this.__clearCode = setTimeout(autoChange, this.options.speed);
    }
  }

  stop() {
    this.options.autoPlay = false;
  }

  autoPlay() {
    this.options.autoPlay = true;
    this.__play();
  }
}
