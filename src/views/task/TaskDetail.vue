<template>
  <div class="task-detail" id="task-detail">
    <a-spin class="task-detail-spin" :spinning="loading">
      <div class="task-header" :class="{ disabled: task.detail.is_del }">
        <span class="head-title" v-if="!task.detail.is_del">
          <!-- 存在父任务，索引 -->
          <span v-if="task.detail.t_level !== 0 && task.parent">
            <span class="muted">属于任务：</span>
            <a class="text-default" @click="backToFather">{{ fatherName }}</a>
          </span>
          <!-- 不存在父任务，显示项目名和任务名 -->
          <span v-else class="text-base"
            >{{ currProjectName }} · {{ task.detail.t_title }}</span
          >
        </span>
        <!-- 不做这个回收站的 原版delete应该是认为是否彻底删除 -->
        <!-- <span class="head-title muted" v-else>
                        <a-icon type="delete"/>&nbsp;
                        <span>任务已在回收站中，不可修改</span>
                    </span> -->
        <span class="header-action text-right">
          <!-- <template v-if="!task.detail.is_del"> -->
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
              <!-- 标题 -->
              <div class="task-title" :class="{ disabled: task.detail.is_del }">
                <a-input
                  ref="inputTitle"
                  @blur="doName"
                  auto-focus
                  :default-value="task.detail.t_title"
                  size="large"
                  v-if="showEditName"
                />
                <a-tooltip :mouse-enter-delay="0.5" v-if="!task.detail.is_del">
                  <template slot="title">
                    <span>点击即可编辑</span>
                  </template>
                  <div
                    class="title-text"
                    v-show="!showEditName"
                    @click="showEditName = true"
                  >
                    {{ task.detail.t_title }}
                  </div>
                </a-tooltip>
                <div
                  v-else
                  class="title-text"
                  v-show="!showEditName"
                  @click="showEditName = true"
                >
                  {{ task.detail.t_title }}
                </div>
              </div>
              <div class="task-basic-attrs-view muted">
                <div
                  class="field-list"
                  :class="{ disabled: task.detail.is_del }"
                >
                  <!-- 完成状态 -->
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="check-square" />
                        <span class="field-name">完成状态</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          :disabled="!!task.detail.is_del"
                          :class="{ disabled: false }"
                        >
                          <!-- 显示完成状态 -->
                          <span>
                            <!--<a-icon type="check-square"/>-->
                            <a-tag v-if="task.detail.is_done" color="green"
                              >已完成</a-tag
                            >
                            <a-tag v-if="!task.detail.is_done" color="grey"
                              >未完成</a-tag
                            >
                          </span>
                          <!-- 选择完成状态 -->
                          <a-menu
                            class="field-right-menu"
                            slot="overlay"
                            :selectable="false"
                            @click="selectFinish"
                          >
                            <a-menu-item key="done">
                              <div class="menu-item-content">
                                <a-tag color="green">已完成</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.detail.is_done"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item key="undone">
                              <div class="menu-item-content">
                                <a-tag color="grey">未完成</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="!task.detail.is_done"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <!-- 执行状态 -->
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="deployment-unit" />
                        <span class="field-name">执行状态</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          :disabled="!!task.detail.is_del"
                          :class="{ disabled: false }"
                        >
                          <a-tag :color="stateColor(task.detail.t_state)">
                            {{ task.detail.t_state }}
                          </a-tag>

                          <a-menu
                            class="field-right-menu"
                            slot="overlay"
                            :selectable="false"
                          >
                            <a-menu-item
                              :key="status"
                              v-for="status in taskStatus"
                              @click="editTaskItem('state', status)"
                            >
                              <div class="menu-item-content">
                                <span color="green">{{ status }}</span>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.detail.t_state == status"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <!-- 执行者 -->
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="user" />
                        <span class="field-name">执行者</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          :disabled="!!task.detail.is_del"
                          placement="bottomCenter"
                        >
                          <a-tooltip
                            :mouse-enter-delay="0.5"
                            v-if="!task.detail.is_del"
                          >
                            <template slot="title">
                              <span>点击修改执行者</span>
                            </template>
                            <div class="field-flex">
                              <template v-if="task.detail.t_header_name">
                                <a class="muted name">{{
                                  task.detail.t_header_name
                                }}</a>
                              </template>
                            </div>
                          </a-tooltip>
                          <a-menu slot="overlay">
                            <a-menu-item
                              style="width:80px"
                              v-for="member in memberList"
                              :key="member.uid"
                              @click="editTaskItem('header', member)"
                            >
                              <div class="field-flex">
                                <template>
                                  <a class="muted name">{{ member.name }}</a>
                                </template>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <!-- 日期 -->
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="calendar" />
                        <span class="field-name">时间</span>
                      </div>
                      <div class="field-right field-date">
                        <template v-if="task.detail.start_time">
                          <a-dropdown
                            :trigger="['click']"
                            v-model="showBeginTime"
                            :disabled="!!task.detail.is_del"
                          >
                            <a-tooltip
                              :mouse-enter-delay="0.5"
                              v-if="!task.detail.is_del"
                            >
                              <template slot="title">
                                <span>点击设置开始时间</span>
                              </template>
                              <div class="field-flex">
                                <a class="muted name" style="margin: 0">
                                  <template v-if="!task.detail.start_time"
                                    >设置开始时间
                                  </template>
                                  <template v-else>
                                    {{ task.detail.start_time | dateFormat }}
                                  </template>
                                </a>
                              </div>
                            </a-tooltip>
                            <div class="field-flex" v-else>
                              <a class="muted name" style="margin: 0">
                                <template v-if="!task.detail.start_time"
                                  >设置开始时间</template
                                >
                                <template v-else>{{
                                  task.detail.start_time | dateFormat
                                }}</template>
                              </a>
                            </div>
                            <div slot="overlay">
                              <a-date-picker
                                v-model="form.start_time"
                                size="small"
                                :format="dateFormat"
                                type="date"
                                @change="formatDate"
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
                          :disabled="!!task.detail.is_del"
                        >
                          <a-tooltip
                            :mouse-enter-delay="0.5"
                            v-if="!task.detail.is_del"
                          >
                            <template slot="title">
                              <span>点击设置截止时间</span>
                            </template>
                            <div class="field-flex">
                              <a class="muted name" style="margin: 0">
                                <template v-if="!task.detail.end_time"
                                  >设置截止时间</template
                                >
                                <template v-else>{{
                                  task.detail.end_time | dateFormat
                                }}</template>
                              </a>
                            </div>
                          </a-tooltip>
                          <div class="field-flex" v-else>
                            <a class="muted name" style="margin: 0">
                              <template v-if="!task.detail.end_time"
                                >设置截止时间</template
                              >
                              <template v-else>{{
                                task.detail.end_time | dateFormat
                              }}</template>
                            </a>
                          </div>
                          <div slot="overlay">
                            <a-date-picker
                              v-model="form.end_time"
                              size="small"
                              :format="dateFormat"
                              type="date"
                              @change="formatDate"
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
                  <!-- 备注 -->
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="file-text" />
                        <span class="field-name">备注</span>
                      </div>
                      <div class="field-right width-block">
                        <div
                          class="task-description"
                          :class="{ disabled: task.detail.is_del }"
                          v-show="!showTaskDesc"
                          @click="showTaskDesc = true"
                        >
                          <div
                            class="description-txt"
                            v-show="task.detail.t_content"
                            v-html="task.detail.t_content"
                          ></div>
                          <span v-show="!task.detail.t_content">添加备注</span>
                        </div>
                        <div v-show="showTaskDesc">
                          <a-textarea
                            :default-value="task.detail.t_content"
                            :rows="4"
                            v-model="newContent"
                          />
                          <div class="action-btn float-right mt-2 ">
                            <a-button
                              class="mr-2"
                              @click="showTaskDesc = false"
                            >
                              取消
                            </a-button>

                            <a-button
                              type="primary"
                              html-type="submit"
                              class="middle-btn"
                              @click="doContent"
                              >保存
                            </a-button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 优先级 -->
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="bulb" />
                        <span class="field-name">优先级</span>
                      </div>
                      <div class="field-right">
                        <a-dropdown
                          :trigger="['click']"
                          :disabled="!!task.detail.is_del"
                        >
                          <span>
                            <a-tag :color="priColor(task.detail.t_rank)">{{
                              task.detail.t_rank === 2
                                ? "非常紧急"
                                : task.detail.t_rank === 1
                                ? "紧急"
                                : "普通"
                            }}</a-tag>
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
                                  v-show="task.detail.t_rank == 0"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item :key="1">
                              <div class="menu-item-content">
                                <a-tag :color="priColor(1)">紧急</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.detail.t_rank == 1"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                            <a-menu-item :key="2">
                              <div class="menu-item-content">
                                <a-tag :color="priColor(2)">非常紧急</a-tag>
                                <a-icon
                                  type="check"
                                  class="check muted"
                                  v-show="task.detail.t_rank == 2"
                                ></a-icon>
                              </div>
                            </a-menu-item>
                          </a-menu>
                        </a-dropdown>
                      </div>
                    </div>
                  </div>
                  <div v-show="task.detail.t_level !== 2" key="1">
                    <!-- 子任务 -->
                    <div class="component-mount">
                      <div class="field">
                        <div class="field-left">
                          <a-icon type="bars" />
                          <span class="field-name">子任务 </span>
                        </div>
                      </div>
                    </div>
                    <!-- 子任务 -->
                    <div class="component-mount">
                      <div class="field">
                        <div class="block-field width-block">
                          <div class="task-child">
                            <!-- 子任务栏 -->
                            <div
                              class="task-list"
                              v-show="task.children.length"
                            >
                              <div v-for="done in [0, 1]" :key="done">
                                <div
                                  v-for="childTask in task.children"
                                  :key="childTask.id"
                                >
                                  <div
                                    class="list-item task"
                                    v-if="childTask.is_done == done"
                                  >
                                    <!-- 完成按钮 -->
                                    <a-tooltip placement="top">
                                      <template slot="title">
                                        <span
                                          v-if="task.detail.is_done"
                                          style="font-size: 12px;"
                                          >父任务已完成，无法重做子任务</span
                                        >
                                      </template>
                                      <div class="check-box-wrapper task-item">
                                        <a-icon
                                          @click="
                                            childTask.is_done
                                              ? ''
                                              : finishChild(
                                                  childTask.t_level,
                                                  childTask.id,
                                                  childTask.t_title
                                                )
                                          "
                                          class="check-box"
                                          :class="{
                                            disabled:
                                              childTask.is_del ||
                                              childTask.is_done
                                          }"
                                          :type="
                                            childTask.is_done
                                              ? 'check-square'
                                              : 'border'
                                          "
                                          :style="{
                                            fontSize: '16px',
                                            color: '#c7c7c7'
                                          }"
                                        />
                                      </div>
                                    </a-tooltip>
                                    <!-- 负责人头像 -->
                                    <a-tooltip :mouse-enter-delay="0.5">
                                      <template slot="title">
                                        <span v-if="childTask.t_header_name">{{
                                          childTask.t_header_name
                                        }}</span>
                                      </template>
                                      <a-avatar
                                        class="task-item"
                                        :class="{
                                          disabled: task.detail.is_del
                                        }"
                                        size="small"
                                        icon="user"
                                      ></a-avatar>
                                    </a-tooltip>
                                    <!-- 任务标题 -->
                                    <div
                                      class="task-item task-title"
                                      @click="toChildren(childTask.id,childTask.t_level)"
                                    >
                                      <div
                                        class="title-text"
                                        :class="{ done: childTask.is_done }"
                                      >
                                        {{ childTask.t_title }}
                                      </div>
                                    </div>
                                    <a class="muted">
                                      <a-icon class="task-item" type="right" />
                                    </a>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <a-tooltip placement="top">
                              <template slot="title">
                                <span
                                  v-if="task.detail.is_done"
                                  style="font-size: 12px;"
                                  >当前任务已完成，无法添加新的子任务</span
                                >
                              </template>
                              <a
                                class="add-handler"
                                :class="{ disabled: task.detail.is_done }"
                                v-show="!showChildTask"
                                @click="onOpenAdd"
                              >
                                <a-icon
                                  type="plus"
                                  style="margin-right: 6px;"
                                />
                                添加子任务
                              </a>
                            </a-tooltip>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <!-- 关联文件 -->
                  <div class="component-mount">
                    <div class="field">
                      <div class="field-left">
                        <a-icon type="paper-clip" />
                        <span class="field-name">关联文件</span>
                      </div>
                      <div class="field-right width-block"></div>
                    </div>
                  </div>
                  <!-- 关联文件 -->
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
                  <!-- 关联文件 -->
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
            <!-- 参与者 -->
            <div class="header">
              <div class="title">参与者 · {{ task.taskMemberList.length }}</div>
              <div class="member-list">
                <a-tooltip
                  :mouse-enter-delay="0.5"
                  v-for="member in task.taskMemberList"
                  :key="member.uid"
                >
                  <template slot="title">
                    <span
                      >点击将参与者<span style=" color: #f4ba5d;"
                        >「{{ member.name }}」</span
                      >移出需求
                    </span>
                  </template>
                  <a-avatar
                    class="member-item"
                    icon="user"
                    size="small"
                    :src="member.avatar"
                    @click="removeMember(member.uid)"
                  />
                </a-tooltip>
                <a-tooltip :mouse-enter-delay="0.5">
                  <template slot="title">
                    <span>点击添加参与者</span>
                  </template>
                  <a-icon
                    class="member-item invite"
                    type="plus-circle"
                    theme="twoTone"
                    style="font-size: 24px;"
                    @click="isAddMemberVisible = true"
                  />
                </a-tooltip>
              </div>
            </div>
            <!-- 项目动态 -->
            <div class="log-wrap">
              <a-tabs default-active-key="1">
                <a-tab-pane key="1" tab="动态">
                  <vue-scroll>
                    <div class="log-list muted">
                      <div
                        :class="{
                          'log-comment': false,
                          'list-item': true
                        }"
                        v-for="log in dialogList"
                        :key="log.d_id"
                      >
                        <template>
                          <a-avatar
                            class="log-item"
                            icon="user"
                            size="small"
                            :src="log.avatar"
                          />
                          <div class="log-item log-txt">
                            <div class="log-name">
                              {{ log.name }}
                            </div>
                            <div v-if="log.d_action" class="log-content">
                              {{ log.d_action
                              }}<span class="log-target">{{
                                log.d_target
                              }}</span>
                            </div>
                          </div>
                        </template>
                        <span class="log-time">{{
                          log.d_create_time | dateFormat
                        }}</span>
                      </div>
                    </div>
                  </vue-scroll>
                </a-tab-pane>
                <a-tab-pane key="2" tab="评论" force-render @click="getComment">
                  <vue-scroll :v-if="showComment">
                    <div class="log-list muted">
                      <div
                        :v-if="commentList.length"
                        :class="{
                          'log-comment': false,
                          'list-item': true
                        }"
                        v-for="comment in commentList"
                        :key="comment.com_id"
                      >
                        <template>
                          <a-avatar
                            class="log-item"
                            icon="user"
                            size="small"
                            :src="comment.avatar"
                          />
                          <div class="log-item log-txt">
                            <div class="log-name">
                              {{ comment.name }}
                            </div>
                            <div v-if="comment.com_content" class="log-content">
                              {{ comment.com_content }}
                            </div>
                          </div>
                        </template>
                        <span class="log-time">{{
                          comment.c_create_time | dateFormat
                        }}</span>
                      </div>
                    </div>
                  </vue-scroll>
                </a-tab-pane>
              </a-tabs>
            </div>
            <div class="footer" id="footer">
              <a-textarea
                @focus="commenting = true"
                @blur="commenting = false"
                ref="commentText"
                v-model="commentForm.content"
                :rows="1"
                placeholder="发表评论"
                style="margin-right: 24px;"
              />
              <a-button class="middle-btn" type="primary" @click="newComment"
                >评论</a-button
              >
            </div>
          </div>
        </div>
      </div>
    </a-spin>
    <a-modal
      :width="360"
      :visible="isAddMemberVisible"
      title="添加成员"
      @cancel="isAddMemberVisible = false"
      @ok="confirmAddMember"
    >
      <div class="ml-4">
        <a-tabs>
          <a-tab-pane key="1" tab="通过账号邀请">
            <div>
              <a-select
                show-search
                placeholder="输入成员姓名关键字"
                option-filter-prop="value"
                style="width: 95%"
                :filter-option="filterOption"
                @change="addMember"
              >
                <a-select-option
                  v-for="(item, index) in memberList"
                  :key="index"
                  :value="item.uid"
                >
                  <a-avatar
                    class="ml-1 mb-2 "
                    :size="20"
                    slot="avatar"
                    src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  />

                  {{ item.name }}
                </a-select-option>
              </a-select>
            </div>
          </a-tab-pane>
          <a-tab-pane key="2" tab="通过邮箱邀请" force-render>
            通过邮箱邀请
          </a-tab-pane>
        </a-tabs>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import $ from 'jquery'
import { getTimestamp } from '@/utils/util'
import {
  getTaskDetail,
  updateTask,
  getUndoneChild,
  deleteTask,
} from '@/api/task'
import { getDialog, newDialog } from '@/api/dialog'
import { getComment, newComment } from '@/api/comment'
import _ from 'lodash'
import _clonedeep from 'lodash.clonedeep'
import { Keyboard } from '@icon-park/vue'
import editor from '../../components/editor.vue'

export default {
  name: 'task-detail',
  props: ['detail'],
  data() {
    return {
      // moment,
      loading: false,
      code: this.taskCode,
      projectCodeCurrent: '',
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
      showComment: false,
      commenting: false,

      // 显示评论提及
      showMentions: false,
      mentionsList: [],

      taskStatus: [
        '规划中',
        '实现中',
        '已实现',
        '测试中',
        '已测试',
        '已验收',
        '已关闭',
      ],
      bugStatus: ['新', '处理中', '已解决', '已关闭'],
      form: {
        t_title: '',
        t_content: '',
        t_state: '',
        t_rank: '',
        t_header_id: '',
        t_header_name: '',
        t_member_ids: [],
        start_time: '',
        end_time: '',
        is_done: '',
      },
      commentForm: {
        uid: window.sessionStorage.getItem('currUserID'),
        sid: '',
        source: 'task',
        content: '',
      },
      showTaskDesc: false,

      // 项目动态
      // dialogList: [],
      // task: {},

      // // 返回上一个项目
      // fatherTask: '',
      // fatherName: '',
      // grandTask: '',
      // grandName: '',

      // 成员
      isAddMemberVisible: false,

      // 日期
      dateFormat: 'YYYY/MM/DD',
      startFormat: '',
      endFormat: '',

      // 备注
      newContent: '',
    }
  },
  computed: {
    task() {
      return this.$store.state.task.taskDetail
    },
    dialogList() {
      return this.$store.state.task.taskDialog
    },
    commentList() {
      return this.$store.state.task.taskComment
    },
    stateFilter() {
      return this.$store.getters['filter/stateFilter']
    },

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
    memberList() {
      return this.$store.state.project.currProjectMemberList
    },
    currProjectID() {
      return this.$store.state.project.currProjectId
    },
    currProjectName() {
      return this.$store.state.project.currProject
    },
    currEditTask() {
      return this.$store.state.task.currEditTask
    },
    fatherName() {
      return this.$store.state.task.currFatherTaskName
    },
    isAddModalOpened() {
      return this.$store.state.add.isAddModalOpened
    },
  },
  watch: {
    // $route(to, from) {
    //   // if (from.name == 'taskdetail') {
    //   //     this.init();
    //   // }
    // },
    // currEditTask() {
    //   this.getTaskDetail()
    //   this.getDialog()
    // },
    isAddModalOpened() {
      this.getTaskDetail()
    },
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
        // console.log(newVal)
        // console.log(newVal.fileList)
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
      this.getTaskDetail()
      this.getDialog()
      this.getComment()
    },
    // 父子跳转
    toChildren(id, level) {
      this.$store.commit('task/SET_CURR_EDIT_TASK', id)
      this.$store.commit('task/SET_CURR_EDIT_TASK_LEVEL', level)// 儿子的level
    },
    backToFather() {
      this.$store.commit(
        'task/SET_CURR_EDIT_TASK',
        this.$store.state.task.currFatherTask,
      )
      this.$store.commit('task/SET_CURR_EDIT_TASK_LEVEL', this.task.detail.t_level - 1)// 儿子的level-1
      this.init()
    },

    // 拉取任务信息
    async getTaskDetail() {
      const pid = this.currProjectID
      const tid = this.currEditTask
      const { data: res } = await getTaskDetail(pid, tid)
      // this.task = res
      this.$store.commit('task/SET_TASK_DETAIL', res)
      this.$store.commit('task/SET_CURR_EDIT_TASK_LEVEL', res.detail.t_level)
      if (res.detail.t_level !== 0) {
        this.$store.commit('task/SET_CURR_FATHER_TASK', res.parent[0])
      }
      this.newContent = res.detail.t_content
      console.log('当前任务信息', res)
      return true
    },
    async deleteTask() {
      try {
        const { id } = this.task.detail
        const res = await deleteTask(id)
        this.$message.success(res.meta.msg)
        this.detailClose()
      } catch (err) {
        // console.log(err)
      }
      return true
    },
    async getDialog() {
      const obj = {
        pid: this.currProjectID,
        source: 'task',
        sid: this.currEditTask,
      }
      const { data: res } = await getDialog(obj)
      // this.dialogList = res
      this.$store.commit('task/SET_TASK_DIALOG', res)
      console.log('当前dialog信息', res)
      return true
    },
    async getComment() {
      const params = {
        source: 'task',
        sid: this.task.detail.id,
      }
      const { data: res } = await getComment(params)
      // this.dialogList = res
      this.$store.commit('task/SET_TASK_COMMENT', res)
      this.showComment = true
      return true
    },

    // 新增操作
    async newComment() {
      this.commentForm.sid = this.task.detail.id
      const { data: res } = await newComment(this.commentForm)
      // this.dialogList = res
      // this.$store.commit('task/SET_TASK_COMMENT', res)
      // this.showComment = true
      this.getComment()
      this.commentForm = {
        uid: window.sessionStorage.getItem('currUserID'),
        sid: '',
        source: 'task',
        content: '',
      }
      return true
    },
    onOpenAdd() {
      if (this.task.detail.is_del || this.task.detail.is_done) return false
      this.$store.commit('add/SET_ADD_FROM_DETAIL', true)
      this.$store.commit('add/SET_ADD_MODAL_TYPE', 'task')
      this.$store.commit('add/SET_ADD_MODAL_STATUS', true)
      return true
    },

    // 更新操作
    async editTaskItem(item, content) {
      if (item === 'title') {
        this.form.t_title = content
      } else if (item === 'state') {
        this.form.t_state = content
      } else if (item === 'rank') {
        this.form.t_rank = content
      } else if (item === 'content') {
        this.form.t_content = content
      } else if (item === 'header') {
        this.form.t_header_id = content.uid
        this.form.t_header_name = content.name
      } else if (item === 'member') {
        this.form.t_member = content
      } else if (item === 'done') {
        this.form.is_done = content
      }
      this.form.id = this.task.detail.id
      // 然后直接更新
      console.log('editTask的更新信息', this.form)
      const res = await updateTask(this.form)
      this.resetForm()
      // 更新项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('更新失败')
      }
      this.$message.success('更新成功！')
      this.getTaskDetail()
      return true
    },
    async editChildDone(id) {
      const childForm = {
        id,
        t_title: '',
        t_content: '',
        t_state: '',
        t_rank: '',
        t_header_id: '',
        t_header_name: '',
        t_member_ids: [],
        start_time: '',
        end_time: '',
        is_done: 1,
      }
      // 然后直接更新
      console.log('deta的更新信息', childForm)
      const res = await updateTask(childForm)
      this.resetForm()
      // 更新项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('更新失败')
      }
      this.$message.success('更新成功！')
      this.getTaskDetail()
      return true
    },

    async finishChild(level, id, title) {
      if (level === 2) {
        this.editChildDone(id)
      } else {
        const pid = this.currProjectID
        const haveUndone = await getUndoneChild(pid, id)
        if (haveUndone.data.length) {
          this.$info({
            title: (
              <p>
                <span class="warning">「{title}」</span>
                仍存在尚未完成的子任务
              </p>
            ),
            content: '请先将其子任务完成再完成父任务',
            onOk: () => {},
          })
        } else {
          this.editChildDone(id)
        }
      }
    },

    async selectFinish({ key }) {
      switch (key) {
        case 'done': {
          if (this.task.detail.t_level === 2) {
            this.editTaskItem('done', 1)
          } else {
            const pid = this.currProjectID
            const tid = this.currEditTask
            const haveUndone = await getUndoneChild(pid, tid)
            if (haveUndone.data.length) {
              this.$info({
                title: (
                  <p>
                    <span class="warning">「{this.task.detail.t_title}」</span>
                    仍存在尚未完成的子任务
                  </p>
                ),
                content: '请先将子任务完成再完成父任务',
                onOk: () => {},
              })
            } else {
              this.editTaskItem('done', 1)
            }
          }
          break
        }
        case 'undone':
          this.$confirm({
            title: (
              <p>
                将<span class="warning">「{this.task.detail.t_title}」</span>
                任务设为未完成状态
              </p>
            ),
            content: '您确定要取消完成该任务吗？',
            onOk: () => {
              this.editTaskItem('done', 0)
            },
          })
          break

        default:
          return true
      }
      return true
    },
    resetForm() {
      this.form = {
        id: '',
        t_title: '',
        t_content: '',
        t_state: '',
        t_rank: '',
        t_header_id: '',
        t_header_name: '',
        t_member_ids: [],
        start_time: '',
        end_time: '',
        is_done: '',
      }
    },
    async formatDate() {
      if (this.form.start_time) {
        const start = _clonedeep(this.form.start_time)
        this.startFormat = getTimestamp(start.format('YYYY-MM-DD h:m:s'))
      }
      if (this.form.end_time) {
        const end = _clonedeep(this.form.end_time)
        this.endFormat = getTimestamp(end.format('YYYY-MM-DD h:m:s'))
      }

      const dateForm = {
        id: this.task.detail.id,
        t_title: '',
        t_content: '',
        t_state: '',
        t_rank: '',
        t_header_id: '',
        t_header_name: '',
        t_member_ids: [],
        start_time: this.startFormat,
        end_time: this.endFormat,
        is_done: '',
      }
      // 然后直接更新
      console.log('deta的更新信息', dateForm)
      const res = await updateTask(dateForm)
      this.resetForm()
      // 更新项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('更新失败')
      }
      this.$message.success('更新成功！')
      this.getTaskDetail()
      return true
    },

    // 成员
    addMember(value) {
      this.form.t_member_ids = _clonedeep(this.task.detail.t_member_ids)
      this.form.t_member_ids = this.form.t_member_ids.split(',')
      let same = 0
      for (let i = 0; i < this.form.t_member_ids.length; i += 1) {
        this.form.t_member_ids[i] = parseInt(this.form.t_member_ids[i], 0)
        if (this.form.t_member_ids[i] === value) {
          same = 1
        }
      }
      if (!same) {
        this.form.t_member_ids.push(value)
      }
    },
    async confirmAddMember() {
      this.form.id = this.task.detail.id
      // 然后直接更新
      console.log('要发送的member信息', this.form.t_member_ids)
      const res = await updateTask(this.form)
      this.isAddMemberVisible = false
      this.resetForm()
      // 创建项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('添加成员失败')
      }
      this.$message.success('添加成员成功！')
      this.getTaskDetail()
      return true
    },
    async removeMember(id) {
      let temp = _clonedeep(this.task.detail.t_member_ids)
      temp = temp.split(',')
      _.pull(temp, `${id}`)
      // ["2","3"]字符串转换成数字[2,3]
      this.form.t_member_ids = temp.map(Number)
      console.log('要发送的member信息', this.form.t_member_ids)
      // 发送
      this.form.id = this.task.detail.id
      const res = await updateTask(this.form)
      this.isAddMemberVisible = false
      this.resetForm()
      // 创建项目失败
      if (res.meta.status !== 200) {
        return this.$message.error('移出成员失败')
      }
      this.$message.success('移出成员成功！')
      this.getTaskDetail()
      return true
    },

    // 其他
    filterOption(input, option) {
      return (
        option.componentOptions.children[1].text
          .toLowerCase()
          .indexOf(input.toLowerCase()) >= 0
      )
    },
    // 暂时不用
    doTask(action) {
      // const app = this
      const actionKey = action.key
      switch (actionKey) {
        case 'delete':
          this.$confirm({
            title: (
              <p>
                此操作将删除
                <span class="warning">「{this.task.detail.t_title}」</span>任务
              </p>
            ),
            content: '您确定要删除该任务吗？',
            onOk: () => {
              this.deleteTask()
            },
          })
          break
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
    // showTaskDesc() {
    //   // if (this.task.detail.is_del) {
    //   //   return false
    //   // }
    //   // this.showTaskDescriptionEdit = true
    //   // this.initContent(this.task.description)
    //   return false
    // },
    // 更新数据库 修改优先级
    doPri(item) {
      this.editTaskItem('rank', item.key)
    },

    // 任务标题
    editTitle() {
      this.showEditName = true
      this.$nextTick(() => {
        this.$refs.inputTitle.focus()
      })
    },
    doName({ target }) {
      this.showEditName = false
      this.editTaskItem('title', target.value)
      return true
    },
    doContent() {
      console.log('content', this.newContent)
      this.editTaskItem('content', this.newContent)
      this.showTaskDesc = false
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
          return '#fdac41'
        case 2:
          return '#ff5b5c'
        default:
          return '#28c175'
      }
    },
    stateColor(state) {
      switch (state) {
        case '规划中':
          return 'pink'
        case '实现中':
          return 'blue'
        case '已实现':
          return 'cyan'
        case '测试中':
          return 'orange'
        case '已测试':
          return 'purple'
        case '已验收':
          return 'green'
        case '已关闭':
          return '#626262'
        default:
          return '#626262'
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
                  width: 100px;
                  height: 36px;
                  padding-right: 5px;
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
                  margin-top: -8px;
                  width: 100%;
                  border: 1px solid #e5e5e5;
                  border-radius: 4px;
                  //padding: 2px 0;
                  margin-bottom: 4px;
                  display: flex;
                  justify-content: flex-start;
                  flex-direction: row;
                }

                .task-child {
                  width: 100%;

                  .task-list {
                    padding: 0px 0;

                    .list-item {
                      padding: 4px 12px 4px 5px;
                      display: flex;
                      align-items: center;
                      transition: all 0.3s;
                      &:hover {
                        cursor: pointer;
                        background: #eaecef;
                        box-shadow: 0 15px 30px -5px rgba(#475f7b, 0.1);
                      }

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
                          color: #b7b8bb;
                          text-decoration: line-through;
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
                        margin-right: 10px;

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

          .header {
            width: 100%;
          }

          .log-list {
            /*font-size: 12px;*/
            padding: 0 20px 0 20px;
            padding-bottom: 10px;
            height: 340px;
            overflow-y: scroll;

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
                margin-right: 8px;
                margin-bottom: 24px;

                .log-content {
                  overflow: hidden;
                  text-overflow: ellipsis;
                  border-left: 3px solid #ccc;
                  padding-left: 12px;
                  margin-top: 6px;
                }
              }

              .log-txt {
                flex: 1 1;
              }
              .log-name {
                font-size: 16px;
                color: #bdc0c9;
              }
              .log-time {
                color: #bdc0c9;
                font-size: 14px;
              }
              .log-target {
                color: #f4ba5d;
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
