<script setup lang="ts">
import { FieldType, type Field } from '../types/form';
import { ref, defineProps, watchEffect } from 'vue';

const {field, index} = defineProps<{
  field: Field
  index?: string | number
}>();

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
}

</script>

<template>
  <div>
    <input
      class="shadow-sm appearance-none rounded w-2/3 py-1 px-2 text-gray-700 bg-white hover:bg-gray-50 valid:shadow-green-400 invalid:shadow-red-400 focus:outline-hidden focus:shadow-blue-400 "
      type="text"
      :name="`form-field-label${index && `-${index}` || ''}`"
      :id="`form-field-label${index && `-${index}` || ''}`"
      required
      placeholder="Field Lable"
      v-model="editField.label"
    />
    <select
      class="shadow-sm rounded w-1/4 float-end py-1.5 px-2 bg-white"
      :name="`form-field-type${index && `-${index}` || ''}`"
      :id="`form-field-type${index && `-${index}` || ''}`"
      v-model="type"
      @change="(event) => changeType((event.target as HTMLSelectElement)?.value as FieldType)"
    >
      <option v-for="type in types" :key="type.value" :value="type.value">
        {{ type.label }}
      </option>
    </select>
  </div>
</template>
