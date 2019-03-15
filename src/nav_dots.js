const NAV_BTN = 'content-slider__button';

const generateArray = n => Array.apply(null, { length: n }).map(Number.call, Number);

const createButton = n => {
  const withActive = n !== 0 ? NAV_BTN : `${NAV_BTN} ${NAV_BTN}--active`;
  return `<li class='content-slider__nav-item'>
    <button data-slide="${n}" class="${withActive}">
      <span class="hidden">Item ${n}</span>
      <span class="hidden current">${n === 0 ? 'current' : ''}</span>
    </button>
  </li>`;
};

const createButtons = n => `<div class='content-slider__nav'>
      <ul class='content-slider__nav-items'>
        ${generateArray(n)
          .map(createButton)
          .join('')}
      </ul>
    </div>`;

const setActive = btns => active => {
  btns.forEach((btn, i) => {
    const current = btn.lastElementChild;
    if (current) {
      current.innerHTML = active === i ? 'current' : '';
    }

    if (active === i) {
      btn.classList.add(`${NAV_BTN}--active`);
    } else {
      btn.classList.remove(`${NAV_BTN}--active`);
    }
  });
};

export default (el, n, animater) => {
  el.insertAdjacentHTML('beforeend', createButtons(n));

  const btns = [...el.querySelectorAll(`.${NAV_BTN}`)];
  const manageActive = setActive(btns);

  btns.forEach(btn => {
    btn.addEventListener('click', e => {
      e.preventDefault();
      const active = parseInt(btn.dataset.slide, 10);
      manageActive(active);
      animater.select(active);
    });
  });

  return i => {
    manageActive(i);
  };
};
