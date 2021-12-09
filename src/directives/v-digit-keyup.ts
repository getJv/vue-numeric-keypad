/* eslint-disable */
import { Directive } from 'vue';

const directive: Directive = {
  beforeMount(el, binding) {
    el._keyupCallback = (event: any) => {
      binding.value(event);
    };
    document.addEventListener('keyup', el._keyupCallback);
  },
  unmounted(el, binding) {
    document.removeEventListener('keyup', el._keyupCallback);
    delete el._keyupCallback;
  },
};

const digitKeyup = { digitKeyup: directive };
export default digitKeyup;
