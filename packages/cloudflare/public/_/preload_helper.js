!function(){"use strict";var t="/_/".replace(/([^/])$/,"$1/"),e=location.pathname,n=e.startsWith(t)&&decodeURI("/".concat(e.slice(t.length)));if(n){var a=document,c=a.head,r=a.createElement.bind(a),i=function(t,e,n){var a,c=e.r[t]||(null===(a=Object.entries(e.r).find((function(e){var n=e[0];return new RegExp("^".concat(n.replace(/\/:[^/]+/g,"/[^/]+").replace("/*","/.+"),"$")).test(t)})))||void 0===a?void 0:a[1]);return null==c?void 0:c.map((function(t){var a=e.f[t][1],c=e.f[t][0];return{type:c.split(".").pop(),url:"".concat(n.publicPath).concat(c),attrs:[["data-".concat(e.b),"".concat(e.p,":").concat(a)]]}}))}(n,{"p":"@vanguard/fe","b":"webpack","f":[["wrappers__global.chunk.css",128],["wrappers__global.async.js",128],["190.async.js",190],["wrappers__inject.async.js",210],["228.async.js",228],["306.async.js",306],["376.async.js",376],["458.async.js",458],["p__home__index.chunk.css",512],["p__home__index.async.js",512],["layouts__index.chunk.css",717],["layouts__index.async.js",717],["wrappers__auth.async.js",899],["p__login__index.chunk.css",939],["p__login__index.async.js",939],["958.async.js",958],["971.chunk.css",971],["971.async.js",971]],"r":{"/":[10,11],"/login":[4,6,7,13,14,3,0,1,2,5],"/home":[5,6,7,8,9,16,17,12,3,0,1,2,10,11]}},{publicPath:"/_/"});null==i||i.forEach((function(t){var e,n=t.type,a=t.url;if("js"===n)(e=r("script")).src=a,e.async=!0;else{if("css"!==n)return;(e=r("link")).href=a,e.rel="preload",e.as="style"}t.attrs.forEach((function(t){e.setAttribute(t[0],t[1]||"")})),c.appendChild(e)}))}}();