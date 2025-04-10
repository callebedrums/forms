<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';
import type { Form } from '../types/form';
import { FormService } from '@/services/form.service';

const forms = ref<Array<Form>>([]);

FormService.instance.list().then((serverForms) => {
  forms.value = serverForms;
});

</script>
<template>
  <div>
    <h2>My Forms</h2>
    <ul>
      <li><RouterLink to="./new/edit">New Form</RouterLink></li>
      <li v-for="form in forms">
        <RouterLink :to="`./${form.id}/edit`">{{ form.name }}</RouterLink>
      </li>
    </ul>
  </div>
</template>
