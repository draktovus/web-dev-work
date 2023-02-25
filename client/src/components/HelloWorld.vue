<script setup lang="ts">
defineProps<{
  title: string,
  msg: string,
}>();

</script>

<template>
  <div class="section">
    <div class="notification is-success">
      {{ title }}
      <button class="delete"></button>
      {{ msg }}
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </div>
  </div>
</template>

<style scoped></style>
