<template>
  <div class="mb-4 text-gray-600">
    <p v-if="step === 'username'">
      Please enter your username. It should be at least 3 characters long.
    </p>
    <p v-else-if="step === 'email'">
      Please enter a valid email address.
    </p>
    <p v-else-if="step === 'review'">
      Please review your information before submitting.
    </p>
  </div>
</template>

<script setup>
defineProps({
  step: {
    type: String,
    required: true,
    validator: (value) => ['username', 'email', 'review'].includes(value)
  }
});
</script>