const animatingSetup = (el, moveTo, transitionend) => {
  el.classList.add('content-slider--animate');
  el.addEventListener('transitionend', transitionend, true);
  window.requestAnimationFrame(() => {
    el.style.transform = `translateX(${moveTo})`;
  });
};

const clearAnimatingIn = ({ target: el }) => {
  el.removeEventListener('transitionend', clearAnimatingIn, true);
  if (el instanceof Element) {
    el.classList.remove('content-slider--animate');
    el.removeAttribute('aria-hidden');
  }
};

const clearAnimatingOut = ({ target: el }) => {
  el.removeEventListener('transitionend', clearAnimatingOut, true);
  if (el instanceof Element) {
    el.classList.remove('content-slider--animate');
    el.style.transform = 'translateX(-110%)';
    el.setAttribute('aria-hidden', 'true');
  }
};

const animatingIn = animateIn => {
  animatingSetup(animateIn, '0', clearAnimatingIn);
};

const animatingOut = animateOut => {
  animatingSetup(animateOut, '110%', clearAnimatingOut);
};

const animatingOutPrevious = animateOut => {
  setTimeout(() => {
    animatingSetup(animateOut, '-110%', clearAnimatingOut);
  }, 10);
};

const animatingInPrevious = animateIn => {
  animateIn.style.transform = 'translateX(110%)';
  setTimeout(() => {
    animatingSetup(animateIn, '0', clearAnimatingIn);
  }, 10);
};

export default items => {
  let current = 0;
  return {
    next: () => {
      const animateOut = items[current];
      current = current + 1 >= items.length ? 0 : current + 1;
      const animateIn = items[current];

      animatingIn(animateIn);
      animatingOut(animateOut);

      return current;
    },
    previous: () => {
      const animateOut = items[current];
      current = current - 1 <= -1 ? items.length - 1 : current - 1;
      const animateIn = items[current];

      animatingInPrevious(animateIn);
      animatingOutPrevious(animateOut);

      return current;
    },
    select: n => {
      const animateIn = items[n];
      const animateOut = items[current];
      current = n;

      animatingIn(animateIn);
      animatingOut(animateOut);

      return current;
    },
  };
};
