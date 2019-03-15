export default (el, ev) => {
  const event = new Event(ev, {
    view: window,
    bubbles: true,
    cancelable: true,
  });

  el.dispatchEvent(event);
};

// https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/KeyboardEvent
export const keyboardEvent = (el, ev, options) => {
  const event = new KeyboardEvent(ev, options);

  el.dispatchEvent(event);
};
