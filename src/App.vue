<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>

  <div class="@container h-full min-h-full flex flex-col">
    
    <header class="p-4 shadow-sm shadow-blue-500/50">
      <h1>Forms</h1>
      
        <nav>
          <RouterLink to="/">My Forms</RouterLink>
          <RouterLink to="/about">About</RouterLink>
        </nav>
    </header>

    <div class="grow-1 basis-0 overflow-auto p-4">
      <RouterView />
    </div>
  </div>


</template>

<style scoped>
</style>
