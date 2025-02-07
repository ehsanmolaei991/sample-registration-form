<template>
  <div class="text-center">
    <h2 class="text-2xl font-bold mb-6">Welcome to Our Website</h2>

    <div v-if="isRegistered" class="mb-6">
      <p class="text-lg mb-4">
        Welcome back,
        <button
          @click="goToDashboard"
          class="font-bold text-blue-600 hover:underline"
        >
          {{ userData.username }}
        </button>
      </p>
      <BaseButton variant="secondary" @click="handleRegisterAgain">
        Register New Account
      </BaseButton>
    </div>

    <div v-else>
      <p class="mb-6">Please register to access your dashboard</p>
      <BaseButton variant="primary" @click="goToRegister">
        Register Now
      </BaseButton>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
import { useRouter } from "vue-router";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();


onMounted(() => {
  auth.checkAuth();
});

const goToRegister = () => {
  router.push({ name: "register" });
};

const goToDashboard = () => {
  router.push({ name: "dashboard" });
};

const handleRegisterAgain = () => {
  auth.logout();
  router.push({ name: "register" });
};
</script>
