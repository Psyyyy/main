<template>
  <div class="task-detail" id="task-detail">
    <a-spin class="task-detail-spin" :spinning="loading">
      <div class="task-header" :class="{ disabled: task.deleted }">
        <span class="head-title" v-if="!task.deleted">
          <!-- 存在父任务，索引 -->
          <span v-if="task.parentTask">
            <span class="muted">属于任务：</span>
            <a-breadcrumb separator=">" class="breadcrumb text-default">
              <a-breadcrumb-item
                v-for="parent in task.parentTasks"
                :key="parent.code"
              >
                <!-- <a class="text-default" @click="init(parent.code)">{{parent.name}}</a> -->
                <a class="text-default">{{ parent.name }}</a>
              </a-breadcrumb-item>
            </a-breadcrumb>
          </span>
          <!-- 不存在父任务，显示项目名和任务名 -->
          <span v-else>{{ task.projectName }} · {{ task.stageName }}</span>
        </span>
        <!-- 不做这个回收站的 原版delete应该是认为是否彻底删除 -->
        <!-- <span class="head-title muted" v-else>
                        <a-icon type="delete"/>&nbsp;
                        <span>任务已在回收站中，不可修改</span>
                    </span> -->
        <span class="header-action text-right">
          <!-- <template v-if="!task.deleted"> -->
          <template>
            <!-- 点击无效，待查 -->
            <a-dropdown
              :trigger="['click']"
              placement="bottomCenter"
              @click="visibleTaskMenu = true"
              v-model="visibleTaskMenu"
            >
              <!-- 对任务的操作 后面把这里换成【删除任务】和【移动任务】可能做做【订阅任务】就行-->
              <a-tooltip :mouse-enter-delay="0.5">
                <template slot="title">
                  <span>打开菜单</span>
                </template>
                <a class="action-item muted"><a-icon type="ellipsis"/></a>
              </a-tooltip>
              <a-menu @click="doTask" class="field-right-menu" slot="overlay">
                <!-- 方法未实现，待做 -->
                <a-menu-item key="move">
                  <a-icon type="snippets" />
                  <span>移动任务 *</span>
                </a-menu-item>
                <a-menu-item key="star">
                  <a-icon type="star"></a-icon>
                  <span v-if="task.stared">取消订阅</span>
                  <span v-else>订阅任务</span>
                </a-menu-item>
                <a-menu-item key="delete">
                  <a-icon type="delete"></a-icon>
                  <span>删除任务</span>
                </a-menu-item>
              </a-menu>
            </a-dropdown>
          </template>
          <!-- 关闭详情 -->
          <a-tooltip :mouse-enter-delay="0.5">
            <template slot="title">
              <span>关闭面板</span>
            </template>
            <a class="action-item muted" @click="detailClose"
              ><a-icon type="close"
            /></a>
          </a-tooltip>
        </span>
      </div>
      <div class="task-wrap">
        <div class="task-content">
          <div class="content-left">
            <vue-scroll :ops="scrollOps">
              <div class="task-title" :class="{ disabled: task.deleted }">
                <a-input
                  ref="inputTitle"
                  @blur="doName"
                  auto-focus
                  v-model="task.name"
                  size="large"
                  v-show="showEditName"
                />
                <a-tooltip :mouse-enter-delay="0.5" v-if="!task.deleted">
                  <template slot="title">
                    <span>点击即可编辑</span>
                  </template>
                  <div class="title-text" v-show="!showEditName">
                    {{ task.name }}
                  </div>
                </a-tooltip>
                <div v-else class="title-text" v-show="!showEditName">
                  {{ task.name }}
                </div>
              </div>
              <div class="task-basic-attrs-view muted">
                <div class="field-list" :class="{ disabled: task.deleted }">
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="check-square" />
                        <span class="field-name">完成状态</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          :disabled="!!task.deleted || !!task.hasUnDone"
                          :class="{ disabled: task.hasUnDone }"
                        >
                          <a-tooltip placement="top">
                            <template slot="title">
                              <span
                                v-if="task.hasUnDone"
                                style="font-size: 12px;"
                                >子任务尚未全部完成，无法完成父任务</span
                              >
                            </template>
                            <span>
                              <!--<a-icon type="check-square"/>-->
                              <a-tag v-if="task.done" color="green"
                                >已完成</a-tag
                              >
                              <span v-show="!task.done" color="grey">未完成</span>
                            </span>
                          </a-tooltip>
                          <!-- <a-menu class="field-right-menu" slot="overlay"
                                                            :selectable="false"
                                                            @click="taskDone(task.code,!task.done)"> -->
                          <a-menu
                            class="field-right-menu"
                            slot="overlay"
                            :selectable="false"
                          >
                            <a-menu-item key="done">
                              <div class="menu-item-content">
                                <a-tag color="green">已完成</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.done"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item key="undone">
                              <div class="menu-item-content">
                                <a-tag color="grey">未完成</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="!task.done"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="deployment-unit" />
                        <span class="field-name">执行状态</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          :disabled="!!task.deleted || !!task.hasUnDone"
                          :class="{ disabled: task.hasUnDone }"
                        >
                          <span>{{ task.statusText }}</span>
                          <a-menu
                            class="field-right-menu"
                            slot="overlay"
                            :selectable="false"
                          >
                            <a-menu-item
                              :key="status.id"
                              v-for="status in taskStatusList"
                            >
                              <div class="menu-item-content">
                                <span color="green">{{ status.name }}</span>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.status == status.id"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="user" />
                        <span class="field-name">执行者</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          v-model="visibleTaskMemberMenu"
                          :disabled="!!task.deleted"
                          placement="bottomCenter"
                        >
                          <a-tooltip
                            :mouse-enter-delay="0.5"
                            v-if="!task.deleted"
                          >
                            <template slot="title">
                              <span>点击设置执行者</span>
                            </template>
                            <div class="field-flex">
                              <template v-if="task.executor">
                                <a-avatar
                                  :src="task.executor.avatar"
                                  icon="user"
                                  size="small"
                                />
                                <a class="muted name">{{
                                  task.executor.name
                                }}</a>
                              </template>
                              <template v-if="!task.executor">
                                <a-avatar icon="user" size="small" />
                                <a class="muted name">待认领</a>
                              </template>
                            </div>
                          </a-tooltip>
                          <div class="field-flex" v-else>
                            <template v-if="task.executor">
                              <a-avatar
                                :src="task.executor.avatar"
                                icon="user"
                                size="small"
                              />
                              <a class="muted name">{{ task.executor.name }}</a>
                            </template>
                            <template v-if="!task.executor">
                              <a-avatar icon="user" size="small" />
                              <a class="muted name">待认领</a>
                            </template>
                          </div>
                          <div slot="overlay">
                            <!-- <task-member-menu
                                                                v-if="visibleTaskMemberMenu"
                                                                :project-code="projectCodeCurrent"
                                                                :task-code="code"
                                                                @close="init(false)"
                                                                @inviteProjectMember="
                                                            showInviteMember = true,
                                                            visibleTaskMemberMenu = false"
                                                        ></task-member-menu> -->
                            <task-member-menu
                              v-if="visibleTaskMemberMenu"
                              :project-code="projectCodeCurrent"
                              :task-code="code"
                              @inviteProjectMember="
                                (showInviteMember = true),
                                  (visibleTaskMemberMenu = false)
                              "
                            ></task-member-menu>
                          </div>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="calendar" />
                        <span class="field-name">时间</span>
                      </div>
                      <div class="field-right field-date">
                        <template v-if="task.openBeginTime">
                          <a-dropdown
                            :trigger="['click']"
                            v-model="showBeginTime"
                            :disabled="!!task.deleted"
                          >
                            <a-tooltip
                              :mouse-enter-delay="0.5"
                              v-if="!task.deleted"
                            >
                              <template slot="title">
                                <span>点击设置开始时间</span>
                              </template>
                              <div class="field-flex">
                                <a class="muted name" style="margin: 0">
                                  <template v-if="!task.setBeginTime"
                                    >设置开始时间
                                  </template>
                                  <template v-else
                                    >{{ task.begin_time_format }}
                                  </template>
                                </a>
                              </div>
                            </a-tooltip>
                            <div class="field-flex" v-else>
                              <a class="muted name" style="margin: 0">
                                <template v-if="!task.setBeginTime"
                                  >设置开始时间</template
                                >
                                <template v-else>{{
                                  task.begin_time_format
                                }}</template>
                              </a>
                            </div>
                            <div slot="overlay">
                              <!-- <a-date-picker
                                                                    v-model="task.begin_time"
                                                                    size="small"
                                                                    format="MM月DD日 HH:mm"
                                                                    show-time
                                                                    allow-clear
                                                                    :show-today="false"
                                                                    :open="showBeginTime"
                                                                    @ok="doBeginTime(true)"
                                                            >
                                                                <template slot="renderExtraFooter">
                                                                    <a style="position: absolute;" size="small"
                                                                       @click="doBeginTime(false)">清除</a>
                                                                </template> -->
                              <a-date-picker
                                v-model="task.begin_time"
                                size="small"
                                format="MM月DD日 HH:mm"
                                show-time
                                allow-clear
                                :show-today="false"
                                :open="showBeginTime"
                              >
                                <template slot="renderExtraFooter">
                                  <a style="position: absolute;" size="small"
                                    >清除</a
                                  >
                                </template>
                              </a-date-picker>
                            </div>
                          </a-dropdown>
                          <span class="m-l-sm m-r-sm">-</span>
                        </template>
                        <a-dropdown
                          :trigger="['click']"
                          v-model="showEndTime"
                          :disabled="!!task.deleted"
                        >
                          <a-tooltip
                            :mouse-enter-delay="0.5"
                            v-if="!task.deleted"
                          >
                            <template slot="title">
                              <span>点击设置截止时间</span>
                            </template>
                            <div class="field-flex">
                              <a class="muted name" style="margin: 0">
                                <template v-if="!task.setEndTime"
                                  >设置截止时间</template
                                >
                                <template v-else>{{
                                  task.end_time_format
                                }}</template>
                              </a>
                            </div>
                          </a-tooltip>
                          <div class="field-flex" v-else>
                            <a class="muted name" style="margin: 0">
                              <template v-if="!task.setEndTime"
                                >设置截止时间</template
                              >
                              <template v-else>{{
                                task.end_time_format
                              }}</template>
                            </a>
                          </div>
                          <div slot="overlay">
                            <!-- <a-date-picker
                                                                v-model="task.end_time"
                                                                size="small"
                                                                format="MM月DD日 HH:mm"
                                                                show-time
                                                                allow-clear
                                                                :show-today="false"
                                                                :open="showEndTime"
                                                                @ok="doEndTime(true)"
                                                        >
                                                            <template slot="renderExtraFooter">
                                                                <a style="position: absolute;" size="small"
                                                                   @click="doEndTime(false)">清除</a>
                                                            </template> -->
                            <a-date-picker
                              v-model="task.end_time"
                              size="small"
                              format="MM月DD日 HH:mm"
                              show-time
                              allow-clear
                              :show-today="false"
                              :open="showEndTime"
                            >
                              <template slot="renderExtraFooter">
                                <a style="position: absolute;" size="small"
                                  >清除</a
                                >
                              </template>
                            </a-date-picker>
                          </div>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="file-text" />
                        <span class="field-name">备注</span>
                      </div>
                      <div class="field-right width-block">
                        <div
                          class="task-description"
                          :class="{ disabled: task.deleted }"
                          v-show="!showTaskDescriptionEdit"
                          @click="showTaskDesc"
                        >
                          <div
                            class="description-txt"
                            v-show="task.description"
                            v-html="task.description"
                          ></div>
                          <span v-show="!task.description">添加备注</span>
                        </div>
                        <div class="m-t-sm" v-if="hasMoreDesc">
                          <a v-show="!showMoreDesc">显示更多</a>
                          <a v-show="showMoreDesc">收起备注</a>
                        </div>
                        <div v-show="showTaskDescriptionEdit">
                          <!-- <editor
                            ref="vueWangeditor"
                            id="editor"
                            :upload-img-server="editorConfig.uploadImgServer"
                            :upload-img-headers="editorConfig.uploadImgHeaders"
                            :menus="editorConfig.menus"
                          ></editor> -->
                          <editor
                            ref="vueWangeditor"
                            id="editor"
                            :menus="editorConfig.menus"
                          ></editor>
                          <div class="action-btn float-right mt-2 ">
                            <a-button
                              class="mr-2"
                              @click="showTaskDescriptionEdit = false"
                            >
                              取消
                            </a-button>

                            <a-button
                              type="primary"
                              html-type="submit"
                              class="middle-btn"
                              >保存
                            </a-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="bulb" />
                        <span class="field-name">优先级</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          :disabled="!!task.deleted"
                        >
                          <span>
                            <a-tag  :color="priColor(task.pri)">{{ task.priText }}</a-tag>
                          </span>
                          <a-menu
                            class="field-right-menu"
                            slot="overlay"
                            @click="doPri"
                            :selectable="false"
                          >
                            <a-menu-item :key="0">
                              <div class="menu-item-content">
                                <a-tag :color="priColor(0)">普通</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.pri == 0"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item :key="1">
                              <div class="menu-item-content">
                                <a-tag :color="priColor(1)">紧急</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.pri == 1"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item :key="2">
                              <div class="menu-item-content">
                                <a-tag :color="priColor(2)">非常紧急</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.pri == 2"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount task-tag"></div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="bars" />
                        <span class="field-name"
                          >子任务
                          <span v-show="childTaskList.length">
                            · {{ childTaskDoneNum }}/{{
                              childTaskList.length
                            }}</span
                          ></span
                        >
                      </div>
                      <div class="field-right width-block"></div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="block-field width-block">
                        <div class="task-child">
                          <div class="task-list" v-show="childTaskList.length">
                            <div v-for="done in [0, 1]" :key="done">
                              <div
                                v-for="childTask in childTaskList"
                                :key="childTask.code"
                              >
                                <div
                                  class="list-item task"
                                  v-if="childTask.done == done"
                                >
                                  <a-tooltip placement="top">
                                    <template slot="title">
                                      <span
                                        v-if="childTask.parentDone"
                                        style="font-size: 12px;"
                                        >父任务已完成，无法重做子任务</span
                                      >
                                      <span
                                        v-else-if="childTask.hasUnDone"
                                        style="font-size: 12px;"
                                        >子任务尚未全部完成，无法完成父任务</span
                                      >
                                    </template>
                                    <div class="check-box-wrapper task-item">
                                      <a-icon
                                        class="check-box"
                                        :class="{
                                          disabled:
                                            task.deleted ||
                                            childTask.parentDone ||
                                            childTask.hasUnDone
                                        }"
                                        :type="
                                          childTask.done
                                            ? 'check-square'
                                            : 'border'
                                        "
                                        :style="{ fontSize: '16px' }"
                                      />
                                    </div>
                                    <!--<a class="task-item check-box"
                                                                           :class="{'disabled': task.deleted || childTask.parentDone || childTask.hasUnDone}"
                                                                           @click="()=>{if(task.deleted || childTask.parentDone || childTask.hasUnDone) return false;taskDone(childTask.code,!childTask.done,index,'child')}">
                                                                            <a-icon type="check"
                                                                                    v-show="childTask.done"/>
                                                                        </a>-->
                                  </a-tooltip>
                                  <a-dropdown
                                    :trigger="['click']"
                                    v-model="
                                      childTask.visibleChildTaskMemberMenu
                                    "
                                    :disabled="!!task.deleted"
                                    placement="bottomCenter"
                                  >
                                    <a-tooltip :mouse-enter-delay="0.5">
                                      <template slot="title">
                                        <span v-if="childTask.executor">{{
                                          childTask.executor.name
                                        }}</span>
                                        <span v-else>待认领</span>
                                      </template>
                                      <a-avatar
                                        v-if="childTask.executor"
                                        class="task-item"
                                        :class="{ disabled: task.deleted }"
                                        size="small"
                                        icon="user"
                                        :src="childTask.executor.avatar"
                                      ></a-avatar>
                                      <a-avatar
                                        v-else
                                        class="task-item"
                                        :class="{ disabled: task.deleted }"
                                        size="small"
                                        icon="user"
                                      ></a-avatar>
                                    </a-tooltip>
                                    <div slot="overlay">
                                      <task-member-menu
                                        v-if="
                                          childTask.visibleChildTaskMemberMenu
                                        "
                                        :project-code="projectCodeCurrent"
                                        :task-code="childTask.code"
                                        :is-commit="true"
                                        @close="
                                          childTask.visibleChildTaskMemberMenu = false
                                        "
                                        @inviteProjectMember="
                                          (showInviteMember = true),
                                            (childTask.visibleChildTaskMemberMenu = false)
                                        "
                                      ></task-member-menu>
                                    </div>
                                  </a-dropdown>
                                  <!--   <a-tooltip :mouseEnterDelay="0.5">
                                                                        <template slot="title">
                                                                            <span v-if="childTask.executor">{{childTask.executor.name}}</span>
                                                                            <span v-else>待认领</span>
                                                                        </template>
                                                                        <a-avatar
                                                                                v-if="childTask.executor"
                                                                                class="task-item"
                                                                                :class="{'disabled': task.deleted}"

                                                                                size="small"
                                                                                icon="user"
                                                                                :src="childTask.executor.avatar"
                                                                        ></a-avatar>
                                                                        <a-avatar
                                                                                v-else
                                                                                class="task-item"
                                                                                :class="{'disabled': task.deleted}"

                                                                                size="small"
                                                                                icon="user"
                                                                        ></a-avatar>
                                                                    </a-tooltip>-->
                                  <div class="task-item task-title">
                                    <div
                                      class="title-text"
                                      :class="{ done: childTask.done }"
                                    >
                                      {{ childTask.name }}
                                    </div>
                                  </div>
                                  <a class="muted">
                                    <a-icon class="task-item" type="right" />
                                  </a>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="task-list" v-show="showChildTask">
                            <div class="add-task">
                              <div class="list-item task">
                                <span class="task-item check-box"></span>

                                <a-dropdown
                                  :trigger="['click']"
                                  v-model="visibleChildTaskMemberMenu"
                                  :disabled="!!task.deleted"
                                  placement="bottomCenter"
                                >
                                  <a-tooltip :mouse-enter-delay="0.5">
                                    <template slot="title">
                                      <span v-if="childExecutor">{{
                                        childExecutor.name
                                      }}</span>
                                      <span v-else>待认领</span>
                                    </template>
                                    <div class="field-flex">
                                      <template v-if="childExecutor">
                                        <a-avatar
                                          class="task-item"
                                          :src="childExecutor.avatar"
                                          icon="user"
                                          size="small"
                                        />
                                      </template>
                                      <template v-if="!childExecutor">
                                        <a-avatar
                                          class="task-item"
                                          icon="user"
                                          size="small"
                                        />
                                      </template>
                                    </div>
                                  </a-tooltip>
                                  <div slot="overlay">
                                    <task-member-menu
                                      v-if="visibleChildTaskMemberMenu"
                                      :project-code="projectCodeCurrent"
                                      :task-code="childExecutor ? code : ''"
                                      :is-commit="false"
                                      @close="updateChildExecutor"
                                      @inviteProjectMember="
                                        (showInviteChildTaskMember = true),
                                          (visibleChildTaskMemberMenu = false)
                                      "
                                    ></task-member-menu>
                                  </div>
                                </a-dropdown>
                                <div class="task-item task-input">
                                  <a-input v-model="childTaskName" />
                                </div>
                              </div>
                              <div class="action-btn text-right">
                                <a-button
                                  class="mr-2"
                                  @click="showChildTask = false"
                                >
                                  取消
                                </a-button>
                                <a-button
                                  type="primary"
                                  html-type="submit"
                                  class="middle-btn"
                                  >保存
                                </a-button>
                              </div>
                            </div>
                          </div>
                          <a-tooltip placement="top">
                            <template slot="title">
                              <span v-if="task.done" style="font-size: 12px;"
                                >父任务已完成，无法添加新的子任务</span
                              >
                            </template>
                            <a
                              class="add-handler"
                              :class="{ disabled: task.done }"
                              v-show="!showChildTask"
                              @click="
                                () => {
                                  if (task.deleted || task.done) return false;
                                  showChildTask = true;
                                }
                              "
                            >
                              <a-icon type="plus" style="margin-right: 6px;" />
                              添加子任务
                            </a>
                          </a-tooltip>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="paper-clip" />
                        <span class="field-name">关联文件</span>
                      </div>
                      <div class="field-right width-block"></div>
                    </div>
                  </div>
                  <div class="component-mount">
                    <div class="field">
                      <div class="block-field width-block">
                        <div class="task-child">
                          <a class="add-handler" id="upload-file">
                            <a-icon type="plus" style="margin-right: 6px;" />
                            上传文件
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div
                    class="component-mount"
                    v-show="taskSourceList.length > 0"
                  >
                    <div class="field">
                      <div class="block-field width-block">
                        <div class="file-list">
                          <div class="m-xs m-t-none">关联的文件</div>
                          <a-list>
                            <a-list-item
                              :key="index"
                              v-for="(item, index) in taskSourceList"
                            >
                              <a-list-item-meta>
                                <a-avatar
                                  size="small"
                                  slot="avatar"
                                  shape="square"
                                  icon="link"
                                  :src="item.sourceDetail.file_url"
                                />
                                <div slot="title">
                                  <a
                                    class="muted"
                                    target="_blank"
                                    :href="item.sourceDetail.file_url"
                                    >{{ item.title }}</a
                                  >
                                </div>
                                <div slot="description">
                                  <!--{{item.create_time}}-->
                                </div>
                              </a-list-item-meta>
                              <a class="muted" slot="actions">
                                <span>{{ item.sourceDetail.projectName }}</span>
                              </a>
                              <a class="muted" slot="actions">
                                <a-dropdown
                                  :trigger="['click']"
                                  placement="bottomCenter"
                                >
                                  <!-- <a-tooltip :mouseEnterDelay="0.5">
                                                                         <template slot="title">
                                                                             <span>更多操作</span>
                                                                         </template>-->
                                  <a class="action-item muted">
                                    <a-icon type="down" />
                                  </a>
                                  <!--</a-tooltip>-->
                                  <a-menu
                                    v-clipboard="item.sourceDetail.file_url"
                                    class="field-right-menu"
                                    slot="overlay"
                                  >
                                    <a-menu-item key="copy">
                                      <a-icon type="link" />
                                      <span>复制链接</span>
                                    </a-menu-item>
                                    <a-menu-item key="unlink">
                                      <a-icon type="disconnect" />
                                      <span>取消关联</span>
                                    </a-menu-item>
                                  </a-menu>
                                </a-dropdown>
                              </a>
                            </a-list-item>
                          </a-list>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </vue-scroll>
          </div>
          <div class="content-right">
            <div class="header">
              <div class="title">参与者 · {{ taskMemberList.length }}</div>
              <div class="member-list">
                <a-tooltip
                  :mouse-enter-delay="0.5"
                  v-for="member in taskMemberList"
                  :key="member.code"
                >
                  <template slot="title">
                    <span
                      >{{ member.name }}
                      <span v-if="member.is_owner"> · 创建者</span></span
                    >
                  </template>
                  <a-avatar
                    class="member-item"
                    icon="user"
                    size="small"
                    :src="member.avatar"
                  />
                </a-tooltip>
                <a-dropdown
                  :trigger="['click']"
                  placement="bottomCenter"
                  v-model="visibleProjectMemberMenu"
                >
                  <a-tooltip :mouse-enter-delay="0.5">
                    <template slot="title">
                      <span>点击添加参与者</span>
                    </template>
                    <a-icon
                      class="member-item invite"
                      type="plus-circle"
                      theme="twoTone"
                      style="font-size: 24px;"
                    />
                  </a-tooltip>
                  <div slot="overlay">
                    <project-member-menu
                      v-if="visibleProjectMemberMenu"
                      :task-code="code"
                      :project-code="projectCodeCurrent"
                      @inviteProjectMember="
                        (showInviteMember = true),
                          (visibleProjectMemberMenu = false)
                      "
                    ></project-member-menu>
                  </div>
                </a-dropdown>
              </div>
            </div>
            <div class="log-wrap">
              <div class="header">
                <a-dropdown :trigger="['click']">
                  <a class="text-default">
                    所有动态
                    <a-icon type="down" />
                  </a>
                  <a-menu
                    v-model="taskLogType"
                    class="field-right-menu"
                    slot="overlay"
                    selectable
                  >
                    <a-menu-item key="all">
                      <div class="menu-item-content">
                        <span>所有动态</span>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="comment">
                      <div class="menu-item-content">
                        <span>仅评论</span>
                      </div>
                    </a-menu-item>
                    <a-menu-item key="log">
                      <div class="menu-item-content">
                        <span>仅动态</span>
                      </div>
                    </a-menu-item>
                  </a-menu>
                </a-dropdown>
              </div>
              <vue-scroll>
                <div class="log-list muted">
                  <a class="show-more muted" v-show="checkShowMoreLog">
                    <a-icon type="ellipsis" />
                    显示较早的 {{ taskLogTotal - taskLogList.length }} 条动态
                  </a>
                  <div
                    :class="{
                      'log-comment': log.is_comment,
                      'list-item': !log.is_comment
                    }"
                    v-for="log in taskLogList"
                    :key="log.code"
                  >
                    <template v-if="!log.is_comment">
                      <a-icon class="log-item" :type="log.icon" />
                      <div class="log-item log-txt">
                        <div>
                          {{ log.member.name }}
                          <span v-html="log.remark"></span>
                        </div>
                        <div
                          v-if="log.content"
                          class="log-content"
                          v-html="log.content"
                        ></div>
                      </div>
                    </template>
                    <template v-if="log.is_comment">
                      <div
                        class="log-txt text-default"
                        style="width:100%; display: flex;justify-content: space-between"
                      >
                        <div style="display: flex;align-items: center">
                          <a-avatar
                            :size="24"
                            :src="log.member.avatar"
                            class="m-r-sm"
                            style="margin-left: -5px"
                          />
                          <div>{{ log.member.name }}</div>
                        </div>
                        <a-tooltip :mouse-enter-delay="0.5">
                          <template slot="title">
                            <span>{{ log.create_time }}</span>
                          </template>
                          <span class="muted">{{
                            log.create_time | formatLogTime
                          }}</span>
                        </a-tooltip>
                      </div>
                      <div
                        class="log-txt text-default"
                        style="padding: 0 0 0 30px;"
                      >
                        <div class="m-t-xs"></div>
                      </div>
                    </template>
                    <a-tooltip v-if="!log.is_comment" :mouse-enter-delay="0.5">
                      <template slot="title">
                        <span>{{ log.create_time }}</span>
                      </template>
                      <span>{{ log.create_time | formatLogTime }}</span>
                    </a-tooltip>
                  </div>
                </div>
              </vue-scroll>
            </div>
            <div class="footer" id="footer">
              <a-popover
                trigger="click"
                placement="top"
                :visible="showMentions"
                arrow-point-at-center
              >
                <template slot="content">
                  <div class="mentions-content" style="width: 200px;">
                    <div
                      class="mentions-wrapper"
                      v-for="member in taskMemberList"
                      :key="member.id"
                    >
                      <a-avatar :src="member.avatar" icon="user" :size="28" />
                      <span class="muted name m-l-xs">{{ member.name }}</span>
                    </div>
                  </div>
                </template>
                <!--                                <span slot="title">Title</span>-->
                <a-textarea
                  @focus="commenting = true"
                  @blur="commenting = false"
                  ref="commentText"
                  v-model="comment"
                  :rows="1"
                  placeholder="支持@提及任务成员，Ctrl+Enter发表评论"
                  style="margin-right: 24px;"
                />
              </a-popover>
              <a-button class="middle-btn" type="primary">评论</a-button>
            </div>
          </div>
        </div>
      </div>
    </a-spin>
    <invite-project-member
      v-model="showInviteMember"
      :project-code="projectCodeCurrent"
      v-if="showInviteMember"
    ></invite-project-member>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'
import editor from '../../components/editor.vue'

export default {
  name: 'task-detail',
  components: {
    editor,
  },

  props: {
    taskCode: {
      type: [String],
      default() {
        return ''
      },
    },
    width: {
      type: [String, Number],
      default() {
        return '1200'
      },
    },
  },
  data() {
    return {
      // moment,
      loading: false,
      code: this.taskCode,
      projectCodeCurrent: '',
      task: {
        code: 'yn2aweic6qpx71j84rto0uhb',
        project_code: 'mo4uqwfb06dxv8ez2spkl3rg',
        name: 'ce ecee',
        pri: 0,
        execute_status: 'wait',
        description: '',
        create_by: '6v7be19pwman2fird04gqu53',
        done_by: null,
        done_time: null,
        create_time: '2021-03-05 17:41:05',
        assign_to: '6v7be19pwman2fird04gqu53',
        deleted: 0,
        stage_code: 'm4u3rnyxbt50q1ead769kpgo',
        task_tag: null,
        done: 0,
        begin_time: '',
        end_time: '',
        remind_time: null,
        pcode: 'vi2u1yftpamhq47zks98r0j3',
        sort: 1179648,
        like: 0,
        star: 0,
        deleted_time: null,
        private: 1,
        id_num: 782,
        path: 'vi2u1yftpamhq47zks98r0j3',
        schedule: '0.00',
        version_code: '0',
        features_code: '0',
        work_time: 0,
        status: 0,
        executor: {
          name: 'vilson',
          code: '6v7be19pwman2fird04gqu53',
          avatar:
            'https://beta.vilson.xyz/static/upload/member/avatar/20210310/098bcfbd496715293bc4c5193e7694f6.jpg',
        },
        parentTask: {
          code: 'vi2u1yftpamhq47zks98r0j3',
          project_code: 'mo4uqwfb06dxv8ez2spkl3rg',
          name: '11111',
          pri: 1,
          execute_status: 'wait',
          description:
            '<p><img src="https://beta.vilson.xyz/static/upload/image/default/20200914/cc96e4f8819085c3b7689784ebc079cb.png" style="max-width:100%;"><br></p>',
          create_by: '6v7be19pwman2fird04gqu53',
          done_by: null,
          done_time: null,
          create_time: '2020-06-30 14:38:48',
          assign_to: '6v7be19pwman2fird04gqu53',
          deleted: 0,
          stage_code: 'm4u3rnyxbt50q1ead769kpgo',
          task_tag: null,
          done: 0,
          begin_time: '2020-08-26 18:00',
          end_time: '2020-09-11 18:00',
          remind_time: null,
          pcode: '',
          sort: 2228224,
          like: 1,
          star: 1,
          deleted_time: null,
          private: 0,
          id_num: 586,
          path: '',
          schedule: '0.00',
          version_code: '0',
          features_code: '0',
          work_time: 8,
          status: 1,
          priText: '紧急',
          statusText: '已完成',
          liked: 1,
          stared: 1,
          tags: [
            {
              code: '07h24k1py8s6awbj3ftgleqd',
              task_code: 'vi2u1yftpamhq47zks98r0j3',
              tag_code: 'ngavlp06e79t352od8hj1x4b',
              create_time: '2020-09-15 17:35:08',
              tag: {
                id: 199,
                code: 'ngavlp06e79t352od8hj1x4b',
                project_code: 'mo4uqwfb06dxv8ez2spkl3rg',
                name: '安安',
                color: 'purple',
                create_time: '2019-10-18 05:54:58',
              },
            },
            {
              code: '7uzmrevaw2c9kh5d1nq6j4tp',
              task_code: 'vi2u1yftpamhq47zks98r0j3',
              tag_code: 'v9uy3nw6df1co40x5hsaglkm',
              create_time: '2020-09-18 10:20:37',
              tag: {
                id: 539,
                code: 'v9uy3nw6df1co40x5hsaglkm',
                project_code: 'mo4uqwfb06dxv8ez2spkl3rg',
                name: '12132132',
                color: 'green',
                create_time: '2020-06-07 16:33:00',
              },
            },
          ],
          childCount: [2, 0],
          hasUnDone: 1,
          parentDone: 1,
          hasComment: 0,
          hasSource: 2,
          canRead: 1,
        },
        parentTasks: [
          {
            code: 'vi2u1yftpamhq47zks98r0j3',
            name: '11111',
          },
        ],
        openBeginTime: 1,
        projectName: 'AntDesign',
        stageName: '1',
        priText: '普通',
        statusText: '未开始',
        liked: 0,
        stared: 0,
        tags: [],
        childCount: [0, 0],
        hasUnDone: 0,
        parentDone: 0,
        hasComment: 0,
        hasSource: 0,
        canRead: 1,
      },
      // 颜色是看板的
      taskStatusList: [
        { id: 0, name: '未开始', color: 'rgba(0, 0, 0, 0.65)' },
        { id: 1, name: '已完成', color: '#1890ff' },
        { id: 2, name: '进行中', color: '#52c41a' },
        { id: 3, name: '挂起', color: '#f5222d' },
        { id: 4, name: '测试中', color: '#faad14' },
      ],
      // taskStatusList: COMMON.TASK_STATUS,
      taskLogList: [],
      taskLogTotal: 0,
      taskMemberList: [],
      workTimeList: [],
      workTimeTotal: [],

      /* 任务菜单 */
      visibleTaskMenu: false,

      /* 成员菜单 */
      visibleTaskMemberMenu: false,
      /* 任务标签 */
      visibleTaskTagMenu: false,
      visibleProjectMemberMenu: false,
      showInviteMember: false,

      /* 任务标题 */
      taskName: '',

      /* 日期 */
      showEditName: false,
      showBeginTime: false,
      showEndTime: false,

      /* 备注 */
      showTaskDescriptionEdit: false,
      showMoreDesc: false,
      hasMoreDesc: false,
      editorConfig: {
        uploadImgHeaders: {
          // Authorization: authorization,
        },
        menus: [
          'head', // 标题
          'bold', // 粗体
          'italic', // 斜体
          'justify', // 居中
          'image', // 图片
          'link', // 链接
          'list', // 无序列表
          'quote', // 引用
          'table', // 表格
          '|',
          'fullscreen', // 全屏
        ],
      },

      departmentMemberInfo: null,

      /* 子任务 */
      childTaskList: [],
      showChildTask: false,
      childTaskName: '',
      childExecutor: null,
      visibleChildTaskMemberMenu: false,
      showInviteChildTaskMember: false,

      /* 资源 */
      taskSourceList: [],

      /* 任务动态 */
      taskLogType: ['all'],
      showMoreTaskLog: 0,
      hasMoreTaskLog: false,
      hideShowMore: false,

      /* 评论 */
      comment: '',
      commenting: false,

      // 显示评论提及
      showMentions: false,
      mentionsList: [],
    }
  },
  computed: {
    ...mapState({
      // userInfo: (state) => state.userInfo,
      // uploader: (state) => state.common.uploader,
      // socketAction: (state) => state.socketAction,
    }),
    childTaskDoneNum() {
      const list = this.childTaskList.filter((item) => item.done === 1)
      return list.length
    },
    checkShowMoreLog() {
      if (!this.hideShowMore) {
        if (this.taskLogTotal > 5) {
          return true
        }
      }
      return false
    },
    taskLink() {
      return window.location.href
    },
    scrollOps() {
      return {
        rail: {
          background: '#e5e5e5',
          opacity: 1,
        },
        bar: {
          keepShow: true,
        },
      }
    },
  },
  watch: {
    // $route(to, from) {
    //   // if (from.name == 'taskdetail') {
    //   //     this.init();
    //   // }
    // },
    showInviteMember(val) {
      if (!val) {
        this.getTaskMembers()
      }
    },
    taskLogType() {
      this.getTaskLog()
    },
    socketAction(val) {
      if (val.action === 'organization:task') {
        const { data } = val.data
        if (data.taskCode === this.code) {
          this.init(null, false)
        }
      }
    },
    uploader: {
      handler(newVal) {
        // 监听是否有上传文件行为
        console.log(newVal)
        console.log(newVal.fileList)
        const files = newVal.fileList
        const index = files.findIndex(
          (item) => item.projectName === this.task.projectName,
        )
        if (index !== -1) {
          this.taskSources()
          this.getTaskLog()
        }
      },
      deep: true,
    },
  },
  created() {
    this.init()
  },
  mounted() {
    // this.$nextTick(() => {
    //   this.changeModalHeight()
    // })
    // window.onresize = () => (() => {
    //   this.changeModalHeight()
    // })()
  },
  methods: {
    init() {
      console.log(this.task)
    },
    doTask(action) {
      // const app = this
      const actionKey = action.key
      switch (actionKey) {
        case 'delete':
          this.$confirm({
            title: (
              <p>
                此操作将删除<span class="warning">「xxx」</span>任务
              </p>
            ),
            content: '您确定要删除该任务吗？',
            onOk: () => {
              console.log('已删除')
              // MOCK: 模拟删除一个看板
              //   this.kbList.some((el, i, self) => {
              //     if (el.title === boardTitle) {
              //       self.splice(i, 1)
              //       return true
              //     }
              //     return false
              //   })
            },
          })
          break
        case 'star':
          console.log('已订阅')
          // this.task.stared ? this.task.stared = 0 : this.task.stared = 1
          //   star(app.code, this.task.stared)
          return true

        default:
          return true
      }
      this.visibleTaskMenu = false
      return true
    },
    detailClose() {
      this.$emit('close', this.task)
      // this.$router.push(`/project/space/task/${this.task.project_code}`);
    },
    showTaskDesc() {
      if (this.task.deleted) {
        return false
      }
      this.showTaskDescriptionEdit = true
      // this.initContent(this.task.description)
      return true
    },
    // 更新数据库 修改优先级
    doPri(item) {
      // this.editTask({ pri: item.key })
    },

    // 任务标题
    editTitle() {
      this.showEditName = true
      this.$nextTick(() => {
        this.$refs.inputTitle.focus()
      })
    },
    doName() {
      this.showEditName = false
      if (!this.task.name.trim() || this.task.name === this.taskName) {
        // trim清楚空格
        this.task.name = this.taskName
        return false
      }
      this.editTask({ name: this.task.name })
      return true
    },
    // editTask(data) {
    //   data.taskCode = this.code
    //   // edit是接口的方法，调用更新数据库，异步
    //   edit(data).then((res) => {
    //     const result = checkResponse(res)
    //     if (!result) {
    //       return false
    //     }
    //     this.getTask()
    //   })
    // },

    /* 任务备注 */
    initContent(value) {
      if (value) {
        this.$refs.vueWangeditor.setHtml(value) // 富文本编辑器
      } else {
        this.$refs.vueWangeditor.setHtml('')
      }
      this.$nextTick(() => {
        this.checkShowMoreDesc(false, true)
      })
    },
    checkShowMoreDesc(show = false, init = false) {
      const dom = $('.description-txt')
      if (!init) {
        if (show) {
          this.showMoreDesc = true
          dom.css('max-height', () => '100%')
        } else {
          this.showMoreDesc = false
          dom.css('max-height', () => '300px')
        }
      }
      if (init) {
        const height = dom.height()
        if (height >= 300) {
          this.hasMoreDesc = true
          return true
        }
        this.hasMoreDesc = false
        return false
      }
      return false
    },

    /* 任务紧急程度 */
    priColor(pri) {
      switch (pri) {
        case 1:
          return '#ff9900'
        case 2:
          return '#ed3f14'
        default:
          return 'green'
      }
    },
  },
}
</script>

<style lang="less">
@import "~ant-design-vue/lib/style/themes/default";

.field-flex {
  display: flex;
  justify-content: flex-start;
}

.task-tag {
  .ant-tag {
    margin-bottom: 6px;
  }
}

.task-detail {
  background: #fff;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: center;
  -ms-flex-pack: center;
  justify-content: center;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  min-height: 1px;
  min-width: 1px;
  margin: auto;

  .task-detail-spin {
    width: 100%;
  }

  .task-header {
    padding: 0px 0px 10px 0px;
    border-bottom: 1px solid #e5e5e5;
    display: flex;
    vertical-align: middle;

    .head-title {
      padding: 0 10px 0 10px;
      flex: 1 1;

      .breadcrumb {
        display: inline;

        a {
          color: inherit;

          &:hover {
            color: #40a9ff;
          }
        }
      }
    }

    .header-action {
      font-size: 16px;
      padding: 0 0px;
      display: flex;
      max-height: 24px;

      .action-item {
        margin-left: 10px;
        padding: 4px;
        transition: 218ms;
        transition-property: background, color;
        border-radius: 4px;
        align-items: center;
        display: flex;
        text-align: center;
        justify-content: center;
        min-width: 32px;

        span {
          margin-left: 6px;
          font-size: 14px;
        }

        &.active {
          color: #3da8f5;
        }

        &:hover {
          background: #ecf6fe;
          color: #3da8f5;
          border-radius: 4px;
        }
      }
    }

    &.disabled {
      background: #f5f5f5;
    }
  }

  .task-wrap {
    .task-content {
      display: flex;
      justify-content: flex-start;
      height: 75vh; //弹框高度（自适应）
      .content-left {
        border-right: 1px solid #e5e5e5;
        min-width: 560px;
        width: 63%;

        /*width: 760px;*/

        .task-title {
          margin: 10px 40px 20px 20px;
          cursor: text;

          &.disabled {
            cursor: not-allowed;

            &:hover {
              background: inherit;
            }

            .ant-input,
            .title-text {
              &:hover,
              &:focus {
                background: inherit;
              }
            }
          }

          &:hover {
            background: #f5f5f5;
          }
          &.hover-none {
            background: initial;
          }

          .title-text {
            line-height: 24px;
          }

          .ant-input,
          .title-text {
            font-size: 20px;
            padding: 8px;
            border: none !important;
            border-radius: 4px;

            &:hover,
            &:focus {
              background: #f5f5f5;
              box-shadow: none !important;
              border-right-width: 0 !important;
              border: none !important;
              border-radius: 4px;
            }
          }
        }

        .task-basic-attrs-view {
          .field-list {
            padding: 0 40px 0 32px;

            &.disabled {
              .field-right,
              a {
                cursor: not-allowed !important;
              }
            }

            .component-mount {
              .field {
                display: flex;
                justify-content: flex-start;
                margin: 12px 0;
                min-height: 36px;

                .field-left {
                  align-self: flex-start;
                  width: 132px;
                  height: 36px;
                  padding-right: 12px;
                }

                .field-right {
                  cursor: pointer;
                  max-width: calc(100% - 132px);

                  .inline-block {
                    display: inline-block;
                  }

                  &.field-date {
                    display: flex;
                  }

                  &.width-block {
                    width: 100%;

                    .w-e-text {
                      cursor: text;
                    }
                  }

                  .name {
                    margin: 0 8px;
                  }
                }

                .block-field {
                  width: 100%;
                  border: 1px solid #e5e5e5;
                  border-radius: 4px;
                  padding: 2px 0;
                  margin-bottom: 12px;
                  display: flex;
                  justify-content: flex-start;
                  flex-direction: row;
                }

                .task-child {
                  width: 100%;

                  .task-list {
                    padding: 8px 0;

                    .list-item {
                      padding: 4px 12px 4px 5px;
                      display: flex;
                      align-items: center;
                      /*justify-content: space-between;*/

                      .task-title,
                      .task-input {
                        flex: 1 1;
                        margin: 0;
                      }

                      .title-text {
                        color: #333;
                        line-height: 14px;

                        &.done {
                          color: #a6a6a6;
                        }
                      }

                      .ant-input,
                      .title-text {
                        font-size: 14px;

                        &:hover,
                        &:focus {
                        }
                      }

                      .check-box-wrapper {
                        margin-top: 0;
                      }

                      .task-item {
                        cursor: pointer;
                        margin-right: 12px;

                        &.disabled {
                          cursor: not-allowed;
                        }

                        &.check-box {
                          .anticon-check {
                            visibility: visible;
                            top: 12px;
                            left: 18px;
                          }
                        }
                      }
                    }

                    .action-btn {
                      padding: 2px 12px 2px 16px;
                    }
                  }

                  .add-handler {
                    /*margin-bottom: 8px;*/
                    padding-left: 16px;
                    padding-right: 12px;
                    display: flex;
                    align-items: center;
                    height: 36px;
                  }
                }

                .file-list {
                  width: 100%;
                  padding: 8px;

                  .ant-list-item {
                    padding: 10px 12px;
                    border-bottom: none;
                    border-radius: 4px;
                    margin-bottom: 2px;

                    &:hover {
                      background-color: #f5f5f5;
                    }

                    .ant-list-item-meta-title {
                      margin-bottom: 0;
                      line-height: 24px;
                    }
                  }
                }
              }

              .field-name {
                font-weight: bold;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 8px;
                margin-top: 5px;
              }

              .task-description {
                &:hover {
                  background: #f5f5f5;
                  border-radius: 4px;
                }

                &.disabled {
                  &:hover {
                    background: inherit;
                  }
                }

                padding: 8px;
                margin: -8px;

                .description-txt {
                  max-height: 300px;
                  overflow: hidden;
                }

                p {
                  margin: 0;
                }
              }
            }
          }
        }
      }

      .content-right {
        width: 37%;
        /*width: 440px;*/

        .header {
          padding: 15px 20px 20px 20px;
        }

        .member-list {
          padding-top: 12px;
          display: flex;
          justify-content: flex-start;

          .member-item {
            margin-right: 10px;
            cursor: pointer;

            &.invite {
              cursor: pointer;
            }
          }
        }

        .log-wrap {
          border-top: 1px solid #e5e5e5;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 60px;

          .header {
            width: 100%;
          }

          .log-list {
            /*font-size: 12px;*/
            padding: 0 20px 0 20px;

            .show-more {
              display: block;
              margin-bottom: 20px;
            }

            .log-comment {
              max-width: 405px;
              align-items: end;
              margin-bottom: 15px;
            }

            .list-item {
              display: flex;
              justify-content: flex-start;
              align-items: baseline;
              vertical-align: middle;
              width: 100%;
              .log-item {
                margin-right: 12px;
                margin-bottom: 24px;

                .anticon {
                  font-size: 14px;
                  display: block;
                }

                .log-content {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  border-left: 5px solid #ccc;
                  padding-left: 12px;
                  margin-top: 6px;
                }
              }

              .log-txt {
                flex: 1 1;
              }
            }
          }
        }

        .footer {
          padding: 20px 20px 0 20px;
          display: flex;
        }
      }
    }
  }
}

.work-time-modal {
  .work-time-stats {
    display: flex;
    margin-bottom: 18px;

    .work-time-item {
      margin-right: 36px;

      .title {
        font-size: 12px;
      }

      .work-time-num {
        font-size: 22px;
        font-weight: 500;
        margin-right: 5px;
        font-family: dinmedium;
      }
    }
  }
}
.footer {
  .ant-popover-inner-content {
    padding: 0;
    .mentions-content {
      width: 200px;
      padding: 12px 0;
      .mentions-wrapper {
        width: 100%;
        display: flex;
        align-items: center;
        padding: 6px 12px;
        &:hover {
          cursor: pointer;
          background: rgba(51, 143, 229, 0.1);
        }
      }
    }
  }
}
.w-e-text-container {
  height: 150px !important; /*!important是重点，因为原div是行内样式设置的高度300px*/
}
</style>
