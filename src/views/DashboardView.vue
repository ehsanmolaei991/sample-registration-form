<template>
  <div class="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-bold mb-6">Welcome!</h2>
    <div class="mb-6">
      <p class="mb-2">
        <strong>Username:</strong> {{ auth.userData.username }}
      </p>
      <p class="mb-4"><strong>Email:</strong> {{ auth.userData.email }}</p>
    </div>
    <BaseButton variant="primary" @click="handleRegisterAgain">
      Register Again
    </BaseButton>
  </div>
</template>

<script setup>
import { useRouter } from "vue-router";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const handleRegisterAgain = () => {
  auth.logout();
  router.push({ name: "home" });
};
</script>
