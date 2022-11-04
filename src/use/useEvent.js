import {onUnmounted} from 'vue';

export default (rootSelector, cb) => {
  const closeElem = (evt) => {
    if (!evt.target.closest(rootSelector)) {
      cb();
    }
  };

  const initEvent = () => {
    document.addEventListener('click', closeElem);
  };

  const removeEvent = () => {
    document.removeEventListener('click', closeElem);
  };

  onUnmounted(() => document.removeEventListener('click', closeElem));

  return {
    initEvent,
    removeEvent,
  };
};
