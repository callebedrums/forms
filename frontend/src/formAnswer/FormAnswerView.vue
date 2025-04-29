<script setup lang="ts">
import { defineProps, watchEffect, ref } from 'vue';

import type { FieldAnswer, Form, FormAnswer } from '@/types/form';
import { FormService } from '@/services/forms/form.service';

// input props
const { id = '' } = defineProps<{
  id: string
}>();

const answers = ref<Array<FieldAnswer>>([]);

// internal state
// should hold form object
const form = ref<Form>({ name: '', fields: []});

function reset() {
  answers.value = form.value.fields.map(field => ({
    name: field.name,
    value: ''
  })) || [];
}

// load form data
function loadForm(id: string) {
  FormService.instance.get(id).then((f) => {
    form.value = f || { name: '', fields: []};

    reset()
  });
}

function save() {
  const answer: FormAnswer = {
    formId: form.value.id || '',
    answers: JSON.parse(JSON.stringify(answers.value))
  };

  FormService.instance.saveAnswer(answer).then(() => {
    console.log('Answer saved')
    reset();
  });
};

// executes whenever id changes
watchEffect(() => {
  loadForm(id);
});
</script>
<template>
  <div class="w-full max-w-3xl">
    <h1 class="mb-3 text-3xl font-extrabold leading-none tracking-tight text-gray-900 sm:text-4xl md:text-5xl dark:text-white">{{ form.name }}</h1>
    <p v-if="form.description" class="mb-3 text-md font-normal text-gray-600 lg:text-lg dark:text-gray-400">
      {{ form.description }}
    </p>
    <form id="form-answer" @submit.prevent="save">
      <div v-for="(answer, index) in answers" :key="index" class="mb-4 p-4 bg-blue-50 shadow-md rounded">
        <label class="mb-2 block font-normal text-gray-700" :for="form.fields[index].name">{{ form.fields[index].label }}</label>

        <div v-if="form.fields[index].type === 'text'">
          <input
            class="shadow-sm appearance-none rounded w-full py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 valid:shadow-green-400 invalid:shadow-red-400 focus:outline-hidden focus:shadow-blue-400"
            type="text"
            :name="form.fields[index].name"
            :id="form.fields[index].name"
            :required="form.fields[index].required"
            v-model="answer.value"
          />
        </div>

        <div v-if="form.fields[index].type === 'textarea'">
          <textarea
            class="shadow-sm appearance-none rounded w-full py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:shadow-blue-400"
            :name="form.fields[index].name"
            :id="form.fields[index].name"
            :required="form.fields[index].required"
            v-model="(answer.value as string)"
          >
          </textarea>
        </div>
      </div>
      <div class="flex">
        <div class="flex-auto">
          <button
            class="bg-blue-500 hover:bg-blue-700 font-bold text-white py-1 px-3 mr-2 rounded active:outline-blue-700 active:outline-2 active:outline-offset-1"
            type="submit"
          >
            Submit Answers
          </button>
        </div>
        <div class="flex-auto text-right">
          <button
            class="bg-gray-300 hover:bg-gray-400 font-bold text-black py-1 px-3 rounded active:outline-gray-500 active:outline-2 active:outline-offset-1"
            type="button"
            @click="reset"
          >
            Reset
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
