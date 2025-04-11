<script setup lang="ts">
import { defineEmits, defineProps, ref, watchEffect } from 'vue';

import type { Field } from '@/types/form';
import { FieldType } from '@/types/form';

const {field, index} = defineProps<{
  field: Field
  index?: string | number
}>();

const emit = defineEmits<{
  'update:field': [field: Field]
}>()

const editField = ref<Field>({ name: '', label: '', type: FieldType.text});

const types: Array<{ label: string, value: FieldType}> = [
  {
    label: 'Short Text',
    value: FieldType.text
  }, {
    label: 'Paragraph',
    value: FieldType.textarea
  }
];
const type = ref<FieldType>(FieldType.text);

watchEffect(() => {
  // copy field
  editField.value = JSON.parse(JSON.stringify(field));
});

function changeType(type: FieldType) {
  editField.value.type = type;
  emitUpdateField();
}

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
      v-model="type"
      @change="(event) => changeType((event.target as HTMLSelectElement)?.value as FieldType)"
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
</template>
