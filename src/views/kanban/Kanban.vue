<template>
  <div class="kanban">
    <!-- 第一行 -->
    <div class=" -mt-8 w-full pr-3">
      <div class=" no-scroll w-full p-2 title-card">
        <div class="wl">
          <div class="wl">
            <div class="wl mr-2 mt-1">
              <!-- 创建迭代按钮 -->
              <a-button class="text-xl" @click="isAddStageVisible = true"
                >+</a-button
              >
            </div>
            <!-- 迭代阶段切换 -->
            <div class="wl">
              <a-dropdown :trigger="['click']" class="w-32 mr-6">
                <div class=" text-2xl ml-1 flex items-center cursor-pointer ">
                  <!-- <a-icon
                    style="color:#98adf9"
                    theme="filled"
                    type="appstore"
                    class="mr-2"
                  /> -->
                  <h3 class="section-card__title">{{ currStage }}</h3>

                  <feather
                    class="ml-1 text-gray-500"
                    size="18"
                    type="chevron-down"
                  />
                </div>
                <template #overlay>
                  <a-menu class="-ml-1 w-32">
                    <a-menu-item
                      style="font-size:15px"
                      v-for="{ id, name } in stageList"
                      :key="id"
                      @click="changeStageTo(id, name)"
                    >
                      {{ name }}
                    </a-menu-item>
                  </a-menu>
                </template>
              </a-dropdown>
            </div>
            <div class="wl">
              <div
                class=" flex-no-wrap inline-block "
                style="color:#bdc0c9;white-space:nowrap;width:30px;margin-left:-60px;margin-top:7px"
              >
                2021.1.1~2021.3.1
                <a-icon
                  style="ccursor:pointer;color:#98adf9"
                  class="text-xl ml-1"
                  type="tag"
                  @click="target"
                />
              </div>
            </div>
          </div>
        </div>
        <div class="wr">
          <div class="wr mt-1 mr-4">
            <a-button type="primary" class="mr-4" @click="onOpenFilter()"
              >筛选</a-button
            >
            <a-radio-group default-value="task">
              <a-radio-button value="task" @click="showKbBoard"
                >看板视图</a-radio-button
              >
              <a-radio-button value="bug" @click="showListBoard"
                >列表视图</a-radio-button
              >
            </a-radio-group>
          </div>
          <!-- <h3 class="title-card__title text-xl"> <a-button @click="backToEntry">迭代</a-button></h3> -->

          <!-- <p class="mb-6 text-gray-600">使用 setFieldsValue 来动态设置其他控件的值。</p> -->
        </div>
      </div>
    </div>
    <div v-if="isKbShow">
      <!-- 第二行 -->
      <div>
        <a-button
          class="inline mb-4"
          size="large"
          type="primary"
          @click="showTaskModal = true"
          >创建{{ isTaskShow ? "需求" : "缺陷" }}</a-button
        >
        <div class="ml-4 inline">
          <a-radio-group default-value="task">
            <a-radio-button value="task" @click="showKbBoard('task')"
              >需求</a-radio-button
            >
            <a-radio-button value="bug" @click="showKbBoard('bug')"
              >缺陷</a-radio-button
            >
          </a-radio-group>
        </div>
      </div>
      <!-- 看板 -->
      <div class="kb">
        <div class="kb-col" v-for="(it, i) in kbList" :key="i">
          <div class="kb-col__title overflow-hidden mb-1 flex items-center">
            <span class="kb-col__input"
              ><span class="ml-4"
                >{{ it.title }} · {{ it.dataList.length }}</span
              ></span
            >

            <!-- <a-dropdown class="ml-40 pl-4" :trigger="['click']">
            <feather class="cursor-pointer" size="20" type="more-vertical" />
            <template #overlay>
               单个看板的菜单 -->
            <!-- <a-menu>
                <a-menu-item @click="$message.success('已复制看板链接')">
                  复制看板链接
                </a-menu-item>
                <a-menu-item @click="deleteBoard(it.title)">
                  删除此看板
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown> -->
          </div>
          <div class="kb-col__board">
            <draggable class=" " v-model="it.dataList" v-bind="dragOptions">
              <transition-group tag="ul">
                <li
                  class="kb-col__item"
                  v-for="{ id, label, content, items, members } in it.dataList"
                  :key="id"
                  :data-border="label"
                  @click="showTaskModal = true"
                >
                  <div v-html="content"></div>
                  <div v-if="items" class="mt-4 flex items-center text-xs">
                    <div
                      class="mr-2 flex items-center"
                      v-for="{ item, value } in items"
                      :key="item"
                    >
                      <feather class="mr-1" size="12" :type="itemIcon[item]" />
                      {{ value }}
                    </div>

                    <div class="ml-auto flex-1 flex flex-wrap justify-end">
                      <a-avatar
                        class="kb-col__avatar text-xs primary bg-primary-light"
                        v-for="{ id, avatar } in members"
                        :key="id"
                        :size="22"
                        >{{ avatar }}</a-avatar
                      >
                    </div>
                  </div>
                </li>
              </transition-group>
            </draggable>
            <!-- <div v-show="currAdd.title === it.title" class="mb-2">
          <a-textarea
            class="mb-1"
            v-model.trim="currAdd.content"
            :auto-size="{ minRows: 3, maxRows: 5 }"
          />
          <a-button class="mr-2" size="small" type="primary" @click="addNewItem"
            >提交</a-button
          >
          <a-button size="small" type="danger">取消</a-button>
        </div> -->
            <!-- <div class="flex items-center">
          <div
            class="flex items-center cursor-pointer"
            @click="currAdd.title = it.title"
          >
            <feather size="15" type="plus" />
            创建新项
          </div>
        </div> -->
          </div>
        </div>
      </div>
    </div>
    <!-- 列表 -->
    <div v-if="!isKbShow" class="mt-10">
      <task-list></task-list>
    </div>

    <filter-modal />
    <task-detail :pop-visible="showTaskModal" @close="showTaskModal = false" />
    <a-modal
      :rules="stageRules"
      :visible="isAddStageVisible"
      title="创建迭代"
      @ok="addStage"
      @cancel="closeAddStage"
    >
      <div>
        <a-form-model
          class="pl-2"
          layout="horizontal"
          :model="newStage"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-form-model-item label="迭代名称" type="name">
            <a-input v-model="newStage.name" />
          </a-form-model-item>
          <a-form-model-item label="起止时间">
            <a-range-picker
              width="200px"
              v-model="newStage.start"
              type="date"
            />
          </a-form-model-item>
          <a-form-model-item label="迭代目标">
            <a-input v-model="newStage.target" type="textarea" />
          </a-form-model-item>
        </a-form-model>
      </div>
    </a-modal>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import FilterModal from './components/FilterModal.vue'
import TaskDetail from '../task/Task.vue'
import TaskList from '../task/TaskList.vue'

export default {
  name: 'Kanban',

  components: {
    TaskList,
    draggable,
    FilterModal,
    TaskDetail,
  },

  data: () => ({
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
    stageList: [
      { name: '迭代1', id: '0', target: '下个月上线' },
      { name: '迭代2', id: '1', target: '日活3万' },
    ],
    kbList: [
      {
        id: 'board1',
        title: '定制主题',
        dataList: [
          {
            id: '1',
            label: 'primary',
            content: '君自故乡来，应知故乡事。来日绮窗前，寒梅著花未？🌺',
            items: [
              { item: 'time', value: '1-6' },
              { item: 'msg', value: 14 },
            ],
            members: [
              { id: '1', avatar: '头' },
              { id: '2', avatar: '像' },
            ],
          },
          {
            id: '2',
            label: 'warning',
            content: '昨夜裙带解，今朝蟢子飞。',
            items: [
              { item: 'time', value: '2-4' },
              { item: 'msg', value: 19 },
            ],
            members: [
              { id: '1', avatar: 'B' },
              { id: '2', avatar: 'V' },
            ],
          },
          {
            id: '3',
            label: 'danger',
            content: '铅华不可弃，莫是藁砧归。',
            items: [{ item: 'time', value: '1-9' }],
          },
          {
            id: '4',
            label: 'success',
            content: '闺中少妇不知愁，春日凝妆上翠楼。',
            items: [
              { item: 'time', value: '6-6' },
              { item: 'msg', value: 1 },
            ],
          },
          {
            id: '5',
            label: 'info',
            content: '忽见陌头杨柳色，悔教夫婿觅封侯。',
            items: [
              { item: 'time', value: '4-1' },
              { item: 'msg', value: 45 },
            ],
            members: [
              { id: '1', avatar: 'A' },
              { id: '2', avatar: 'V' },
            ],
          },
        ],
      },
      {
        id: 'board2',
        title: '常见问题',
        dataList: [
          {
            id: '6',
            label: 'secondary',
            content: '九月九日忆山东兄弟',
            items: [
              { item: 'time', value: '6-9' },
              { item: 'msg', value: 19 },
            ],
          },
          {
            id: '7',
            label: 'secondary',
            content: '独在异乡为异客，每逢佳节倍思亲。',
            items: [
              { item: 'time', value: '7-1' },
              { item: 'msg', value: 11 },
            ],
          },
          {
            id: '8',
            content: '遥知兄弟登高处，遍插茱萸少一人。🐸',
          },
          {
            id: '9',
            content: '<img width=100% src=""><p>点击编辑看板卡片 👀</p>',
          },
        ],
      },
      {
        id: 'board3',
        title: '支持我们',
        dataList: [
          {
            id: '10',
            label: 'success',
            content: '千山鸟飞绝，万径人踪灭。',
            items: [
              { item: 'time', value: '6-9' },
              { item: 'msg', value: 19 },
            ],
            members: [
              { id: '1', avatar: '我' },
              { id: '2', avatar: '是' },
              { id: '3', avatar: '头' },
              { id: '4', avatar: '像' },
            ],
          },
          {
            id: '11',
            label: 'primary',
            content: '孤舟蓑笠翁',
            items: [
              { item: 'time', value: '7-16' },
              { item: 'msg', value: 11 },
            ],
            members: [
              { id: '1', avatar: '头' },
              { id: '2', avatar: '像' },
            ],
          },
          {
            id: '12',
            label: 'warning',
            content: '独钓寒江雪🐣',
            items: [
              { item: 'time', value: '4-9' },
              { item: 'msg', value: 19 },
            ],
          },
          {
            id: '13',
            label: 'danger',
            content: '独在异乡为异客，每逢佳节倍思亲。',
            items: [
              { item: 'time', value: '7-1' },
              { item: 'msg', value: 11 },
            ],
            members: [
              { id: '1', avatar: '头' },
              { id: '2', avatar: '像' },
            ],
          },
        ],
      },
      {
        id: 'board2',
        title: '常见问题',
        dataList: [
          {
            id: '6',
            label: 'secondary',
            content: '九月九日忆山东兄弟',
            items: [
              { item: 'time', value: '6-9' },
              { item: 'msg', value: 19 },
            ],
          },
          {
            id: '7',
            label: 'secondary',
            content: '独在异乡为异客，每逢佳节倍思亲。',
            items: [
              { item: 'time', value: '7-1' },
              { item: 'msg', value: 11 },
            ],
          },
          {
            id: '8',
            content: '遥知兄弟登高处，遍插茱萸少一人。🐸',
          },
          {
            id: '9',
            content: '<img width=100% src=""><p>点击编辑看板卡片 👀</p>',
          },
        ],
      },
    ],
    itemIcon: {
      time: 'clock',
      msg: 'message-square',
    },
    // dragOptions: {
    //   animation: 200,
    //   group: 'description',
    //   disabled: false,
    //   ghostClass: 'ghost',
    // },
    currAdd: { id: '', title: '', content: '' },
    currEdit: {
      title: '这是一个看板标题',
      time: null,
      label: 'primary',
      content: '',
      fileName: '',
    },
    showDrawer: false,
    showTaskModal: false,
    isTagetShow: false,
    isTaskShow: true,
    isKbShow: true,
    newStage: {
      id: '', // 连数据库后就不自己设这个了
      name: '',
      target: '',
      start: undefined,
      end: undefined,
    },
    isAddStageVisible: false,
    stageRules: {
      // 暂时没用到
      name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      date: [{ required: true, message: '请选择日期', trigger: 'change' }],
    },
  }),

  methods: {
    addNewBoard() {
      this.kbList.push({ title: '默认标题', dataList: [] })
    },

    addNewItem() {
      if (this.currAdd.content.length > 0) {
        this.kbList.some((el) => {
          if (el.title === this.currAdd.title) {
            el.dataList.push({ id: '10086', content: this.currAdd.content })
            this.reset()
            return true
          }
          return false
        })
      }
    },

    deleteBoard(boardTitle) {
      this.$confirm({
        title: (
          <p>
            此操作将删除<span class="warning">「{boardTitle}」</span>看板
          </p>
        ),
        content: '请点击确定按钮以删除',
        onOk: () => {
          // MOCK: 模拟删除一个看板
          this.kbList.some((el, i, self) => {
            if (el.title === boardTitle) {
              self.splice(i, 1)
              return true
            }
            return false
          })
        },
      })
    },

    orderList() {
      this.list = this.list.sort((one, two) => one.order - two.order)
    },
    onMove({ relatedContext, draggedContext }) {
      const relatedElement = relatedContext.element
      const draggedElement = draggedContext.element
      return (
        (!relatedElement || !relatedElement.fixed) && !draggedElement.fixed
      )
    },
    // 删除任务
    delTask(index, k) {
      this.dragList[index].list.splice(k, 1)
    },
    // 删除任务阶段
    delStage(index) {
      this.dragList.splice(index, 1)
    },
    changeStageTo(id, name) {
      console.log(id)
      console.log(name)
      this.$store.commit('stage/SET_CURR_STAGE_NAME', name)
      this.$store.commit('stage/SET_CURR_STAGE_ID', id)
      window.localStorage.setItem('currStageId', id)
      window.localStorage.setItem('currStage', name)
      window.localStorage.setItem('currStageId', id)

      console.log(this.$store.state.stage.currStage)
      // 这里需要向后台提交id拿项目数据，拿回来后重新渲染当前界面
      // 进入管理界面后每次请求都应该附带id，但是要设置默认id是第一个项目
    },
    target() {
      const h = this.$createElement
      this.$info({
        title: '迭代目标：',
        content: h('div', {}, [
          h(
            'h3',
            this.stageList[window.localStorage.getItem('currStageId')].target,
          ),
        ]),
        onOk() {},
      })
    },
    showKbBoard(type) {
      if (type === 'task') {
        // 切换到需求看板
        this.isTaskShow = true
      }
      if (type === 'bug') {
        // 切换到缺陷看板
        this.isTaskShow = false
      }
      this.$store.commit('filter/SET_FILTER_MODAL_TYPE', type)
      this.currShow = type
      this.isKbShow = true
      // 点击重新拉取kb数组，重新渲染
    },
    showListBoard(type) {
      // 点击重新拉取kb数组，重新渲染
      if (type === 'task') {
        // 切换到需求列表
        this.isTaskShow = true
      }
      if (type === 'bug') {
        // 切换到缺陷列表
        this.isTaskShow = false
      }
      this.$store.commit('filter/SET_FILTER_MODAL_TYPE', type)
      this.$store.commit('task/SET_LIST_TYPE', 'stage')
      this.currShow = type
      this.isKbShow = false
    },
    onOpenFilter(type) {
      this.$store.commit('filter/SET_FILTER_MODAL_TYPE', type)
      this.$store.commit('filter/SET_FILTER_MODAL_STATUS', true)
    },

    // 创建迭代
    addStage() {
      console.log(this.newStage)
      this.$store.commit('stage/SET_STAGE_List', this.newStage) // 后面就是commit去数据库了，很多这些commit到store的搭前后端后都要移到数据库
      this.isAddStageVisible = false
      // 做个创建迭代的弹窗
    },
    closeAddStage() {
      this.isAddStageVisible = false
    },
    onStageDateChange(date, dateString) {
      // console.log(date, dateString)
      const { start, end } = dateString
      this.newStage.start = start
      this.newStage.end = end
    },
  },
  computed: {
    dragOptions() {
      return {
        animation: 1,
        group: 'description',
        disabled: !this.editable,
        ghostClass: 'ghost',
      }
    },
    listString() {
      return JSON.stringify(this.kbList, null, 2)
    },
    currStage() {
      return this.$store.state.stage.currStage
    },
    currEditStage() {
      return this.$store.state.filter.currEditFilter
    },

    isFilterModalOpened() {
      return this.$store.state.filter.isFilterModalOpened
    },
    currFilterType() {
      return this.$store.state.filter.currFilterType
    },
  },
}
</script>

<style lang="scss" scoped>
.noscroll {
  overflow-y: hidden;
}
.kb {
  @apply flex flex-none items-start justify-start overflow-x-auto;
  overflow-x: auto;
  //display:inline-block;
  whith-space: nowrap;
  &-col {
    @apply mr-8 mb-4 p-4 bg-gray-200 rounded-lg list-none;
    box-shadow: 0 10px 20px -2px #cbced6;
    flex-shrink: 0;
    width: 330px;
    height: 520px;
    &__title {
      margin-left: -16px;
      width: 330px;
      background-color: #edf2f7;
      z-index: 999;
      height: 40px;
      font-size: 18px;
      margin-top: -10px;
      border-radius: 2px;
      // box-shadow: 0 10px 15px -5px rgba($secondary, 0.1);
      //position: fixed;
    }
    &__board {
      flex-shrink: 0;
      overflow: auto;
      height: 440px;
    }
    &__item {
      @apply relative mb-4 p-3 pl-4 rounded bg-white cursor-pointer;
      box-shadow: 0 10px 15px -5px rgba($secondary, 0.1);

      @each $color in primary, secondary, success, warning, danger, info {
        &[data-border="#{$color}"] {
          &::before {
            @apply absolute top-0 left-0 h-full w-1 overflow-hidden;
            content: "";
            background: map-get($color-map, $color);
          }
        }
      }
    }
    &__avatar {
      @apply relative -ml-2 cursor-pointer;
      transition: $transition;
      border: 2px solid #fff;
      &:hover {
        transform: translateY(-3px);
        z-index: 10;
      }
    }
  }
}
.title-card {
  //apply bg-gray-200;
  box-shadow: 0 15px 30px -5px rgba($secondary, 0.1);
  height: 55px;
  margin-bottom: 10px;
  border-radius: 4px;
  background-color: #ffffff;
  //border: 1px solid #dfdada;
  position: relative;
  // apply flex-no-wrap p-2 rounded-lg bg-white overflow-auto;
  // &__title {
  //   apply ml-2  text-2xl font-bold;
  //   color: rgba($secondary, 0.8);
  // }
}
.wl {
  float: left;
}
.wr {
  float: right;
}
::-webkit-scrollbar {
  width: 4px;
  height: 10px;
  background-color: transparent;
}
</style>
