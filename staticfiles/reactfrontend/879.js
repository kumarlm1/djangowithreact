(self.webpackChunkdjangowithreact=self.webpackChunkdjangowithreact||[]).push([[879],{75194:(e,t,n)=>{"use strict";n.r(t),n.d(t,{ACTIONS:()=>c,ACTIONCALLS:()=>u,STATE:()=>f});var r=n(4942),o=n(29999);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var s=n(8787),c={ADD_QUESTION:"ADD_QUESTION",REMOVE_QUESTION:"REMOVE_QUESTION",ADD_LESSIONS:"ADD_LESSIONS",INSERT_QUSETIONS:"INSERT_QUSETIONS",CHANGE_LESSION_QUESTION_COUNT:"CHANGE_LESSION_QUESTION_COUNT",ADD_TABS:"ADD_TABS",CHANGE_TAB_NAME:"CHANGE_TAB_NAME",CHANGE_TAB_POSITION:"CHANGE_TAB_POSITION",CHANGE_TAB_QNSCOUNT:"CHANGE_TAB_QNSCOUNT"},u={addQuestion:{type:c.ADD_QUESTION},removeQuestion:{type:c.REMOVE_QUESTION},addLessions:{type:c.ADD_LESSIONS},insertQuestions:{type:c.INSERT_QUSETIONS},changeLessionCount:{type:c.CHANGE_LESSION_QUESTION_COUNT},addTabs:{type:c.ADD_TABS}},l={questions:[],lessions:[],qns:[],tabs:[]},f=s.createStore((function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:l,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case c.ADD_QUESTION:return i(i({},e),{},{questions:i(i({},e.questions),{},(0,r.Z)({},t.info.payload.from,i(i({},e.questions[t.info.payload.from]),{},(0,r.Z)({},t.info.payload.id,i({},t.info.payload)))))});case c.REMOVE_QUESTION:return delete e.questions[t.info.payload.from][t.info.payload.id],i({},e);case c.ADD_LESSIONS:return i(i({},e),{},{lessions:i(i({},e.lessions),t.info.payload)});case c.CHANGE_LESSION_QUESTION_COUNT:return i(i({},e),{},{lessions:i(i({},e.lessions),{},(0,r.Z)({},t.info.id,i(i({},e.lessions[t.info.id]),{},{count:i(i({},e.lessions[t.info.id].count),{},(0,r.Z)({},t.info.tabid,t.info.cnt))})))});case c.INSERT_QUSETIONS:return i(i({},e),{},{qns:i(i({},e.qns),{},(0,r.Z)({},t.info.payload.id,t.info.payload))});case c.ADD_TABS:return i(i({},e),{},{tabs:i({},t.tabs)});case c.CHANGE_TAB_NAME:return i(i({},e),{},{tabs:i(i({},e.tabs),{},(0,r.Z)({},t.name,i(i({},e.tabs[t.name]),{},{tabname:t.tabname})))});case c.CHANGE_TAB_POSITION:return i(i({},e),{},{tabs:i(i({},e.tabs),{},(0,r.Z)({},t.name,i(i({},e.tabs[t.name]),{},{position:t.position})))});case c.CHANGE_TAB_QNSCOUNT:return i(i({},e),{},{tabs:i(i({},e.tabs),{},(0,r.Z)({},t.name,i(i({},e.tabs[t.name]),{},{noofqns:t.noofqns})))});default:return i({},e)}}));o.R.subscribeToRedux()},29999:(e,t,n)=>{"use strict";n.d(t,{R:()=>i});var r=n(15671),o=n(43144),a=n(75194),i=function(){function e(){(0,r.Z)(this,e),this.KEYS={ROOT:"root"}}return(0,o.Z)(e,null,[{key:"subscribeToRedux",value:function(){a.STATE.subscribe((function(){localStorage.setItem("root",JSON.stringify(a.STATE.getState().questions))}))}},{key:"putreduxDataToLocalStorage",value:function(e,t){}},{key:"deleteReduxDataLocalStorage",value:function(e){localStorage.removeItem(e)}},{key:"removeAllLocalStorageData",value:function(){console.log("removed all item"),localStorage.clear()}}]),e}()},87260:(e,t,n)=>{"use strict";n.d(t,{n:()=>r});var r={SAMPLE_API:"https://api.randomuser.me/",GET_LESSION:"/api/lession",GET_TAB:"/api/tab/",GET_ANSWER:"/api/answer/",GET_TABS:"/api/tab"}},22878:(e,t,n)=>{"use strict";n.r(t),n.d(t,{TabBasic:()=>_,default:()=>h});var r=n(4942),o=n(15861),a=n(15671),i=n(43144),s=n(60136),c=n(27158),u=n(61120),l=n(87757),f=n.n(l),p=n(67294),S=n(7791),d=n(74093),E=n(75194),O=(n(33262),n(87260));function b(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function T(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?b(Object(n),!0).forEach((function(t){(0,r.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):b(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var m=p.lazy((function(){return Promise.all([n.e(208),n.e(714),n.e(258)]).then(n.bind(n,72258))})),N=p.lazy((function(){return n.e(637).then(n.bind(n,55637))})),y=p.lazy((function(){return Promise.all([n.e(208),n.e(166)]).then(n.bind(n,41166))})),A=d.mM.create({page:{flexDirection:"row",backgroundColor:"#E4E4E4"},long:{height:"50vh"},vlong:{height:"100vh"},section:{margin:10,padding:10,flexGrow:1},movieContainer:{backgroundColor:"#f6f6f5",display:"flex",flexDirection:"row",padding:5}}),_=function(e){(0,s.Z)(b,e);var t,n,l,d=(n=b,l=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=(0,u.Z)(n);if(l){var r=(0,u.Z)(this).constructor;e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments);return(0,c.Z)(this,e)});function b(e){var t;return(0,a.Z)(this,b),(t=d.call(this,e)).state={data:[]},t.count=1,t}return(0,i.Z)(b,[{key:"componentDidMount",value:(t=(0,o.Z)(f().mark((function e(){var t=this;return f().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch(O.n.GET_TABS).then((function(e){return e.json()})).then((function(e){var n=[],o={};n.push({menuItem:"Settings",render:function(){return p.createElement(S.Z.Pane,null,p.createElement(p.Suspense,{fallback:p.createElement("div",null,"Loading...")},p.createElement(y,{panes:o})))}}),e.result.map((function(e){n.push({menuItem:e.name,render:function(){return p.createElement(S.Z.Pane,{key:e.id},p.createElement(p.Suspense,{fallback:p.createElement("div",null,"Loading...")},p.createElement(m,{catid:e.id,catname:e.name})))}}),o=T(T({},o),{},(0,r.Z)({},e.id,{name:e.name,position:t.count,tabname:e.name,noofqns:10})),t.count++})),n.push({menuItem:"Paper",render:function(){return p.createElement(S.Z.Pane,null,p.createElement(p.Suspense,{fallback:p.createElement("div",null,"Loading...")},p.createElement(N,{style:A.long})))}}),console.log(n);var a={};(a=E.ACTIONCALLS.addTabs).tabs=o,E.STATE.dispatch(a),t.setState({data:n})}));case 2:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})},{key:"render",value:function(){return p.createElement(S.Z,{panes:this.state.data})}}]),b}(p.Component);const h=_},33262:(e,t,n)=>{"use strict";var r=n(8081),o=n.n(r),a=n(23645);n.n(a)()(o()).push([e.id,"iframe \r\n{\r\n margin: 0px; \r\n padding: 0px; \r\n height: 90%; \r\n width:90%;\r\n border: none;\r\n background-color: aqua;\r\n}\r\n.h_iframe iframe \r\n{\r\n    position:absolute;top:0;left:0;width:100%; height:100%;\r\n}",""])},42480:()=>{},19527:()=>{},69331:()=>{},69862:()=>{},40964:()=>{}}]);