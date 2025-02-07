<template>
  <div class="text-center p-8">
    <h2 class="text-3xl font-bold text-gray-900 mb-4">404 - Page Not Found</h2>
    <p class="text-gray-600 mb-8">The page you're looking for doesn't exist.</p>
    <BaseButton 
      variant="primary" 
      @click="goHome"
    >
      Go to Home
    </BaseButton>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import BaseButton from '@/components/ui/BaseButton.vue';

const router = useRouter();

const goHome = () => {
  router.push({ name: 'home' });
};
</script> 