<script setup lang="ts">
import { defineEmits, defineProps, ref, watchEffect } from 'vue';

import type { Field, Form} from '@/types/form';
import { FieldType } from '@/types/form';

import FormFieldEditor from './FormFieldEditor.vue';

const { form } = defineProps<{
  form: Form;
}>();
const editForm = ref<Form>({
  id: '', name: ''
});
const fields = ref<Array<Field>>([]);

const emit = defineEmits<{
  save: [form: Form],
  delete: []
}>()

watchEffect(() => {
  reset();
});

function addField() {
  editForm.value.fields = editForm.value.fields || [];
  fields.value.push({ name: '', label: '', type: FieldType.text });
}

function updateField(field: Field, index: number) {
  fields.value[index] = field;
  fields.value = [... fields.value];
}

function deleteField(index: number) {
  fields.value = [...fields.value.slice(0, index), ...fields.value.slice(index + 1)];
}

function save() {
  const emitedForm = JSON.parse(JSON.stringify({ ...editForm.value, fields: fields.value }));
  emit('save', emitedForm);
}

function reset() {
  editForm.value = { ...form };
  fields.value = JSON.parse(JSON.stringify(form.fields || []));
}

</script>
<template>
  <div class="w-full max-w-3xl py-4">
    <form id="form-edit-form" @submit.prevent="save">
      <div class="mb-4 p-4 bg-blue-50 shadow-md rounded">
        <input
          class="shadow-sm appearance-none rounded w-full py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 valid:shadow-green-400 invalid:shadow-red-400 focus:outline-hidden focus:shadow-blue-400 "
          type="text"
          name="form-name"
          id="form-name"
          required
          placeholder="Form Name"
          v-model="editForm.name"
        />
      </div>
      <div class="mb-4 p-4 bg-blue-50 shadow-md rounded">
        <textarea
          class="shadow-sm appearance-none rounded w-full py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 focus:outline-hidden focus:shadow-blue-400"
          id="form-description"
          name="form-description"
          placeholder="Description"
          v-model="editForm.description"
        ></textarea>
      </div>

      <div class="mb-4 p-4 bg-blue-50 shadow-md rounded" v-for="(field, index) in fields" :key="index + 1">
        <FormFieldEditor
          :field="field"
          :index="index"
          @update:field="(newfield) => updateField(newfield, index)"
          @deleteField="deleteField(index)"
        />
      </div>

      <div class="mb-4 text-right">
        <button
          class="bg-green-700 hover:bg-green-900 font-bold text-white py-1 px-2 w-full rounded active:outline-green-900 active:outline-2 active:outline-offset-1"
          type="button"
          @click="addField"
        >
          + Add Field
        </button>
      </div>
      <div class="flex">
        <div class="flex-auto">
          <button
            class="bg-blue-500 hover:bg-blue-700 font-bold text-white py-1 px-3 mr-2 rounded active:outline-blue-700 active:outline-2 active:outline-offset-1"
            type="submit"
          >
            Save
          </button>
          <button
            class="bg-gray-300 hover:bg-gray-400 font-bold text-black py-1 px-3 rounded active:outline-gray-500 active:outline-2 active:outline-offset-1"
            type="button"
            @click="reset"
          >
            Reset
          </button>
        </div>
        <div class="flex-auto text-right">

          <button
            class="bg-red-600 hover:bg-red-700 font-bold text-white py-1 px-3 rounded active:outline-red-800 active:outline-2 active:outline-offset-1"
            type="button"
            @click="emit('delete')"
          >
            Delete
          </button>
        </div>
      </div>
    </form>
  </div>
</template>
