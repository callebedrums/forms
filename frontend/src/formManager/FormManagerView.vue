<script setup lang="ts">
import { ref, watchEffect } from 'vue';
import { RouterLink, useRoute, useRouter } from 'vue-router';

import type { Form } from '@/types/form';
import { FormService } from '@/services/forms/form.service';

import FormEditor from './FormEditor.vue';
import FormAnswers from './FormAnswers.vue';

const route = useRoute();
const router = useRouter();

// input props
const { id = '', tab = '' } = defineProps<{
  id: string,
  tab?: string
}>();

const form = ref<Form>({ id: '', name: '', fields: [] });

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
  <div>
    <div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
      <ul class="flex flex-wrap -mb-px">
        <li class="me-2">
          <RouterLink
            :to="{ query: getTabQuery() }"
            class="text-gray-500 inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 aria-selected:text-blue-600 aria-selected:border-blue-600 aria-selected:dark:text-blue-500 aria-selected:dark:border-blue-500"
            :aria-selected="!tab"
          >
            Edit
          </RouterLink>
        </li>
        <li class="me-2">
          <RouterLink
            :to="{ query: getTabQuery('answer') }"
            class="text-gray-500 inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300 aria-selected:text-blue-600 aria-selected:border-blue-600 aria-selected:dark:text-blue-500 aria-selected:dark:border-blue-500"
            :aria-selected="tab === 'answer'"
          >
            Answers
          </RouterLink>
        </li>
      </ul>
    </div>
    <div v-if="!tab">
      <FormEditor :form="form" @save="save" @delete="deleteForm(form)" />
    </div>
    <div v-if="tab === 'answer'">
      <FormAnswers :form="form" />
    </div>
  </div>
</template>
