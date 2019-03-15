import ViewportDetect from '@djforth/viewport-detection-fp';
import Animating from './animating';
import CreateNavDots from './nav_dots';
import TouchHandler from './touch_handler';

const setSlider = el => {
  const items = [...el.querySelectorAll(`.${el.dataset.contentSlider}`)];
  if (items.length <= 1) return;

  items.forEach((item, i) => {
    item.classList.add('content-slider');
    if (i !== 0) {
      item.setAttribute('aria-hidden', 'true');
      item.style.transform = 'translateX(-110%)';
    } else {
      item.style.transform = 'translateX(0)';
    }
  });
  const animate = Animating(items);
  const setDots = CreateNavDots(el, items.length, animate);
  TouchHandler(el, {
    next: () => {
      setDots(animate.next());
    },
    previous: () => {
      console.count('trigger previous');
      setDots(animate.previous());
    },
  });
};

const resetSlider = el => {
  const items = [...el.querySelectorAll(`.${el.dataset.contentSlider}`)];

  items.forEach(item => {
    item.classList.remove('content-slider');
    item.removeAttribute('aria-hidden');
    item.style.transform = '';
  });

  const nav = document.querySelector('.content-slider__nav');
  if (nav) {
    el.removeChild(nav);
  }
};

export default () => {
  const sliders = [...document.querySelectorAll('[data-content-slider]')];

  if (sliders.length === 0) return null;

  const vpDetect = ViewportDetect();
  if (vpDetect.getDevice() === 'mobile') {
    sliders.forEach(setSlider);
  }

  vpDetect.addCallback(device => {
    // trigger something
    if (device === 'mobile') {
      sliders.forEach(setSlider);
    } else {
      sliders.forEach(resetSlider);
    }
  });
  vpDetect.track();
};
