(self.webpackChunk_vanguard_fe=self.webpackChunk_vanguard_fe||[]).push([[899],{88031:function(s,_,o){"use strict";o.d(_,{P:function(){return l}});var l;(function(i){i.TOKEN="_|see_what_see|__|-_-||__",i.USER="_|see_what_see|__|-_-|__"})(l||(l={}))},61985:function(s,_,o){"use strict";o.d(_,{a:function(){return m}});var l=o(88031),i=o(19931);function m(){return{isLogin:i.y$.getStorage(l.P.USER)}}},19931:function(s,_,o){"use strict";o.d(_,{Hg:function(){return O},JP:function(){return x},nr:function(){return D},y$:function(){return v}});var l=o(86093),i=o.n(l),m=o(324),c=o.n(m),d=o(80828),p=o.n(d),v=function(){function t(){c()(this,t)}return p()(t,null,[{key:"getStorage",value:function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:localStorage,a=n;if(a){var u=a.getItem(r);if(u){if(u.indexOf("obj-")===0)return u=u.slice(4),JSON.parse(u);if(u.indexOf("str-")===0)return u.slice(4)}}}},{key:"setStorage",value:function(r,n){var a=arguments.length>2&&arguments[2]!==void 0?arguments[2]:localStorage;if([2,3].includes(arguments.length)){var u=n;i()(u)==="object"?(u=JSON.stringify(u),u="obj-"+u):u="str-"+u;var f=a;f&&f.setItem(r,u)}}},{key:"removeStorage",value:function(r){var n=arguments.length>1&&arguments[1]!==void 0?arguments[1]:localStorage,a=n;a&&r&&a.removeItem(r)}},{key:"clearStorage",value:function(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:localStorage,n=r;n&&n.clear()}},{key:"getSession",value:function(r){return this.getStorage(r,sessionStorage)}},{key:"setSession",value:function(r,n){this.setStorage(r,n,sessionStorage)}},{key:"removeSession",value:function(r){this.removeStorage(r,sessionStorage)}},{key:"clearSession",value:function(){this.clearStorage(sessionStorage)}}]),t}();function P(t){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:"global-customer-css-".concat(Date.now()),r=document.createElement("style");r.id=e;var n=document.createTextNode(t);return r.appendChild(n),document.head.appendChild(r),r}function b(t){if(typeof t=="string"){var e=document.head.querySelector("#".concat(t));e==null||e.remove()}else{var r;t==null||(r=t.remove)===null||r===void 0||r.call(t)}}function g(t,e){var r=Array.isArray(e)?e:[e],n=typeof t=="string"?document.querySelector(t):t;n&&r.forEach(function(a){var u,f;if(!(n!=null&&(u=n.classList)!==null&&u!==void 0&&(f=u.contains)!==null&&f!==void 0&&f.call(u,a))){var E,y;n==null||(E=n.classList)===null||E===void 0||(y=E.add)===null||y===void 0||y.call(E,a)}})}function j(t,e){var r=Array.isArray(e)?e:[e],n=typeof t=="string"?document.querySelector(t):t;n&&r.forEach(function(a){var u,f;n!=null&&(u=n.classList)!==null&&u!==void 0&&(f=u.contains)!==null&&f!==void 0&&f.call(u,a)&&n.classList.remove(a)})}function S(t,e){var r=Array.isArray(e)?e:[e],n=typeof t=="string"?document.querySelector(t):t;n&&r.forEach(function(a){var u,f;if(n!=null&&(u=n.classList)!==null&&u!==void 0&&(f=u.contains)!==null&&f!==void 0&&f.call(u,a))n.classList.remove(a);else{var E,y;n==null||(E=n.classList)===null||E===void 0||(y=E.add)===null||y===void 0||y.call(E,a)}})}var h=function(e,r){return typeof e=="function"?e.apply(null,r):void 0};function C(t,e,r){try{return h(t,e)}catch(n){h(r,[n])}}var O=function(e,r){try{return JSON.parse(e,r)}catch(n){return console.debug("[JSONSafeParse Error]",n),null}},x=function(e,r,n){return(typeof e=="function"?e():e)?r:n},D=function(e,r){return x(e,r,null)};function M(t){var e=t.trim().toLocaleLowerCase();return e.replace(e[0],e[0].toUpperCase())}},26681:function(s,_,o){"use strict";o.r(_);var l=o(61985),i=o(93321),m=o(52322);_.default=function(){var c=(0,l.a)(),d=c.isLogin;return d?(0,m.jsx)(i.j3,{}):(0,m.jsx)(i.Fg,{to:"/login"})}},11837:function(s,_,o){"use strict";var l;var i=o(2784),m=Symbol.for("react.element"),c=Symbol.for("react.fragment"),d=Object.prototype.hasOwnProperty,p=i.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,v={key:!0,ref:!0,__self:!0,__source:!0};function P(b,g,j){var S,h={},C=null,O=null;j!==void 0&&(C=""+j),g.key!==void 0&&(C=""+g.key),g.ref!==void 0&&(O=g.ref);for(S in g)d.call(g,S)&&!v.hasOwnProperty(S)&&(h[S]=g[S]);if(b&&b.defaultProps)for(S in g=b.defaultProps,g)h[S]===void 0&&(h[S]=g[S]);return{$$typeof:m,type:b,key:C,ref:O,props:h,_owner:p.current}}l=c,_.jsx=P,_.jsxs=P},52322:function(s,_,o){"use strict";s.exports=o(11837)},324:function(s){function _(o,l){if(!(o instanceof l))throw new TypeError("Cannot call a class as a function")}s.exports=_,s.exports.__esModule=!0,s.exports.default=s.exports},80828:function(s,_,o){var l=o(4546);function i(c,d){for(var p=0;p<d.length;p++){var v=d[p];v.enumerable=v.enumerable||!1,v.configurable=!0,"value"in v&&(v.writable=!0),Object.defineProperty(c,l(v.key),v)}}function m(c,d,p){return d&&i(c.prototype,d),p&&i(c,p),Object.defineProperty(c,"prototype",{writable:!1}),c}s.exports=m,s.exports.__esModule=!0,s.exports.default=s.exports}}]);
