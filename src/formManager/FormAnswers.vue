<script setup lang="ts">

import { defineEmits, defineProps, ref, watchEffect } from 'vue';

import type { Form, FormAnswer} from '@/types/form';
import { FormService } from '../services/form.service';

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
    <table class="w-full">
      <thead>
        <tr>
          <th></th>
          <th v-for="(fields, fi) in form.fields" :key="fi">
            {{ fields.label }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(answer, index) in answers" :key="answer.id">
          <td>{{ index+1 }}</td>
          <td v-for="(fanswer, fai) in answer.answers" :key="fai">
            {{ fanswer.value }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>