<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import type { Form } from '@/types/form';
import { FormService } from '@/services/form.service';

import FormEditor from './FormEditor.vue';

const route = useRoute();
const router = useRouter();

// input props
const { id = '', tab = '' } = defineProps<{
  id: string,
  tab?: string
}>();

const form = ref<Form>({ id: '', name: '' });

function loadFormData(id: string) {
  if (id === 'new') {
    form.value = { ...form.value, id: ''};
    return;
  }

  FormService.instance.get(id).then(f => {
    // handle not found
    if (f) form.value = f;
  });
}

watchEffect(() => {
  loadFormData(id);
});

// preserves any adicional query
function getTabQuery(tab?: string) {
  const query = { ...route.query };
  delete query.tab;
  if (tab) query.tab = tab;
  return query;
}

function save(f: Form) {
  const isNew = !f.id;

  FormService.instance.save(f).then(f => {
    if (isNew) {
      router.push({ params: { id: f.id } });
    } else {
      form.value = f;
    }
  });
}

function deleteForm(f: Form) {
  FormService.instance.deleteForm(f).then(() => {
    router.push({ name: 'forms-list'});
  });
}

</script>
<template>
  <nav>
    <RouterLink :to="{ query: getTabQuery() }">Edit</RouterLink>
    <RouterLink :to="{ query: getTabQuery('answer') }">Answers</RouterLink>
  </nav>
  <div>
    <h2>Form Details for {{ form?.name }} - #{{ form?.id || 'New' }}</h2>
    <div v-if="!tab">
      <FormEditor :form="form" @save="save" @delete="deleteForm(form)"></FormEditor>
    </div>
  </div>
</template>
