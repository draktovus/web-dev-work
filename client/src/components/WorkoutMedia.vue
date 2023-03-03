<script setup lang="ts"></script>

<template>
  <article class="media box">
    <figure class="media-left">
      <p class="image is-64x64">
        <img
          class="is-rounded"
          src="https://bulma.io/images/placeholders/128x128.png"
          alt="placeholder image"
        />
      </p>
    </figure>
    <div class="media-content">
      <div class="content">
        <strong><slot name="name">John Smith</slot></strong>
        <small><slot name="handle">@SomeonesHandle</slot></small> <small>31m</small>
        <br />
        Took a walk around campus!
        <br />
        <div class="columns">
          <div class="column">
            <figure class="image is-16by9">
              <slot name="picture">
                <img
                  src="https://bulma.io/images/placeholders/128x128.png"
                  alt="placeholder image"
                />
              </slot>
            </figure>
            <div class="columns">
              <div class="column has-text-centered">
                <h1 class="title is-size-5"><slot name="distance">100 miles</slot></h1>
              </div>
              <div class="column has-text-centered">
                <h1 class="title is-size-5"><slot name="duration">duration</slot></h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      <nav class="level is-mobile">
        <div class="level-left">
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-reply"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-retweet"></i></span>
          </a>
          <a class="level-item">
            <span class="icon is-small"><i class="fas fa-heart"></i></span>
          </a>
        </div>
      </nav>
    </div>
    <div class="media-right">
      <button class="delete"></button>
    </div>
  </article>
</template>

<style scoped></style>
