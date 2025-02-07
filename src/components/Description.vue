<template>
  <div class="max-w-md mx-auto mt-8 p-6 bg-white rounded-xl shadow-md">
    <div class="space-y-4">
      <label for="description" class="block text-sm font-medium text-gray-700">
        Description
      </label>
      <input
        id="description"
        type="text"
        v-model="textValue"
        class="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        :class="{ 'border-red-500': !balanced && textValue }"
      />
      <p :class="['text-sm', balanced ? 'text-green-600' : 'text-red-600']">
        {{ balanced ? "The text is balanced." : "The text is not balanced." }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "DescriptionInput",
  data() {
    return {
      textValue: "",    
      balanced: true,   
      debounceId: null, 
    };
  },
  watch: {
    textValue() {
      clearTimeout(this.debounceId);
      this.debounceId = setTimeout(this.isBalanced, 50);
    },
  },
  methods: {
    isBalanced() {
      const pairs = {
        ")": "(",
        "]": "[",
        "}": "{",
      };
      const openBrackets = new Set(Object.values(pairs));
      const stack = [];

      for (let char of this.textValue) {
        if (pairs[char]) {
          if (stack.length === 0 || stack.pop() !== pairs[char]) {
            this.balanced = false;
            return;
          }
        }
        else if (openBrackets.has(char)) {
          stack.push(char);
        }
      }

      this.balanced = stack.length === 0;
    },
  },
};
</script>
