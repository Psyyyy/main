(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-02d49f1c"],{"1cdc":function(t,e,r){"use strict";var a=r("bfe8"),n=r("0c78"),s=r("a3fe"),o=r("81f7"),i=r("1319"),c=r("2c7d"),l=r("b13b"),u=r("1f08")("splice"),d=Math.max,m=Math.min;a({target:"Array",proto:!0,forced:!u},{splice:function(t,e){var r,a,u,f,p,_,h=i(this),g=o(h.length),b=n(t,g),k=arguments.length;if(0===k?r=a=0:1===k?(r=0,a=g-b):(r=k-2,a=m(d(s(e),0),g-b)),g+r-a>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(u=c(h,a),f=0;f<a;f++)(p=b+f)in h&&l(u,f,h[p]);if(u.length=a,r<a){for(f=b;f<g-a;f++)_=f+r,(p=f+a)in h?h[_]=h[p]:delete h[_];for(f=g;f>g-a+r;f--)delete h[f-1]}else if(r>a)for(f=g-a;f>b;f--)_=f+r-1,(p=f+a-1)in h?h[_]=h[p]:delete h[_];for(f=0;f<r;f++)h[f+b]=arguments[f+2];return h.length=g-a+r,u}})},"1e41":function(t,e,r){"use strict";r("7710")},"5dca":function(t,e,r){"use strict";var a=r("9139"),n=(r("6c00"),r("d41b"),r("b8fb")),s=r.n(n),o=r("0481"),i=r("bd40"),c={name:"FilterModal",props:{},computed:{isFilterModalOpened:function(){return this.$store.state.filter.isFilterModalOpened},currFilterType:function(){return this.$store.state.filter.currFilterType},stageList:function(){return this.$store.state.stage.stageList},currStage:function(){return this.$store.state.stage.currStage},stateFilter:function(){return this.$store.getters["filter/stateFilter"]},memberList:function(){return this.$store.state.team.currProjectMemberList},currListType:function(){return this.$store.state.task.currListType}},data:function(){return{currFilter:{},labelCol:{span:6},wrapperCol:{span:14},other:"",dateFormat:"YYYY/MM/DD",form:{member:[],stage:[],rank:[],state:[],name:"",start:"",end:""},formatForm:{}}},watch:{"$store.state.filter.currEditFilter":{handler:function(t){this.currFilter=s()(t)},immediate:!0}},created:function(){},methods:{closeFilter:function(){this.$store.commit("filter/SET_FILTER_MODAL_STATUS",!1)},handleOk:function(){this.$store.commit("filter/SET_FILTER_MODAL_STATUS",!1)},onSubmit:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){var r,a;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.formatForm=s()(t.form),!t.formatForm.start||!t.formatForm.end){e.next=5;break}if(!(t.formatForm.start-t.formatForm.end>0)){e.next=5;break}return t.$message.warning("截止时间早于开始时间！"),e.abrupt("return",!1);case 5:return t.formatForm.start&&(t.formatForm.start=Object(o.b)(t.formatForm.start.format("YYYY-MM-DD h:m:s"))),t.formatForm.end&&(t.formatForm.end=Object(o.b)(t.formatForm.end.format("YYYY-MM-DD h:m:s"))),"bug"===t.currListType?t.formatForm.t_type=0:"task"===t.currListType&&(t.formatForm.t_type=1),e.next=10,Object(i.d)(t.formatForm);case 10:return r=e.sent,a=r.data,t.$store.commit("task/SET_TASK_LIST",a),t.$message.success("列表已更新！"),t.closeFilter(),t.form={member:[],stage:[],rank:[],state:[],name:"",start:"",end:""},e.abrupt("return",!0);case 17:case"end":return e.stop()}}),e)})))()},resetForm:function(){this.$refs.ruleForm.resetFields(),this.form={member:[],stage:[],rank:[],state:[],name:"",start:"",end:""}}}},l=r("2ca5"),u=Object(l.a)(c,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",[r("a-modal",{attrs:{visible:t.isFilterModalOpened,title:"筛选"},on:{cancel:t.closeFilter,ok:t.onSubmit}},[r("template",{slot:"footer"},[r("a-button",{key:"back",on:{click:t.resetForm}},[t._v(" 重置 ")]),r("a-button",{key:"submit",attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(" 筛选 ")])],1),r("a-form-model",{ref:"ruleForm",attrs:{model:t.form,"label-col":t.labelCol,"wrapper-col":t.wrapperCol}},[r("a-form-model-item",{ref:"name",attrs:{label:"标题",prop:"name"}},[r("a-input",{attrs:{placeholder:"请输入标题"},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),"stage"!==t.currFilterType?r("a-form-model-item",{attrs:{label:"负责人"}},[r("a-select",{attrs:{mode:"multiple",placeholder:"点击选择负责人"},model:{value:t.form.member,callback:function(e){t.$set(t.form,"member",e)},expression:"form.member"}},t._l(t.memberList,(function(e){return r("a-select-option",{key:e.uid,attrs:{value:e.name}},[t._v(" "+t._s(e.name)+" ")])})),1)],1):t._e(),"stage"!==t.currFilterType?r("a-form-model-item",{attrs:{label:"迭代",prop:"stage"}},[r("a-select",{attrs:{mode:"multiple",placeholder:"点击选择迭代"},model:{value:t.form.stage,callback:function(e){t.$set(t.form,"stage",e)},expression:"form.stage"}},t._l(t.stageList,(function(e){return r("a-select-option",{key:e.id,attrs:{value:e.id}},[t._v(" "+t._s(e.name)+" ")])})),1)],1):t._e(),r("a-form-model-item",{attrs:{label:"起止日期",prop:"date"}},[r("a-date-picker",{staticStyle:{width:"100%"},attrs:{format:t.dateFormat,type:"date",placeholder:"开始日期"},model:{value:t.form.start,callback:function(e){t.$set(t.form,"start",e)},expression:"form.start"}}),r("a-date-picker",{staticStyle:{width:"100%"},attrs:{format:t.dateFormat,type:"date",placeholder:"截止日期"},model:{value:t.form.end,callback:function(e){t.$set(t.form,"end",e)},expression:"form.end"}})],1),"task"===t.currListType?r("a-form-item",{attrs:{label:"状态"}},[r("a-select",{attrs:{mode:"multiple",placeholder:"点击选择状态"},model:{value:t.form.state,callback:function(e){t.$set(t.form,"state",e)},expression:"form.state"}},t._l(t.stateFilter,(function(e){return r("a-select-option",{key:e,attrs:{value:e}},[t._v(" "+t._s(e)+" ")])})),1)],1):t._e(),r("a-form-item",{attrs:{label:"优先级"}},[r("a-select",{attrs:{mode:"multiple",placeholder:"点击选择优先级"},model:{value:t.form.rank,callback:function(e){t.$set(t.form,"rank",e)},expression:"form.rank"}},[r("a-select-option",{attrs:{value:"2"}},[t._v(" 普通 ")]),r("a-select-option",{attrs:{value:"1"}},[t._v(" 紧急 ")]),r("a-select-option",{attrs:{value:"0"}},[t._v(" 非常紧急 ")])],1)],1)],1)],2)],1)}),[],!1,null,null,null);e.a=u.exports},"72e5":function(t,e,r){"use strict";r.r(e);var a=r("c208"),n=r("159c"),s=r("9139"),o=(r("471a"),r("048d")),i=(r("6c00"),r("4a34"),r("fecb"),r("ef25"),r("e308"),r("9856"),r("0a9c"),r("f690"),r("1cdc"),r("bd40")),c=r("04ff"),l=r("8c48"),u=r("9685"),d=r("99dd"),m=r("89b9"),f=r("6f42"),p=r("5dca"),_={name:"TaskList",components:{Task:f.a,FilterModal:p.a,AddModal:m.a},data:function(){var t=this;return{columns:[{dataIndex:"t_title",key:"t_title",ellipsis:!0,width:"400px",slots:{title:"all"},scopedSlots:{filterDropdown:"filterDropdown",filterIcon:"filterIcon",customRender:"task"},onFilter:function(t,e){return e.task.children.task.toString().toLowerCase().includes(t.toLowerCase())},onFilterDropdownVisibleChange:function(e){e&&setTimeout((function(){t.searchInput.focus()}),0)}},{title:"ID",dataIndex:"id",key:"id",scopedSlots:{customRender:"id"},width:"90px"},{title:"优先级",dataIndex:"t_rank",key:"t_rank",width:"100px",defaultSortOrder:"descend",sorter:function(t,e){return t.t_rank-e.t_rank},scopedSlots:{customRender:"rank"}},{title:"迭代",key:"t_stage_name",width:"80px",dataIndex:"t_stage_name"},{title:"状态",dataIndex:"t_state",width:"80px",key:"t_state",scopedSlots:{customRender:"state"}},{title:"处理人",dataIndex:"t_header_name",key:"t_header_name",scopedSlots:{filterDropdown:"filterDropdown",filterIcon:"filterIcon",customRender:"member"},onFilter:function(t,e){return e.member.children.t_header_name.toString().toLowerCase().includes(t.toLowerCase())},onFilterDropdownVisibleChange:function(e){e&&setTimeout((function(){t.searchInput.focus()}),0)}},{title:"预计开始",dataIndex:"start_time",key:"start_time",scopedSlots:{customRender:"start"}},{title:"预计结束",dataIndex:"end_time",key:"end_time",scopedSlots:{customRender:"end"}},{title:"操作",key:"action",width:"50px",scopedSlots:{customRender:"action"}}],expandRows:[],isExpandAll:!1,showTask:!1,loading:!1,isTodoMenuOpened:!0,searchText:"",searchInput:null,searchedColumn:"",selectedRowKeys:[],typeDict:[],clickRowId:"",selectValue:["china"],treeLoading:!1,simpleImage:o.a.PRESENTED_IMAGE_SIMPLE,nouseData:"",detailTaskId:"",dialogList:{},detail:{}}},created:function(){this.getTask(),this.getMemberList()},computed:{data:function(){return this.$store.state.task.taskList},currProjectID:function(){return this.$store.state.project.currProjectId},isAddModalOpened:function(){return this.$store.state.add.isAddModalOpened},currListType:function(){return this.$store.state.task.currListType},currStageId:function(){return this.$store.state.stage.currStageId}},watch:{currProjectID:function(){this.getTask()},showTask:function(){this.getTask()},isAddModalOpened:function(){this.getTask()},currListType:function(){this.getTask()},currStageId:function(){this.getTask()}},methods:{closeDetail:function(){this.showTask=!1},getStageList:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var r,a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.currProjectID,e.next=3,Object(u.c)(r);case 3:return a=e.sent,n=a.data,t.$store.commit("stage/SET_STAGE_LIST",n.stagelist),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})))()},getMemberList:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var r,a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.currProjectID,e.next=3,Object(d.a)(r);case 3:a=e.sent,n=a.data,t.$store.commit("team/SET_CURR_PROJECT_MEMBER_LIST",n);case 6:case"end":return e.stop()}}),e)})))()},getTask:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){var r,a,n,s,o,c,l;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=t.currProjectID,a=t.currStageId,"stage"!==t.currListType){e.next=10;break}return e.next=5,Object(i.g)(r,a);case 5:n=e.sent,s=n.data,t.$store.commit("task/SET_TASK_LIST",s),e.next=16;break;case 10:return o="task"===t.currListType?1:0,e.next=13,Object(i.i)(r,o);case 13:c=e.sent,l=c.data,t.$store.commit("task/SET_TASK_LIST",l);case 16:return e.abrupt("return",!0);case 17:case"end":return e.stop()}}),e)})))()},deleteTask:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.prev=0,r.next=3,Object(i.b)(t);case 3:a=r.sent,e.$message.success(a.meta.msg),e.getTask(),r.next=10;break;case 8:r.prev=8,r.t0=r.catch(0);case 10:return r.abrupt("return",!0);case 11:case"end":return r.stop()}}),r,null,[[0,8]])})))()},logOut:function(){var t=this;return Object(s.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("user/logout");case 2:e.sent&&(t.$message.success("成功退出"),t.$router.replace({name:"Login"}));case 4:case"end":return e.stop()}}),e)})))()},nouse:function(){},onSelectChange:function(t){this.selectedRowKeys=t},clearSele:function(){this.selectedRowKeys=[]},handleSearch:function(t,e,r){e();var a=Object(n.a)(t,1)[0];this.searchText=a,this.searchedColumn=r},handleReset:function(t){t(),this.searchText=""},onCellChange:function(t,e,r){var n=Object(a.a)(this.dataSource),s=n.find((function(e){return e.key===t}));s&&(s[e]=r,this.dataSource=n)},expandAllRow:function(){this.isExpandAll=!0;for(var t=[],e=Object(a.a)(this.data),r=0;r<e.length;r+=1){var n=e[r];if(void 0!==n.children){t.push("".concat(n.id));for(var s=0;s<n.children.length;s+=1){var o=n.children[s];void 0!==o.children&&t.push("".concat(o.id))}}}this.expandRows=t},closeAllRow:function(){this.isExpandAll=!1,this.expandRows=[]},expandRowIcon:function(t){var e=this,r=this.$createElement;if(void 0!==t.record.children&&t.record.children.length>0){var a=t.record.id;return t.expanded?r("div",{class:"expand-icon",on:{click:function(){for(var t=0;t<e.expandRows.length;t+=1)"".concat(a)===e.expandRows[t]&&e.expandRows.splice(t,1)}}},["-"]):r("div",{class:"expand-icon",on:{click:function(){e.expandRows.push("".concat(a))}}},["+"])}return r("span",{style:"margin-left:25px"})},customRow:function(t){var e=this;return{style:{},on:{click:function(){e.clickRowId=t.id},mouseenter:function(t){t.currentTarget.style.transform="translateY(-3px)",t.currentTarget.style.boxShadow="0 15px 30px -5px rgba(71, 95, 123, 0.1)",t.currentTarget.style.backgroundColor="#fff",t.currentTarget.style.transition="all 0.3s ease"},mouseleave:function(t){t.currentTarget.style.transform="",t.currentTarget.style.boxShadow=""}}}},rowClass:function(t){return t.id===this.clickRowId?"clickRowColor":""},stateColor:function(t){switch(t){case"规划中":return"pink";case"实现中":return"blue";case"已实现":return"cyan";case"已拒绝":return"purple";case"已验收":return"green";case"已关闭":return"#626262";case"新":return"orange";case"处理中":return"blue";case"已解决":return"green";default:return"#626262"}},onOpenFilter:function(){this.$store.commit("filter/SET_FILTER_MODAL_TYPE","task"),this.$store.commit("filter/SET_FILTER_MODAL_STATUS",!0)},onOpenAdd:function(){this.$store.commit("add/SET_ADD_FROM_DETAIL",!1),this.$store.commit("add/SET_ADD_MODAL_TYPE","task"),this.$store.commit("add/SET_ADD_MODAL_STATUS",!0)},resetTable:function(){this.getTask()},getTaskDetail:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n,s;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a=e.currProjectID,r.next=3,Object(i.h)(a,t);case 3:return n=r.sent,s=n.data,e.$store.commit("task/SET_TASK_DETAIL",s),0!==s.detail.t_level&&e.$store.commit("task/SET_CURR_FATHER_TASK",s.parent[0]),r.abrupt("return",!0);case 8:case"end":return r.stop()}}),r)})))()},getDialog:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n,s;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a={pid:e.currProjectID,source:"task",sid:t},r.next=3,Object(l.a)(a);case 3:return n=r.sent,s=n.data,e.$store.commit("task/SET_TASK_DIALOG",s),r.abrupt("return",!0);case 7:case"end":return r.stop()}}),r)})))()},getComment:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function r(){var a,n,s;return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return a={source:"task",sid:t},r.next=3,Object(c.a)(a);case 3:return n=r.sent,s=n.data,e.$store.commit("task/SET_TASK_COMMENT",s),r.abrupt("return",!0);case 7:case"end":return r.stop()}}),r)})))()},showDetail:function(t){var e=this;return Object(s.a)(regeneratorRuntime.mark((function r(){return regeneratorRuntime.wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return e.$store.commit("task/SET_CURR_EDIT_TASK",t),r.next=3,e.getTaskDetail(t);case 3:return r.next=5,e.getDialog(t);case 5:return r.next=7,e.getComment(t);case 7:e.showTask=!0;case 8:case"end":return r.stop()}}),r)})))()}}},h=(r("1e41"),r("2ca5")),g=Object(h.a)(_,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"todo-app"},[r("div",[r("div",{staticClass:"relative flex flex-no-wrap task-list mt-3 pl-6"},[r("h3",{staticClass:"section-card__title"},[t._v(t._s("stage"===t.currListType?"迭代任务":"task"===t.currListType?"需求管理":"缺陷管理"))]),r("div",{staticClass:"flex ml-auto"},[r("a-button",{staticClass:"ml-1 w-30 flex ",attrs:{type:"primary"},on:{click:function(e){return t.onOpenAdd()}}},[r("feather",{staticClass:"mr-1 mt-1",attrs:{size:"20",type:"plus"}}),t._v(" 新增"+t._s("task"===t.currListType||"stage"===t.currListType?"需求":"缺陷")+" ")],1),r("a-button",{staticClass:"ml-1 mr-4 flex",on:{click:function(e){return t.onOpenFilter()}}},[r("feather",{staticClass:"mr-1",attrs:{size:"18",type:"search"}}),t._v(" 筛选")],1),r("a-button",{staticClass:"ml-1 mr-4 flex",on:{click:function(e){return t.resetTable()}}},[r("feather",{staticClass:"mr-1 ",attrs:{size:"18",type:"refresh-cw"}}),t._v(" 清除筛选")],1)],1),r("div",{staticClass:"mr-4"},[r("a-dropdown",[r("a-button",[t._v("更多操作"),r("a-icon",{attrs:{type:"down"}})],1),r("a-menu",{attrs:{slot:"overlay"},slot:"overlay"},[r("a-menu-item",[r("a",[t._v("导入需求")])]),r("a-menu-item",[r("a",[t._v("导出需求")])])],1)],1)],1)]),r("div",[r("a-card",{attrs:{bordered:!1}},[r("a-table",{ref:"table",attrs:{size:"middle",scroll:{y:450},"row-key":function(t){return t.id+""},pagination:!1,"default-expand-all-rows":!1,columns:t.columns,"data-source":t.data,loading:t.loading,"show-pagination":"auto","row-selection":{selectedRowKeys:t.selectedRowKeys,onChange:t.onSelectChange},"expanded-row-keys":t.expandRows,"expand-icon":function(e){return t.expandRowIcon(e)},"custom-row":t.customRow,"row-class-name":t.rowClass},scopedSlots:t._u([{key:"filterDropdown",fn:function(e){var a=e.setSelectedKeys,n=e.selectedKeys,s=e.confirm,o=e.clearFilters,i=e.column;return r("div",{staticStyle:{padding:"8px"}},[r("a-input",{directives:[{name:"ant-ref",rawName:"v-ant-ref",value:function(e){return t.searchInput=e},expression:"c => (searchInput = c)"}],staticStyle:{width:"188px","margin-bottom":"8px",display:"block"},attrs:{placeholder:"查找"+i.t_title,value:n[0]},on:{change:function(t){return a(t.target.value?[t.target.value]:[])},pressEnter:function(){return t.handleSearch(n,s,i.dataIndex)}}}),r("a-button",{staticStyle:{width:"90px","margin-right":"8px"},attrs:{type:"primary",icon:"search",size:"small"},on:{click:function(){return t.handleSearch(n,s,i.dataIndex)}}},[t._v(" 查找 ")]),r("a-button",{staticStyle:{width:"90px"},attrs:{size:"small"},on:{click:function(){return t.handleReset(o)}}},[t._v(" 重置 ")])],1)}},{key:"filterIcon",fn:function(t){return r("a-icon",{style:{color:t?"#108ee9":void 0},attrs:{type:"search"}})}},{key:"task",fn:function(e,a,n,s){return[t.searchText&&t.searchedColumn===s.dataIndex?r("span",{staticClass:"task-pointer",on:{click:function(e){return t.showDetail(a.id)}}},[t._l(e.toString().split(new RegExp("(?<="+t.searchText+")|(?="+t.searchText+")","i")),(function(e,a){return[e.toLowerCase()===t.searchText.toLowerCase()?r("mark",{key:a,staticClass:"highlight"},[t._v(t._s(e))]):[t._v(t._s(e))]]}))],2):[r("span",{staticClass:"task-pointer",on:{click:function(e){return t.showDetail(a.id)}}},["stage"===t.currListType?r("a-tag",{attrs:{color:1===a.t_type?"blue":"red"}},[t._v(" "+t._s(1===a.t_type?"需求":"缺陷")+" ")]):t._e(),t._v(" "+t._s(e)+" ")],1)]]}},{key:"rank",fn:function(e){return r("span",{},[""!==e?r("div",[r("a-tag",{attrs:{color:3===e?"#ff5b5c":2===e?"#fdac41":"#28c175"}},[t._v(" "+t._s(3===e?"非常紧急":2===e?"紧急":"普通")+" ")])],1):t._e()])}},{key:"state",fn:function(e){return r("span",{},[e?r("div",{staticClass:"pr-2"},[r("a-tag",{attrs:{color:t.stateColor(e)}},[t._v(" "+t._s(e)+" ")])],1):r("div",[t._v("-")])])}},{key:"member",fn:function(e,a,n,s){return[t.searchText&&t.searchedColumn===s.dataIndex?r("span",[t._l(e.toString().split(new RegExp("(?<="+t.searchText+")|(?="+t.searchText+")","i")),(function(e,a){return[e.toLowerCase()===t.searchText.toLowerCase()?r("mark",{key:a,staticClass:"highlight"},[t._v(t._s(e))]):[t._v(t._s(e))]]}))],2):[r("span",[t._v(t._s(e))])]]}},{key:"start",fn:function(e){return r("span",{staticStyle:{"text-align":"center"}},[e?[t._v(" "+t._s(t._f("dateFormat")(e))+" ")]:[t._v(" - ")]],2)}},{key:"end",fn:function(e){return r("span",{staticStyle:{"text-align":"center"}},[e?[t._v(" "+t._s(t._f("dateFormat")(e))+" ")]:[t._v(" - ")]],2)}},{key:"action",fn:function(e){return r("span",{staticStyle:{"text-align":"center"}},[[r("a-popconfirm",{attrs:{placement:"topRight",title:"删除本菜单与下级？"},on:{confirm:function(r){return t.deleteTask(e.id)}}},[r("a-icon",{staticClass:"cursor-pointer",attrs:{type:"delete",theme:"twoTone","two-tone-color":"#ea2e47"}})],1)]],2)}}])},[r("span",{staticStyle:{"margin-right":"5px"},attrs:{slot:"all"},slot:"all"},[r("div",{directives:[{name:"show",rawName:"v-show",value:!t.isExpandAll,expression:"!isExpandAll"}],staticClass:"expand-icon",on:{click:t.expandAllRow}},[t._v(" + ")]),r("div",{directives:[{name:"show",rawName:"v-show",value:t.isExpandAll,expression:"isExpandAll"}],staticClass:"expand-icon",on:{click:t.closeAllRow}},[t._v(" - ")]),t._v(" 任务")])])],1)],1),r("task",{attrs:{"pop-visible":t.showTask,detail:"detailTaskId"},on:{close:t.closeDetail}}),r("filter-modal"),r("add-modal")],1)])}),[],!1,null,"45cdbc18",null);e.default=g.exports},7710:function(t,e,r){},"89b9":function(t,e,r){"use strict";var a=r("9139"),n=(r("6c00"),r("b8fb")),s=r.n(n),o=r("0481"),i=r("bd40"),c=r("9685"),l={name:"AddModal",props:{},computed:{isAddModalOpened:function(){return this.$store.state.add.isAddModalOpened},stageList:function(){return this.$store.state.stage.stageList},currStage:function(){return this.$store.state.stage.currStage},currStageId:function(){return this.$store.state.stage.currStageId},stateAdd:function(){return this.$store.getters["add/stateAdd"]},memberList:function(){return this.$store.state.team.currProjectMemberList},currProjectID:function(){return this.$store.state.project.currProjectId},currEditTask:function(){return this.$store.state.task.currEditTask},openFrom:function(){return this.$store.state.add.isFromDetail},currEditTaskLevel:function(){return this.$store.state.task.currEditTaskLevel},currListType:function(){return this.$store.state.task.currListType},currAddType:function(){return this.$store.state.add.currAddType}},data:function(){return{currAdd:{},labelCol:{span:6},wrapperCol:{span:14},other:"",dateFormat:"YYYY/MM/DD",form:{t_pid:"",t_level:"",t_title:"",t_stage_id:"",t_stage_name:"",t_project_id:"",t_content:"",t_state:"",t_rank:"",t_header_id:"",t_header_name:"",start_time:"",end_time:""},taskStatus:["规划中","实现中","已实现","已拒绝"],rules:{t_title:[{required:!0,message:"请输入标题",trigger:"blur"}],t_stage_id:[{required:!0,message:"请选择迭代",trigger:"blur"}]},formatForm:{}}},watch:{"$store.state.add.currEditAdd":{handler:function(t){this.currAdd=s()(t)},immediate:!0}},created:function(){this.getStageList()},methods:{getStageList:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){var r,a,n;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return r=t.currProjectID,e.next=3,Object(c.c)(r);case 3:return a=e.sent,n=a.data,t.$store.commit("stage/SET_STAGE_LIST",n.stagelist),e.abrupt("return",!0);case 7:case"end":return e.stop()}}),e)})))()},selectHeader:function(t,e){this.form.t_header_id=t,this.form.t_header_name=e},selectStage:function(t,e){this.form.t_stage_id=t,this.form.t_stage_name=e},closeAdd:function(){this.resetForm(),this.$store.commit("add/SET_ADD_MODAL_STATUS",!1)},handleOk:function(){this.resetForm(),this.$store.commit("add/SET_ADD_MODAL_STATUS",!1)},onSubmit:function(){var t=this;return Object(a.a)(regeneratorRuntime.mark((function e(){var r;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(t.formatForm=s()(t.form),!t.formatForm.start_time||!t.formatForm.end_time){e.next=5;break}if(!(t.formatForm.start_time-t.formatForm.end_time>0)){e.next=5;break}return t.$message.warning("截止时间早于开始时间！"),e.abrupt("return",!1);case 5:return t.formatForm.start_time&&(t.formatForm.start_time=Object(o.b)(t.formatForm.start_time.format("YYYY-MM-DD h:m:s"))),t.formatForm.end_time&&(t.formatForm.end_time=Object(o.b)(t.formatForm.end_time.format("YYYY-MM-DD h:m:s"))),t.formatForm.t_project_id=t.currProjectID,t.formatForm.t_pid=!0===t.openFrom?t.currEditTask:0,t.formatForm.t_level=!0===t.openFrom?t.currEditTaskLevel:0,"stage"===t.currListType&&(t.formatForm.t_stage_id=t.currStageId,t.formatForm.t_stage_name=t.currStage),"bug"===t.currAddType?(t.formatForm.t_type=0,t.formatForm.t_state="新"):t.formatForm.t_type=1,e.prev=12,e.next=15,Object(i.a)(t.formatForm);case 15:r=e.sent,r.data,t.$message.success("成功新增需求！"),t.closeAdd(),t.form={t_pid:"",t_level:"",t_title:"",t_stage_id:"",t_stage_name:"",t_project_id:"",t_content:"",t_state:"",t_rank:"",t_header_id:"",t_header_name:"",start_time:"",end_time:""},e.next=24;break;case 22:e.prev=22,e.t0=e.catch(12);case 24:return e.abrupt("return",!0);case 25:case"end":return e.stop()}}),e,null,[[12,22]])})))()},resetForm:function(){this.$refs.ruleForm.resetFields(),this.form={t_pid:"",t_level:"",t_title:"",t_stage_id:"",t_stage_name:"",t_project_id:"",t_content:"",t_state:"",t_rank:"",t_header_id:"",t_header_name:"",start_time:"",end_time:""}}}},u=r("2ca5"),d=Object(u.a)(l,(function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticStyle:{"z-index":"9999"}},[r("a-modal",{attrs:{visible:t.isAddModalOpened,title:"bug"===t.currAddType?"新增缺陷":"新增需求"},on:{cancel:t.closeAdd,ok:t.onSubmit}},[r("template",{slot:"footer"},[r("a-button",{key:"back",on:{click:t.resetForm}},[t._v(" 重置 ")]),r("a-button",{key:"submit",attrs:{type:"primary"},on:{click:t.onSubmit}},[t._v(" 添加 ")])],1),r("a-form-model",{ref:"ruleForm",attrs:{model:t.form,rules:t.rules,"label-col":t.labelCol,"wrapper-col":t.wrapperCol}},[r("a-form-model-item",{ref:"t_title",attrs:{label:"标题",prop:"t_title"}},[r("a-input",{attrs:{placeholder:"请输入标题"},model:{value:t.form.t_title,callback:function(e){t.$set(t.form,"t_title",e)},expression:"form.t_title"}})],1),r("a-form-model-item",{attrs:{label:"负责人"}},[r("a-select",{attrs:{placeholder:"点击选择负责人"},model:{value:t.form.t_header_name,callback:function(e){t.$set(t.form,"t_header_name",e)},expression:"form.t_header_name"}},t._l(t.memberList,(function(e){return r("a-select-option",{key:e.uid,attrs:{value:e.name},on:{click:function(r){return t.selectHeader(e.uid,e.name)}}},[t._v(" "+t._s(e.name)+" ")])})),1)],1),"stage"!==t.currListType?r("a-form-model-item",{attrs:{label:"迭代",prop:"t_stage_id"}},[r("a-select",{attrs:{placeholder:"点击选择迭代"},model:{value:t.form.t_stage_id,callback:function(e){t.$set(t.form,"t_stage_id",e)},expression:"form.t_stage_id"}},t._l(t.stageList,(function(e){return r("a-select-option",{key:e.s_id,attrs:{value:e.s_id},on:{click:function(r){return t.selectStage(e.s_id,e.s_title)}}},[t._v(" "+t._s(e.s_title)+" ")])})),1)],1):t._e(),r("a-form-model-item",{attrs:{label:"起止日期",prop:"date"}},[r("a-date-picker",{staticStyle:{width:"100%"},attrs:{format:t.dateFormat,type:"date",placeholder:"开始日期"},model:{value:t.form.start_time,callback:function(e){t.$set(t.form,"start_time",e)},expression:"form.start_time"}}),r("a-date-picker",{staticStyle:{width:"100%"},attrs:{format:t.dateFormat,type:"date",placeholder:"截止日期"},model:{value:t.form.end_time,callback:function(e){t.$set(t.form,"end_time",e)},expression:"form.end_time"}})],1),r("a-form-item",{attrs:{label:"状态"}},[r("a-select",{attrs:{placeholder:"点击选择状态"},model:{value:t.form.t_state,callback:function(e){t.$set(t.form,"t_state",e)},expression:"form.t_state"}},t._l(t.stateAdd,(function(e){return r("a-select-option",{key:e,attrs:{value:e}},[t._v(" "+t._s(e)+" ")])})),1)],1),r("a-form-item",{attrs:{label:"优先级"}},[r("a-select",{attrs:{placeholder:"点击选择优先级"},model:{value:t.form.t_rank,callback:function(e){t.$set(t.form,"t_rank",e)},expression:"form.t_rank"}},[r("a-select-option",{attrs:{value:"1"}},[t._v(" 普通 ")]),r("a-select-option",{attrs:{value:"2"}},[t._v(" 紧急 ")]),r("a-select-option",{attrs:{value:"3"}},[t._v(" 非常紧急 ")])],1)],1)],1)],2)],1)}),[],!1,null,null,null);e.a=d.exports},9685:function(t,e,r){"use strict";r.d(e,"c",(function(){return n})),r.d(e,"b",(function(){return s})),r.d(e,"d",(function(){return o})),r.d(e,"e",(function(){return i})),r.d(e,"a",(function(){return c}));var a=r("4de3");function n(t){return Object(a.a)({url:"/stage/all/".concat(t),method:"get"})}function s(t){return Object(a.a)({url:"/stage/".concat(t),method:"get"})}function o(t){return Object(a.a)({url:"/stage/new",method:"post",data:t})}function i(t){return Object(a.a)({url:"/stage/update",method:"put",data:t})}function c(t){return Object(a.a)({url:"/stage/delete",method:"delete",data:t})}},c208:function(t,e,r){"use strict";r.d(e,"a",(function(){return s}));var a=r("018f");r("975f"),r("0f38"),r("ef25"),r("cb2c3"),r("00d1"),r("a8f0"),r("79483");var n=r("88b1");function s(t){return function(t){if(Array.isArray(t))return Object(a.a)(t)}(t)||function(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}(t)||Object(n.a)(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}},f690:function(t,e,r){"use strict";var a=r("bfe8"),n=r("aeb4").find,s=r("7e18"),o=!0;"find"in[]&&Array(1).find((function(){o=!1})),a({target:"Array",proto:!0,forced:o},{find:function(t){return n(this,t,arguments.length>1?arguments[1]:void 0)}}),s("find")}}]);