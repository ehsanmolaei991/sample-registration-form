<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
    <div class="space-y-4">
      <label for="description" class="block text-sm font-medium text-gray-700">
        Description
      </label>
      <input
        id="description"
        type="text"
        v-model="text"
        @input="validateText"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{ 'border-red-500': !isValid && text }"
      />
      <p :class="[
        'text-sm',
        isValid ? 'text-green-600' : 'text-red-600'
      ]">
        {{ message }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const text = ref('')
const isValid = ref(true)
const message = computed(() => isValid.value ? 'The text is balanced.' : 'The text is not balanced.')

const isBalanced = (str) => {
  const stack = []
  const openBrackets = '({['
  const closeBrackets = ')}]'
  const pairs = {
    ')': '(',
    '}': '{',
    ']': '['
  }

  for (let char of str) {
    if (openBrackets.includes(char)) {
      stack.push(char)
    } else if (closeBrackets.includes(char)) {
      if (stack.length === 0) return false
      if (stack.pop() !== pairs[char]) return false
    }
  }

  return stack.length === 0
}

const validateText = () => {
  isValid.value = isBalanced(text.value)
}
</script>