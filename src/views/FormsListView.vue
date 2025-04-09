<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>
<template>
  <div>
    <h2>My Forms</h2>
    <ul>
      <li><RouterLink to="./form-1/edit">Form 1</RouterLink></li>
      <li><RouterLink to="./form-2/edit">Form 2</RouterLink></li>
    </ul>
  </div>
</template>