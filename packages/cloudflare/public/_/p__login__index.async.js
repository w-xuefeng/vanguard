"use strict";(self.webpackChunk_vanguard_fe=self.webpackChunk_vanguard_fe||[]).push([[939],{88031:function(D,g,n){n.d(g,{P:function(){return f}});var f=function(i){return i.TOKEN="_|see_what_see|__|-_-||__",i.USER="_|see_what_see|__|-_-|__",i}({})},28666:function(D,g,n){n.d(g,{$G:function(){return L},YG:function(){return l},rS:function(){return S}});var f=n(19931),i=n(88031),O=n(73310),h=n(93321),S={token:{borderRadius:2}};function l(_){f.y$.setStorage(i.P.USER,_.name),f.y$.setStorage(i.P.TOKEN,_.token),O.t.success({message:"".concat(_.name,", \u6B22\u8FCE\u56DE\u6765 \u{1F44F}"),description:"\u5F53\u524D\u65F6\u95F4\uFF1A".concat(new Date().toLocaleString())}),h.m8.push("/home")}function L(){f.y$.removeStorage(i.P.USER),f.y$.removeStorage(i.P.TOKEN),h.m8.replace("/login")}},61985:function(D,g,n){n.d(g,{a:function(){return O}});var f=n(88031),i=n(19931);function O(){return{isLogin:i.y$.getStorage(f.P.USER)}}},31591:function(D,g,n){n.r(g),n.d(g,{default:function(){return d}});var f=n(12323),i=n.n(f),O=n(63260),h=n.n(O),S=n(87329),l=n.n(S),L=n(42035),_=n.n(L),m=n(2784),p=n(12524),j=n.n(p),w=n.p+"static/logo.5376c493.png",I=n(24994),M=n(41503),P=n(52166),x=n(61985),F=n(93321),W=n(28666),a=n(19931),t={"login-page":"login-page___k7G33",cover:"cover___Tegwf","cover-close":"cover-close___Xp_zY",logo:"logo___GKoHn",divider:"divider___l4jgJ","divider-open":"divider-open___CKvP9",panel:"panel___z51j4",input:"input___OHY6b","input-open":"input-open___YQTpO",loading:"loading___LY7NL","loading-item":"loading-item___xqARN",pulse:"pulse___Sqd7m",rotate:"rotate___MrbV5",danger:"danger___BNlUX",ok:"ok___F11oW"},r=n(52322),s=function(c){(0,x.a)().isLogin&&F.m8.back();var E=(0,m.useState)(!1),R=_()(E,2),e=R[0],u=R[1],v=(0,m.useState)(!1),U=_()(v,2),B=U[0],X=U[1],Y=(0,m.useState)(!1),K=_()(Y,2),J=K[0],Z=K[1],A=(0,m.useState)(!1),V=_()(A,2),k=V[0],T=V[1],de=(0,m.useState)(!1),q=_()(de,2),H=q[0],ee=q[1],ce=(0,m.useState)(!1),ne=_()(ce,2),te=ne[0],re=ne[1],fe=j()([t.divider,l()({},t["divider-open"],e)]),se=j()([t.input,l()({},t["input-open"],B)]),ve=j()([t.cover,l()({},t["cover-close"],J)]),me=function(){Z(!0)},ge=function(){Z(!1)},_e=(0,m.useState)(),ae=_()(_e,2),$=ae[0],Se=ae[1],pe=(0,m.useState)(),oe=_()(pe,2),z=oe[0],Ee=oe[1],ue=(0,m.useRef)(null),ie=(0,m.useRef)(null),he=function(y){Se(y.target.value),k&&T(!1)},Re=function(y){Ee(y.target.value),H&&ee(!1)},le=function(){var C=h()(i()().mark(function y(){var G,Q,b;return i()().wrap(function(N){for(;;)switch(N.prev=N.next){case 0:if($){N.next=4;break}return(G=ue.current)===null||G===void 0||G.focus({cursor:"end"}),T(!0),N.abrupt("return");case 4:if(z){N.next=8;break}return(Q=ie.current)===null||Q===void 0||Q.focus({cursor:"end"}),ee(!0),N.abrupt("return");case 8:if(!te){N.next=10;break}return N.abrupt("return");case 10:return re(!0),N.next=13,(0,P.x4)({name:$,password:z}).req();case 13:b=N.sent,re(!1),b!=null&&b.data&&(0,W.YG)(b.data);case 16:case"end":return N.stop()}},y)}));return function(){return C.apply(this,arguments)}}(),Ae=function(y){y.key.toLocaleUpperCase()==="ENTER"&&le()};return m.useEffect(function(){var C=setTimeout(function(){u(!0)},100),y=setTimeout(function(){X(!0)},500);return function(){clearTimeout(C),clearTimeout(y)}},[]),(0,r.jsxs)("div",{className:t["login-page"],children:[(0,r.jsxs)("div",{className:ve,children:[(0,r.jsx)("img",{src:w,alt:"logo",className:t.logo,onClick:le}),(0,r.jsx)("div",{className:fe}),(0,r.jsxs)("div",{className:t.panel,children:[(0,r.jsx)(M.Z,{className:se,placeholder:"\u8BF7\u8F93\u5165\u7528\u6237\u540D",prefix:(0,r.jsx)(I.Z,{}),value:$,onInput:he,ref:ue,status:k?"error":void 0}),(0,r.jsx)(M.Z.Password,{className:se,onFocus:me,onBlur:ge,placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",value:z,onInput:Re,onKeyDownCapture:Ae,ref:ie,status:H?"error":void 0})]})]}),(0,a.nr)(te,(0,r.jsx)("div",{className:t.loading,children:(0,r.jsx)("div",{className:t["loading-item"],children:"Loading"})}))]})},d=s},52166:function(D,g,n){n.d(g,{HP:function(){return E},UY:function(){return d},x4:function(){return s},pI:function(){return c},DV:function(){return R}});var f=n(13311),i=n.n(f),O=n(93321),h=n(88031),S=n(19931),l=n(17422),L=function(e){return e[e.OK=200]="OK",e[e.BAN=401]="BAN",e[e.NOT_FOUND=404]="NOT_FOUND",e[e.USER_NOT_FOUND=4040]="USER_NOT_FOUND",e[e.CHECK_FAIL=405]="CHECK_FAIL",e[e.REQ_EXCEPTION=406]="REQ_EXCEPTION",e[e.MISSING_BODY=407]="MISSING_BODY",e[e.MISSING_PARAM=408]="MISSING_PARAM",e[e.PASSWORD_ERROR=409]="PASSWORD_ERROR",e[e.UNAUTHORIZED=410]="UNAUTHORIZED",e[e.AUTH_EXPIRED=411]="AUTH_EXPIRED",e[e.ILLEGAL_ACCESS=412]="ILLEGAL_ACCESS",e[e.USER_EXIST=413]="USER_EXIST",e[e.RULE_EXIST=414]="RULE_EXIST",e[e.MODIFY_FAIL=415]="MODIFY_FAIL",e}({}),_=function(e){return e.OK="OK",e.BAN="Access denied",e.NOT_FOUND="Not found",e.USER_NOT_FOUND="User not found",e.CHECK_FAIL="Condition is not satisfied",e.REQ_EXCEPTION="Request exception",e.MISSING_BODY="Missing request body",e.MISSING_PARAM="Missing request parameters",e.PASSWORD_ERROR="Password error",e.UNAUTHORIZED="Unauthorized access",e.AUTH_EXPIRED="Authorization expiration",e.ILLEGAL_ACCESS="Illegal access",e.USER_EXIST="User already exists",e.RULE_EXIST="Rule already exists",e.MODIFY_FAIL="Modification failed",e}({}),m=n(73310),p={timer:void 0,visible:!1};function j(e,u){u!=null&&u.silentError||p.visible||(p.visible=!0,clearTimeout(p.timer),m.t.error({message:"\u8BF7\u6C42\u5F02\u5E38",description:(u==null?void 0:u.customErrorMsg)||(e instanceof Error?e.name||e.message:"Request Error")}),p.timer=window.setTimeout(function(){p.visible=!1},3e3))}function w(e,u){[L.UNAUTHORIZED,L.AUTH_EXPIRED,L.ILLEGAL_ACCESS].includes(e.code)&&(S.y$.removeStorage(h.P.TOKEN),S.y$.removeStorage(h.P.USER),O.m8.replace("/login")),!p.visible&&!(u!=null&&u.silentBusinessError)&&(p.visible=!0,clearTimeout(p.timer),m.t.error({message:"\u8BF7\u6C42\u4E1A\u52A1\u5F02\u5E38",description:(u==null?void 0:u.customErrorMsg)||e.message||"Business Exception"}),p.timer=window.setTimeout(function(){p.visible=!1},3e3))}function I(e,u,v,U){var B=new AbortController,X=S.y$.getStorage(h.P.TOKEN),Y=new Headers(i()({"Content-Type":"application/json","trace-id":(0,l.x0)()},U==null?void 0:U.headers));X&&Y.set("Authorization",X);var K=i()({method:e,headers:Y,signal:B.signal},U);v&&(K.body=JSON.stringify(v));var J=function(){return fetch(u,K).then(function(A){return A.json()}).then(function(A){return A.success||w(A,U),A}).catch(function(A){return j(A,U),{code:A==null?void 0:A.code,message:"",success:!1,data:null}})};return{req:J,abortController:B}}function M(e,u,v){var U=new URLSearchParams(u),B=e.includes("?")?"&":"?";return I("GET","".concat(e).concat(B).concat(U),void 0,v)}function P(e,u,v){return I("POST",e,u,v)}function x(e,u,v){return I("DELETE",e,u,v)}function F(e,u,v){return I("PATCH",e,u,v)}function W(e,u,v){return I("PUT",e,u,v)}function a(e,u,v){return I("OPTIONS",e,u,v)}var t={get:M,post:P,put:W,patch:F,delete:x,options:a},r=t;function s(e){return r.post("/__internal/api/user/login",e)}function d(){return r.get("/__internal/api/rule/all")}function o(e){return request.get("/__internal/api/rule/prefix",{prefix:e})}function c(e,u){return r.post("/__internal/api/rule/modify",{prefix:e,next:u})}function E(e){return r.post("/__internal/api/rule/add",e)}function R(e){return r.delete("/__internal/api/rule/remove",{prefix:e})}},19931:function(D,g,n){n.d(g,{Hg:function(){return P},JP:function(){return x},nr:function(){return F},y$:function(){return L}});var f=n(86093),i=n.n(f),O=n(324),h=n.n(O),S=n(80828),l=n.n(S),L=function(){function a(){h()(this,a)}return l()(a,null,[{key:"getStorage",value:function(r){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:localStorage,d=s;if(d){var o=d.getItem(r);if(o){if(o.indexOf("obj-")===0)return o=o.slice(4),JSON.parse(o);if(o.indexOf("str-")===0)return o.slice(4)}}}},{key:"setStorage",value:function(r,s){var d=arguments.length>2&&arguments[2]!==void 0?arguments[2]:localStorage;if([2,3].includes(arguments.length)){var o=s;i()(o)==="object"?(o=JSON.stringify(o),o="obj-"+o):o="str-"+o;var c=d;c&&c.setItem(r,o)}}},{key:"removeStorage",value:function(r){var s=arguments.length>1&&arguments[1]!==void 0?arguments[1]:localStorage,d=s;d&&r&&d.removeItem(r)}},{key:"clearStorage",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:localStorage,s=r;s&&s.clear()}},{key:"getSession",value:function(r){return this.getStorage(r,sessionStorage)}},{key:"setSession",value:function(r,s){this.setStorage(r,s,sessionStorage)}},{key:"removeSession",value:function(r){this.removeStorage(r,sessionStorage)}},{key:"clearSession",value:function(){this.clearStorage(sessionStorage)}}]),a}();function _(a){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"global-customer-css-".concat(Date.now()),r=document.createElement("style");r.id=t;var s=document.createTextNode(a);return r.appendChild(s),document.head.appendChild(r),r}function m(a){if(typeof a=="string"){var t=document.head.querySelector("#".concat(a));t==null||t.remove()}else{var r;a==null||(r=a.remove)===null||r===void 0||r.call(a)}}function p(a,t){var r=Array.isArray(t)?t:[t],s=typeof a=="string"?document.querySelector(a):a;s&&r.forEach(function(d){var o,c;if(!(s!=null&&(o=s.classList)!==null&&o!==void 0&&(c=o.contains)!==null&&c!==void 0&&c.call(o,d))){var E,R;s==null||(E=s.classList)===null||E===void 0||(R=E.add)===null||R===void 0||R.call(E,d)}})}function j(a,t){var r=Array.isArray(t)?t:[t],s=typeof a=="string"?document.querySelector(a):a;s&&r.forEach(function(d){var o,c;s!=null&&(o=s.classList)!==null&&o!==void 0&&(c=o.contains)!==null&&c!==void 0&&c.call(o,d)&&s.classList.remove(d)})}function w(a,t){var r=Array.isArray(t)?t:[t],s=typeof a=="string"?document.querySelector(a):a;s&&r.forEach(function(d){var o,c;if(s!=null&&(o=s.classList)!==null&&o!==void 0&&(c=o.contains)!==null&&c!==void 0&&c.call(o,d))s.classList.remove(d);else{var E,R;s==null||(E=s.classList)===null||E===void 0||(R=E.add)===null||R===void 0||R.call(E,d)}})}var I=function(t,r){return typeof t=="function"?t.apply(null,r):void 0};function M(a,t,r){try{return I(a,t)}catch(s){I(r,[s])}}var P=function(t,r){try{return JSON.parse(t,r)}catch(s){return console.debug("[JSONSafeParse Error]",s),null}},x=function(t,r,s){return(typeof t=="function"?t():t)?r:s},F=function(t,r){return x(t,r,null)};function W(a){var t=a.trim().toLocaleLowerCase();return t.replace(t[0],t[0].toUpperCase())}},73310:function(D,g,n){n.d(g,{t:function(){return h}});var f=n(92951),i=n.n(f),O=n(10947);i().options={closeButton:!0,debug:!1,newestOnTop:!1,progressBar:!0,positionClass:"toast-top-right",preventDuplicates:!1,onclick:void 0,showDuration:300,hideDuration:1e3,timeOut:5e3,extendedTimeOut:1e3,showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut"};var h={success:function(l){return i().success(l.description,l.message)},info:function(l){return i().info(l.description,l.message)},warning:function(l){return i().warning(l.description,l.message)},error:function(l){return i().error(l.description,l.message)}}}}]);