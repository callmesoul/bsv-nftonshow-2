<template>
  <div class="input-amount flex flex-align-center">
    <div class="flex1">
      <input
        v-model="currentAmount"
        :placeholder="placeholder"
        type="number"
        :class="{ disabled: disable }"
        :readonly="disable"
        @change="amountChange"
      />
    </div>
    <ElSelect v-model="currentUnit" :disabled="disable" @change="changeUnit">
      <ElOption v-for="unit in units" :key="unit.unit" :label="unit.unit" :value="unit.unit">
      </ElOption>
    </ElSelect>
  </div>
</template>

<script setup lang="ts">
import Decimal from 'decimal.js-light'
import { computed, ref, watch } from 'vue-demi'
import { UnitName, units } from '@/config'

const emit = defineEmits(['change', 'changeUnit'])
const currentAmount = ref('')
const currentUnit = ref(UnitName.BSV)

interface Props {
  min: number
  amount: string
  unitName: UnitName
  placeholder: string
  disable: boolean
}
const props = withDefaults(defineProps<Props>(), {
  min: 1000,
  amount: '',
  unitName: UnitName.BSV,
  placeholder: '',
  disable: false,
})

watch(
  () => props.amount,
  () => {
    currentAmount.value = props.amount
  }
)
watch(
  () => props.unitName,
  () => {
    currentUnit.value = props.unitName
  }
)

const minAmount = computed(() => {
  const unit = units.find(item => item.unit === props.unitName)
  if (unit.unit === UnitName.SATS) {
    return new Decimal(props.min).toNumber()
  } else {
    return new Decimal(props.min).div(Math.pow(10, 8)).toNumber()
  }
})

function amountChange() {
  const amount = new Decimal(currentAmount.value).toNumber()
  if (amount < minAmount.value) {
    currentAmount.value = minAmount.value.toString()
  }
  emit('change', {
    amount: currentAmount.value,
  })
}

function changeUnit(value: string) {
  const unit = units.find(item => item.unit === value)
  if (currentAmount.value !== '') {
    currentAmount.value = new Decimal(currentAmount.value)
      .mul(new Decimal(unit.sats).toNumber())
      .toString()
    amountChange()
  }
  emit('changeUnit', currentUnit.value)
}
</script>

<style lang="scss" scoped src="./InputAmount.scss"></style>
