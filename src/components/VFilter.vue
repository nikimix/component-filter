<template v-if="props.data.length">
  <div
    class="filter"
  >
    <h1>Filter</h1>
    <div class="toggle">
      <slot
        name="toggle"
        :toggle-handler="toggleVisibilityFilterList"
      >
        <input
          v-model="search"
          class="toggle__input"
          placeholder="search..."
          @click="toggleVisibilityFilterList"
        >
      </slot>
    </div>
    <div
      v-show="isVisibleFilterList"
      id="filter-list"
      ref="filterList"
      class="filter-list"
    >
      <div
        v-for="option of searchData"
        :key="option.id"
        class="filter-list__option"
        :class="selectedFilters[option.id] ? 'selected' : ''"
        @click="updateSelectedFilters(option)"
      >
        <slot
          name="option"
          :option="option"
        >
          <div>
            {{ option.completed }}
          </div>
          <div>
            {{ option.todo }}
          </div>
        </slot>
      </div>
    </div>
    <div
      v-show="isVisibleSelectedFilter"
      class="filter-list filter-list_selected"
    >
      <div
        v-for="(option, key) in selectedFilters"
        :key="key"
        class="filter-list__option filter-list__option_selected"
      >
        <slot
          name="selectedOption"
          :option="option"
          :remove-handler="updateSelectedFilters"
        >
          <div>{{ option.todo }}</div>
          <button
            @click="updateSelectedFilters(option)"
          >
            x
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
  import useHandlerOutsideTarget from '../use/useHandlerOutsideTarget';

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

  const processSearch = () => {
    const processedString = `^${search.value.replace(/\\/g, '\\\\')}`;
    return new RegExp(processedString, 'i');
  };

  const filteredData = computed(() => {
    const processedSearch = processSearch();
    return props.data.filter((item) => item[props.searchingByField].match(processedSearch));
  });

  const searchData = computed(() => (search.value ? filteredData.value : props.data));


  const isVisibleFilterList = ref(false);

  const resetSearchState = (evt) => {
    evt.target.blur();
    search.value = '';
  };

  const toggleVisibilityFilterList = (evt) => {
    if (evt.defaultPrevented) return;
    evt.preventDefault();
    isVisibleFilterList.value = !isVisibleFilterList.value;
    if (!isVisibleFilterList.value) {
      resetSearchState(evt);
    }
  };


  const filterList = ref(null);
  
  const {setHandler, removeHandler} = useHandlerOutsideTarget(filterList, toggleVisibilityFilterList);

  watch(() => isVisibleFilterList.value, (value) => {
    value ? setHandler() : removeHandler();
  });


  const selectedFilters = ref({});

  const isVisibleSelectedFilter = computed(() => Object.keys(selectedFilters.value).length && !isVisibleFilterList.value);

  const updateSelectedFilters = (filter) => {
    if (selectedFilters.value[filter.id]) {
      delete selectedFilters.value[filter.id];
    } else {
      selectedFilters.value[filter.id] = filter;
    }
  };

</script>

<style scoped lang="scss">
.filter {
  display: grid;
  width: 400px;
  padding: 1rem;
  row-gap: 1rem;
  border: 1px solid #4d65f5;
  border-radius: 10px;
}

.toggle {
  &__input {
    padding: .5rem;
    border: 1px solid #4d65f5;
    outline-color: #4d65f5;
    border-radius: 10px;
  }
}

.filter-list {
  display: grid;
  gap: .5rem;
  max-height: 300px;
  overflow-y: auto;
  box-sizing: border-box;
  box-shadow: 0 5px 15px 0 rgb(0 0 0 / 30%), 0 0 0 1px rgb(0 0 0 / 5%);
  padding: 20px 30px;
  border-radius: 10px;

  &_selected {
    display: flex;
    flex-wrap: wrap;
  }

  &::-webkit-scrollbar {
    background-color: gray;
    border-radius: 10px;
    width: 3px;
    height: 3px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #4d65f5;
  }

  &__option {
    display: flex;
    box-sizing: border-box;
    column-gap: .5rem;
    align-items: center;
    justify-content: center;
    padding: .3rem 1rem;
    border-radius: 15px;
    cursor: pointer;
    border: 1px solid #4d65f5;

    &_selected {
      justify-content: space-between;
      column-gap: .4rem;
      padding: .3rem;
      cursor: auto;
    }
  }
}

.selected {
  color: #4cd5e8;
}
</style>
