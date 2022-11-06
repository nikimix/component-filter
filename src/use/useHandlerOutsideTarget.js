import {onUnmounted} from 'vue';

export default (target, cb) => {
  const runCallBack = (evt) => {
    if (!evt.target.closest(`#${target.value.id}`)) cb(evt);
  };

  const setHandler = () => {
    document.addEventListener('click', runCallBack);
  };

  const removeHandler = () => {
    document.removeEventListener('click', runCallBack);
  };

  onUnmounted(() => {
    document.removeEventListener('click', runCallBack);
  });

  return {
    setHandler,
    removeHandler,
  };
};
