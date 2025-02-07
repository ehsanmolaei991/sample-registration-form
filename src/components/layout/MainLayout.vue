<template>
  <div class="min-h-screen flex flex-col">
    <TheHeader />

    <main class="flex-grow bg-gray-100 p-4">
      <div class="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <RouterView />
      </div>
    </main>

    <TheFooter />
  </div>
</template>

<script setup>
import { RouterView, onBeforeRouteUpdate } from "vue-router";
import TheHeader from "./TheHeader.vue";
import TheFooter from "./TheFooter.vue";
import { useAuthStore } from "@/stores/auth";

const auth = useAuthStore();

onBeforeRouteUpdate(() => {
  auth.checkAuth();
});

</script>
