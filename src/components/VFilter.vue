<template v-if="props.data.length">
  <div
    id="root-filter"
    class="filter"
  >
    <h1>Filter</h1>
    <div class="toggle">
      <slot
        name="toggle"
        :toggle-handler="toggleStateDropContent"
      >
        <input
          v-model="search"
          class="toggle__input"
          placeholder="search..."
          @click="toggleStateDropContent"
        >
      </slot>
    </div>
    <div
      v-show="isShowFilterList"
      class="filter-list"
    >
      <div
        v-for="option of filteredOptions"
        :key="option.id"
        class="filter-list__option"
        :class="selectedOptions[option.id] ? 'selected' : ''"
      >
        <slot name="option">
          <input
            :id="option.id"
            :value="option.todo"
            :checked="!!selectedOptions[option.id]"
            type="checkbox"
            class="filter-item__input"
            @change="updateSelectedOptions(option)"
          >
          <div>
            {{ option.completed }}
          </div>
          <label
            :for="option.id"
            class="filter-item__label"
          >
            {{ option.todo }}
          </label>
        </slot>
      </div>
    </div>
    <div
      v-show="!isShowFilterList"
      class="filter-list"
    >
      <div
        v-for="(option, key) in selectedOptions"
        :key="key"
        class="sn"
      >
        <slot name="selectedOption">
          <button
            @click="updateSelectedOptions(option)"
          >
            {{ option.id }}
            &cross;
          </button>
        </slot>
      </div>
    </div>
  </div>
</template>

<script setup>
  import {
    ref, defineProps, computed, watch,
  } from 'vue';
  import useEvent from '../use/useEvent';

  const props = defineProps({
    data: {
      type: Array,
      required: true,
    },
    searchingByField: {
      type: String,
      default: 'todo',
    },
  });


  const search = ref('');

  const filterOptions = () => {
    const processedString = `^${search.value.replace(/\\/g, '\\\\')}`;
    const regExp = new RegExp(processedString, 'i');
    return props.data.filter((item) => item[props.searchingByField].match(regExp));
  };

  const filteredOptions = computed(() => (search.value ? filterOptions() : props.data));



  const isShowFilterList = ref(false);

  const toggleStateDropContent = () => {
    isShowFilterList.value = !isShowFilterList.value;
  };

  const closeFilterList = () => {
    isShowFilterList.value = false;
    search.value = '';
  };

  const {initEvent, removeEvent} = useEvent('#root-filter', closeFilterList);

  watch(() => isShowFilterList.value, (value) => (value ? initEvent() : removeEvent()));



  const selectedOptions = ref({});

  const updateSelectedOptions = (filter) => {
    if (selectedOptions.value[filter.id]) {
      delete selectedOptions.value[filter.id];
    } else {
      selectedOptions.value[filter.id] = filter;
    }
  };

</script>

<style scoped lang="scss">
.filter {
  display: grid;
  row-gap: 1rem;
}

.drop-content {
  display: grid;
  row-gap: 1rem;
}

.toggle {
  &__input {
    padding: .5rem;
    border: 1px solid #4d65f5;
    outline-color: #4d65f5;
    border-radius: 10px;
    font-size: 1em;
  }
}
.filter-list {
  display: grid;
  width: 350px;
  row-gap: .5rem;
  max-height: 500px;
  overflow: auto;

  &__option {
    display: flex;
    column-gap: 1rem;
    align-items: center;
    padding: .3rem;
    width: 100%;
    border-radius: 15px;
  }
}

.selected {
  color: #4cd5e8;
}
</style>
