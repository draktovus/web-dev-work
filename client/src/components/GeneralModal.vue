<script setup lang="ts">
import { state } from '@/models/generalModals'
import Modal from './Modal.vue'
import { ref } from 'vue'
</script>

<template>
  :is-open=
  <Modal :is-open="state.isModalOpen">
    <h1 class="title">{{ state.message }}</h1>
    <template #footer>
      <button class="button is-success" @click="state.resolve">Save</button>
      <button class="button" @click="state.reject">Cancel</button>
    </template>
  </Modal>
</template>

<style scoped></style>
