<script setup lang="ts">
import { api, useSession, deleteMessage } from '@/models/session'
import { ref } from 'vue'

const session = useSession()
const isActive = ref(false)
</script>

<template>
  <div class="notifications">
    <button class="button is-dark" @click="isActive = !isActive">
      <span class="icon">
        <i class="fa fa-bell fa-lg" :class="{ 'fa-beat-fade': session.isLoading }" />
        <transition name="fade">
          <span v-if="session.messages.length != 0" class="tag is-danger quantity-tag">
            {{ session.messages.length }}
          </span>
        </transition>
      </span>
    </button>
    <transition name="fade">
      <div class="notification-list" v-show="isActive">
        <div
          v-for="(msg, index) in session.messages"
          :key="index"
          :class="`notification is-light is-${msg.type}`"
        >
          <button class="delete" @click="deleteMessage(index)"></button>
          {{ msg.msg }}
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.notifications {
  position: relative;
}
.notification-list {
  position: absolute;
  margin-top: 5px;
  width: 300px;
  min-height: 300px;
  background-color: white;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  z-index: 100;
  max-height: calc(100vh - 100px);
  overflow-y: auto;
}
.notification-list .notification {
  margin: 5px;
}
.quantity-tag {
  position: absolute;
  top: -5px;
  right: -5px;
  border-radius: 1rem;
}
</style>
