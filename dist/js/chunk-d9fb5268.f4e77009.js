(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-d9fb5268"],{"03e8":function(e,t,r){"use strict";r("d733")},"10b1":function(e,t,r){e.exports=r.p+"img/weibo.6b9b3961.svg"},"780f":function(e,t,r){e.exports=r.p+"img/github.8d184f53.svg"},d536:function(e,t,r){e.exports=r.p+"img/wechat.1bc14415.svg"},d6cc:function(e,t,r){"use strict";r.r(t);var a=r("9139"),o=(r("6c00"),r("9856"),r("0a9c"),{name:"Login",data:function(){return{formItems:[{icon:"user",placeholder:"登录账号",decorator:["username",{rules:[{required:!0,message:"请输入账号"}]}]},{icon:"lock",placeholder:"登录密码",type:"password",decorator:["password",{rules:[{required:!0,message:"请输入密码"}]}]}],form:this.$form.createForm(this),loading:!1,showInputTooltip:!1}},mounted:function(){this.form.setFieldsValue({username:"psy",password:"123456"})},methods:{onSwitchCapture:function(e,t){var r=(null==t?void 0:t.getModifierState("CapsLock"))||!1;this.showInputTooltip=1===e&&r},onLogin:function(e){var t=this;e.preventDefault(),this.form.validateFields(function(){var e=Object(a.a)(regeneratorRuntime.mark((function e(r,a){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){t.loading=!0;try{t.$store.dispatch("user/login",a).then((function(e){if(e){t.$message.success("登录成功");var r=t.$store.state.redirectPath;r?t.$router.replace(r):t.$router.replace("/project").catch((function(){}))}else t.loading=!1})).catch((function(){}))}finally{t.loading=!1}}case 1:case"end":return e.stop()}}),e)})));return function(t,r){return e.apply(this,arguments)}}())}}}),s=(r("03e8"),r("2ca5")),n=Object(s.a)(o,(function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"flex flex-col items-center justify-center"},[a("a-form",{staticClass:"login-form",attrs:{form:e.form},on:{submit:e.onLogin}},[e._l(e.formItems,(function(t,r){var o=t.icon,s=t.decorator,n=t.size;void 0===n&&(n="large");var i=t.placeholder,c=t.type;return void 0===c&&(c="text"),a("a-form-item",{key:r},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:s,expression:"decorator"}],staticClass:"login-input",attrs:{size:n,type:c,placeholder:i},on:{keyup:[function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:e.onLogin(t)},function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"caps-lock",void 0,t.key,void 0)?null:e.onSwitchCapture(r,t)}]},scopedSlots:e._u([{key:"prefix",fn:function(){return[a("feather",{attrs:{stroke:"#aaa",size:"20",type:o}})]},proxy:!0}],null,!0)}),1===r&&e.showInputTooltip?a("p",{staticClass:"flex items-center justify-end text-gray-500 text-sm"},[a("feather",{staticClass:"mr-1",attrs:{stroke:"#fdac41",size:"18",type:"info"}}),e._v(" 键盘大写已锁定 ")],1):e._e()],1)})),a("a-form-item",{staticStyle:{margin:"-15px 0 5px 0"}},[a("div",{staticClass:"flex justify-between"},[a("a-checkbox",{directives:[{name:"decorator",rawName:"v-decorator",value:["rememberMe",{valuePropName:"checked"}],expression:"['rememberMe', { valuePropName: 'checked' }]"}]},[e._v(" 保持登录状态 ")]),a("span",{staticClass:"transition hover:primary cursor-pointer"},[e._v("忘记密码？")])],1)]),a("a-form-item",[a("a-button",{staticClass:"w-full",attrs:{size:"large",type:"primary","html-type":"submit",loading:e.loading}},[e._v(" 立即登录 ")])],1),a("a-divider",{staticClass:"text-gray-500"},[e._v("或使用以下方式登录")]),a("div",{staticClass:"flex justify-center items-center"},e._l([{name:"微信",src:r("d536")},{name:"新浪微博",src:r("10b1")},{name:"GitHub",src:r("780f")}],(function(e){var t=e.src,r=e.name;return a("img",{key:r,staticClass:"app-icon",attrs:{src:t,alt:r,title:r}})})),0)],2)],1)}),[],!1,null,"0d5be05e",null);t.default=n.exports},d733:function(e,t,r){}}]);