<template>
  <v-filter
    :data="todos"
  />

  <v-filter
    :data="users"
    searching-by-field="firstName"
  >
    <template #option="{option}">
      <img
        :src="option.image"
        class="user__photo"
        alt="picture"
      >
      <div class="user-name">
        {{ option.firstName }}
      </div>
    </template>

    <template #selectedOption="{option, removeHandler}">
      <img
        :src="option.image"
        class="user__photo"
      >
      <div class="user-name">
        {{ option.firstName }}
      </div>
      <button @click="removeHandler(option)">
        x
      </button>
    </template>
  </v-filter>
  
  <v-filter
    :data="products"
    searching-by-field="title"
  >
    <template #option="{option}">
      <img
        :src="option.images[0]"
        class="user__photo"
      >
      <div class="user-name">
        {{ option.title }}
      </div>
    </template>
    <template #selectedOption="{option, removeHandler}">
      <img
        :src="option.images[0]"
        class="user__photo"
      >
      <div class="user-name">
        {{ option.title }}
      </div>
      <button @click="removeHandler(option)">
        x
      </button>
    </template>
  </v-filter>
</template>

<script setup>
  import {onMounted, ref} from 'vue';
  import useFetch from './use/useFetch';
  import VFilter from './components/VFilter.vue';

  const users = ref([]);
  const todos = ref([]);
  const products = ref([]);

  onMounted(async () => {
    users.value = (await useFetch('https://dummyjson.com/users')).users;
    products.value = (await useFetch('https://dummyjson.com/products')).products;
    todos.value = (await useFetch('https://dummyjson.com/todos')).todos;
  });
</script>

<style scoped lang="scss">

.user {
  &__photo {
    width: 20px;
  }
}
</style>
