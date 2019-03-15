import ContentSlider from '../src';

import simulateClick from '../__helpers__/simulate_click';

import ViewportDetection from '@djforth/viewport-detection-fp';

import { readFileSync } from 'fs';
import { join } from 'path';

const htmlPath = join(__dirname, '../__html__/content_slider.html');
const markup = readFileSync(htmlPath);

jest.mock('@djforth/viewport-detection-fp');

const vpd = ViewportDetection();
describe('Content Carousel', () => {
  let el, items, dots, dotsNav;
  jest.useFakeTimers();
  beforeAll(() => {
    document.body.innerHTML = markup.toString();
    vpd.__setDevice('mobile');
    vpd.__triggerCallbacks();
    ContentSlider();

    el = document.querySelector('[data-content-slider]');
    items = [...el.querySelectorAll(`.${el.dataset.contentSlider}`)];

    dotsNav = el.querySelector('.content-slider__nav');
    dots = dotsNav.querySelectorAll('.content-slider__nav-item');
  });

  beforeAll(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation(cb => {
      cb();
    });
  });

  afterAll(() => {
    window.requestAnimationFrame.mockRestore();
  });

  test('should add content-slider class', () => {
    items.forEach(item => {
      expect(item).toHaveCssClass('content-slider');
    });
  });

  test('should add aria-hidden', () => {
    items.forEach((item, i) => {
      if (i === 0) {
        expect(item).not.toHaveAttribute('aria-hidden', 'false');
      } else {
        expect(item).toHaveAttribute('aria-hidden', 'true');
      }
    });
  });

  test('should set transform', () => {
    items.forEach((item, i) => {
      if (i === 0) {
        expect(item.style.transform).toEqual('translateX(0)');
      } else {
        expect(item.style.transform).toEqual('translateX(-110%)');
      }
    });
  });

  describe('should set dots navigation', () => {
    const NAV_BTN = 'content-slider__button';

    test('should set wrapper', () => {
      expect(dotsNav).toHaveCssClass('content-slider__nav');
      expect(dotsNav.firstElementChild).toHaveCssClass('content-slider__nav-items');
    });

    test('should create buttons', () => {
      dots.forEach((dot, i) => {
        expect(dot).toHaveCssClass('content-slider__nav-item');

        const btn = dot.firstElementChild;
        expect(btn).toHaveAttribute('data-slide', i.toString());

        expect(btn).toHaveCssClass(NAV_BTN);

        if (i === 0) {
          expect(btn).toHaveCssClass(`${NAV_BTN}--active`);
        }

        const itemText = btn.firstElementChild;
        expect(itemText).toHaveTextContent(`Item ${i}`);

        const currentText = btn.lastElementChild;
        expect(currentText).toHaveTextContent(i === 0 ? 'current' : '');
      });
    });

    describe('if dots navigation clicked', () => {
      let btn;
      beforeAll(() => {
        btn = dots[2].firstElementChild;
        simulateClick(btn, 'click');
      });

      test('should set current dot nav', () => {
        expect(btn).toHaveCssClass(`${NAV_BTN}--active`);
        expect(btn.lastElementChild).toHaveTextContent('current');
      });

      test('should remove current from first item', () => {
        const oldDot = dots[0].firstElementChild;
        expect(oldDot).not.toHaveCssClass(`${NAV_BTN}--active`);
        expect(oldDot.lastElementChild).toHaveTextContent('');
      });

      test('should set old item to move out', () => {
        const item = items[0];
        expect(item).toHaveCssClass('content-slider--animate');
        expect(item.style.transform).toEqual('translateX(110%)');
      });

      test('should set item after animation', () => {
        const item = items[0];
        simulateClick(item, 'transitionend');
        expect(item).not.toHaveCssClass('content-slider--animate');
        expect(item.style.transform).toEqual('translateX(-110%)');
        expect(item).toHaveAttribute('aria-hidden', 'true');
      });

      test('should set new item to move in', () => {
        const item = items[2];
        expect(item).toHaveCssClass('content-slider--animate');
        expect(item.style.transform).toEqual('translateX(0)');
      });

      test('should set item after animation', () => {
        const item = items[2];
        simulateClick(item, 'transitionend');
        expect(item).not.toHaveCssClass('content-slider--animate');
        expect(item.style.transform).toEqual('translateX(0)');
        expect(item).not.toHaveAttribute('aria-hidden', 'true');
      });
    });
  });

  describe('If screen size changed', () => {
    beforeAll(() => {
      vpd.__setDevice('tablet');
      vpd.__triggerCallbacks();
    });

    test('should remove all content slider attributes', () => {
      items.forEach(item => {
        expect(item).not.toHaveCssClass('content-slider');
        expect(item.style.transform).toEqual('');
        expect(item).not.toHaveAttribute('aria-hidden', 'true');
      });
    });

    test('should remove dots nav', () => {
      expect(document.querySelector('.content-slider__nav')).toBeNull();
    });
  });
});
