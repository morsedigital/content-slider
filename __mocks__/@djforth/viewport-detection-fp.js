let device = 'mobile';
const callbacks = [];
const track = jest.fn();
const width = 750;

const vp = jest.fn(() => ({
  addCallback: cb => {
    callbacks.push(cb);
  },
  getDevice: () => device,
  getWidth: () => width,
  track,
  __getTrack: () => track,
  __setDevice: d => {
    device = d;
  },
  __setWidth: w => {
    width = w;
  },
  __triggerCallbacks: () => {
    callbacks.forEach(cb => {
      cb(device);
    });
  },
}));

export default vp;
