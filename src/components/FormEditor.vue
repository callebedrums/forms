<script setup lang="ts">
import { Form } from '../types/form';
import { defineProps, watchEffect, ref } from 'vue';

const { originalForm } = defineProps<{
  form: Form;
}>();
const form = ref({});

watchEffect(() => {
  form.value = { ...originalForm };
});
</script>
<template>
  <div class="w-full max-w-3xl p-4">
    <form class="bg-blue-50 shadow-md rounded p-4">
      <div class="mb-4">
        <label class="block font-bold py-1 text-gray-700" for="form-name">
          Name <span class="text-red-500">*</span>
        </label>
        <input
          class="shadow-sm appearance-none rounded w-full py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:shadow-blue-400"
          type="text"
          name="form-name"
          id="form-name"
          required
          placeholder="New Form Name"
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
        ></textarea>
      </div>
      <div class="mb-4">
        <button
          class="bg-green-700 hover:bg-green-900 font-bold text-white py-1 px-2 rounded active:outline-green-900 active:outline-2 active:outline-offset-1"
          type="button"
        >
          + Add Question
        </button>
      </div>
      <div>
        <button
          class="bg-blue-500 hover:bg-blue-700 font-bold text-white py-1 px-2 rounded active:outline-blue-700 active:outline-2 active:outline-offset-1"
          type="button"
        >
          Save
        </button>
      </div>
    </form>
  </div>
</template>
