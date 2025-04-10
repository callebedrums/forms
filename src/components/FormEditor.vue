<script setup lang="ts">
import { Form } from '../types/form';
import { defineProps, defineEmits, watchEffect, ref } from 'vue';

const { form } = defineProps<{
  form: Form;
}>();
const editForm = ref({});

const emit = defineEmits<{
  save: [form: Form]
}>()

watchEffect(() => {
  editForm.value = { ...form };
});

function addQuestion() {
  console.log('Add Question');
}

function save() {
  console.log('Save');
  emit('save', { ...editForm.value});
}

function reset() {
  console.log('Reset');
  editForm.value = { ...form };
}

</script>
<template>
  <div class="w-full max-w-3xl py-4">
    <form id="form-edit-form" class="bg-blue-50 shadow-md rounded p-4" @submit.prevent="save">
      <div class="mb-4">
        <label class="block font-bold py-1 text-gray-700" for="form-name">
          Name
        </label>
        <input
          class="shadow-sm appearance-none rounded w-full py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 valid:shadow-green-400 invalid:shadow-red-400 focus:outline-hidden focus:shadow-blue-400 "
          type="text"
          name="form-name"
          id="form-name"
          required
          placeholder="New Form Name"
          v-model="editForm.name"
        />
      </div>
      <div class="mb-4">
        <label class="block font-bold py-1 text-gray-700" for="form-description">
          Description
        </label>
        <textarea
          class="shadow-sm appearance-none rounded w-full py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:shadow-blue-400"
          id="form-description"
          name="form-description"
          v-model="editForm.description"
        ></textarea>
      </div>
      <div class="mb-4">
        <button
          class="bg-green-700 hover:bg-green-900 font-bold text-white py-1 px-2 rounded active:outline-green-900 active:outline-2 active:outline-offset-1"
          type="button"
          @click="addQuestion"
        >
          + Add Question
        </button>
      </div>
      <div>
        <button
          class="bg-blue-500 hover:bg-blue-700 font-bold text-white py-1 px-2 rounded active:outline-blue-700 active:outline-2 active:outline-offset-1"
          type="button"
          @click="save"
        >
          Save
        </button>
        <button
          class="bg-gray-300 hover:bg-gray-400 font-bold text-black py-1 px-2 rounded active:outline-gray-500 active:outline-2 active:outline-offset-1 float-right"
          type="submit"
        >
          Reset
        </button>
      </div>
    </form>
  </div>
</template>
