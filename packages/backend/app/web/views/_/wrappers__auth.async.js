(self.webpackChunk_vanguard_fe=self.webpackChunk_vanguard_fe||[]).push([[899],{88031:function(s,_,u){"use strict";u.d(_,{P:function(){return l}});var l;(function(i){i.TOKEN="_|see_what_see|__|-_-||__",i.USER="_|see_what_see|__|-_-|__"})(l||(l={}))},61985:function(s,_,u){"use strict";u.d(_,{a:function(){return S}});var l=u(88031),i=u(19931);function S(){return{isLogin:i.y$.getStorage(l.P.USER)}}},19931:function(s,_,u){"use strict";u.d(_,{Hg:function(){return P},JP:function(){return x},nr:function(){return D},y$:function(){return d}});var l=u(67425),i=u.n(l),S=u(53100),c=u.n(S),v=u(98870),p=u.n(v),d=function(){function t(){c()(this,t)}return p()(t,null,[{key:"getStorage",value:function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:localStorage,a=n;if(a){var o=a.getItem(r);if(o){if(o.indexOf("obj-")===0)return o=o.slice(4),JSON.parse(o);if(o.indexOf("str-")===0)return o.slice(4)}}}},{key:"setStorage",value:function(r,n){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:localStorage;if([2,3].includes(arguments.length)){var o=n;i()(o)==="object"?(o=JSON.stringify(o),o="obj-"+o):o="str-"+o;var f=a;f&&f.setItem(r,o)}}},{key:"removeStorage",value:function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:localStorage,a=n;a&&r&&a.removeItem(r)}},{key:"clearStorage",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:localStorage,n=r;n&&n.clear()}},{key:"getSession",value:function(r){return this.getStorage(r,sessionStorage)}},{key:"setSession",value:function(r,n){this.setStorage(r,n,sessionStorage)}},{key:"removeSession",value:function(r){this.removeStorage(r,sessionStorage)}},{key:"clearSession",value:function(){this.clearStorage(sessionStorage)}}]),t}();function b(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"global-customer-css-".concat(Date.now()),r=document.createElement("style");r.id=e;var n=document.createTextNode(t);return r.appendChild(n),document.head.appendChild(r),r}function C(t){if(typeof t=="string"){var e=document.head.querySelector("#".concat(t));e==null||e.remove()}else{var r;t==null||(r=t.remove)===null||r===void 0||r.call(t)}}function g(t,e){var r=Array.isArray(e)?e:[e],n=typeof t=="string"?document.querySelector(t):t;n&&r.forEach(function(a){var o,f;if(!(n!=null&&(o=n.classList)!==null&&o!==void 0&&(f=o.contains)!==null&&f!==void 0&&f.call(o,a))){var E,y;n==null||(E=n.classList)===null||E===void 0||(y=E.add)===null||y===void 0||y.call(E,a)}})}function j(t,e){var r=Array.isArray(e)?e:[e],n=typeof t=="string"?document.querySelector(t):t;n&&r.forEach(function(a){var o,f;n!=null&&(o=n.classList)!==null&&o!==void 0&&(f=o.contains)!==null&&f!==void 0&&f.call(o,a)&&n.classList.remove(a)})}function m(t,e){var r=Array.isArray(e)?e:[e],n=typeof t=="string"?document.querySelector(t):t;n&&r.forEach(function(a){var o,f;if(n!=null&&(o=n.classList)!==null&&o!==void 0&&(f=o.contains)!==null&&f!==void 0&&f.call(o,a))n.classList.remove(a);else{var E,y;n==null||(E=n.classList)===null||E===void 0||(y=E.add)===null||y===void 0||y.call(E,a)}})}var h=function(e,r){return typeof e=="function"?e.apply(null,r):void 0};function O(t,e,r){try{return h(t,e)}catch(n){h(r,[n])}}var P=function(e,r){try{return JSON.parse(e,r)}catch(n){return console.debug("[JSONSafeParse Error]",n),null}},x=function(e,r,n){return(typeof e=="function"?e():e)?r:n},D=function(e,r){return x(e,r,null)};function M(t){var e=t.trim().toLocaleLowerCase();return e.replace(e[0],e[0].toUpperCase())}},26681:function(s,_,u){"use strict";u.r(_);var l=u(61985),i=u(63875),S=u(52322);_.default=function(){var c=(0,l.a)(),v=c.isLogin;return v?(0,S.jsx)(i.j3,{}):(0,S.jsx)(i.Fg,{to:"/login"})}},11837:function(s,_,u){"use strict";var l;var i=u(2784),S=Symbol.for("react.element"),c=Symbol.for("react.fragment"),v=Object.prototype.hasOwnProperty,p=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,d={key:!0,ref:!0,__self:!0,__source:!0};function b(C,g,j){var m,h={},O=null,P=null;j!==void 0&&(O=""+j),g.key!==void 0&&(O=""+g.key),g.ref!==void 0&&(P=g.ref);for(m in g)v.call(g,m)&&!d.hasOwnProperty(m)&&(h[m]=g[m]);if(C&&C.defaultProps)for(m in g=C.defaultProps,g)h[m]===void 0&&(h[m]=g[m]);return{$$typeof:S,type:C,key:O,ref:P,props:h,_owner:p.current}}l=c,_.jsx=b,_.jsxs=b},52322:function(s,_,u){"use strict";s.exports=u(11837)},53100:function(s){function _(u,l){if(!(u instanceof l))throw new TypeError("Cannot call a class as a function")}s.exports=_,s.exports.__esModule=!0,s.exports.default=s.exports},98870:function(s,_,u){var l=u(47739);function i(c,v){for(var p=0;p<v.length;p++){var d=v[p];d.enumerable=d.enumerable||!1,d.configurable=!0,"value"in d&&(d.writable=!0),Object.defineProperty(c,l(d.key),d)}}function S(c,v,p){return v&&i(c.prototype,v),p&&i(c,p),Object.defineProperty(c,"prototype",{writable:!1}),c}s.exports=S,s.exports.__esModule=!0,s.exports.default=s.exports}}]);
