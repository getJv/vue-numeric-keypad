<template>
  <div
    v-digit-keyup="handleKeyUp"
    class="container mx-auto p-3 m-3 box-border rounded bg-gray-50 font-sans antialiased "
  >
    <div class="grid grid-cols-6 gap-2">
      <input class="jm-pad-output" type="text" :value="formatedAmount" />
      <div
        v-for="button in buttons"
        :key="button.id"
        :class="button.classes"
        @click="handleClick(button.key)"
      >
        {{ button.title }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref, reactive, PropType } from 'vue';
import Button from '@/types/button';
import PadConfig from '@/types/pad-configuration';
import digitKeyup from '@/directives/v-digit-keyup';

export default defineComponent({
  name: 'getjv-num-pad',
  emits: ['pad-keyup', 'amount', 'formatedAmount', 'confirm'],
  props: {
    config: {
      type: Object as PropType<PadConfig>,
      require: true,
      default: () => ({
        decimalPlaces: 2,
        decimalSignal: ',',
        initialValue: '000',
      }),
    },
  },
  directives: {
    ...digitKeyup,
  },
  setup(props, { emit }) {
    const buttons = reactive<Button[]>([
      {
        id: 1,
        title: '1',
        key: '1',
        classes: 'jm-pad-btn',
      },
      {
        id: 2,
        title: '2',
        key: '2',
        classes: 'jm-pad-btn',
      },
      {
        id: 3,
        title: '3',
        key: '3',
        classes: 'jm-pad-btn',
      },

      {
        id: 4,
        title: '4',
        key: '4',
        classes: 'jm-pad-btn',
      },
      {
        id: 5,
        title: '5',
        key: '5',
        classes: 'jm-pad-btn',
      },
      {
        id: 6,
        title: '6',
        key: '6',
        classes: 'jm-pad-btn',
      },
      {
        id: 7,
        title: '7',
        key: '7',
        classes: 'jm-pad-btn',
      },
      {
        id: 8,
        title: '8',
        key: '8',
        classes: 'jm-pad-btn',
      },
      {
        id: 9,
        title: '9',
        key: '9',
        classes: 'jm-pad-btn',
      },
      {
        id: 10,
        title: 'C',
        key: 'Delete',
        classes: 'jm-pad-btn jm-btn-small',
      },
      {
        id: 11,
        title: 'Confirm',
        key: 'enter',
        classes: 'jm-pad-btn jm-btn-large',
      },
      {
        id: 12,
        title: '<',
        key: 'backspace',
        classes: 'jm-pad-btn jm-btn-small',
      },
    ]);
    const pad = ref<string>(props.config.initialValue);

    const formatedAmount = computed((): string => {
      const arr = [...pad.value];
      arr.splice(arr.length - props.config.decimalPlaces, 0, props.config.decimalSignal);
      return arr.join('');
    });
    const amount = computed((): number =>
      Number(formatedAmount.value.replace(props.config.decimalSignal, '.')),
    );
    const validDigits = computed(() => buttons.map(button => button.key.toLowerCase()));

    const notifyEvents = (pressedButton: string, shouldEmitConfirm: boolean) => {
      emit('pad-keyup', pressedButton);
      emit('amount', amount.value);
      emit('formatedAmount', formatedAmount.value);
      if (shouldEmitConfirm) emit('confirm');
    };
    const padUpdate = (key: string) => {
      let shouldEmitConfirm = false;
      const keyValue = key.toLowerCase();
      if (!validDigits.value.includes(keyValue)) return;
      if (keyValue === 'backspace') {
        const items = [...pad.value];
        items.pop();
        if (items.length < 3) {
          items.unshift('0');
        }
        pad.value = items.join('');
      } else if (keyValue === 'delete') {
        pad.value = props.config.initialValue;
      } else if (keyValue === 'enter') {
        shouldEmitConfirm = true;
      } else {
        const items = [...pad.value];
        items.push(keyValue);
        if (items[0] === '0') {
          items.shift();
        }
        pad.value = items.join('');
      }
      notifyEvents(keyValue, shouldEmitConfirm);
    };
    const handleKeyUp = (e: KeyboardEvent) => padUpdate(e.key);
    const handleClick = (key: string) => padUpdate(key);

    return { buttons, formatedAmount, amount, handleKeyUp, handleClick };
  },
});
</script>
