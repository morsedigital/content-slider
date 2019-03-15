const checkHorizontal = (start, end) => {
  if (end > start + 100) return 'right';
  if (end < start - 100) return 'left';
  return 'none';
};

const tracker = () => {
  const start = { x: 0, y: 0 };
  return (event, pos = 'start') => {
    const { pageX, pageY } = event.changedTouches[0];
    if (pos === 'start') {
      start.x = pageX;
      start.y = pageY;
      return;
    }

    const distance = {
      x: pageX - start.x,
      y: pageY - start.y,
    };

    const direction = {
      horizontal: checkHorizontal(start.x, pageX),
      vertical: pageY > start.y + 100 ? 'down' : 'up',
    };

    return { distance, direction };
  };
};

const TouchStartHandler = handler => event => {
  handler(event);
};

const TouchEndHandler = (handler, next, previous) => event => {
  const {
    direction: { horizontal },
  } = handler(event, 'end');

  if (horizontal === 'left') {
    previous();
  } else if (horizontal === 'right') {
    next();
  }
};

export default (element, { next, previous }) => {
  const handler = tracker();
  element.addEventListener('touchstart', TouchStartHandler(handler), false);
  element.addEventListener('touchend', TouchEndHandler(handler, next, previous), false);
};
