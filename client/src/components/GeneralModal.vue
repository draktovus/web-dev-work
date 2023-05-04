<script setup lang="ts">
import { state } from '@/models/generalModals'
import Modal from './Modal.vue'
</script>

<template>
  <Modal :is-open="state.isModalOpen" :title="state.title">
    <template #delete>
      <button class="delete" aria-label="close" @click="state.reject"></button>
    </template>
    <h1 class="title">{{ state.message }}</h1>
    <template #footer>
      <button
        class="button"
        :class="state.confirmTag != 'normal' ? `is-${state.confirmTag}` : ''"
        @click="state.resolve"
      >
        {{ state.confirmMessage != '' ? state.confirmMessage : 'Confirm' }}
      </button>
      <button
        class="button"
        :class="state.confirmTag != 'normal' ? `is-${state.cancelTag}` : ''"
        @click="state.reject"
      >
        {{ state.cancelMessage != '' ? state.cancelMessage : 'Cancel' }}
      </button>
    </template>
  </Modal>
</template>

<style scoped></style>
