(window["webpackJsonpqr-auth-web"]=window["webpackJsonpqr-auth-web"]||[]).push([[1],{11:function(e,t,n){"use strict";n.d(t,"c",(function(){return r})),n.d(t,"a",(function(){return a})),n.d(t,"e",(function(){return c})),n.d(t,"f",(function(){return o})),n.d(t,"d",(function(){return u})),n.d(t,"b",(function(){return i}));var r="BEGIN_AJAX_CALL",a="AJAX_CALL_ERROR",c="USER_LOGIN_SUCCESS",o="USER_LOOUT_SUCCESS",u="USER_LIST_SUCCESS",i="AUTH_TOKEN_SUCCESS"},143:function(e,t,n){e.exports=n(241)},152:function(e,t,n){},158:function(e,t,n){},19:function(e,t,n){"use strict";n.d(t,"a",(function(){return r})),n.d(t,"c",(function(){return a})),n.d(t,"b",(function(){return c}));var r=function(e){try{var t=localStorage.getItem(e);if(null===t)return;return t}catch(n){return}},a=function(e,t){try{localStorage.setItem(e,t)}catch(n){}},c=function(){try{var e=r("expires_in"),t=r("expires_at"),n=r("access_token");return console.log("new Date().getTime() < expires_at",(new Date).getTime()<t),e&&n&&(new Date).getTime()<t?{isAuthenticated:!0}:{isAuthenticated:!1}}catch(a){return{isAuthenticated:!1}}}},241:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),c=n(4),o=n.n(c),u=n(53),i=(n(152),n(82),n(45)),s=n(135),l=n.n(s),p=n(66),f=n(37),d=(n(158),n(159),n(139)),_=(n(162),n(13)),O=(n(243),n(39)),m=n(103),h=n(104),E=n(106),b=n(105),g=n(77),v=n(107),j=n(23),y=n.n(j),I=i.a.Header,P=function(e){function t(e){var n;return Object(m.a)(this,t),(n=Object(E.a)(this,Object(b.a)(t).call(this,e))).handleMenuClick=n.handleMenuClick.bind(Object(g.a)(n)),n}return Object(v.a)(t,e),Object(h.a)(t,[{key:"handleMenuClick",value:function(e){"logout"===e.key&&this.props.onLogoutClick().then((function(e){window.location.href="/"}))}},{key:"render",value:function(){var e;return this.props.user.isAuthenticated&&(e=[a.a.createElement(O.a.Item,{key:"/profile",className:"profile-menu"},a.a.createElement(w,{currentUser:this.props.user.userInfo,handleMenuClick:this.handleMenuClick}))]),a.a.createElement(I,{className:"app-header"},a.a.createElement(y.a,null),a.a.createElement("div",{className:"container"},a.a.createElement("div",{className:"app-title"},a.a.createElement(p.b,{to:"/"},"Laravel Auth With QR Code")),a.a.createElement(O.a,{className:"app-menu",mode:"horizontal",selectedKeys:[this.props.location.pathname],style:{lineHeight:"64px"}},e)))}}]),t}(r.Component);function w(e){var t=a.a.createElement(O.a,{onClick:e.handleMenuClick,className:"profile-dropdown-menu"},a.a.createElement(O.a.Item,{key:"user-info",className:"dropdown-item",disabled:!0},a.a.createElement("div",{className:"user-full-name-info"},e.currentUser.name),a.a.createElement("div",{className:"username-info"},"@",e.currentUser.name)),a.a.createElement(O.a.Divider,null),a.a.createElement(O.a.Item,{key:"profile",className:"dropdown-item"},a.a.createElement(p.b,{to:"/profile"},"Profile")),a.a.createElement(O.a.Item,{key:"logout",className:"dropdown-item"},"Logout"));return a.a.createElement(d.a,{overlay:t,trigger:["click"],getPopupContainer:function(){return document.getElementsByClassName("profile-menu")[0]}},a.a.createElement("a",{href:"#foo",className:"ant-dropdown-link"},a.a.createElement(_.a,{type:"user",className:"nav-icon",style:{marginRight:0}})," ",a.a.createElement(_.a,{type:"down"})))}var R=Object(f.g)(P),T=i.a.Footer,A=function(e){return a.a.createElement(T,{className:"site-footer"},"Ant Design \xa92018 Created by Ant UED")},C=function(e){var t="Page not found";return e.text&&(t=e.text),a.a.createElement("div",{style:{textAlign:"center"}},a.a.createElement("h1",null,t),a.a.createElement("div",{style:{fontSize:72,fontWeight:"bold"}},"404"),a.a.createElement("img",{src:"/assets/Black_Hole_Orange.png",alt:"Black_Hole_Orange"}))},L=n(14),U=n.n(L),k=n(30),S=n(19),D=n(79),N=n.n(D),x=n(54),G=N()(),B=!1,Y=[],H=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null;Y.forEach((function(n){e?n.reject(e):n.resolve(t)})),Y=[]};function M(){U.a.defaults.timeout=k.a.TIMEOUT,U.a.defaults.baseURL=k.a.BASE_URL;var e=Object(S.a)("access_token");e&&(U.a.defaults.headers.common.Authorization="Bearer ".concat(e),U.a.defaults.headers.common["X-Requested-With"]="XMLHttpRequest"),U.a.interceptors.response.use(V,W)}var V=function(e){return e&&e.data?e.data:e},W=function(e){if(console.log("Axios onResponseError",e.response),!e.response)return Promise.reject(e);if(401!==e.response.status)return Promise.reject(e);var t="".concat(e.config.baseURL,"/oauth/token");if(e.config.url===t||"Account is disabled."===e.response.message)return localStorage.clear(),window.location.href="/",Promise.reject(e);var n=e.config;if(401===e.response.status){if(n._retry)return localStorage.clear(),window.location.href="/",Promise.reject(e);if(B)return new Promise((function(e,t){Y.push({resolve:e,reject:t})})).then((function(e){return n.headers.Authorization="Bearer "+e,U()(n)})).catch((function(e){return Promise.reject(e)}));n._retry=!0,B=!0;var r=Object(S.a)("refresh_token");return G.dispatch(Object(x.d)(r)).then((function(e){var t="Bearer ".concat(e.access_token);return n.headers.Authorization=t,H(null,e.access_token),U()(n)})).catch((function(e){return localStorage.clear(),window.location.href="/",H(e,null),Promise.reject(e)})).finally((function(e){B=!1,M()}))}};l.a.logToConsole=!0,M();var q=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(4),n.e(7)]).then(n.bind(null,301))})),z=Object(r.lazy)((function(){return Promise.all([n.e(0),n.e(5),n.e(6)]).then(n.bind(null,303))})),K=i.a.Content,X=Object(u.connect)((function(e){return{user:e.user}}),(function(e,t){return{onLogoutClick:function(t){return e(Object(x.f)())}}}))((function(e){return a.a.createElement(p.a,{basename:"/qr-login-web"},a.a.createElement("div",{className:""},a.a.createElement(R,e),a.a.createElement(r.Suspense,{fallback:a.a.createElement("div",null,"Loading fallback...")},a.a.createElement(i.a,null,a.a.createElement(K,{className:"main-content",style:{marginTop:64}},a.a.createElement(f.d,null,a.a.createElement(f.b,{exact:!0,path:"/",render:function(t){return e.user.isAuthenticated?a.a.createElement(f.a,{to:{pathname:"/profile"}}):a.a.createElement(q,null)}}),a.a.createElement(f.b,{path:"/profile",component:z}),a.a.createElement(f.b,{component:C}))))),a.a.createElement(A,null)))}));Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var J=N()();J.dispatch(Object(x.c)()),o.a.render(a.a.createElement(u.Provider,{store:J},a.a.createElement(X,null)),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))},242:function(e,t,n){"use strict";n.r(t);var r=n(44),a=n(23),c=n(78),o=n(19),u=Object(o.b)(),i={user:Object.assign(u,{userList:[],userInfo:{}}),ajaxCallsInProgress:0},s=n(11);function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach((function(t){Object(c.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}var f=Object(r.c)({user:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.user,t=arguments.length>1?arguments[1]:void 0;switch(t.type){case s.b:return p({},e,{isAuthenticated:!0,access_token:t.payload.access_token,refresh_token:t.payload.refresh_token,expires_in:t.payload.expires_in});case s.e:return p({},e,{isAuthenticated:!0,userInfo:t.payload});case s.f:return p({},e,{isAuthenticated:!1});case s.d:return p({},e,{userList:t.payload});default:return e}},ajaxCallsInProgress:function(){var e,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:i.ajaxCallsInProgress,n=arguments.length>1?arguments[1]:void 0;return n.type===s.c?t+1:n.type===s.a||"_SUCCESS"===(e=n.type).substring(e.length-8)?t-1:t},loadingBar:a.loadingBarReducer}),d=n(138);function _(e){return Object(r.d)(f,e,Object(r.a)(d.a))}n.d(t,"default",(function(){return _}))},30:function(e,t,n){"use strict";var r=n(78);function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}var c="production"===Object({NODE_ENV:"production",PUBLIC_URL:"/qr-login-web",REACT_APP_BAR:"www.example.com/bar",REACT_APP_FOO:"www.example.com/foo"}).REACT_APP_STAGE?{s3:{BUCKET:"YOUR_PROD_S3_UPLOADS_BUCKET_NAME"},apiGateway:{REGION:"YOUR_PROD_API_GATEWAY_REGION",URL:"YOUR_PROD_API_GATEWAY_URL"},cognito:{REGION:"YOUR_PROD_COGNITO_REGION",USER_POOL_ID:"YOUR_PROD_COGNITO_USER_POOL_ID",APP_CLIENT_ID:"YOUR_PROD_COGNITO_APP_CLIENT_ID",IDENTITY_POOL_ID:"YOUR_PROD_IDENTITY_POOL_ID"},auth:{AUTH_CLIENT_ID:3,AUTH_CLIENT_SECRET:"2UItr62OLvEBfvuCLP396VpK9S1jVSgmXoksh2x0",REDIRECT_URI:"http://localhost:3000/auth-callback.html"},BASE_URL:"http://127.0.0.1:8000"}:{s3:{BUCKET:"YOUR_DEV_S3_UPLOADS_BUCKET_NAME"},apiGateway:{REGION:"YOUR_DEV_API_GATEWAY_REGION",URL:"YOUR_DEV_API_GATEWAY_URL"},cognito:{REGION:"YOUR_DEV_COGNITO_REGION",USER_POOL_ID:"YOUR_DEV_COGNITO_USER_POOL_ID",APP_CLIENT_ID:"YOUR_DEV_COGNITO_APP_CLIENT_ID",IDENTITY_POOL_ID:"YOUR_DEV_IDENTITY_POOL_ID"},auth:{AUTH_CLIENT_ID:3,AUTH_CLIENT_SECRET:"2UItr62OLvEBfvuCLP396VpK9S1jVSgmXoksh2x0",REDIRECT_URI:"http://localhost:3000/auth-callback.html"},BASE_URL:"http://127.0.0.1:8000"};t.a=function(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(n,!0).forEach((function(t){Object(r.a)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(n).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}({MAX_ATTACHMENT_SIZE:5e6,TIMEOUT:6e4},c)},54:function(e,t,n){"use strict";var r=n(20),a=n.n(r),c=n(46),o=n(14),u=n.n(o),i=n(23),s=n(11);function l(e){return{type:s.c}}function p(){return{type:s.a}}var f=n(19),d=n(30);function _(e){return function(){var t=Object(c.a)(a.a.mark((function t(n){var r,c,o;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n(l()),r={grant_type:"refresh_token",refresh_token:e,client_id:d.a.auth.AUTH_CLIENT_ID,client_secret:d.a.auth.AUTH_CLIENT_SECRET,scope:""},c={method:"POST",url:"oauth/token",headers:{"content-type":"application/json"},data:r},t.prev=3,t.next=6,u.a.request(c);case 6:return b(o=t.sent),n({type:s.b,payload:o}),t.abrupt("return",o);case 12:return t.prev=12,t.t0=t.catch(3),n(p()),t.abrupt("return",Promise.reject(t.t0));case 16:case"end":return t.stop()}}),t,null,[[3,12]])})));return function(e){return t.apply(this,arguments)}}()}function O(){return function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(Object(i.showLoading)()),e.prev=1,e.next=4,u.a.get("/api/user");case 4:return n=e.sent,t({type:s.e,payload:n}),t(Object(i.hideLoading)()),e.abrupt("return",n);case 10:return e.prev=10,e.t0=e.catch(1),t(Object(i.hideLoading)()),e.abrupt("return",Promise.reject(e.t0));case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}()}function m(){return function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,u.a.get("/api/get-qr-code");case 3:return n=e.sent,e.abrupt("return",n);case 7:return e.prev=7,e.t0=e.catch(0),e.abrupt("return",Promise.reject(e.t0));case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}()}function h(){return function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(Object(i.showLoading)()),t(l()),e.prev=2,e.next=5,u.a.get("/api/user-list");case 5:return n=e.sent,t({type:s.d,payload:n}),t(Object(i.hideLoading)()),e.abrupt("return",n);case 11:return e.prev=11,e.t0=e.catch(2),t(Object(i.hideLoading)()),e.abrupt("return",Promise.reject(e.t0));case 15:case"end":return e.stop()}}),e,null,[[2,11]])})));return function(t){return e.apply(this,arguments)}}()}function E(){return function(){var e=Object(c.a)(a.a.mark((function e(t){var n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t(l()),e.prev=1,e.next=4,u.a.get("/api/logout");case 4:return n=e.sent,t({type:s.f,payload:n}),localStorage.clear(),e.abrupt("return",n);case 10:return e.prev=10,e.t0=e.catch(1),t(p()),e.abrupt("return",Promise.reject(e.t0));case 14:case"end":return e.stop()}}),e,null,[[1,10]])})));return function(t){return e.apply(this,arguments)}}()}function b(e){var t=e.access_token,n=e.expires_in,r=e.refresh_token,a=new Date;a.setSeconds(a.getSeconds()+n),Object(f.c)("expires_in",n),Object(f.c)("expires_at",a.getTime()),Object(f.c)("access_token",t),Object(f.c)("refresh_token",r)}function g(){return function(e,t){var n=Object(f.a)("expires_at"),r=Object(f.a)("access_token"),a=Object(f.a)("refresh_token");n&&r&&(new Date).getTime()<n?(console.log("onLocalLogin - authorize"),e(O())):a?(console.log("onLocalLogin - refesh token"),e(O())):(console.log("onLocalLogin - unauth"),localStorage.clear())}}n.d(t,"d",(function(){return _})),n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return h})),n.d(t,"f",(function(){return E})),n.d(t,"e",(function(){return b})),n.d(t,"c",(function(){return g}))},79:function(e,t,n){e.exports=n(242)}},[[143,2,3]]]);
//# sourceMappingURL=main.747155da.chunk.js.map