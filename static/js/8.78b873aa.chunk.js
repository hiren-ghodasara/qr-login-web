(window["webpackJsonpqr-auth-web"]=window["webpackJsonpqr-auth-web"]||[]).push([[8],{440:function(e,t,a){"use strict";a.r(t);a(435);var r=a(428),n=(a(168),a(141)),c=(a(298),a(309)),i=(a(314),a(430)),o=(a(299),a(308)),s=(a(109),a(32)),l=a(66),p=a(58),u=a(59),m=a(63),d=a(60),f=a(64),h=(a(317),a(431)),g=(a(319),a(434)),v=(a(321),a(433)),b=(a(323),a(432)),y=a(0),E=a.n(y),O=a(40),j=a(65),w=a(142),C=a.n(w),N=a(22),k=a.n(N),x=a(53),P=a(17),A=a.n(P),_=a(25),z=a(9),S=a(89),D=a.n(S);function L(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function B(e){var t=function(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?L(a,!0).forEach((function(t){Object(l.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):L(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}({},e);return function(){var e=Object(x.a)(k.a.mark((function e(a){var r;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a(Object(_.showLoading)()),a({type:z.g}),e.prev=2,e.next=5,A.a.post("/api/get-all-contest",t);case 5:return r=e.sent,a({type:z.h,payload:r}),a(Object(_.hideLoading)()),e.abrupt("return",r);case 11:return e.prev=11,e.t0=e.catch(2),a({type:z.e}),a(Object(_.hideLoading)()),e.abrupt("return",Promise.reject(e.t0));case 16:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t){return e.apply(this,arguments)}}()}var F=a(19);function T(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function R(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?T(a,!0).forEach((function(t){Object(l.a)(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):T(a).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var J=b.a.Panel,q=v.a.Group,H=g.a.Countdown,M=function(e){return"".concat(e,"%")},U=function(e){return E.a.createElement("div",{className:"text-secondary mb-0 font-weight-bold"},e)},G=function(e,t){var a=Number.parseFloat((100*t/e).toFixed(2));return e===t?"success":a>70?"exception":"normal"},I=function(e){var t=e.filterData,a=e.onAfterChangePrice,r=e.onChangePrice,n=e.value;return E.a.createElement(h.a,{tipFormatter:M,min:t.price.min,max:t.price.max,range:!0,onAfterChange:a,onChange:r,value:n})},K=function(e){var t=e.sortArr,a=e.onChangeSort;return E.a.createElement("div",{className:"row m-0 sort-area"},t.map((function(e,r){return E.a.createElement("div",{onClick:function(){return a(t,e)},key:r,className:"col-sm ".concat(e.isActive?"active text-white":""," filter-sort border d-flex align-items-center justify-content-center")},e.text," ",e.isActive&&("asc"===e.sortBy?E.a.createElement("i",{className:"ml-2 fas fa-sort-up"}):E.a.createElement("i",{className:"ml-2 fas fa-sort-down"})))})))},Q=function(e){var t=D.a.utc(e.execution_date).local(),a=D.a.duration(t.diff(D()(new Date))),r=Date.now()+a.asMilliseconds(),n="";return a.asHours()<24&&(n="red"),E.a.createElement(H,{className:n,value:r,format:"H[h]:mm[m]:ss[s]"})},V=function(e){function t(e){var a;Object(p.a)(this,t),(a=Object(m.a)(this,Object(d.a)(t).call(this,e))).chnagePagination=function(e,t){a.appliedfilter=R({},a.appliedfilter,{page:e}),a.props.listAllContest(a.appliedfilter)},a.onShowSizeChange=function(e,t){a.appliedfilter=R({},a.appliedfilter,{per_page:t}),a.props.listAllContest(a.appliedfilter)},a.onChangePrice=function(e){a.appliedfilter=R({},a.appliedfilter,{price:e})},a.onAfterChangePrice=function(e){a.props.listAllContest(a.appliedfilter)},a.onChangeContestType=function(e){a.appliedfilter=R({},a.appliedfilter,{contests_type:e}),a.props.listAllContest(a.appliedfilter)},a.onChangeOrganizer=function(e){a.appliedfilter=R({},a.appliedfilter,{organizer:e}),a.props.listAllContest(a.appliedfilter)},a.onChangeSort=function(e,t){var r=e.map((function(e){return e.key===t.key?t.isActive&&"asc"===t.sortBy?R({},e,{isActive:!0,sortBy:"desc"}):R({},e,{isActive:!0,sortBy:"asc"}):R({},e,{isActive:!1})}));a.props.chnageSorting(r);var n=r.find((function(e){return e.key===t.key}));a.appliedfilter=R({},a.appliedfilter,{sort:{key:n.key,by:n.sortBy}}),a.props.listAllContest(a.appliedfilter)},a.onClearFilter=function(){var e=a.props.contestList.filterData;a.appliedfilter=R({},a.appliedfilter,{price:[e.price.min,e.price.max],contests_type:[],organizer:[]}),a.props.listAllContest(a.appliedfilter)},a.onSearchOrganizer=function(e){var t=e.target.value;a.searchOrganizer(t)},a.demoCreated=function(){a.props.testCreate()};var r=a.props.contestList,n=r.per_page,c=r.current_page,i=r.filterData;console.log("filterData.sortArr.filter(r => !r.isActive)",i.sortArr.find((function(e){return e.isActive})));var o=i.sortArr.find((function(e){return e.isActive}));return a.appliedfilter={page:c,per_page:n,price:[i.price.min,i.price.max],contests_type:[],organizer:[],sort:{key:o.key,by:o.sortBy}},a.searchOrganizer=C()(a.props.searchOrganizer,300),a}return Object(f.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){this.props.listAllFilter(),this.props.listAllContest(this.appliedfilter)}},{key:"render",value:function(){var e=this.props.contestList,t=e.data,a=e.total,l=e.per_page,p=e.current_page,u=e.filterData,m=e.listLoader;return E.a.createElement("div",{className:"bg-light section"},E.a.createElement("div",{className:"container-fluid py-3"},E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-lg-3"},E.a.createElement("div",{className:"card"},E.a.createElement("div",{className:"card-body px-3 py-0"},E.a.createElement("div",{className:"row  px-4 py-2 border-bottom"},E.a.createElement("div",{className:"col-8"},E.a.createElement("p",{className:"h6 font-weight-bold"},"Refine Results"),E.a.createElement("p",null,"Showing ",l," Of ",a," Buses"),E.a.createElement(s.a,{type:"primary",size:"small",onClick:this.demoCreated},"Demo Contest")),E.a.createElement("div",{className:"col-4"},E.a.createElement(s.a,{type:"link",onClick:this.onClearFilter},"Clear All"))),E.a.createElement("div",{className:"row"},E.a.createElement(b.a,{bordered:!1,defaultActiveKey:["1","2"],expandIconPosition:"right",className:"w-100"},E.a.createElement(J,{header:U("Price"),key:"1"},E.a.createElement(I,{filterData:u,onChangePrice:this.onChangePrice,onAfterChangePrice:this.onAfterChangePrice,value:this.appliedfilter.price})),E.a.createElement(J,{header:U("Contest Type"),key:"2"},E.a.createElement(q,{onChange:this.onChangeContestType,value:this.appliedfilter.contests_type},u.contests_type.map((function(e,t){return E.a.createElement("div",{key:t},E.a.createElement(v.a,{value:e.id},e.name))})))),E.a.createElement(J,{header:U("Organizer"),key:"3"},E.a.createElement(o.a,{onChange:this.onSearchOrganizer,size:"small",placeholder:"Search Organizer",className:"mb-2 border"}),E.a.createElement(q,{onChange:this.onChangeOrganizer,value:this.appliedfilter.organizer},u.organizer.filter((function(e){return e.visibility})).map((function(e,t){return E.a.createElement("div",{key:t},E.a.createElement(v.a,{value:e.user.id},e.user.full_name," ",E.a.createElement("span",null,e.total)))}))))))))),E.a.createElement("div",{className:"col-lg-9"},E.a.createElement("div",{className:"card"},E.a.createElement("div",{className:"card-body p-0"},E.a.createElement(K,Object.assign({},u,{onChangeSort:this.onChangeSort})))),E.a.createElement(n.a,{spinning:m},E.a.createElement("div",{className:"mt-2 contest-result"},t&&t.length>0&&t.map((function(e,t){return E.a.createElement("div",{className:"card mt-2",key:t},E.a.createElement("div",{className:"card-body"},E.a.createElement("div",{className:"row"},E.a.createElement("div",{className:"col-4"},E.a.createElement("div",{className:"h4 mb-1"},E.a.createElement(j.b,{className:"text-capitalize",to:"/contest-information/".concat(e.id)},e.name)),E.a.createElement("img",{src:"".concat(F.a.BASE_URL,"/").concat(e.photo),className:"img-fluid contest-photo img-thumbnail",alt:e.name}),E.a.createElement("div",{className:"media align-items-center mt-3"},E.a.createElement("div",{className:"u-avatar mr-2"},E.a.createElement("img",{className:"img-fluid rounded-circle",src:"".concat(F.a.BASE_URL,"/storage/").concat(e.user.avatar_location),alt:e.user.avatar_location})),E.a.createElement("div",{className:"media-body"},E.a.createElement("small",{className:"d-block text-muted"},"Listed on ",e.created_at," by"),E.a.createElement("span",{className:"d-block"},e.user.full_name)))),E.a.createElement("div",{className:"col"},E.a.createElement("div",{className:"h5 font-weight-bold"},E.a.createElement("i",{className:"fas fa-rupee-sign"}),e.joining_fee),E.a.createElement("p",{className:"text-justify font-size-1"},e.description),E.a.createElement(i.a,{size:"small",format:function(t){return"".concat(e.joined_user,"/").concat(e.max_user)},status:G(e.max_user,e.joined_user),percent:100*e.joined_user/e.max_user}),E.a.createElement(Q,{execution_date:e.execution_date})))),E.a.createElement("div",{className:"card-footer border-top-0 d-flex justify-content-end"},E.a.createElement("button",{type:"button",className:"btn btn-outline-primary"},"Join")))})),!m&&t&&0===t.length&&E.a.createElement("div",{className:"card"},E.a.createElement(c.a,{title:"No search results found",subTitle:"Try other keyword to search!"})))),E.a.createElement("div",{className:"mt-2"},E.a.createElement(r.a,{showSizeChanger:!0,onShowSizeChange:this.onShowSizeChange,defaultCurrent:p,total:a,pageSize:l,onChange:this.chnagePagination}))))))}}]),t}(y.Component),W={listAllContest:B,listAllFilter:function(){return function(){var e=Object(x.a)(k.a.mark((function e(t){var a;return k.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(Object(_.showLoading)()),e.prev=1,e.next=4,A.a.get("/api/get-all-filters");case 4:return a=e.sent,t({type:z.f,payload:a}),t(Object(_.hideLoading)()),e.abrupt("return",a);case 10:return e.prev=10,e.t0=e.catch(1),t(Object(_.hideLoading)()),e.abrupt("return",Promise.reject(e.t0));case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}()},searchOrganizer:function(e){return console.log("val-----",e),function(){var t=Object(x.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.prev=0,a({type:z.i,payload:e}),t.next=7;break;case 4:return t.prev=4,t.t0=t.catch(0),t.abrupt("return",Promise.reject(t.t0));case 7:case"end":return t.stop()}}),t,null,[[0,4]])})));return function(e){return t.apply(this,arguments)}}()},chnageSorting:function(e){return console.log("chnageSorting-----",e),function(){var t=Object(x.a)(k.a.mark((function t(a){return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:t.prev=0,a({type:z.j,payload:e}),t.next=7;break;case 4:return t.prev=4,t.t0=t.catch(0),t.abrupt("return",Promise.reject(t.t0));case 7:case"end":return t.stop()}}),t,null,[[0,4]])})));return function(e){return t.apply(this,arguments)}}()},testCreate:function(){var e={execution_date:D()()};return function(){var t=Object(x.a)(k.a.mark((function t(a){var r;return k.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a(Object(_.showLoading)()),t.prev=1,t.next=4,A.a.post("/api/test-create",e);case 4:return r=t.sent,a(Object(_.hideLoading)()),a(B()),t.abrupt("return",r);case 10:return t.prev=10,t.t0=t.catch(1),a(Object(_.hideLoading)()),t.abrupt("return",Promise.reject(t.t0));case 14:case"end":return t.stop()}}),t,null,[[1,10]])})));return function(e){return t.apply(this,arguments)}}()}};t.default=Object(O.connect)((function(e){return{contestList:e.contest}}),W)(V)}}]);
//# sourceMappingURL=8.78b873aa.chunk.js.map