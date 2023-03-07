<script setup lang="ts">
defineProps<{
  isModalActive?: boolean
}>()
</script>

<template>
  <div class="modal" :class="{ 'is-active': isModalActive }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Delete workout</p>
        <button class="delete" @click="$emit('toggle', 'delete')" aria-label="close"></button>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        List of all workouts
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success">Save changes</button>
        <button class="button">Cancel</button>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
