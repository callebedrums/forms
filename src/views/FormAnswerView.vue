<script setup>
import { defineProps, watchEffect, ref } from 'vue';

// input props
const { id = '' } = defineProps({
  id: String
})

// internal state
// should hold form object
const form = ref('');

// load form data
function loadForm(id) {
  form.value = `#${id}`;
}

// executes whenever id changes
watchEffect(() => {
  console.log('id', id);
  loadForm(id);
})

</script>
<template>
  <div>
    <h2>Form Answer for {{form }}</h2>
  </div>
</template>