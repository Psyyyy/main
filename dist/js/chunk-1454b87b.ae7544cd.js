(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-1454b87b"],{"04ff":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return n}));var s=a("4de3");function i(t){return Object(s.a)({url:"/comment",method:"get",params:t})}function n(t){return Object(s.a)({url:"/comment/new",method:"post",data:t})}},"2bd8":function(t,e,a){},3540:function(t,e,a){"use strict";a("2bd8")},"6f42":function(t,e,a){"use strict";var s=a("9139"),i=a("b6b7"),n=(a("6c00"),a("d41b"),a("a6ea"),a("de8b"),a("979b"),a("5880")),r=a("94bc"),o=a.n(r),c=a("0481"),l=a("bd40"),d=a("8c48"),u=a("04ff"),m=a("b360"),h=a.n(m),f=a("b8fb"),k=a.n(f),p=(a("ce9f"),a("f41d"),a("3766"),a("9856"),a("0a9c"),a("2037"),a("e3ab")),v=a.n(p),_={name:"editor",props:["id","value","width","height","uploadImgServer","disabled","menus","mapKey","menuFixed","pasteFilter","codeDefaultLang","hideLinkImg","uploadImgParams","uploadImgHeaders","isRealtime","disabledMenus","uploadFileName","uploadImgShowBase64"],data:function(){return{styleObject:{width:"auto",height:"auto"},editor:null}},methods:{initSize:function(){this.width&&(this.styleObject.width="".concat(this.width,"px")),this.height&&(this.styleObject.height="".concat(this.height,"px"))},createEditor:function(){this.editor=new v.a(document.getElementById(this.id)),this.initConfig(),this.editor.create()},initConfig:function(){void 0!==this.mapKey&&(this.editor.config.mapAk=this.mapKey),void 0!==this.menus&&this.menus instanceof Array&&this.menus.length?this.editor.config.menus=this.filterMenu(this.menus):this.disabledMenus&&(this.editor.config.menus=this.filterDisabledMenu(this.editor.config.menus,this.disabledMenus)),void 0!==this.menuFixed&&(this.editor.config.menuFixed=this.menuFixed),void 0!==this.pasteFilter&&(this.editor.config.pasteFilter=this.pasteFilter),void 0!==this.codeDefaultLang&&(this.editor.config.codeDefaultLang=this.codeDefaultLang),void 0!==this.hideLinkImg&&(this.editor.config.hideLinkImg=this.hideLinkImg),void 0!==this.uploadImgParams&&this.uploadImgParams instanceof Object&&(this.editor.config.uploadImgParams=this.uploadImgParams),void 0!==this.uploadImgHeaders&&this.uploadImgHeaders instanceof Object&&(this.editor.config.uploadImgHeaders=this.uploadImgHeaders),this.value&&this.setHtml(this.value),this.disabled&&this.disable(),this.listenChange()},filterMenu:function(t){return h.a.map(t,(function(t){return"source"===t?null:t}))},filterDisabledMenu:function(t,e){var a=t.join(",");return h()(e).forEach((function(t){a=a.replace(t,"").replace(",,",",")})),a.length&&","===a[0]&&a.substr(1,a.length),a.split(",")},insertImg:function(t){this.editor.command(null,"insertHtml","<img src=".concat(t,' style="max-width:100%;"/>'))},getHtml:function(){return this.editor.txt.html()},getText:function(){return this.editor.txt.text()},setHtml:function(t){this.editor.txt.html(t)},appendHtml:function(t){this.editor.txt.append(t)},clear:function(){this.editor.clear()},enable:function(){this.editor.enable()},disable:function(){this.editor.disable()},destroy:function(){this.editor.destroy()},undestroy:function(){this.editor.undestroy()},listenChange:function(){var t=this;this.editor.onchange=function(){t.$emit("change");var e="";t.getText()||(e=t.getHtml()),!1!==t.isRealtime&&t.$emit("input",e)}}},mounted:function(){var t=this;this.initSize(),setTimeout((function(){t.createEditor()}),100)}},g=a("2ca5"),b=(Object(g.a)(_,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",{style:this.styleObject},[e("div",{ref:"editor",style:this.styleObject,attrs:{id:this.id}})])}),[],!1,null,null,null).exports,{name:"task-detail",props:["detail"],data:function(){return{loading:!1,code:this.taskCode,projectCodeCurrent:"",taskStatusList:[{id:0,name:"未开始",color:"rgba(0, 0, 0, 0.65)"},{id:1,name:"已完成",color:"#1890ff"},{id:2,name:"进行中",color:"#52c41a"},{id:3,name:"挂起",color:"#f5222d"},{id:4,name:"测试中",color:"#faad14"}],taskLogList:[],taskLogTotal:0,taskMemberList:[],workTimeList:[],workTimeTotal:[],visibleTaskMenu:!1,visibleTaskMemberMenu:!1,visibleTaskTagMenu:!1,visibleProjectMemberMenu:!1,showInviteMember:!1,taskName:"",showEditName:!1,showBeginTime:!1,showEndTime:!1,showTaskDescriptionEdit:!1,showMoreDesc:!1,hasMoreDesc:!1,editorConfig:{uploadImgHeaders:{},menus:["head","bold","italic","justify","image","link","list","quote","table","|","fullscreen"]},departmentMemberInfo:null,childTaskList:[],showChildTask:!1,childTaskName:"",childExecutor:null,visibleChildTaskMemberMenu:!1,showInviteChildTaskMember:!1,taskSourceList:[],taskLogType:["all"],showMoreTaskLog:0,hasMoreTaskLog:!1,hideShowMore:!1,comment:"",showComment:!1,commenting:!1,showMentions:!1,mentionsList:[],taskStatus:["规划中","实现中","已实现","已拒绝"],bugStatus:["新","处理中","已解决","已验收","已拒绝","已关闭"],form:{t_title:"",t_content:"",t_state:"",t_rank:"",old_header_id:"",t_header_id:"",t_header_name:"",t_member_ids:[],start_time:"",end_time:"",is_done:""},commentForm:{pid:"",uid:window.sessionStorage.getItem("currUserID"),sid:"",source:"task",content:""},dialogForm:{pid:"",source:"",sourceId:"",user:window.sessionStorage.getItem("currUserID"),action:"",target:""},showTaskDesc:!1,isAddMemberVisible:!1,addMemnberId:"",dateFormat:"YYYY/MM/DD",startFormat:"",endFormat:"",newContent:"",updateFinish:!1}},computed:Object(i.a)(Object(i.a)({task:function(){return this.$store.state.task.taskDetail},dialogList:function(){return this.$store.state.task.taskDialog},commentList:function(){return this.$store.state.task.taskComment},stateFilter:function(){return this.$store.getters["filter/stateFilter"]}},Object(n.mapState)({})),{},{childTaskDoneNum:function(){return this.childTaskList.filter((function(t){return 1===t.done})).length},checkShowMoreLog:function(){return!this.hideShowMore&&this.taskLogTotal>5},taskLink:function(){return window.location.href},scrollOps:function(){return{rail:{background:"#e5e5e5",opacity:1},bar:{keepShow:!0}}},memberList:function(){return this.$store.state.team.currProjectMemberList},currProjectID:function(){return this.$store.state.project.currProjectId},currProjectName:function(){return this.$store.state.project.currProject},currEditTask:function(){return this.$store.state.task.currEditTask},fatherName:function(){return this.$store.state.task.currFatherTaskName},isAddModalOpened:function(){return this.$store.state.add.isAddModalOpened},currListType:function(){return this.$store.state.task.currListType}}),watch:{updateFinisih:function(){this.getTaskDetail()},currEditTask:function(){this.init()},isAddModalOpened:function(){this.getTaskDetail(),!1===this.isAddModalOpened&&this.newDialog("添加了子任务","")},showInviteMember:function(t){t||this.getTaskMembers()},taskLogType:function(){this.getTaskLog()},socketAction:function(t){"organization:task"===t.action&&(t.data.data.taskCode===this.code&&this.init(null,!1))},uploader:{handler:function(t){var e=this;-1!==t.fileList.findIndex((function(t){return t.projectName===e.task.projectName}))&&(this.taskSources(),this.getTaskLog())},deep:!0}},created:function(){this.init()},mounted:function(){},methods:{init:function(){this.getTaskDetail(),this.getDialog(),this.getComment()},toChildren:function(t,e){this.$store.commit("task/SET_CURR_EDIT_TASK",t)},backToFather:function(){this.$store.commit("task/SET_CURR_EDIT_TASK",this.$store.state.task.currFatherTask),this.init()},getTaskDetail:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var a,s,i,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.currProjectID,s=t.currEditTask,e.next=4,Object(l.h)(a,s);case 4:return i=e.sent,n=i.data,t.$store.commit("task/SET_TASK_DETAIL",n),0!==n.detail.t_level&&t.$store.commit("task/SET_CURR_FATHER_TASK",n.parent[0]),t.newContent=n.detail.t_content,e.abrupt("return",!0);case 10:case"end":return e.stop()}}),e)})))()},deleteTask:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,a=t.task.detail.id,e.next=4,Object(l.b)(a);case 4:s=e.sent,t.$message.success(s.meta.msg),t.detailClose(),e.next=11;break;case 9:e.prev=9,e.t0=e.catch(0);case 11:return e.abrupt("return",!0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})))()},getDialog:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var a,s,i;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={pid:t.currProjectID,source:"task",sid:t.currEditTask},e.next=3,Object(d.a)(a);case 3:return s=e.sent,i=s.data,t.$store.commit("task/SET_TASK_DIALOG",i),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})))()},getComment:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={source:"task",sid:t.task.detail.id},e.next=3,Object(u.a)(a);case 3:if(200===(s=e.sent).meta.status){e.next=6;break}return e.abrupt("return",t.$message.error("获取评论失败"));case 6:return t.$store.commit("task/SET_TASK_COMMENT",s.data),t.showComment=!0,e.abrupt("return",!0);case 9:case"end":return e.stop()}}),e)})))()},newComment:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(""!==t.commentForm.content){e.next=2;break}return e.abrupt("return",!1);case 2:return t.commentForm.sid=t.task.detail.id,t.commentForm.pid=t.currProjectID,e.next=6,Object(u.b)(t.commentForm);case 6:if(200===e.sent.meta.status){e.next=9;break}return e.abrupt("return",t.$message.error("评论失败"));case 9:return t.$message.success("评论成功！"),t.commentForm={pid:t.currProjectID,uid:window.sessionStorage.getItem("currUserID"),sid:"",source:"task",content:""},e.next=13,t.getComment();case 13:return e.abrupt("return",!0);case 14:case"end":return e.stop()}}),e)})))()},newDialog:function(t,e){var a=this;return Object(s.a)(regeneratorRuntime.mark((function s(){return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return a.dialogForm.pid=a.currProjectID,a.dialogForm.source=a.currListType,a.dialogForm.sourceId=a.task.detail.id,a.dialogForm.action=t,a.dialogForm.target=e,s.next=7,Object(d.b)(a.dialogForm);case 7:return s.sent,a.getDialog(),a.dialogForm={pid:window.LocalStorage.getItem("currProjectID"),source:"",sourceId:"",user:window.sessionStorage.getItem("currUserID"),action:"",target:""},s.abrupt("return",!0);case 11:case"end":return s.stop()}}),s)})))()},onOpenAdd:function(){return this.$store.commit("task/SET_CURR_EDIT_TASK_LEVEL",this.task.detail.t_level+1),!this.task.detail.is_del&&!this.task.detail.is_done&&(this.$store.commit("add/SET_ADD_FROM_DETAIL",!0),this.$store.commit("add/SET_ADD_MODAL_TYPE","task"),this.$store.commit("add/SET_ADD_MODAL_STATUS",!0),!0)},editTaskItem:function(t,e){var a=this;return Object(s.a)(regeneratorRuntime.mark((function s(){var i,n;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:return i="",a.updateFinish=!1,"title"===t?(a.form.t_title=e,i="修改了标题为"):"state"===t?(i="修改了状态为",a.form.t_state=e):"rank"===t?(a.form.t_rank=e,i="修改了优先级为"):"content"===t?(a.form.t_content=e,i="添加了备注"):"header"===t?(a.form.old_header_id=a.task.detail.t_header_id,a.form.t_header_id=e.uid,a.form.t_header_name=e.name,i="修改了执行者为"):"member"===t?(a.form.t_member=e,i="更新了参与者"):"done"===t&&(a.form.is_done=e,i="修改了任务完成状态"),a.form.id=a.task.detail.id,s.next=6,Object(l.l)(a.form);case 6:if(200===s.sent.meta.status){s.next=9;break}return s.abrupt("return",a.$message.error("更新失败"));case 9:return a.$message.success("更新成功！"),a.resetForm(),a.updateFinish=!0,s.next=14,a.getTaskDetail();case 14:if("header"!==t){s.next=19;break}return s.next=17,a.newDialog(i,e.name);case 17:s.next=42;break;case 19:if("done"!==t){s.next=24;break}return s.next=22,a.newDialog(i,"");case 22:s.next=42;break;case 24:if("rank"!==t){s.next=40;break}n="",s.t0=e,s.next=1===s.t0?29:2===s.t0?31:3===s.t0?33:35;break;case 29:return n="普通",s.abrupt("break",36);case 31:return n="紧急",s.abrupt("break",36);case 33:return n="非常紧急",s.abrupt("break",36);case 35:n="";case 36:return s.next=38,a.newDialog(i,n);case 38:s.next=42;break;case 40:return s.next=42,a.newDialog(i,e);case 42:return s.abrupt("return",!0);case 43:case"end":return s.stop()}}),s)})))()},editChildDone:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function a(){var s,i;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s={id:t,t_title:"",t_content:"",t_state:"",t_rank:"",t_header_id:"",old_header_id:"",t_header_name:"",t_member_ids:[],start_time:"",end_time:"",is_done:1},a.next=3,Object(l.l)(s);case 3:if(i=a.sent,e.resetForm(),200===i.meta.status){a.next=7;break}return a.abrupt("return",e.$message.error("更新失败"));case 7:return e.$message.success("更新成功！"),e.getTaskDetail(),a.abrupt("return",!0);case 10:case"end":return a.stop()}}),a)})))()},finishChild:function(t,e,a){var i=this;return Object(s.a)(regeneratorRuntime.mark((function s(){var n,r;return regeneratorRuntime.wrap((function(s){for(;;)switch(s.prev=s.next){case 0:if(n=i.$createElement,2!==t){s.next=5;break}i.editChildDone(e),s.next=10;break;case 5:return r=i.currProjectID,s.next=8,Object(l.j)(r,e);case 8:s.sent.data.length?i.$info({title:n("p",[n("span",{class:"warning"},["「",a,"」"]),"仍存在尚未完成的子任务"]),content:"请先将其子任务完成再完成父任务",onOk:function(){}}):i.editChildDone(e);case 10:case"end":return s.stop()}}),s)})))()},selectFinish:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function a(){var s,i,n,r;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:s=t.key,i=e.$createElement,a.t0=s,a.next="done"===a.t0?5:"undone"===a.t0?16:18;break;case 5:if(2!==e.task.detail.t_level){a.next=9;break}e.editTaskItem("done",1),a.next=15;break;case 9:return n=e.currProjectID,r=e.currEditTask,a.next=13,Object(l.j)(n,r);case 13:a.sent.data.length?e.$info({title:i("p",[i("span",{class:"warning"},["「",e.task.detail.t_title,"」"]),"仍存在尚未完成的子任务"]),content:"请先将子任务完成再完成父任务",onOk:function(){}}):e.editTaskItem("done",1);case 15:return a.abrupt("break",19);case 16:return e.$confirm({title:i("p",["将",i("span",{class:"warning"},["「",e.task.detail.t_title,"」"]),"任务设为未完成状态"]),content:"您确定要取消完成该任务吗？",onOk:function(){e.editTaskItem("done",0)}}),a.abrupt("break",19);case 18:case 19:return a.abrupt("return",!0);case 20:case"end":return a.stop()}}),a)})))()},resetForm:function(){this.form={id:"",t_title:"",t_content:"",t_state:"",t_rank:"",t_header_id:"",old_header_id:"",t_header_name:"",t_member_ids:[],start_time:"",end_time:"",is_done:""}},formatDate:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var a,s,i,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.form.start_time&&(a=k()(t.form.start_time),t.startFormat=Object(c.b)(a.format("YYYY-MM-DD h:m:s"))),t.form.end_time&&(s=k()(t.form.end_time),t.endFormat=Object(c.b)(s.format("YYYY-MM-DD h:m:s"))),i={id:t.task.detail.id,t_title:"",t_content:"",t_state:"",t_rank:"",t_header_id:"",old_header_id:"",t_header_name:"",t_member_ids:[],start_time:t.startFormat,end_time:t.endFormat,is_done:""},e.next=5,Object(l.l)(i);case 5:if(n=e.sent,t.resetForm(),200===n.meta.status){e.next=9;break}return e.abrupt("return",t.$message.error("更新失败"));case 9:return t.$message.success("更新成功！"),e.next=12,t.newDialog("更新了任务起止时间","");case 12:return t.getTaskDetail(),e.abrupt("return",!0);case 14:case"end":return e.stop()}}),e)})))()},addMember:function(t){this.addMemnberId=t},confirmAddMember:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var a,s;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a={uid:t.addMemnberId,tid:t.task.detail.id,option:"add"},e.next=3,Object(l.c)(a);case 3:if(s=e.sent,t.isAddMemberVisible=!1,t.resetForm(),200===s.meta.status){e.next=8;break}return e.abrupt("return",t.$message.error("添加成员失败"));case 8:if("重复添加"!==s.data){e.next=10;break}return e.abrupt("return",t.$message.warning(s.data));case 10:return t.$message.success("添加成员成功！"),e.next=13,t.newDialog("更新了任务成员","");case 13:return t.getTaskDetail(),e.abrupt("return",!0);case 15:case"end":return e.stop()}}),e)})))()},removeMember:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function a(){var s,i;return regeneratorRuntime.wrap((function(a){for(;;)switch(a.prev=a.next){case 0:return s={uid:t,tid:e.task.detail.id,option:"del"},a.next=3,Object(l.c)(s);case 3:if(i=a.sent,e.isAddMemberVisible=!1,e.resetForm(),200===i.meta.status){a.next=8;break}return a.abrupt("return",e.$message.error("移出成员失败"));case 8:return e.$message.success("移出成员成功！"),a.next=11,e.newDialog("更新了任务成员","");case 11:return e.getTaskDetail(),a.abrupt("return",!0);case 13:case"end":return a.stop()}}),a)})))()},filterOption:function(t,e){return e.componentOptions.children[1].text.toLowerCase().indexOf(t.toLowerCase())>=0},doTask:function(t){var e=this,a=this.$createElement;switch(t.key){case"delete":this.$confirm({title:a("p",["此操作将删除",a("span",{class:"warning"},["「",this.task.detail.t_title,"」"]),"任务"]),content:"您确定要删除该任务吗？",onOk:function(){e.deleteTask()}});break;default:return!0}return this.visibleTaskMenu=!1,!0},detailClose:function(){this.$emit("close",this.task)},doPri:function(t){this.editTaskItem("rank",t.key)},editTitle:function(){var t=this;this.showEditName=!0,this.$nextTick((function(){t.$refs.inputTitle.focus()}))},doName:function(t){var e=t.target;return this.showEditName=!1,this.editTaskItem("title",e.value),!0},doContent:function(){return this.editTaskItem("content",this.newContent),this.showTaskDesc=!1,!0},initContent:function(t){var e=this;t?this.$refs.vueWangeditor.setHtml(t):this.$refs.vueWangeditor.setHtml(""),this.$nextTick((function(){e.checkShowMoreDesc(!1,!0)}))},checkShowMoreDesc:function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=arguments.length>1&&void 0!==arguments[1]&&arguments[1],a=o()(".description-txt");if(e||(t?(this.showMoreDesc=!0,a.css("max-height",(function(){return"100%"}))):(this.showMoreDesc=!1,a.css("max-height",(function(){return"300px"})))),e){var s=a.height();return s>=300?(this.hasMoreDesc=!0,!0):(this.hasMoreDesc=!1,!1)}return!1},priColor:function(t){switch(t){case 1:return"#28c175";case 2:return"#fdac41";case 3:return"#ff5b5c";default:return"#28c175"}},stateColor:function(t){switch(t){case"规划中":return"pink";case"实现中":return"blue";case"已实现":return"cyan";case"已拒绝":return"purple";case"已验收":return"green";case"已关闭":return"#626262";case"新":return"orange";case"处理中":return"blue";case"已解决":return"green";default:return"#626262"}}}}),C=(a("3540"),{components:{TaskDetail:Object(g.a)(b,(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"task-detail",attrs:{id:"task-detail"}},[a("a-spin",{staticClass:"task-detail-spin",attrs:{spinning:t.loading}},[a("div",{staticClass:"task-header",class:{disabled:t.task.detail.is_del}},[t.task.detail.is_del?t._e():a("span",{staticClass:"head-title"},[0!==t.task.detail.t_level&&t.task.parent?a("span",[a("span",{staticClass:"muted"},[t._v("属于任务：")]),a("a",{staticClass:"text-default",on:{click:t.backToFather}},[t._v(t._s(t.fatherName))])]):a("span",{staticClass:"text-base"},[t._v(t._s(t.currProjectName)+" · "+t._s(t.task.detail.t_title))])]),a("span",{staticClass:"header-action text-right"},[[a("a-dropdown",{attrs:{trigger:["click"],placement:"bottomCenter"},on:{click:function(e){t.visibleTaskMenu=!0}},model:{value:t.visibleTaskMenu,callback:function(e){t.visibleTaskMenu=e},expression:"visibleTaskMenu"}},[a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("打开菜单")])]),a("a",{staticClass:"action-item muted"},[a("a-icon",{attrs:{type:"ellipsis"}})],1)],2),a("a-menu",{staticClass:"field-right-menu",attrs:{slot:"overlay"},on:{click:t.doTask},slot:"overlay"},[a("a-menu-item",{key:"delete"},[a("a-icon",{attrs:{type:"delete"}}),a("span",[t._v("删除任务")])],1)],1)],1)],a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("关闭面板")])]),a("a",{staticClass:"action-item muted",on:{click:t.detailClose}},[a("a-icon",{attrs:{type:"close"}})],1)],2)],2)]),a("div",{staticClass:"task-wrap"},[a("div",{staticClass:"task-content"},[a("div",{staticClass:"content-left"},[a("vue-scroll",{attrs:{ops:t.scrollOps}},[a("div",{staticClass:"task-title",class:{disabled:t.task.detail.is_del}},[t.showEditName?a("a-input",{ref:"inputTitle",attrs:{"auto-focus":"","default-value":t.task.detail.t_title,size:"large"},on:{blur:t.doName}}):t._e(),t.task.detail.is_del?a("div",{directives:[{name:"show",rawName:"v-show",value:!t.showEditName,expression:"!showEditName"}],staticClass:"title-text",on:{click:function(e){t.showEditName=!0}}},[t._v(" "+t._s(t.task.detail.t_title)+" ")]):a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("点击即可编辑")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:!t.showEditName,expression:"!showEditName"}],staticClass:"title-text",on:{click:function(e){t.showEditName=!0}}},[t._v(" "+t._s(t.task.detail.t_title)+" ")])],2)],1),a("div",{staticClass:"task-basic-attrs-view muted"},[a("div",{staticClass:"field-list",class:{disabled:t.task.detail.is_del}},[a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"check-square"}}),a("span",{staticClass:"field-name"},[t._v("完成状态")])],1),a("div",{staticClass:"field-right"},[a("a-dropdown",{class:{disabled:!1},attrs:{trigger:["click"],disabled:!!t.task.detail.is_del}},[a("span",[t.task.detail.is_done?a("a-tag",{attrs:{color:"green"}},[t._v("已完成")]):t._e(),t.task.detail.is_done?t._e():a("a-tag",{attrs:{color:"red"}},[t._v("未完成")])],1),a("a-menu",{staticClass:"field-right-menu",attrs:{slot:"overlay",selectable:!1},on:{click:t.selectFinish},slot:"overlay"},[a("a-menu-item",{key:"done"},[a("div",{staticClass:"menu-item-content"},[a("a-tag",{attrs:{color:"green"}},[t._v("已完成")]),a("a-icon",{directives:[{name:"show",rawName:"v-show",value:t.task.detail.is_done,expression:"task.detail.is_done"}],staticClass:"check muted",attrs:{type:"check"}})],1)]),a("a-menu-item",{key:"undone"},[a("div",{staticClass:"menu-item-content"},[a("a-tag",{attrs:{color:"red"}},[t._v("未完成")]),a("a-icon",{directives:[{name:"show",rawName:"v-show",value:!t.task.detail.is_done,expression:"!task.detail.is_done"}],staticClass:"check muted",attrs:{type:"check"}})],1)])],1)],1)],1)])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"deployment-unit"}}),a("span",{staticClass:"field-name"},[t._v("执行状态")])],1),a("div",{staticClass:"field-right"},[a("a-dropdown",{class:{disabled:!1},attrs:{trigger:["click"],disabled:!!t.task.detail.is_del}},[t.task.detail.t_state?a("a-tag",{attrs:{color:t.stateColor(t.task.detail.t_state)}},[t._v(" "+t._s(t.task.detail.t_state)+" ")]):a("a-tag",{attrs:{color:"gray"}},[t._v(" 点击设置 ")]),1===t.task.detail.t_type?a("a-menu",{staticClass:"field-right-menu",attrs:{slot:"overlay",selectable:!1},slot:"overlay"},t._l(t.taskStatus,(function(e){return a("a-menu-item",{key:e,on:{click:function(a){return t.editTaskItem("state",e)}}},[a("div",{staticClass:"menu-item-content"},[a("span",{attrs:{color:"green"}},[t._v(t._s(e))]),a("a-icon",{directives:[{name:"show",rawName:"v-show",value:t.task.detail.t_state==e,expression:"task.detail.t_state == status"}],staticClass:"check muted",attrs:{type:"check"}})],1)])})),1):t._e(),0===t.task.detail.t_type?a("a-menu",{staticClass:"field-right-menu",attrs:{slot:"overlay",selectable:!1},slot:"overlay"},t._l(t.bugStatus,(function(e){return a("a-menu-item",{key:e,on:{click:function(a){return t.editTaskItem("state",e)}}},[a("div",{staticClass:"menu-item-content"},[a("span",{attrs:{color:"green"}},[t._v(t._s(e))]),a("a-icon",{directives:[{name:"show",rawName:"v-show",value:t.task.detail.t_state==e,expression:"task.detail.t_state == status"}],staticClass:"check muted",attrs:{type:"check"}})],1)])})),1):t._e()],1)],1)])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"user"}}),a("span",{staticClass:"field-name"},[t._v("执行者")])],1),a("div",{staticClass:"field-right"},[a("a-dropdown",{attrs:{trigger:["click"],disabled:!!t.task.detail.is_del,placement:"bottomLeft"}},[t.task.detail.is_del?t._e():a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("点击设置执行者")])]),a("div",{staticClass:"field-flex"},[t.task.detail.t_header_name?[a("a",{staticClass:"muted name"},[t._v(t._s(t.task.detail.t_header_name))])]:[a("a",{staticClass:"muted name"},[t._v(" 点击设置执行者 ")])]],2)],2),a("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},t._l(t.memberList,(function(e){return a("a-menu-item",{key:e.uid,staticStyle:{width:"80px"},on:{click:function(a){return t.editTaskItem("header",e)}}},[a("div",{staticClass:"field-flex"},[[a("a",{staticClass:"muted name"},[t._v(t._s(e.name))])]],2)])})),1)],1)],1)])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"calendar"}}),a("span",{staticClass:"field-name"},[t._v("时间")])],1),a("div",{staticClass:"field-right field-date"},[[a("a-dropdown",{attrs:{trigger:["click"],disabled:!!t.task.detail.is_del},model:{value:t.showBeginTime,callback:function(e){t.showBeginTime=e},expression:"showBeginTime"}},[t.task.detail.is_del?a("div",{staticClass:"field-flex"},[a("a",{staticClass:"muted name",staticStyle:{margin:"0"}},[t.task.detail.start_time?[t._v(t._s(t._f("dateFormat")(t.task.detail.start_time)))]:[t._v("设置开始时间")]],2)]):a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("点击设置开始时间")])]),a("div",{staticClass:"field-flex"},[a("a",{staticClass:"muted name",staticStyle:{margin:"0"}},[t.task.detail.start_time?[t._v(" "+t._s(t._f("dateFormat")(t.task.detail.start_time))+" ")]:[t._v("设置开始时间 ")]],2)])],2),a("div",{attrs:{slot:"overlay"},slot:"overlay"},[a("a-date-picker",{attrs:{size:"small",format:t.dateFormat,type:"date",open:t.showBeginTime},on:{change:t.formatDate},model:{value:t.form.start_time,callback:function(e){t.$set(t.form,"start_time",e)},expression:"form.start_time"}},[a("template",{slot:"renderExtraFooter"},[a("a",{staticStyle:{position:"absolute"},attrs:{size:"small"}},[t._v("清除")])])],2)],1)],1),a("span",{staticClass:"m-l-sm m-r-sm"},[t._v("-")])],a("a-dropdown",{attrs:{trigger:["click"],disabled:!!t.task.detail.is_del},model:{value:t.showEndTime,callback:function(e){t.showEndTime=e},expression:"showEndTime"}},[t.task.detail.is_del?a("div",{staticClass:"field-flex"},[a("a",{staticClass:"muted name",staticStyle:{margin:"0"}},[t.task.detail.end_time?[t._v(t._s(t._f("dateFormat")(t.task.detail.end_time)))]:[t._v("设置截止时间")]],2)]):a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("点击设置截止时间")])]),a("div",{staticClass:"field-flex"},[a("a",{staticClass:"muted name",staticStyle:{margin:"0"}},[t.task.detail.end_time?[t._v(t._s(t._f("dateFormat")(t.task.detail.end_time)))]:[t._v("设置截止时间")]],2)])],2),a("div",{attrs:{slot:"overlay"},slot:"overlay"},[a("a-date-picker",{attrs:{size:"small",format:t.dateFormat,type:"date",open:t.showEndTime},on:{change:t.formatDate},model:{value:t.form.end_time,callback:function(e){t.$set(t.form,"end_time",e)},expression:"form.end_time"}},[a("template",{slot:"renderExtraFooter"},[a("a",{staticStyle:{position:"absolute"},attrs:{size:"small"}},[t._v("清除")])])],2)],1)],1)],2)])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"file-text"}}),a("span",{staticClass:"field-name"},[t._v("备注")])],1),a("div",{staticClass:"field-right width-block"},[a("div",{directives:[{name:"show",rawName:"v-show",value:!t.showTaskDesc,expression:"!showTaskDesc"}],staticClass:"task-description",class:{disabled:t.task.detail.is_del},on:{click:function(e){t.showTaskDesc=!0}}},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.task.detail.t_content,expression:"task.detail.t_content"}],staticClass:"description-txt",domProps:{innerHTML:t._s(t.task.detail.t_content)}}),a("span",{directives:[{name:"show",rawName:"v-show",value:!t.task.detail.t_content,expression:"!task.detail.t_content"}]},[t._v("添加备注")])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.showTaskDesc,expression:"showTaskDesc"}]},[a("a-textarea",{attrs:{"default-value":t.task.detail.t_content,rows:4},model:{value:t.newContent,callback:function(e){t.newContent=e},expression:"newContent"}}),a("div",{staticClass:"action-btn float-right mt-2 "},[a("a-button",{staticClass:"mr-2",on:{click:function(e){t.showTaskDesc=!1}}},[t._v(" 取消 ")]),a("a-button",{staticClass:"middle-btn",attrs:{type:"primary","html-type":"submit"},on:{click:t.doContent}},[t._v("保存 ")])],1)],1)])])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"bulb"}}),a("span",{staticClass:"field-name"},[t._v("优先级")])],1),a("div",{staticClass:"field-right"},[a("a-dropdown",{attrs:{trigger:["click"],disabled:!!t.task.detail.is_del}},[a("span",[a("a-tag",{attrs:{color:t.priColor(t.task.detail.t_rank)}},[t._v(t._s(3===t.task.detail.t_rank?"非常紧急":2===t.task.detail.t_rank?"紧急":"普通"))])],1),a("a-menu",{staticClass:"field-right-menu",attrs:{slot:"overlay",selectable:!1},on:{click:t.doPri},slot:"overlay"},[a("a-menu-item",{key:1},[a("div",{staticClass:"menu-item-content"},[a("a-tag",{attrs:{color:t.priColor(1)}},[t._v("普通")]),a("a-icon",{directives:[{name:"show",rawName:"v-show",value:1==t.task.detail.t_rank,expression:"task.detail.t_rank == 1"}],staticClass:"check muted",attrs:{type:"check"}})],1)]),a("a-menu-item",{key:2},[a("div",{staticClass:"menu-item-content"},[a("a-tag",{attrs:{color:t.priColor(2)}},[t._v("紧急")]),a("a-icon",{directives:[{name:"show",rawName:"v-show",value:2==t.task.detail.t_rank,expression:"task.detail.t_rank == 2"}],staticClass:"check muted",attrs:{type:"check"}})],1)]),a("a-menu-item",{key:3},[a("div",{staticClass:"menu-item-content"},[a("a-tag",{attrs:{color:t.priColor(3)}},[t._v("非常紧急")]),a("a-icon",{directives:[{name:"show",rawName:"v-show",value:3==t.task.detail.t_rank,expression:"task.detail.t_rank == 3"}],staticClass:"check muted",attrs:{type:"check"}})],1)])],1)],1)],1)])]),a("div",{directives:[{name:"show",rawName:"v-show",value:2!==t.task.detail.t_level,expression:"task.detail.t_level !== 2"}],key:"1"},[a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"bars"}}),a("span",{staticClass:"field-name"},[t._v("子任务 ")])],1)])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"block-field width-block"},[a("div",{staticClass:"task-child"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.task.children.length,expression:"task.children.length"}],staticClass:"task-list"},t._l([0,1],(function(e){return a("div",{key:e},t._l(t.task.children,(function(s){return a("div",{key:s.id},[s.is_done==e?a("div",{staticClass:"list-item task"},[a("a-tooltip",{attrs:{placement:"top"}},[a("template",{slot:"title"},[t.task.detail.is_done?a("span",{staticStyle:{"font-size":"12px"}},[t._v("父任务已完成，无法重做子任务")]):t._e()]),a("div",{staticClass:"check-box-wrapper task-item"},[a("a-icon",{staticClass:"check-box",class:{disabled:s.is_del||s.is_done},style:{fontSize:"16px",color:"#c7c7c7"},attrs:{type:s.is_done?"check-square":"border"},on:{click:function(e){!s.is_done&&t.finishChild(s.t_level,s.id,s.t_title)}}})],1)],2),a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[s.t_header_name?a("span",[t._v(t._s(s.t_header_name))]):t._e()]),a("a-avatar",{staticClass:"task-item",class:{disabled:t.task.detail.is_del},attrs:{size:"small",icon:"user"}})],2),a("div",{staticClass:"task-item task-title",on:{click:function(e){return t.toChildren(s.id,s.t_level)}}},[a("div",{staticClass:"title-text",class:{done:s.is_done}},[t._v(" "+t._s(s.t_title)+" ")])]),a("a",{staticClass:"muted"},[a("a-icon",{staticClass:"task-item",attrs:{type:"right"}})],1)],1):t._e()])})),0)})),0),a("a-tooltip",{attrs:{placement:"top"}},[a("template",{slot:"title"},[t.task.detail.is_done?a("span",{staticStyle:{"font-size":"12px"}},[t._v("当前任务已完成，无法添加新的子任务")]):t._e()]),a("a",{directives:[{name:"show",rawName:"v-show",value:!t.showChildTask,expression:"!showChildTask"}],staticClass:"add-handler",class:{disabled:t.task.detail.is_done},on:{click:t.onOpenAdd}},[a("a-icon",{staticStyle:{"margin-right":"6px"},attrs:{type:"plus"}}),t._v(" 添加子任务 ")],1)],2)],1)])])])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"field-left"},[a("a-icon",{attrs:{type:"paper-clip"}}),a("span",{staticClass:"field-name"},[t._v("关联文件")])],1),a("div",{staticClass:"field-right width-block"})])]),a("div",{staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"block-field width-block"},[a("div",{staticClass:"task-child"},[a("a",{staticClass:"add-handler",attrs:{id:"upload-file"}},[a("a-icon",{staticStyle:{"margin-right":"6px"},attrs:{type:"plus"}}),t._v(" 上传文件 ")],1)])])])]),a("div",{directives:[{name:"show",rawName:"v-show",value:t.taskSourceList.length>0,expression:"taskSourceList.length > 0"}],staticClass:"component-mount"},[a("div",{staticClass:"field"},[a("div",{staticClass:"block-field width-block"},[a("div",{staticClass:"file-list"},[a("div",{staticClass:"m-xs m-t-none"},[t._v("关联的文件")]),a("a-list",t._l(t.taskSourceList,(function(e,s){return a("a-list-item",{key:s},[a("a-list-item-meta",[a("a-avatar",{attrs:{slot:"avatar",size:"small",shape:"square",icon:"link",src:e.sourceDetail.file_url},slot:"avatar"}),a("div",{attrs:{slot:"title"},slot:"title"},[a("a",{staticClass:"muted",attrs:{target:"_blank",href:e.sourceDetail.file_url}},[t._v(t._s(e.title))])]),a("div",{attrs:{slot:"description"},slot:"description"})],1),a("a",{staticClass:"muted",attrs:{slot:"actions"},slot:"actions"},[a("span",[t._v(t._s(e.sourceDetail.projectName))])]),a("a",{staticClass:"muted",attrs:{slot:"actions"},slot:"actions"},[a("a-dropdown",{attrs:{trigger:["click"],placement:"bottomCenter"}},[a("a",{staticClass:"action-item muted"},[a("a-icon",{attrs:{type:"down"}})],1),a("a-menu",{directives:[{name:"clipboard",rawName:"v-clipboard",value:e.sourceDetail.file_url,expression:"item.sourceDetail.file_url"}],staticClass:"field-right-menu",attrs:{slot:"overlay"},slot:"overlay"},[a("a-menu-item",{key:"copy"},[a("a-icon",{attrs:{type:"link"}}),a("span",[t._v("复制链接")])],1),a("a-menu-item",{key:"unlink"},[a("a-icon",{attrs:{type:"disconnect"}}),a("span",[t._v("取消关联")])],1)],1)],1)],1)],1)})),1)],1)])])])])])])],1),a("div",{staticClass:"content-right"},[a("div",{staticClass:"header"},[a("div",{staticClass:"title"},[t._v(t._s(1===t.task.detail.t_type?"参与者":"处理人")+" · "+t._s(t.task.taskMemberList.length))]),a("div",{staticClass:"member-list"},[t._l(t.task.taskMemberList,(function(e){return a("a-tooltip",{key:e.uid,attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("点击将"+t._s(1===t.task.detail.t_type?"参与者":"处理人")),a("span",{staticStyle:{color:"#f4ba5d"}},[t._v("「"+t._s(e.name)+"」")]),t._v("移出"+t._s(1===t.task.detail.t_type?"需求":"缺陷")+" ")])]),a("a-avatar",{staticClass:"member-item",attrs:{icon:"user",size:"small",src:e.avatar},on:{click:function(a){return t.removeMember(e.uid)}}})],2)})),a("a-tooltip",{attrs:{"mouse-enter-delay":.5}},[a("template",{slot:"title"},[a("span",[t._v("点击添加"+t._s(1===t.task.detail.t_type?"参与者":"处理人"))])]),a("a-icon",{staticClass:"member-item invite",staticStyle:{"font-size":"24px"},attrs:{type:"plus-circle",theme:"twoTone"},on:{click:function(e){t.isAddMemberVisible=!0}}})],2)],2)]),a("div",{staticClass:"log-wrap"},[a("a-tabs",{attrs:{"default-active-key":"1"}},[a("a-tab-pane",{key:"1",attrs:{tab:"动态"}},[a("vue-scroll",[a("div",{staticClass:"log-list muted"},t._l(t.dialogList,(function(e){return a("div",{key:e.d_id,class:{"log-comment":!1,"list-item":!0}},[[a("a-avatar",{staticClass:"log-item",attrs:{icon:"user",size:"small",src:e.avatar}}),a("div",{staticClass:"log-item log-txt"},[a("div",{staticClass:"log-name"},[t._v(" "+t._s(e.name)+" ")]),e.d_action?a("div",{staticClass:"log-content"},[t._v(" "+t._s(e.d_action)),a("span",{staticClass:"log-target"},[t._v(t._s(e.d_target))])]):t._e()])],a("span",{staticClass:"log-time"},[t._v(t._s(t._f("dateFormat")(e.d_create_time)))])],2)})),0)])],1),a("a-tab-pane",{key:"2",attrs:{tab:"评论","force-render":""},on:{click:t.getComment}},[a("vue-scroll",{attrs:{"v-if":t.showComment}},[a("div",{staticClass:"log-list muted"},t._l(t.commentList,(function(e){return a("div",{key:e.com_id,class:{"log-comment":!1,"list-item":!0},attrs:{"v-if":t.commentList.length}},[[a("a-avatar",{staticClass:"log-item",attrs:{icon:"user",size:"small",src:e.avatar}}),a("div",{staticClass:"log-item log-txt"},[a("div",{staticClass:"log-name"},[t._v(" "+t._s(e.name)+" ")]),e.com_content?a("div",{staticClass:"log-content"},[t._v(" "+t._s(e.com_content)+" ")]):t._e()])],a("span",{staticClass:"log-time"},[t._v(t._s(t._f("dateFormat")(e.c_create_time)))])],2)})),0)])],1)],1)],1),a("div",{staticClass:"footer",attrs:{id:"footer"}},[a("a-textarea",{ref:"commentText",staticStyle:{"margin-right":"24px"},attrs:{rows:1,placeholder:"发表评论"},on:{focus:function(e){t.commenting=!0},blur:function(e){t.commenting=!1}},model:{value:t.commentForm.content,callback:function(e){t.$set(t.commentForm,"content",e)},expression:"commentForm.content"}}),a("a-button",{staticClass:"middle-btn",attrs:{type:"primary"},on:{click:t.newComment}},[t._v("评论")])],1)])])])]),a("a-modal",{attrs:{width:360,visible:t.isAddMemberVisible,title:"添加成员"},on:{cancel:function(e){t.isAddMemberVisible=!1},ok:t.confirmAddMember}},[a("div",{staticClass:"ml-4"},[a("a-tabs",[a("a-tab-pane",{key:"1",attrs:{tab:"通过账号邀请"}},[a("div",[a("a-select",{staticStyle:{width:"95%"},attrs:{"show-search":"",placeholder:"输入成员姓名关键字","option-filter-prop":"value","filter-option":t.filterOption},on:{change:t.addMember}},t._l(t.memberList,(function(e,s){return a("a-select-option",{key:s,attrs:{value:e.uid}},[a("a-avatar",{staticClass:"ml-1 mb-2 ",attrs:{slot:"avatar",size:20,src:"https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"},slot:"avatar"}),t._v(" "+t._s(e.name)+" ")],1)})),1)],1)]),a("a-tab-pane",{key:"2",attrs:{tab:"通过邮箱邀请","force-render":""}},[t._v(" 通过邮箱邀请 ")])],1)],1)])],1)}),[],!1,null,null,null).exports},props:{popVisible:{type:[Boolean],default:function(){return!1}}},computed:{changeVisible:function(){return this.popVisible}},data:function(){return{visible:!1,ModalText:"Content of the modal",confirmLoading:!1}},methods:{showModal:function(){this.visible=this.popVisible},detailClose:function(){var t=this;this.confirmLoading=!0,setTimeout((function(){t.visible=!1,t.confirmLoading=!1}),2e3),this.$emit("close")}}}),w=(a("e495"),Object(g.a)(C,(function(){var t=this.$createElement,e=this._self._c||t;return e("div",[e("a-modal",{staticClass:"task-detail-modal",attrs:{width:"70%","dialog-style":{top:"30px"},closable:!1,visible:this.changeVisible,title:"",footer:null},on:{cancel:this.detailClose}},[e("task-detail",{on:{close:this.detailClose}})],1)],1)}),[],!1,null,"6bbaf3a9",null));e.a=w.exports},"8c48":function(t,e,a){"use strict";a.d(e,"a",(function(){return i})),a.d(e,"b",(function(){return n}));var s=a("4de3");function i(t){return Object(s.a)({url:"/dialog",method:"get",params:t})}function n(t){return Object(s.a)({url:"/dialog/new",method:"post",data:t})}},a01e:function(t,e,a){},e495:function(t,e,a){"use strict";a("a01e")}}]);