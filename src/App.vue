<template>
  <numeric-pad
    :config="padConfiguration"
    @pad-keyup="handleKeyup"
    @amount="handleAmount"
    @formated-amount="handleFormatedAmount"
  />
  <div class="text-center">
    <div><label> Pressed Key: </label> {{ pressedButton ? pressedButton : 'none' }}</div>
    <div><label> Amount: </label> {{ amount }}</div>
    <div><label> Formated Amount: </label> {{ formatedAmount ? formatedAmount : 'none' }}</div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import NumericPad from './components/numeric-pad.vue';
import PadConfig from '@/types/pad-configuration';

export default defineComponent({
  name: 'App',
  components: {
    NumericPad,
  },

  setup() {
    const pressedButton = ref('');
    const formatedAmount = ref('');
    const amount = ref(0.0);

    const padConfiguration: PadConfig = {
      decimalPlaces: 2,
      decimalSignal: ',',
      initialValue: '000',
    };

    const handleKeyup = (value: any) => {
      pressedButton.value = value;
    };
    const handleAmount = (value: any) => {
      amount.value = value;
    };
    const handleFormatedAmount = (value: any) => {
      formatedAmount.value = value;
    };

    return {
      padConfiguration,
      pressedButton,
      formatedAmount,
      amount,
      handleKeyup,
      handleAmount,
      handleFormatedAmount,
    };
  },
});
</script>
