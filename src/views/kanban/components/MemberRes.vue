<template>
  <div class="member">
    <div>
      <div class="relative flex flex-no-wrap task-list mt-3 pl-6">
        <h3 class="section-card__title">成员任务跟踪</h3>
                 <!-- <a-button class="ml-2 w-30 flex " type="primary" @click="onOpenAdd()" >
            <feather class="mr-1 mt-1 " size="20" type="plus" />
            <span class="mt-1">新增</span>
          </a-button> -->
        <div class="flex ml-auto">
        </div>
      </div>
      <div>
        <a-card :bordered="false">
          <a-table :columns="columns" :data-source="data" bordered  :scroll="{ x: 1200, y: 400 }" :pagination="false">
            <template slot="name" slot-scope="text">
                                         <div  style="text-align:center;margin:auto">
                                              <a-avatar
                            class="flex-wrap text-xs primary bg-primary-light"
                            :size="60"
                            >{{
                              text
                            }}</a-avatar
                          >
              <div class="flex-wrap pt-2">{{ text }}</div>
                                         </div>
            </template>
            <template slot="plan" slot-scope="plan">
              <div class="kb-col__board">
                <draggable
                  class=""
                  v-model="plan.datalist"
                  v-bind="dragOptions"
                >
                  <transition-group tag="ul">
                    <li
                      class="kb-col__item"
                      v-for="{
                        id,
                        t_title,
                        t_rank,
                        t_content,
                        t_header_name,
                        end_time,
                        is_done
                      } in plan.datalist"
                      :key="id"
                      :data-border="rankColor(is_done, t_rank)"
                      @click="showDetail(id)"
                    >
                      <div
                        v-html="t_title"
                        class="boardItem"
                        :class="{ done: is_done }"
                      ></div>
                      <div
                        class="text-sm text-gray-500 boardItem"
                        :class="{ done: is_done }"
                      >
                        {{ t_content }}
                      </div>
                      <div class="mt-1 flex items-center text-xs">
                        <div class="mr-2 flex items-center">
                          <feather
                            class="mr-1"
                            size="12"
                            type="clock"
                            v-if="end_time !== null"
                          />
                          <span v-if="end_time !== null">
                            {{ end_time | dateFormat }}</span
                          >
                        </div>

                        <div class="ml-auto flex-1 flex flex-wrap justify-end">
                          <a-avatar
                            class="kb-col__avatar text-xs primary bg-primary-light"
                            :key="id"
                            :size="30"
                            >{{
                              t_header_name === null ? "暂无" : t_header_name
                            }}</a-avatar
                          >
                        </div>
                      </div>
                    </li>
                  </transition-group>
                </draggable>
              </div>
            </template>
            <template slot="develop" slot-scope="develop">
              <div class="kb-col__board">
                <draggable
                  class=""
                  v-model="develop.datalist"
                  v-bind="dragOptions"
                >
                  <transition-group tag="ul">
                    <li
                      class="kb-col__item"
                      v-for="{
                        id,
                        t_title,
                        t_rank,
                        t_content,
                        t_header_name,
                        end_time,
                        is_done
                      } in develop.datalist"
                      :key="id"
                      :data-border="rankColor(is_done, t_rank)"
                      @click="showDetail(id)"
                    >
                      <div
                        v-html="t_title"
                        class="boardItem"
                        :class="{ done: is_done }"
                      ></div>
                      <div
                        class="text-sm text-gray-500 boardItem"
                        :class="{ done: is_done }"
                      >
                        {{ t_content }}
                      </div>
                      <div class="mt-1 flex items-center text-xs">
                        <div class="mr-2 flex items-center">
                          <feather
                            class="mr-1"
                            size="12"
                            type="clock"
                            v-if="end_time !== null"
                          />
                          <span v-if="end_time !== null">
                            {{ end_time | dateFormat }}</span
                          >
                        </div>

                        <div class="ml-auto flex-1 flex flex-wrap justify-end">
                          <a-avatar
                            class="kb-col__avatar text-xs primary bg-primary-light"
                            :key="id"
                            :size="30"
                            >{{
                              t_header_name === null ? "暂无" : t_header_name
                            }}</a-avatar
                          >
                        </div>
                      </div>
                    </li>
                  </transition-group>
                </draggable>
              </div>
            </template>
            <template slot="finish" slot-scope="finish">
              <div class="kb-col__board">
                <draggable
                  class=""
                  v-model="finish.datalist"
                  v-bind="dragOptions"
                >
                  <transition-group tag="ul">
                    <li
                      class="kb-col__item"
                      v-for="{
                        id,
                        t_title,
                        t_rank,
                        t_content,
                        t_header_name,
                        end_time,
                        is_done
                      } in finish.datalist"
                      :key="id"
                      :data-border="rankColor(is_done, t_rank)"
                      @click="showDetail(id)"

                    >
                      <div
                        v-html="t_title"
                        class="boardItem"
                        :class="{ done: is_done }"
                      ></div>
                      <div
                        class="text-sm text-gray-500 boardItem"
                        :class="{ done: is_done }"
                      >
                        {{ t_content }}
                      </div>
                      <div class="mt-1 flex items-center text-xs">
                        <div class="mr-2 flex items-center">
                          <feather
                            class="mr-1"
                            size="12"
                            type="clock"
                            v-if="end_time !== null"
                          />
                          <span v-if="end_time !== null">
                            {{ end_time | dateFormat }}</span
                          >
                        </div>

                        <div class="ml-auto flex-1 flex flex-wrap justify-end">
                          <a-avatar
                            class="kb-col__avatar text-xs primary bg-primary-light"
                            :key="id"
                            :size="30"
                            >{{
                              t_header_name === null ? "暂无" : t_header_name
                            }}</a-avatar
                          >
                        </div>
                      </div>
                    </li>
                  </transition-group>
                </draggable>
              </div>
            </template>
            <template slot="reject" slot-scope="reject">
              <div class="kb-col__board">
                <draggable
                  class=""
                  v-model="reject.datalist"
                  v-bind="dragOptions"
                >
                  <transition-group tag="ul">
                    <li
                      class="kb-col__item"
                      v-for="{
                        id,
                        t_title,
                        t_rank,
                        t_content,
                        t_header_name,
                        end_time,
                        is_done
                      } in reject.datalist"
                      :key="id"
                      :data-border="rankColor(is_done, t_rank)"
                      @click="showDetail(id)"
                    >
                      <div
                        v-html="t_title"
                        class="boardItem"
                        :class="{ done: is_done }"
                      ></div>
                      <div
                        class="text-sm text-gray-500 boardItem"
                        :class="{ done: is_done }"
                      >
                        {{ t_content }}
                      </div>
                      <div class="mt-1 flex items-center text-xs">
                        <div class="mr-2 flex items-center">
                          <feather
                            class="mr-1"
                            size="12"
                            type="clock"
                            v-if="end_time !== null"
                          />
                          <span v-if="end_time !== null">
                            {{ end_time | dateFormat }}</span
                          >
                        </div>

                        <div class="ml-auto flex-1 flex flex-wrap justify-end">
                          <a-avatar
                            class="kb-col__avatar text-xs primary bg-primary-light"
                            :key="id"
                            :size="30"
                            >{{
                              t_header_name === null ? "暂无" : t_header_name
                            }}</a-avatar
                          >
                        </div>
                      </div>
                    </li>
                  </transition-group>
                </draggable>
              </div>
            </template>
          </a-table>
        </a-card>
      </div>

      <task :pop-visible="showTask" detail="detailTaskId" @close="showTask = false" />
      <add-modal />
    </div>
  </div>
</template>
<script>
import {
  getMemberBoard,

  getTaskDetail,

} from '@/api/task'
import draggable from 'vuedraggable'
import AddModal from '@/components/AddModal.vue'
import Task from '@/views/task/Task.vue'
import { getComment } from '@/api/comment'
import { getDialog } from '@/api/dialog'
// import STable from '../../components/Table'
import { getMemberList } from '@/api/member'

export default {
  components: {
    draggable,
    AddModal,
    Task,
  },

  data() {
    return {
      name: 'MemberRes',
      data: [],
      columns: [
        {
          title: '处理人',
          dataIndex: 'name',
          scopedSlots: { customRender: 'name' },
        },
        {
          title: '规划中',
          dataIndex: 'data[0]',
          key: 'data[0].id',
          width: '22%',
          scopedSlots: { customRender: 'plan' },
        },
        {
          title: '实现中',
          dataIndex: 'data[1]',
          key: 'data[1].id',
          width: '22%',
          scopedSlots: { customRender: 'develop' },
        },
        {
          title: '已实现',
          dataIndex: 'data[2]',
          key: 'data[2].id',
          width: '22%',
          scopedSlots: { customRender: 'finish' },
        },
        {
          title: '已拒绝',
          dataIndex: 'data[3]',
          key: 'data[3].id',
          width: '22%',
          scopedSlots: { customRender: 'reject' },
        },
      ],
      dragOptions: {
        animation: 200,
        group: 'description',
        disabled: true,
        ghostClass: 'ghost',
      },
      showTask: false,
    }
  },
  watch: {
    showTask() {
      this.init()
    },
    isAddModalOpened() {
      this.init()
    },
    currStageId() {
      this.init()
    },
    currProjectID() {
      this.init()
    },
  },
  created() {
    this.init()
  },
  methods: {
    onOpenAdd() {
      this.$store.commit('add/SET_ADD_FROM_DETAIL', false)
      this.$store.commit('add/SET_SUBMIT', false)
      this.$store.commit(
        'add/SET_ADD_MODAL_TYPE',
        'task',
      )
      this.$store.commit('add/SET_ADD_MODAL_STATUS', true)
    },
    init() {
      this.getMemberBoard()
    },
    async getMemberBoard() {
      const pid = this.currProjectID
      const sid = this.currStageId
      const { data: res } = await getMemberBoard(pid, sid)
      this.data = res
      console.log('memberBoard', res)
      // this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
    },
    rankColor(done, rank) {
      if (done) {
        return 'side-menu-icon-color'
      }

      switch (rank) {
        case 1:
          return 'success'
        case 2:
          return 'warning'
        case 3:
          return 'danger'
        default:
          return 'primary'
      }
    },
    async showDetail(id) {
      console.log('id', id)
      this.$store.commit('task/SET_CURR_EDIT_TASK', id)
      await this.getTaskDetail(id)
      await this.getDialog(id)
      await this.getComment(id)
      this.showTask = true
      // this.detailTaskId = id
    },
    async getComment(id) {
      const params = {
        source: 'task',
        sid: id,
      }
      const { data: res } = await getComment(params)
      // this.dialogList = res
      this.$store.commit('task/SET_TASK_COMMENT', res)
      return true
    },

    async getMemberList() {
      const id = this.currProjectID
      const { data: res } = await getMemberList(id)
      console.log('memberlist', res)
      this.$store.commit('team/SET_CURR_PROJECT_MEMBER_LIST', res)
    },
    async getTaskDetail(id) {
      const pid = this.currProjectID

      const { data: res } = await getTaskDetail(pid, id)
      this.$store.commit('task/SET_TASK_DETAIL', res)
      if (res.detail.t_level !== 0) {
        console.log('当前任务的father', res.parent[0])
        this.$store.commit('task/SET_CURR_FATHER_TASK', res.parent[0])
      }
      return true
    },
    async getDialog(id) {
      const obj = {
        pid: this.currProjectID,
        // source: 'task',
        sid: id,
      }
      const { data: res } = await getDialog(obj)
      this.$store.commit('task/SET_TASK_DIALOG', res)
      return true
    },
  },
  computed: {
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    currStage() {
      return this.$store.state.stage.currStage
    },
    currStageId() {
      return this.$store.state.stage.currStageId
    },
    isAddModalOpened() {
      return this.$store.state.add.isAddModalOpened
    },
  },
}
</script>
<style lang="scss" scoped>
.member {
  @apply relative w-full bg-white rounded-lg overflow-hidden;
  margin-top: -30px;
  height: 580px;
  min-height:580px;
}
.kb {
  &-col {
          &__board {
      flex-shrink: 0;
      width:250px;
    }
    &__item {
      @apply relative mb-4 p-3 pl-4 rounded bg-white cursor-pointer;
      box-shadow: 0 10px 15px -5px rgba($secondary, 0.2);
      width:250px;

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
.boardItem {
  &.done {
    color: #b7b8bb;
    text-decoration: line-through;
  }
   display: inline-block;
  white-space: nowrap;
  width: 100%;
  overflow: hidden;
  text-overflow:ellipsis;
}
</style>
