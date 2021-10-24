/* eslint-disable */
import { Directive } from 'vue';

const directive: Directive = {
  beforeMount(el, binding) {
    el._keyupCallback = (event: any) => {
      const allowedDigits = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '0',
        'Backspace',
        'Delete',
      ];
      if (allowedDigits.includes(event.key)) {
        binding.value(event);
      }
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
