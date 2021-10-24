/* eslint-disable */
import { Directive } from 'vue';

const directive: Directive = {
  beforeMount(el, binding) {
    el._keydownCallback = (event: any) => {
      if (event.key === binding.arg) {
        binding.value();
      }
    };
    document.addEventListener('keydown', el._keydownCallback);
  },
  unmounted(el, binding) {
    document.removeEventListener('keydown', el._keydownCallback);
    delete el._keydownCallback;
  },
};

const keydown = { keydown: directive };
export default keydown;
