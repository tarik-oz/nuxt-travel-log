<script setup lang="ts">
const authStore = useAuthStore();
</script>

<template>
  <button
    :disabled="authStore.loading"
    class="btn btn-accent"
    @click="authStore.signIn"
  >
    Sign In With GitHub
    <span v-if="authStore.loading" class="loading loading-dots loading-md" />
    <Icon
      v-else
      name="tabler:brand-github"
      size="1.5rem"
    />
  </button>
</template>
