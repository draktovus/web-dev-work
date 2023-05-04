<script setup lang="ts">
const props = defineProps<{
  title?: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:isOpen', value: boolean): void
}>()
</script>

<template>
  <div class="modal" :class="{ 'is-active': props.isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="header">
          <p class="modal-card-title">{{ props.title }}</p>
          <slot name="delete">
            <button
              class="delete"
              aria-label="close"
              @click="emit('update:isOpen', false)"
            ></button>
          </slot>
        </slot>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <slot></slot>
      </section>
      <footer class="modal-card-foot">
        <slot name="footer">
          <button class="button is-success">Save changes</button>
          <button class="button">Cancel</button>
        </slot>
      </footer>
    </div>
  </div>
</template>

<style scoped></style>
