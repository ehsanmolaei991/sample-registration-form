<template>
  <button
    :type="type"
    :disabled="disabled"
    class="px-4 py-2 rounded-lg transition-colors disabled:opacity-50"
    :class="[
      variant === 'primary' 
        ? 'bg-blue-500 text-white hover:bg-blue-600' 
        : 'bg-gray-500 text-white hover:bg-gray-600'
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </button>
</template>

<script setup>
defineProps({
  type: {
    type: String,
    default: 'button'
  },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'secondary'].includes(value)
  },
  disabled: {
    type: Boolean,
    default: false
  }
});
</script> 