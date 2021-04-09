# What is this?

Create beautiful gallery slides with Rexy Gallery. Display your images with style.

# Installation

`npm i rexy-gallery --save`

Then...

...
import Rexy from "rexy-gallery";

const rexy = new Rexy(document.getElementById("gallery"), {
loop: false,
speed: 1000,
autoPlay: false,
animate: true,
images: [
{
url: "images/1.jpeg",
caption: "hello there....",
},
],
});
...

## Options

Rexy Gallery supports a list of options, most which are optional:

- _images_ - _array of objects_ options ( _url_ - _path to image_, _caption_ - _string_ (optional) ) - required
- _loop_ - true | false (Defaults to true)
- _speed_ - _interger_ in milliseconds (Defaults 10000ms)
- _animate_ - true | false (Defaults to true)
- _autoPlay_ - true | false (Defaults to true)
