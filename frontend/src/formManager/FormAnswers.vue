<script setup lang="ts">

import { defineEmits, defineProps, ref, watchEffect } from 'vue';

import type { Form, FormAnswer} from '@/types/form';
import { FormService } from '../services/forms/form.service';

const { form } = defineProps<{
  form: Form;
}>();

const answers = ref<Array<FormAnswer>>([]);

watchEffect(() => {
  if (form.id) FormService.instance.getAnswers(form.id).then(as => {
    answers.value = as;
  });
});

</script>

<template>
  <div class="w-full py-4">
    <h2 class="text-2xl mb-4">{{ form?.name }}</h2>
    <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
      <thead class="text-xs text-gray-700 uppercase bg-gray-100 dark:bg-gray-700 dark:text-gray-400">
        <tr>
          <th scope="col" class="px-6 py-3"></th>
          <th scope="col" class="px-6 py-3" v-for="(fields, fi) in form.fields" :key="fi">
            {{ fields.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600" v-for="(answer, index) in answers" :key="answer.id">
          <td class="px-6 py-4">{{ index+1 }}</td>
          <td class="px-6 py-4" v-for="(fanswer, fai) in answer.answers" :key="fai">
            {{ fanswer.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>