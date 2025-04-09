<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { useRoute, onBeforeRouteUpdate, RouterLink } from 'vue-router';

import FormEditor from '../components/FormEditor.vue';

import type { Form } from '../types/form';

const route = useRoute();

const id = ref<string>((route.params.id as string) || '');
const tab = ref<string>((route.query.tab as string) || '');
const form = ref<Form>({ id: '', name: '' });

function loadFormData(id: string) {
  form.value = {
    id,
    name: ``,
  };
}

onBeforeRouteUpdate((to) => {
  if (to.params.id !== id.value) id.value = (route.params.id as string) || '';
  if (to.query.tab !== tab.value) tab.value = (route.query.tab as string) || '';
});

watchEffect(() => {
  loadFormData(id.value);
});

// preserves any adicional query
function getTabQuery(tab?: string) {
  const query = { ...route.query };
  delete query.tab;
  if (tab) query.tab = tab;
  return query;
}
</script>
<template>
  <nav>
    <RouterLink :to="{ query: getTabQuery() }">Edit</RouterLink>
    <RouterLink :to="{ query: getTabQuery('answer') }">Answers</RouterLink>
  </nav>
  <div>
    <h2>Form Details for {{ form.id }}</h2>
    <div v-if="!tab">
      <FormEditor :form="form"></FormEditor>
    </div>
  </div>
</template>
