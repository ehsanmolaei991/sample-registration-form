<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">
      {{ currentStepTitle }}
    </h2>

    <Description :step="currentStep" />

    <form @submit.prevent="handleSubmit" class="space-y-4">
      <!-- Username Step -->
      <div v-if="currentStep === 'username'">
        <BaseInput
          id="username"
          name="username"
          v-model="formData.username"
          label="Username"
          placeholder="Enter username"
          required
          :error="formErrors.username"
          helper-text="Username must be at least 3 characters long"
        />
      </div>

      <!-- Email Step -->
      <div v-if="currentStep === 'email'">
        <BaseInput
          id="email"
          name="email"
          type="email"
          v-model="formData.email"
          label="Email"
          placeholder="Enter email"
          required
          :error="formErrors.email"
          helper-text="We'll never share your email with anyone else"
        />
      </div>

      <!-- Review Step -->
      <div v-if="currentStep === 'review'" class="space-y-2">
        <p><strong>Username:</strong> {{ formData.username }}</p>
        <p><strong>Email:</strong> {{ formData.email }}</p>
      </div>

      <!-- Navigation Buttons -->
      <div class="flex justify-between mt-6">
        <BaseButton
          id="btn-prev"
          variant="secondary"
          @click="prevStep"
          :disabled="currentStepIndex === 0"
        >
          Previous
        </BaseButton>
        <BaseButton
          id="btn-next"
          variant="primary"
          @click="nextStep"
          :disabled="!canProceed"
        >
          {{ isLastStep ? 'Submit' : 'Next' }}
        </BaseButton>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Description from '@/components/DescriptionForm.vue';
import BaseInput from '@/components/ui/BaseInput.vue';
import BaseButton from '@/components/ui/BaseButton.vue';
import { useAuthStore } from '@/stores/auth';

const router = useRouter();
const auth = useAuthStore();

const steps = ['username', 'email', 'review'];
const currentStepIndex = ref(0);
const formData = ref({
  username: '',
  email: ''
});

const formErrors = ref({
  username: '',
  email: ''
});

onMounted(() => {
  if (auth.isLoggedIn) {
    router.push('/dashboard');
  }
});

const currentStep = computed(() => steps[currentStepIndex.value]);
const isLastStep = computed(() => currentStepIndex.value === steps.length - 1);

const currentStepTitle = computed(() => {
  const titles = {
    username: 'Create Username',
    email: 'Enter Email',
    review: 'Review Information'
  };
  return titles[currentStep.value];
});

const canProceed = computed(() => {
  if (currentStep.value === 'username') {
    return formData.value.username.length >= 3;
  }
  if (currentStep.value === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(formData.value.email);
  }
  return true;
});

const nextStep = () => {
  if (isLastStep.value) {
    handleSubmit();
    return;
  }
  if (currentStepIndex.value < steps.length - 1) {
    currentStepIndex.value++;
  }
};

const prevStep = () => {
  if (currentStepIndex.value > 0) {
    currentStepIndex.value--;
  }
};

const validateForm = () => {
  formErrors.value = {
    username: '',
    email: ''
  };

  if (formData.value.username.length < 3) {
    formErrors.value.username = 'Username must be at least 3 characters long';
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(formData.value.email)) {
    formErrors.value.email = 'Please enter a valid email address';
  }

  return !formErrors.value.username && !formErrors.value.email;
};

const handleSubmit = () => {
  if (!validateForm()) {
    return;
  }
  auth.login(formData.value);
  router.push('/dashboard');
};
</script> 