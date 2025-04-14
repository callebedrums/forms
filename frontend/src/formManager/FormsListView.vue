<script setup lang="ts">
import { ref } from 'vue';
import { RouterLink, RouterView } from 'vue-router';

import type { Form } from '@/types/form';
import { FormService } from '@/services/form.service';

const forms = ref<Array<Form>>([]);

FormService.instance.list().then((serverForms) => {
  forms.value = serverForms;
});

function deleteForm(f: Form) {
  FormService.instance.deleteForm(f).then(() => {
    forms.value = forms.value.filter(form => form.id !== f.id);
  });
}

</script>
<template>
  <div>
    <h2>My Forms</h2>
    <ul>
      <li><RouterLink to="./new/edit">+ New Form</RouterLink></li>
      <li
        class="mt-3"
        v-for="form in forms">
        <RouterLink :to="`./${form.id}/edit`">{{ form.name }}</RouterLink>
        <RouterLink class="bg-blue-500 hover:bg-blue-700 font-bold text-white py-0.5 px-1 ml-2 rounded active:outline-blue-700 active:outline-1 active:outline-offset-1" :to="`./${form.id}/`">Answer</RouterLink>
        <button
          class="bg-red-600 hover:bg-red-700 font-bold text-white px-1 ml-2 rounded active:outline-red-800 active:outline-1 active:outline-offset-1"
          @click="deleteForm(form)"
        >
          Delete
        </button>
      </li>
    </ul>
  </div>
</template>
