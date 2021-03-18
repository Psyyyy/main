    init(code = null, loading = true) {
        if (code) {
          this.code = code// 子任务
        }
        if (loading) {
          this.loading = true
        }
        this.clearMemberMenu()
        this.getTask()
        this.getChildTasks()
        this.getTaskMembers()
        this.getTaskWorkTimeList()
      },
      detailClose() {
        this.$emit('close', this.task)
        // this.$router.push(`/project/space/task/${this.task.project_code}`);
      },
      clearMemberMenu() {
        this.visibleTaskTagMenu = false
        this.visibleTaskMemberMenu = false
        this.visibleProjectMemberMenu = false
        // this.showChildTask = false;
      },
      getTask() {
        this.$store.commit('viewRefresh')
        this.clearMemberMenu()
        read(this.code).then((res) => {
          this.getTaskLog()
          this.taskSources()
          this.taskName = res.data.name
          this.task = res.data
          this.projectCodeCurrent = res.data.project_code

            this.initContent(this.task.description)
            if (this.task.executor && !this.childExecutor) {
              this.childExecutor = this.task.executor
            }
            this.loading = false
            this.$store.dispatch('setTempData', {
              projectCode: this.projectCodeCurrent,
              taskCode: this.code,
              projectName: res.data.projectName,
            })
          })
        },
        getTaskLog() {
          logs({
            taskCode: this.code,
            all: this.showMoreTaskLog,
            pageSize: 5,
            comment: this.taskLogType[0] == 'comment' ? 1 : 0,
          }).then((res) => {
            this.taskLogList = res.data.list
            this.taskLogTotal = res.data.total
            if (res.data.total > 5) {
              this.hasMoreTaskLog = true
              // this.showMoreTaskLog = 1;
            }
          })
        },
        taskSources() {
          taskSources({ taskCode: this.code }).then((res) => {
            this.taskSourceList = res.data
          })
        },
        getMoreTaskLog() {
          this.showMoreTaskLog = 1
          this.hideShowMore = true
          this.getTaskLog()
        },
        getTaskWorkTimeList() {
          _taskWorkTimeList({ taskCode: this.code }).then((res) => {
            this.workTimeList = res.data
            let total = 0
            if (res.data) {
              res.data.forEach((v) => {
                total += Number(v.num)
              })
              this.workTimeTotal = total
            }
          })
        },
        getTaskMembers() {
          this.clearMemberMenu()
          getTaskMembers({ taskCode: this.code, pageSize: 100 }).then((res) => {
            this.taskMemberList = res.data.list
            this.loading = false
          })
        },
        doTask(action) {
          const app = this
          const actionKey = action.key
          switch (actionKey) {
            case 'recycle':
              this.$confirm({
                title: '移到回收站',
                content: '您确定要把该任务移到回收站吗？',
                okText: '确定',
                okType: 'danger',
                cancelText: '再想想',
                onOk() {
                  recycle(app.code).then((res) => {
                    const result = checkResponse(res)
                    if (!result) {
                      return false
                    }
                    app.task.deleted = 1
                    app.getTaskLog()
                  })
                  return Promise.resolve()
                },
              })
              break
            case 'star':
              this.task.stared ? this.task.stared = 0 : this.task.stared = 1
              star(app.code, this.task.stared)
              return true
            case 'open':
              var url = window.location.href
              if (url.indexOf('?') !== -1) {
                url += '&full-screen'
              } else {
                url += '?full-screen'
              }
              window.open(url)
              break
            case 'private':
              setPrivate(app.code, Number(!this.task.private)).then((res) => {
                const result = checkResponse(res)
                if (!result) {
                  return false
                }
                this.task.private = Number(!this.task.private)
              })
              break

            default:
              return true
          }
          this.visibleTaskMenu = false
        },
        editTitle() {
          this.showEditName = true
          this.$nextTick(() => {
            this.$refs.inputTitle.focus()
          })
        },
        doSource(action, source) {
          const app = this
          const actionKey = action.key
          switch (actionKey) {
            case 'unlink':
              this.$confirm({
                title: '取消关联',
                content: '您确定永久删除这个关联？',
                okText: '确定',
                okType: 'danger',
                cancelText: '再想想',
                onOk() {
                  delSourceLink(source.code).then((res) => {
                    const result = checkResponse(res)
                    if (!result) {
                      return false
                    }
                    app.taskSources()
                    app.getTaskLog()
                  })
                  return Promise.resolve()
                },
              })
              break
            case 'copy':
              notice({
                title: '复制链接成功',
                msg: '在地址栏粘贴并打开可下载该资源',
              }, 'notice', 'success', 5)
              return true

            default:
              return true
          }
        },
        deleteTask() {
          const app = this
          this.$confirm({
            title: '彻底删除',
            content: '彻底删除任务后，该任务及其子任务将会被永久被删除。',
            okText: '删除',
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
              del(app.code).then((res) => {
                ``
                app.detailClose()
              })
              return Promise.resolve()
            },
          })
        },
        recoveryTask() {
          const app = this
          this.$confirm({
            title: '恢复内容',
            content: '您确定要恢复该任务吗？',
            okText: '确定',
            okType: 'primary',
            cancelText: '再想想',
            onOk() {
              recovery(app.code).then((res) => {
                const result = checkResponse(res)
                if (!result) {
                  return false
                }
                app.getTaskLog()
              })
              app.task.deleted = 0
              return Promise.resolve()
            },
          })
        },
        copyLink() {
          notice({
            title: '复制链接成功',
            msg: '你可以在其他标签页粘贴并快速打开任务页面',
          }, 'notice', 'success', 5)
        },
        like(like) {
          like = Number(like)
          doLike(this.code, like)
          if (like) {
            this.task.like++
          } else {
            this.task.like--
          }
          this.task.liked = like
        },
        taskDone(taskCode, done, index, type = 'self') {
          done ? done = 1 : done = 0
          taskDone(taskCode, done).then((res) => {
            const result = checkResponse(res)
            if (!result) {
              return false
            }
            this.getTaskLog()
            if (type == 'self') {
              // 自身完成
              this.task.done = done
              // this.init();
            } else {
              // 完成子任务
              this.childTaskList[index].done = done
              // this.init(this.childTaskList[index].pcode);
            }
            this.getTask()
            this.getChildTasks()
          })
        },
        doBeginTime(setBeginTime = false, showBeginTime = false) {
          this.task.setBeginTime = setBeginTime
          this.showBeginTime = showBeginTime
          let beginTime = ''
          if (setBeginTime) {
            beginTime = moment(this.task.begin_time).format('YYYY-MM-DD HH:mm')
            this.task.begin_time_format = moment(this.task.begin_time).format('MM月DD日 HH:mm')
          } else {
            beginTime = ''
          }
          this.editTask({ begin_time: beginTime })
        },
        doEndTime(setEndTime = false, showEndTime = false) {
          this.task.setEndTime = setEndTime
          this.showEndTime = showEndTime
          let endTime = ''
          if (setEndTime) {
            endTime = moment(this.task.end_time).format('YYYY-MM-DD HH:mm')
            this.task.end_time_format = moment(this.task.end_time).format('MM月DD日 HH:mm')
          } else {
            endTime = ''
          }
          this.editTask({ end_time: endTime })
        },
        doPri(item) {
          this.editTask({ pri: item.key })
        },
        doName() {
          this.showEditName = false
          if (!this.task.name.trim() || this.task.name == this.taskName) {
            this.task.name = this.taskName
            return false
          }
          this.editTask({ name: this.task.name })
        },
        taskStatusChange(item) {
          this.task.status = item.key
          this.editTask({ status: item.key })
        },
        editTask(data) {
          data.taskCode = this.code
          edit(data).then((res) => {
            const result = checkResponse(res)
            if (!result) {
              return false
            }
            this.getTask()
          })
        },
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
        showTaskDesc() {
          if (this.task.deleted) {
            return false
          }
          this.showTaskDescriptionEdit = true
          this.initContent(this.task.description)
        },
        initContent(value) {
          if (value) {
            this.$refs.vueWangeditor.setHtml(value)
          } else {
            this.$refs.vueWangeditor.setHtml('')
          }
          this.$nextTick(() => {
            this.checkShowMoreDesc(false, true)
          })
        },
        doContent() {
          const content = this.$refs.vueWangeditor.getHtml()
          const obj = {
            taskCode: this.code,
            description: content,
          }
          edit(obj).then(() => {
            this.task.description = content
            this.showTaskDescriptionEdit = false
            this.$nextTick(() => {
              this.checkShowMoreDesc(false, true)
            })
            this.getTaskLog()
          })
        },
        createComment() {
          let comment = this.comment.trim()
          if (!comment) {
            return false
          }
          comment += ' '
          const regx = /(@[^@]+) /g
          const res = comment.match(regx)
          if (res) {
            res.forEach((v) => {
              const str = v.substring(1, v.length - 1)
              if (this.mentionsList.findIndex((item) => item == str) === -1) {
                this.mentionsList.push(str)
              }
            })
          }
          createComment(this.code, this.comment, JSON.stringify(this.mentionsList)).then(() => {
            this.comment = ''
            this.mentionsList = []
            this.getTaskLog()
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
        createTask() {
          const obj = { pcode: this.code, name: this.childTaskName }
          if (this.childExecutor) {
            obj.assign_to = this.childExecutor.code
          }
          createTask(obj).then((res) => {
            const result = checkResponse(res)
            if (!result) {
              return false
            }
            this.childTaskName = ''
            this.getChildTasks()
            this.getTaskLog()
          })
        },
        getChildTasks() {
          getTasks({ pcode: this.code, pageSize: 100, deleted: 0 }).then((res) => {
            const list = []
            res.data.list.forEach((v) => {
              v.visibleChildTaskMemberMenu = false
              list.push(v)
            })
            this.childTaskList = list
          })
        },
        taskTagChange(tag) {
          const index = this.task.tags.findIndex((item) => item.tag_code == tag.code)
          if (index !== -1) {
            this.task.tags.splice(index, 1)
          } else {
            this.task.tags.push({
              tag_code: tag.code,
              tag,
            })
          }
        },
        taskTagUpdate(tag) {
          const index = this.task.tags.findIndex((item) => item.tag_code == tag.code)
          if (index !== -1) {
            this.task.tags[index].tag = tag
          }
        },
        taskTagDelete(tag) {
          const index = this.task.tags.findIndex((item) => item.tag_code == tag.code)
          if (index !== -1) {
            this.task.tags.splice(index, 1)
          }
        },
        removeTag(tag, index) {
          setTag({ taskCode: this.task.code, tagCode: tag.code }).then(() => {
            this.task.tags.splice(index, 1)
          })
        },
        doPlainWorkTime() {
          const app = this
          this.plainWorkTime.modalStatus = true
          this.$nextTick(() => {
            app.plainWorkTime.form.setFieldsValue({
              work_time: app.task.work_time,
            })
          })
        },
        doWorkTime(workTime = false) {
          const app = this
          this.workTimeDo.modalStatus = true
          if (workTime) {
            this.workTimeDo.info = workTime
            this.$nextTick(() => {
              app.workTimeDo.form.setFieldsValue({
                num: workTime.num,
                begin_time: moment(workTime.begin_time),
                content: workTime.content,
              })
            })
          } else {
            this.workTimeDo.form.resetFields()
            this.workTimeDo.info = null
          }
        },
        deleteWorkTime(workTime, index) {
          const app = this
          this.$confirm({
            title: '删除工时记录',
            content: '确定要删除工时记录吗？',
            okText: '确定',
            okType: 'danger',
            cancelText: '再想想',
            onOk() {
              delTaskWorkTime({ code: workTime.code }).then((res) => {
                if (checkResponse(res)) {
                  app.workTimeList.splice(index, 1)
                  app.workTimeTotal -= workTime.num
                }
              })
              return Promise.resolve()
            },
          })
        },
        workTimePlainHandleSubmit() {
          const app = this
          this.plainWorkTime.form.validateFields(
            (err, values) => {
              if (!err) {
                app.editTask({ work_time: values.work_time })
                app.plainWorkTime.modalStatus = false
              }
            },
          )
        },
        workTimeHandleSubmit() {
          const app = this
          this.workTimeDo.form.validateFields(
            (err, values) => {
              if (!err) {
                app.workTimeDo.confirmLoading = true
                const data = {
                  beginTime: values.begin_time.format('YYYY-MM-DD HH:mm'),
                  num: values.num,
                  content: values.content,
                  taskCode: app.code,
                }
                if (app.workTimeDo.info) {
                  data.code = app.workTimeDo.info.code
                  editTaskWorkTime(data).then((res) => {
                    app.workTimeDo.confirmLoading = false
                    if (checkResponse(res)) {
                      app.workTimeDo.modalStatus = false
                      app.getTaskWorkTimeList()
                    }
                  })
                } else {
                  saveTaskWorkTime(data).then((res) => {
                    app.workTimeDo.confirmLoading = false
                    if (checkResponse(res)) {
                      app.workTimeDo.modalStatus = false
                      app.getTaskWorkTimeList()
                    }
                  })
                }
              }
            },
          )
        },
        checkLink(text) {
          const reg = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
          if (!reg.exec(text)) {
            return text
          }
          text = text.replace(reg, "<a target='_blank' href='$1$2'>$1$2</a>")

        return text
      },
      updateChildExecutor(member) {
        this.visibleChildTaskMemberMenu = false
        this.childExecutor = member
      },
      getPopup() {
        return document.getElementById('footer')
      },
      getTaskMemberPopup() {
        return document.getElementById('task-detail')
      },
      departmentMemberDetail(code) {
        detail({ code, organization: this.$store.state.currentOrganization.code }).then((res) => {
          this.departmentMemberInfo = res.data
        })
      },
      selectMentionMember(member) {
        this.showMentions = false
        this.comment += `${member.name} `
        this.$nextTick(() => {
          this.$refs.commentText.focus()
        })
      },
      changeModalHeight() {
        const defaultWidth = this.width
        let width = $(window).width() - 100
        let height = $(window).height() - 150
        let logHeight = $(window).height() - 315
        if (defaultWidth === 'full-screen' || this.$route.query['full-screen'] !== undefined) {
          // 全屏显示
          $('.task-detail-modal').css('width', $(window).width())
          $('.task-detail').css('width', $(window).width())
          $('.ant-modal').css('top', 0)
          height += 85
          logHeight += 85
          $('.content-left').css('height', `${height}px`)
          $('.log-wrap').css('height', `${logHeight}px`)
        } else {
          if (width > defaultWidth) {
            width = defaultWidth
          }
          $('.task-detail').css('width', width)
          $('.content-left').css('height', `${height}px`)
          $('.log-wrap').css('height', `${logHeight}px`)
        }
      },