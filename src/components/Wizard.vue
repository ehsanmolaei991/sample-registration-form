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
          label="Username:"
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
          label="Email:"
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
        <div class="flex items-center gap-2">
          <BaseButton
            id="btn-next"
            variant="primary"
            :disabled="currentStepIndex === steps?.length - 1"
            @click="nextStep"
          >
            Next
          </BaseButton>
          <BaseButton
            v-if="currentStepIndex === steps?.length - 1"
            id="btn-submit"
            variant="primary"
            @click="handleSubmit"
          >
            Submit
          </BaseButton>
        </div>
      </div>
    </form>
  </div>
</template>

<script>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import Description from "@/components/DescriptionForm.vue";
import BaseInput from "@/components/ui/BaseInput.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";

export default {
  components: {
    Description,
    BaseInput,
    BaseButton,
  },

  setup() {
    const router = useRouter();
    const auth = useAuthStore();

    const steps = ref(["username", "email", "review"]);
    const currentStep = ref("username");
    const formData = ref({
      username: "",
      email: "",
    });
    const formErrors = ref({
      username: "",
      email: "",
    });

    const currentStepIndex = computed(() =>
      steps.value.indexOf(currentStep.value)
    );

    const currentStepTitle = computed(() => {
      const titles = {
        username: "Create Username",
        email: "Enter Email",
        review: "Step: review information",
      };
      return titles[currentStep.value];
    });

    const validateUsername = () => {
      const usernamePattern = /^[a-zA-Z0-9._]{4,30}$/;

      if (!formData.value.username.match(usernamePattern)) {
        formErrors.value.username = "Invalid Username.";
        return true;
      }

      formErrors.value.username = "";
      return false;
    };

    const validateEmail = () => {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (!formData.value.email.match(emailPattern)) {
        formErrors.value.email = "Invalid email address.";
        return true;
      }

      formErrors.value.email = "";
      return false;
    };

    const nextStep = () => {
      if (currentStep.value === "username") {
        validateUsername();
        if (!formErrors.value.username) {
          currentStep.value = "email";
        }
      } else if (currentStep.value === "email") {
        validateEmail();
        if (!formErrors.value.email) {
          currentStep.value = "review";
        }
      }
    };

    const prevStep = () => {
      const index = currentStepIndex.value;
      if (index > 0) {
        currentStep.value = steps.value[index - 1];
      }
    };

    const handleSubmit = () => {
      auth.login(formData.value);
      router.push("/dashboard");
    };

    return {
      currentStep,
      currentStepIndex,
      currentStepTitle,
      formData,
      formErrors,
      steps,
      prevStep,
      nextStep,
      handleSubmit,
    };
  },
};
</script>
