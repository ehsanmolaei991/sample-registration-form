<template>
  <div class="w-full flex flex-col gap-1">
    <label 
      v-if="label" 
      :for="id" 
      class="text-sm font-medium text-gray-700"
    >
      {{ label }}
      <span v-if="required" class="text-red-500 ml-1">*</span>
    </label>

    <div class="relative">
      <input
        :id="id"
        :name="name"
        :type="type"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :placeholder="placeholder"
        :required="required"
        :disabled="disabled"
        class="w-full px-4 py-2.5 rounded-lg border transition-colors duration-200 ease-in-out"
        :class="[
          error
            ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500 focus:border-red-500'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500',
          disabled ? 'bg-gray-50 text-gray-500 cursor-not-allowed' : 'bg-white'
        ]"
        v-bind="$attrs"
      />
      <div 
        v-if="error" 
        class="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none"
      >
        <svg 
          class="h-5 w-5 text-red-500" 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path 
            fill-rule="evenodd" 
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" 
            clip-rule="evenodd" 
          />
        </svg>
      </div>
    </div>

    <div class="flex justify-between items-start mt-1">
      <p 
        v-if="error" 
        class="text-sm text-red-600"
      >
        {{ error }}
      </p>
      <p 
        v-else-if="helperText" 
        class="text-sm text-gray-500"
      >
        {{ helperText }}
      </p>
    </div>
  </div>
</template>

<script setup>
defineProps({
  id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  label: {
    type: String,
    default: ''
  },
  modelValue: {
    type: String,
    default: ''
  },
  placeholder: {
    type: String,
    default: ''
  },
  required: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  error: {
    type: String,
    default: ''
  },
  helperText: {
    type: String,
    default: ''
  }
});

defineEmits(['update:modelValue']);
</script> 