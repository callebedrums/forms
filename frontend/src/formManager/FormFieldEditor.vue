<script setup lang="ts">
import { defineEmits, defineProps, ref, watchEffect } from 'vue';

import type { Field } from '@/types/form';
import { FieldType } from '@/types/form';

const {field, index} = defineProps<{
  field: Field
  index?: string | number
}>();

const emit = defineEmits<{
  'update:field': [field: Field],
  'deleteField': []
}>()

const editField = ref<Field>({ name: '', label: '', required: false, type: FieldType.text});

const types: Array<{ label: string, value: FieldType}> = [
  {
    label: 'Short Text',
    value: FieldType.text,
  }, {
    label: 'Paragraph',
    value: FieldType.textarea
  }
];

watchEffect(() => {
  // copy field
  editField.value = JSON.parse(JSON.stringify(field));
});

/**
 * Calculate field name based on the label.
 * Field name is used to identify the field in the form
 */
function changeLabel() {
  const fieldName = editField.value.label.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, "").replace(/\s+/g, '_');
  editField.value.name = fieldName;
  emitUpdateField();
}

function emitUpdateField() {
  emit('update:field', { ... editField.value })
}

</script>

<template>
  <div>
    <select
      class="shadow-sm rounded w-full mb-3 md:mb-0 md:w-1/4 md:float-end py-1.5 px-2 bg-white"
      :name="`form-field-type${index && `-${index}` || ''}`"
      :id="`form-field-type${index && `-${index}` || ''}`"
      v-model="editField.type"
      @change="emitUpdateField"
    >
      <option v-for="type in types" :key="type.value" :value="type.value">
        {{ type.label }}
      </option>
    </select>
    <input
      class="shadow-sm appearance-none rounded w-full md:w-2/3 py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 valid:shadow-green-400 invalid:shadow-red-400 focus:outline-hidden focus:shadow-blue-400 "
      type="text"
      :name="`form-field-label${index && `-${index}` || ''}`"
      :id="`form-field-label${index && `-${index}` || ''}`"
      required
      placeholder="Field Lable"
      v-model.trim="editField.label"
      @change="changeLabel"
    />
  </div>
  <div class="mt-3 flex">
    <div class="flex-auto">
      <input
        class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        type="checkbox"
        :name="`form-field-required${index && `-${index}` || ''}`"
        :id="`form-field-required${index && `-${index}` || ''}`"
        v-model="editField.required"
        @change="emitUpdateField"
      />
      <label class="ml-2 text-gray-800 dark:text-gray-300" :for="`form-field-required${index && `-${index}` || ''}`">Required</label>
    </div>
    <div class="flex-auto text-right">
      <button
        class="bg-orange-800 hover:bg-orange-900 font-bold text-white px-2 rounded active:outline-orange-900 active:outline-1 active:outline-offset-1"
        type="button"
        @click="emit('deleteField')"
      >
        Remove Field
      </button>
    </div>
  </div>
</template>
