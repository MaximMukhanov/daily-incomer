Object.defineProperty(exports, '__esModule', { value: true });

const mock = new Proxy(
  {},
  {
    get: function getter(target, key) {
      if (key === '__esModule') {
        return false;
      }
      return key;
    },
  }
);

export default mock;
