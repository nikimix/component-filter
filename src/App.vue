<template>
  <v-filter
    :data="todos"
  />
  <v-filter
    :data="users"
    searching-by-field="firsName"
  />
  <v-filter
    :data="products"
    searching-by-field="title"
  />
</template>

<script setup>
  import {onMounted, ref} from 'vue';
  import VFilter from './components/VFilter.vue';

  const users = ref([]);
  const todos = ref([]);
  const products = ref([]);

  const useFetch = async (url) => {
    const res = await (await fetch(url)).json();
    return res;
  };
  onMounted(async () => {
    users.value = (await useFetch('https://dummyjson.com/users')).users;
    products.value = (await useFetch('https://dummyjson.com/products')).products;
    todos.value = (await useFetch('https://dummyjson.com/todos')).todos;
  });
</script>

<style scoped lang="scss">
</style>
