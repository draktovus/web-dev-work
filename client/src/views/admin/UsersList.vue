<script setup lang="ts">
import { RouterLink } from 'vue-router';
import { getUsers, type User, deleteUser } from '@/models/users'
import { ref } from 'vue'
import { addMessage } from '@/models/session';
import { confirm } from '@/models/generalModals';
import { state } from '@/models/generalModals'
import GeneralModal from '@/components/GeneralModal.vue'

const users = ref<User[]>([])

getUsers().then((res) => {
  users.value = res.data
})

function delUser(user: User, index:number){
  confirm('Are you sure you want to delete this user?', 'Deletion')
  .then(()=>{
    deleteUser(user).then(response=>{
    addMessage('Deleted user ' + user.name, 'success')
    users.value.splice(index, 1)
  })
  })
  .catch(()=>{
    addMessage("Did not delete user " + user.name, 'info')
  })
  
}
</script>

<template>
  <div>
    <GeneralModal>
      <template #footer>
        <button class="button is-danger" @click="state.resolve">Delete</button>
        <button class="button" @click="state.reject">Cancel</button>
      </template>
    </GeneralModal>

    <nav class="breadcrumb" aria-label="breadcrumbs">
      <ul>
        <li>
          <a class=""> My Exercise </a>
        </li>
        <li>
          <a class=""> Admin </a>
        </li>
        <li class="is-active">
          <a class=""> Users </a>
        </li>
      </ul>
    </nav>
    
    <RouterLink :to="'/admin/users/edit/'" class="button is-success">
      <span class="icon-text">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span> Add User </span>
      </span>
    </RouterLink>
  
    <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>Photo</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Emails</th>
          <th>Handle</th>
          <th>IsAdmin</th>
          <th>Options</th>
        </tr>
      </thead>
      <tfoot></tfoot>
      <tbody>
        <template v-for="user,i in users" :key="user.id">
          <tr>
            <td>
              <figure class="image is-square">
                <img class="is-rounded" :src="user.photo" alt="" />
              </figure>
            </td>
            <td class="has-text-centered">{{ user.firstName }}</td>
            <td>
              {{ user.lastName }}
            </td>
            <td>{{ user.emails }}</td>
            <td>{{ user.handle }}</td>
            <td>{{ user.isAdmin }}</td>
            <td>
              <div class="buttons">
                <RouterLink class="button" :to="'/admin/users/edit/' + user._id">
                  <span class="icon">
                    <i class="fas fa-edit"></i>
                  </span>
                </RouterLink>
                <button class="button" @click="delUser(user, i)">
                  <span class="icon">
                    <i class="fas fa-trash"></i>
                  </span>
                </button>
              </div>
            </td>
          </tr>
        </template>
      </tbody>
    </table>
  </div>
</template>

<style scoped></style>
