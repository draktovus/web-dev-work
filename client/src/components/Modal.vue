<script setup lang="ts">
const props = defineProps<{
  title?: string
  isOpen: boolean
}>()

const emit = defineEmits<{
  (event: 'close'): void
  (event: 'update:isOpen', value: boolean): void
}>()
/**
 * const {title} = defineProps<{
 *  title: string;
 * }>();
 */

/**
 const props2 = defineProps({
    title2: String,
});
*/

/**
 * Data should flow downwards to track changes to data.
 *
 */
</script>

<template>
  <div class="modal" :class="{ 'is-active': props.isOpen }">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <slot name="header">
          <p class="modal-card-title">{{ props.title }}</p>
          <button class="delete" aria-label="close" @click="emit('update:isOpen', false)"></button>
        </slot>
      </header>
      <section class="modal-card-body">
        <!-- Content ... -->
        <slot></slot>
        {{ props.title }}
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
