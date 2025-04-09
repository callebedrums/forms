<script setup>
import { ref, watchEffect } from 'vue';
import { useRoute, onBeforeRouteUpdate, RouterLink  } from 'vue-router';

const route = useRoute();

const id = ref(route.params.id);
const form = ref('');
const tab = ref(route.query.tab || '');

function loadFormData(id) {
  form.value = `#${id}`;
}

onBeforeRouteUpdate((to) => {
  if(to.params.id !== id.value) id.value = to.params.id;
  if (to.query.tab !== tab.value) tab.value = to.query.tab;
});

watchEffect(() => {
  loadFormData(id.value);
});


// preserves any adicional query
function getTabQuery(tab) {
  const query = {...route.query};
  delete query.tab;
  if (tab) query.tab = tab;
  return query;
}


</script>
<template>
  <nav>
    <RouterLink :to="{ query: getTabQuery()}">Edit</RouterLink>
    <RouterLink :to="{ query: getTabQuery('answer') }">Answers</RouterLink>
  </nav>
  <div>
    <h2>Form Details for {{ form }}</h2>
  </div>
</template>