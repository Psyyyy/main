<template>
  <div class="relative">
    <div>
      <a-input
        class="search-input"
        size="large"
        :placeholder="searchInputText"
        @focus="searchInputText = '请输入文件关键字...'"
        @blur="searchInputText = '搜索文件...'"
      >
        <template #prefix>
          <feather
            size="20"
            type="search"
          />
        </template>
      </a-input>
    </div>

    <perfect-scrollbar
      class="file-list"
      :options="{
        maxScrollbarLength: 160,
        wheelSpeed: 0.60,
      }"
    >
      <flip-list
        v-if="filterItems.length > 0"
        style="min-width: 800px;"
      >
        <li
          class="file-list__item"
          v-for="(file) in filterItems"
          :key="file.id"
          :class="{ 'file-list__item-active': file.id === currEditItem.id }"
          @click="onOpenDrawer(file)"
        >
          <a-checkbox
            class="mr-4"
            v-model="file.done"
            @click.stop
          />
          <div class="flex-1 truncate">{{ file.title }}</div>
          <div class="ml-auto flex items-center flex-wrap">
            <div class="flex-1 flex items-center select-none">
              <div
                class="ml-2 px-2 py-1 rounded-lg text-sm"
                v-for="(it) in file.tag"
                :key="it"
                :class="[tags[it].color, `bg-${tags[it].color}-light`]"
              >{{ tags[it].text }}</div>
            </div>
            <feather
              class="ml-2 transition"
              size="20"
              type="star"
              :class="file.star ? 'warning' : 'text-gray-500'"
              @click.stop="file.star = !file.star"
            />
          </div>
        </li>
      </flip-list>

      <a-empty
        v-else
        class="h-full flex flex-col justify-center items-center"
      />
    </perfect-scrollbar>
  </div>
</template>

<script>
import FlipList from '@/components/animation/FlipList.vue'

export default {
  name: 'FileList',

  components: { FlipList },

  data: () => ({
    searchInputText: '搜索文件...',
    tags: {
      1: { text: '项目', color: 'primary' },
      2: { text: '需求', color: 'success' },
      3: { text: '迭代', color: 'warning' },
      4: { text: '缺陷', color: 'danger' },
    },
  }),

  computed: {
    filterItems() {
      return this.$store.getters['file/filterItems']
    },

    currEditItem() {
      return this.$store.state.file.currEditFile
    },

    isDrawerOpened() {
      return this.$store.state.file.isFileDrawerOpened
    },
  },

  methods: {
    onOpenDrawer(fileItem) {
      if (fileItem.id !== this.currEditItem.id) {
        this.$store.commit('file/SET_CURR_EDIT_FILE', fileItem)
        this.$store.commit('file/SET_FILE_DRAWER_STATUS', true)
      } else {
        this.$store.commit('file/SET_FILE_DRAWER_STATUS', !this.isDrawerOpened)
      }
    },
  },
}
</script>

<style lang="scss" scoped>
.search-input::v-deep {
  @apply py-1;
  .ant-input {
    @apply h-12 pl-10 shadow-none border-none;
    &::placeholder {
      @apply text-sm;
    }
    &:focus {
      box-shadow: 0 10px 15px -5px rgba($secondary, 0.1);
    }
  }
}

.file-list {
  @apply h-full overflow-hidden;
  height: calc(100% - 58px);
  &__item {
    @apply px-6 py-5 flex items-center cursor-pointer;
    transition: $transition;
    &:hover {
      box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
      transform: translateY(-3px);
    }
  }
  &__item-active {
    background: rgba($primary, 0.05);
  }
}
</style>
