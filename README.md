# content-slider

### Synopsis

An content slider to break panels into a carousel at mobile written in vanilla JavaScript .

### Installation

```
yarn @morsedigital/content-slider
```

or

```
npm install @morsedigital/content-slider
```

### Example Instantiation

Firstly set up the html.erb for the carousel

```html
<div class="slider" data-content-slider="slider__item">
  <article class="slider__item">Item 1</article>
  <article class="slider__item">Item 2</article>
  <article class="slider__item">Item 3</article>
</div>
```

in your Javascript:

```javascript
import ContentSlider from "@morsedigital/content-slider";
import "@morsedigital/content-slider/assets/content-slider.scss";

// No need to add guard check unless you dynamically load module
(() => {
  ContentSlider();
})();
```

Or dynamically load modules

```javascript
import "@morsedigital/content-slider/assets/content-slider.scss";

const carouselElements = [...document.querySelectorAll('[data-content-slider]')];

if (carouselElements.length > 0) {
  import(/* webpackChunkName: "content-slider" */ '@morsedigital/content-slider').then(
    ({ default: ContentSlider }) => {
      ContentSlider();
    }
  );

```

## Contribute

If you'd like to contribute, content-slider is written using babel.

Please make sure any additional code should be covered in tests (Jest).

If you need to run the test please use:

```bash

yarn test

```

or to rebuild the JS run:

```bash

yarn build

```

## Maintainers

Adrian Stainforth (https://github.com/djforth)

# License

content-slider is an open source project falling under the MIT License. By using, distributing, or contributing to this project, you accept and agree that all code within the content-slider project are licensed under MIT license.
