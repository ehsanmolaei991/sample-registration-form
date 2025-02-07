<template>
  <header class="container mx-auto bg-white">
    <div
      class="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between"
    >
      <div class="flex items-center gap-4">
        <router-link to="/" class="flex items-center">
          <Logo class="cursor-pointer" />
        </router-link>
        <router-link
          :to="{ name: 'home' }"
          class="hidden sm:block text-gray-700 hover:text-blue-600 font-medium"
        >
          Home
        </router-link>
        <router-link
          :to="{ name: 'description' }"
          class="hidden sm:block text-gray-700 hover:text-blue-600 font-medium"
        >
          Description
        </router-link>
      </div>

      <div v-if="auth.isLoggedIn" class="flex items-center gap-4">
        <router-link
          :to="{ name: 'dashboard' }"
          class="text-gray-700 hover:text-blue-600 font-medium"
        >
          Welcome, {{ auth.userData.username }}
        </router-link>
        <button
          @click="handleLogout"
          class="text-sm text-gray-500 hover:text-red-600"
        >
          Logout
        </button>
      </div>

      <div v-else>
        <router-link
          :to="{ name: 'register' }"
          class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Register
        </router-link>
      </div>
    </div>
  </header>
</template>

<script setup>
import { useRouter } from "vue-router";
import Logo from "@/components/ui/Logo.vue";
import { useAuthStore } from "@/stores/auth";

const router = useRouter();
const auth = useAuthStore();

const handleLogout = () => {
  auth.logout();
  router.push({ name: "home" });
};
</script>
