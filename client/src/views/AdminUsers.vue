<script setup lang="ts">
import { useDB } from '@/models/session'

const users = useDB()
</script>

<template>
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

  <button class="button is-success">
    <span class="icon-text">
      <span class="icon">
        <i class="fas fa-plus"></i>
      </span>
      <span> Add User </span>
    </span>
  </button>

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
      <template v-for="user in users" :key="user.id">
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
              <button class="button">
                <span class="icon">
                  <i class="fas fa-edit"></i>
                </span>
              </button>
              <button class="button">
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
</template>

<style scoped></style>
