(self.webpackChunk_vanguard_fe=self.webpackChunk_vanguard_fe||[]).push([[458],{87040:function(a,y,s){"use strict";s.d(y,{Z:function(){return Se}});var v=s(7896),o=s(2784),h=s(33514),w=s(72895),p=s(33028),f=s(86522),l=s(50553),m=s(16381),O=o.createContext(null);function M(e){var t=e.children,r=e.onBatchResize,n=o.useRef(0),i=o.useRef([]),u=o.useContext(O),c=o.useCallback(function(b,d,g){n.current+=1;var x=n.current;i.current.push({size:b,element:d,data:g}),Promise.resolve().then(function(){x===n.current&&(r==null||r(i.current),i.current=[])}),u==null||u(b,d,g)},[r,u]);return o.createElement(O.Provider,{value:c},t)}var T=function(){if(typeof Map!="undefined")return Map;function e(t,r){var n=-1;return t.some(function(i,u){return i[0]===r?(n=u,!0):!1}),n}return function(){function t(){this.__entries__=[]}return Object.defineProperty(t.prototype,"size",{get:function(){return this.__entries__.length},enumerable:!0,configurable:!0}),t.prototype.get=function(r){var n=e(this.__entries__,r),i=this.__entries__[n];return i&&i[1]},t.prototype.set=function(r,n){var i=e(this.__entries__,r);~i?this.__entries__[i][1]=n:this.__entries__.push([r,n])},t.prototype.delete=function(r){var n=this.__entries__,i=e(n,r);~i&&n.splice(i,1)},t.prototype.has=function(r){return!!~e(this.__entries__,r)},t.prototype.clear=function(){this.__entries__.splice(0)},t.prototype.forEach=function(r,n){n===void 0&&(n=null);for(var i=0,u=this.__entries__;i<u.length;i++){var c=u[i];r.call(n,c[1],c[0])}},t}()}(),_=typeof window!="undefined"&&typeof document!="undefined"&&window.document===document,A=function(){return typeof s.g!="undefined"&&s.g.Math===Math?s.g:typeof self!="undefined"&&self.Math===Math?self:typeof window!="undefined"&&window.Math===Math?window:Function("return this")()}(),S=function(){return typeof requestAnimationFrame=="function"?requestAnimationFrame.bind(A):function(e){return setTimeout(function(){return e(Date.now())},1e3/60)}}(),ee=2;function te(e,t){var r=!1,n=!1,i=0;function u(){r&&(r=!1,e()),n&&b()}function c(){S(u)}function b(){var d=Date.now();if(r){if(d-i<ee)return;n=!0}else r=!0,n=!1,setTimeout(c,t);i=d}return b}var re=20,ne=["top","right","bottom","left","width","height","size","weight"],ie=typeof MutationObserver!="undefined",oe=function(){function e(){this.connected_=!1,this.mutationEventsAdded_=!1,this.mutationsObserver_=null,this.observers_=[],this.onTransitionEnd_=this.onTransitionEnd_.bind(this),this.refresh=te(this.refresh.bind(this),re)}return e.prototype.addObserver=function(t){~this.observers_.indexOf(t)||this.observers_.push(t),this.connected_||this.connect_()},e.prototype.removeObserver=function(t){var r=this.observers_,n=r.indexOf(t);~n&&r.splice(n,1),!r.length&&this.connected_&&this.disconnect_()},e.prototype.refresh=function(){var t=this.updateObservers_();t&&this.refresh()},e.prototype.updateObservers_=function(){var t=this.observers_.filter(function(r){return r.gatherActive(),r.hasActive()});return t.forEach(function(r){return r.broadcastActive()}),t.length>0},e.prototype.connect_=function(){!_||this.connected_||(document.addEventListener("transitionend",this.onTransitionEnd_),window.addEventListener("resize",this.refresh),ie?(this.mutationsObserver_=new MutationObserver(this.refresh),this.mutationsObserver_.observe(document,{attributes:!0,childList:!0,characterData:!0,subtree:!0})):(document.addEventListener("DOMSubtreeModified",this.refresh),this.mutationEventsAdded_=!0),this.connected_=!0)},e.prototype.disconnect_=function(){!_||!this.connected_||(document.removeEventListener("transitionend",this.onTransitionEnd_),window.removeEventListener("resize",this.refresh),this.mutationsObserver_&&this.mutationsObserver_.disconnect(),this.mutationEventsAdded_&&document.removeEventListener("DOMSubtreeModified",this.refresh),this.mutationsObserver_=null,this.mutationEventsAdded_=!1,this.connected_=!1)},e.prototype.onTransitionEnd_=function(t){var r=t.propertyName,n=r===void 0?"":r,i=ne.some(function(u){return!!~n.indexOf(u)});i&&this.refresh()},e.getInstance=function(){return this.instance_||(this.instance_=new e),this.instance_},e.instance_=null,e}(),j=function(e,t){for(var r=0,n=Object.keys(t);r<n.length;r++){var i=n[r];Object.defineProperty(e,i,{value:t[i],enumerable:!1,writable:!1,configurable:!0})}return e},C=function(e){var t=e&&e.ownerDocument&&e.ownerDocument.defaultView;return t||A},Z=W(0,0,0,0);function I(e){return parseFloat(e)||0}function B(e){for(var t=[],r=1;r<arguments.length;r++)t[r-1]=arguments[r];return t.reduce(function(n,i){var u=e["border-"+i+"-width"];return n+I(u)},0)}function se(e){for(var t=["top","right","bottom","left"],r={},n=0,i=t;n<i.length;n++){var u=i[n],c=e["padding-"+u];r[u]=I(c)}return r}function ae(e){var t=e.getBBox();return W(0,0,t.width,t.height)}function ue(e){var t=e.clientWidth,r=e.clientHeight;if(!t&&!r)return Z;var n=C(e).getComputedStyle(e),i=se(n),u=i.left+i.right,c=i.top+i.bottom,b=I(n.width),d=I(n.height);if(n.boxSizing==="border-box"&&(Math.round(b+u)!==t&&(b-=B(n,"left","right")+u),Math.round(d+c)!==r&&(d-=B(n,"top","bottom")+c)),!ce(e)){var g=Math.round(b+u)-t,x=Math.round(d+c)-r;Math.abs(g)!==1&&(b-=g),Math.abs(x)!==1&&(d-=x)}return W(i.left,i.top,b,d)}var fe=function(){return typeof SVGGraphicsElement!="undefined"?function(e){return e instanceof C(e).SVGGraphicsElement}:function(e){return e instanceof C(e).SVGElement&&typeof e.getBBox=="function"}}();function ce(e){return e===C(e).document.documentElement}function he(e){return _?fe(e)?ae(e):ue(e):Z}function le(e){var t=e.x,r=e.y,n=e.width,i=e.height,u=typeof DOMRectReadOnly!="undefined"?DOMRectReadOnly:Object,c=Object.create(u.prototype);return j(c,{x:t,y:r,width:n,height:i,top:r,right:t+n,bottom:i+r,left:t}),c}function W(e,t,r,n){return{x:e,y:t,width:r,height:n}}var ve=function(){function e(t){this.broadcastWidth=0,this.broadcastHeight=0,this.contentRect_=W(0,0,0,0),this.target=t}return e.prototype.isActive=function(){var t=he(this.target);return this.contentRect_=t,t.width!==this.broadcastWidth||t.height!==this.broadcastHeight},e.prototype.broadcastRect=function(){var t=this.contentRect_;return this.broadcastWidth=t.width,this.broadcastHeight=t.height,t},e}(),de=function(){function e(t,r){var n=le(r);j(this,{target:t,contentRect:n})}return e}(),pe=function(){function e(t,r,n){if(this.activeObservations_=[],this.observations_=new T,typeof t!="function")throw new TypeError("The callback provided as parameter 1 is not a function.");this.callback_=t,this.controller_=r,this.callbackCtx_=n}return e.prototype.observe=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element=="undefined"||!(Element instanceof Object))){if(!(t instanceof C(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)||(r.set(t,new ve(t)),this.controller_.addObserver(this),this.controller_.refresh())}},e.prototype.unobserve=function(t){if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");if(!(typeof Element=="undefined"||!(Element instanceof Object))){if(!(t instanceof C(t).Element))throw new TypeError('parameter 1 is not of type "Element".');var r=this.observations_;r.has(t)&&(r.delete(t),r.size||this.controller_.removeObserver(this))}},e.prototype.disconnect=function(){this.clearActive(),this.observations_.clear(),this.controller_.removeObserver(this)},e.prototype.gatherActive=function(){var t=this;this.clearActive(),this.observations_.forEach(function(r){r.isActive()&&t.activeObservations_.push(r)})},e.prototype.broadcastActive=function(){if(this.hasActive()){var t=this.callbackCtx_,r=this.activeObservations_.map(function(n){return new de(n.target,n.broadcastRect())});this.callback_.call(t,r,t),this.clearActive()}},e.prototype.clearActive=function(){this.activeObservations_.splice(0)},e.prototype.hasActive=function(){return this.activeObservations_.length>0},e}(),G=typeof WeakMap!="undefined"?new WeakMap:new T,V=function(){function e(t){if(!(this instanceof e))throw new TypeError("Cannot call a class as a function.");if(!arguments.length)throw new TypeError("1 argument required, but only 0 present.");var r=oe.getInstance(),n=new pe(t,r,this);G.set(this,n)}return e}();["observe","unobserve","disconnect"].forEach(function(e){V.prototype[e]=function(){var t;return(t=G.get(this))[e].apply(t,arguments)}});var be=function(){return typeof A.ResizeObserver!="undefined"?A.ResizeObserver:V}(),ye=be,E=new Map;function me(e){e.forEach(function(t){var r,n=t.target;(r=E.get(n))===null||r===void 0||r.forEach(function(i){return i(n)})})}var k=new ye(me),Le=null,je=null;function ge(e,t){E.has(e)||(E.set(e,new Set),k.observe(e)),E.get(e).add(t)}function Re(e,t){E.has(e)&&(E.get(e).delete(t),E.get(e).size||(k.unobserve(e),E.delete(e)))}var we=s(9249),Oe=s(87371),Ee=s(45754),_e=s(86906),xe=function(e){(0,Ee.Z)(r,e);var t=(0,_e.Z)(r);function r(){return(0,we.Z)(this,r),t.apply(this,arguments)}return(0,Oe.Z)(r,[{key:"render",value:function(){return this.props.children}}]),r}(o.Component);function Me(e,t){var r=e.children,n=e.disabled,i=o.useRef(null),u=o.useRef(null),c=o.useContext(O),b=typeof r=="function",d=b?r(i):r,g=o.useRef({width:-1,height:-1,offsetWidth:-1,offsetHeight:-1}),x=!b&&o.isValidElement(d)&&(0,m.Yr)(d),Ie=x?d.ref:null,We=(0,m.x1)(Ie,i),N=function(){var z;return(0,l.ZP)(i.current)||(i.current&&(0,f.Z)(i.current)==="object"?(0,l.ZP)((z=i.current)===null||z===void 0?void 0:z.nativeElement):null)||(0,l.ZP)(u.current)};o.useImperativeHandle(t,function(){return N()});var $=o.useRef(e);$.current=e;var U=o.useCallback(function(R){var z=$.current,Y=z.onResize,De=z.data,K=R.getBoundingClientRect(),P=K.width,L=K.height,D=R.offsetWidth,H=R.offsetHeight,X=Math.floor(P),J=Math.floor(L);if(g.current.width!==X||g.current.height!==J||g.current.offsetWidth!==D||g.current.offsetHeight!==H){var Q={width:X,height:J,offsetWidth:D,offsetHeight:H};g.current=Q;var He=D===Math.round(P)?P:D,Pe=H===Math.round(L)?L:H,q=(0,p.Z)((0,p.Z)({},Q),{},{offsetWidth:He,offsetHeight:Pe});c==null||c(q,R,De),Y&&Promise.resolve().then(function(){Y(q,R)})}},[]);return o.useEffect(function(){var R=N();return R&&!n&&ge(R,U),function(){return Re(R,U)}},[i.current,n]),o.createElement(xe,{ref:u},x?o.cloneElement(d,{ref:We}):d)}var Ae=o.forwardRef(Me),Ce=Ae,ze="rc-observer-key";function Te(e,t){var r=e.children,n=typeof r=="function"?[r]:(0,h.Z)(r);return n.map(function(i,u){var c=(i==null?void 0:i.key)||"".concat(ze,"-").concat(u);return o.createElement(Ce,(0,v.Z)({},e,{key:c,ref:u===0?t:void 0}),i)})}var F=o.forwardRef(Te);F.Collection=M;var Se=F},91066:function(a){function y(s,v){(v==null||v>s.length)&&(v=s.length);for(var o=0,h=new Array(v);o<v;o++)h[o]=s[o];return h}a.exports=y,a.exports.__esModule=!0,a.exports.default=a.exports},36340:function(a){function y(s){if(Array.isArray(s))return s}a.exports=y,a.exports.__esModule=!0,a.exports.default=a.exports},34803:function(a){function y(s,v){var o=s==null?null:typeof Symbol!="undefined"&&s[Symbol.iterator]||s["@@iterator"];if(o!=null){var h,w,p,f,l=[],m=!0,O=!1;try{if(p=(o=o.call(s)).next,v===0){if(Object(o)!==o)return;m=!1}else for(;!(m=(h=p.call(o)).done)&&(l.push(h.value),l.length!==v);m=!0);}catch(M){O=!0,w=M}finally{try{if(!m&&o.return!=null&&(f=o.return(),Object(f)!==f))return}finally{if(O)throw w}}return l}}a.exports=y,a.exports.__esModule=!0,a.exports.default=a.exports},97416:function(a){function y(){throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}a.exports=y,a.exports.__esModule=!0,a.exports.default=a.exports},42035:function(a,y,s){var v=s(36340),o=s(34803),h=s(52124),w=s(97416);function p(f,l){return v(f)||o(f,l)||h(f,l)||w()}a.exports=p,a.exports.__esModule=!0,a.exports.default=a.exports},52124:function(a,y,s){var v=s(91066);function o(h,w){if(h){if(typeof h=="string")return v(h,w);var p=Object.prototype.toString.call(h).slice(8,-1);if(p==="Object"&&h.constructor&&(p=h.constructor.name),p==="Map"||p==="Set")return Array.from(h);if(p==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(p))return v(h,w)}}a.exports=o,a.exports.__esModule=!0,a.exports.default=a.exports},17422:function(a,y,s){"use strict";s.d(y,{x0:function(){return p}});const v="useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict";let o=f=>crypto.getRandomValues(new Uint8Array(f)),h=(f,l,m)=>{let O=(2<<Math.log(f.length-1)/Math.LN2)-1,M=-~(1.6*O*l/f.length);return(T=l)=>{let _="";for(;;){let A=m(M),S=M;for(;S--;)if(_+=f[A[S]&O]||"",_.length===T)return _}}},w=(f,l=21)=>h(f,l,o),p=(f=21)=>{let l="",m=crypto.getRandomValues(new Uint8Array(f));for(;f--;)l+=v[m[f]&63];return l}}}]);
