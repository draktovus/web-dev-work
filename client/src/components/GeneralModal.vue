<script setup lang="ts">
import { state } from '@/models/generalModals'
import Modal from './Modal.vue'
</script>

<template>
  <Modal :is-open="state.isModalOpen" :title="state.title">
    <h1 class="title">{{ state.message }}</h1>
    <template #footer>
      <button class="button is-success" @click="state.resolve">Confirm</button>
      <button class="button" @click="state.reject">Cancel</button>
    </template>
  </Modal>
</template>

<style scoped></style>
