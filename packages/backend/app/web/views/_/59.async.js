"use strict";(self.webpackChunk_vanguard_fe=self.webpackChunk_vanguard_fe||[]).push([[59],{19059:function(rn,we,p){p.d(we,{Z:function(){return qt}});var Me=p(72779),P=p.n(Me),a=p(2784),D=p(35298),Re=p(88243),H=p(85942);function je(){const[e,t]=a.useState([]),n=a.useCallback(o=>(t(i=>[].concat((0,H.Z)(i),[o])),()=>{t(i=>i.filter(r=>r!==o))}),[]);return[e,n]}var ln=p(47583),ze=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};let oe="";function Fe(){return oe}function sn(e){const t=document.createDocumentFragment();let n=Object.assign(Object.assign({},e),{close:f,open:!0}),o;function i(){for(var c=arguments.length,l=new Array(c),d=0;d<c;d++)l[d]=arguments[d];const g=l.some(u=>u&&u.triggerCancel);e.onCancel&&g&&e.onCancel.apply(e,[()=>{}].concat(_toConsumableArray(l.slice(1))));for(let u=0;u<destroyFns.length;u++)if(destroyFns[u]===f){destroyFns.splice(u,1);break}reactUnmount(t)}function r(c){var{okText:l,cancelText:d,prefixCls:g}=c,u=ze(c,["okText","cancelText","prefixCls"]);clearTimeout(o),o=setTimeout(()=>{const m=getConfirmLocale(),{getPrefixCls:C,getIconPrefixCls:x}=globalConfig(),y=C(void 0,Fe()),b=g||`${y}-modal`,$=x();reactRender(React.createElement(ConfirmDialog,Object.assign({},u,{prefixCls:b,rootPrefixCls:y,iconPrefixCls:$,okText:l,locale:m,cancelText:d||m.cancelText})),t)})}function f(){for(var c=arguments.length,l=new Array(c),d=0;d<c;d++)l[d]=arguments[d];n=Object.assign(Object.assign({},n),{open:!1,afterClose:()=>{typeof e.afterClose=="function"&&e.afterClose(),i.apply(this,l)}}),n.visible&&delete n.visible,r(n)}function s(c){typeof c=="function"?n=c(n):n=Object.assign(Object.assign({},n),c),r(n)}return r(n),destroyFns.push(f),{destroy:f,update:s}}function Be(e){return Object.assign(Object.assign({},e),{type:"warning"})}function He(e){return Object.assign(Object.assign({},e),{type:"info"})}function Le(e){return Object.assign(Object.assign({},e),{type:"success"})}function De(e){return Object.assign(Object.assign({},e),{type:"error"})}function Ze(e){return Object.assign(Object.assign({},e),{type:"confirm"})}function cn(e){let{rootPrefixCls:t}=e;oe=t}var Ae=p(62687),U=p(9660),X=p(48341),K=p(47033),Q=p(20094),Y=p(70072),We=p(69247),ae=p(51432),Z=p(91754),z=p(7896),J=p(76854),Ge=p(17206),T=p(33028),ie=p(88637),Ve=p(56598),re=p(92981),Ue=`accept acceptCharset accessKey action allowFullScreen allowTransparency
    alt async autoComplete autoFocus autoPlay capture cellPadding cellSpacing challenge
    charSet checked classID className colSpan cols content contentEditable contextMenu
    controls coords crossOrigin data dateTime default defer dir disabled download draggable
    encType form formAction formEncType formMethod formNoValidate formTarget frameBorder
    headers height hidden high href hrefLang htmlFor httpEquiv icon id inputMode integrity
    is keyParams keyType kind label lang list loop low manifest marginHeight marginWidth max maxLength media
    mediaGroup method min minLength multiple muted name noValidate nonce open
    optimum pattern placeholder poster preload radioGroup readOnly rel required
    reversed role rowSpan rows sandbox scope scoped scrolling seamless selected
    shape size sizes span spellCheck src srcDoc srcLang srcSet start step style
    summary tabIndex target title type useMap value width wmode wrap`,Xe=`onCopy onCut onPaste onCompositionEnd onCompositionStart onCompositionUpdate onKeyDown
    onKeyPress onKeyUp onFocus onBlur onChange onInput onSubmit onClick onContextMenu onDoubleClick
    onDrag onDragEnd onDragEnter onDragExit onDragLeave onDragOver onDragStart onDrop onMouseDown
    onMouseEnter onMouseLeave onMouseMove onMouseOut onMouseOver onMouseUp onSelect onTouchCancel
    onTouchEnd onTouchMove onTouchStart onScroll onWheel onAbort onCanPlay onCanPlayThrough
    onDurationChange onEmptied onEncrypted onEnded onError onLoadedData onLoadedMetadata
    onLoadStart onPause onPlay onPlaying onProgress onRateChange onSeeked onSeeking onStalled onSuspend onTimeUpdate onVolumeChange onWaiting onLoad onError`,Ke="".concat(Ue," ").concat(Xe).split(/[\s\n]+/),Qe="aria-",Ye="data-";function le(e,t){return e.indexOf(t)===0}function Je(e){var t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1,n;t===!1?n={aria:!0,data:!0,attr:!0}:t===!0?n={aria:!0}:n=(0,T.Z)({},t);var o={};return Object.keys(e).forEach(function(i){(n.aria&&(i==="role"||le(i,Qe))||n.data&&le(i,Ye)||n.attr&&Ke.includes(i))&&(o[i]=e[i])}),o}function se(e,t,n){var o=t;return!o&&n&&(o="".concat(e,"-").concat(n)),o}function ce(e,t){var n=e["page".concat(t?"Y":"X","Offset")],o="scroll".concat(t?"Top":"Left");if(typeof n!="number"){var i=e.document;n=i.documentElement[o],typeof n!="number"&&(n=i.body[o])}return n}function qe(e){var t=e.getBoundingClientRect(),n={left:t.left,top:t.top},o=e.ownerDocument,i=o.defaultView||o.parentWindow;return n.left+=ce(i),n.top+=ce(i,!0),n}var de=p(18511),ke=a.memo(function(e){var t=e.children;return t},function(e,t){var n=t.shouldUpdate;return!n}),me={width:0,height:0,overflow:"hidden",outline:"none"},_e=a.forwardRef(function(e,t){var n=e.prefixCls,o=e.className,i=e.style,r=e.title,f=e.ariaId,s=e.footer,c=e.closable,l=e.closeIcon,d=e.onClose,g=e.children,u=e.bodyStyle,m=e.bodyProps,C=e.modalRender,x=e.onMouseDown,y=e.onMouseUp,b=e.holderRef,$=e.visible,S=e.forceRender,v=e.width,h=e.height,O=(0,a.useRef)(),I=(0,a.useRef)();a.useImperativeHandle(t,function(){return{focus:function(){var w;(w=O.current)===null||w===void 0||w.focus()},changeActive:function(w){var L=document,G=L.activeElement;w&&G===I.current?O.current.focus():!w&&G===O.current&&I.current.focus()}}});var M={};v!==void 0&&(M.width=v),h!==void 0&&(M.height=h);var R;s&&(R=a.createElement("div",{className:"".concat(n,"-footer")},s));var j;r&&(j=a.createElement("div",{className:"".concat(n,"-header")},a.createElement("div",{className:"".concat(n,"-title"),id:f},r)));var N;c&&(N=a.createElement("button",{type:"button",onClick:d,"aria-label":"Close",className:"".concat(n,"-close")},l||a.createElement("span",{className:"".concat(n,"-close-x")})));var W=a.createElement("div",{className:"".concat(n,"-content")},N,j,a.createElement("div",(0,z.Z)({className:"".concat(n,"-body"),style:u},m),g),R);return a.createElement("div",{key:"dialog-element",role:"dialog","aria-labelledby":r?f:null,"aria-modal":"true",ref:b,style:(0,T.Z)((0,T.Z)({},i),M),className:P()(n,o),onMouseDown:x,onMouseUp:y},a.createElement("div",{tabIndex:0,ref:O,style:me,"aria-hidden":"true"}),a.createElement(ke,{shouldUpdate:$||S},C?C(W):W),a.createElement("div",{tabIndex:0,ref:I,style:me,"aria-hidden":"true"}))}),et=_e,fe=a.forwardRef(function(e,t){var n=e.prefixCls,o=e.title,i=e.style,r=e.className,f=e.visible,s=e.forceRender,c=e.destroyOnClose,l=e.motionName,d=e.ariaId,g=e.onVisibleChanged,u=e.mousePosition,m=(0,a.useRef)(),C=a.useState(),x=(0,J.Z)(C,2),y=x[0],b=x[1],$={};y&&($.transformOrigin=y);function S(){var v=qe(m.current);b(u?"".concat(u.x-v.left,"px ").concat(u.y-v.top,"px"):"")}return a.createElement(de.ZP,{visible:f,onVisibleChanged:g,onAppearPrepare:S,onEnterPrepare:S,forceRender:s,motionName:l,removeOnLeave:c,ref:m},function(v,h){var O=v.className,I=v.style;return a.createElement(et,(0,z.Z)({},e,{ref:t,title:o,ariaId:d,prefixCls:n,holderRef:h,style:(0,T.Z)((0,T.Z)((0,T.Z)({},I),i),$),className:P()(r,O)}))})});fe.displayName="Content";var tt=fe;function nt(e){var t=e.prefixCls,n=e.style,o=e.visible,i=e.maskProps,r=e.motionName;return a.createElement(de.ZP,{key:"mask",visible:o,motionName:r,leavedClassName:"".concat(t,"-mask-hidden")},function(f,s){var c=f.className,l=f.style;return a.createElement("div",(0,z.Z)({ref:s,style:(0,T.Z)((0,T.Z)({},l),n),className:P()("".concat(t,"-mask"),c)},i))})}function ot(e){var t=e.prefixCls,n=t===void 0?"rc-dialog":t,o=e.zIndex,i=e.visible,r=i===void 0?!1:i,f=e.keyboard,s=f===void 0?!0:f,c=e.focusTriggerAfterClose,l=c===void 0?!0:c,d=e.wrapStyle,g=e.wrapClassName,u=e.wrapProps,m=e.onClose,C=e.afterOpenChange,x=e.afterClose,y=e.transitionName,b=e.animation,$=e.closable,S=$===void 0?!0:$,v=e.mask,h=v===void 0?!0:v,O=e.maskTransitionName,I=e.maskAnimation,M=e.maskClosable,R=M===void 0?!0:M,j=e.maskStyle,N=e.maskProps,W=e.rootClassName,B=(0,a.useRef)(),w=(0,a.useRef)(),L=(0,a.useRef)(),G=a.useState(r),Ie=(0,J.Z)(G,2),_=Ie[0],Ne=Ie[1],kt=(0,Ve.Z)();function _t(){(0,ie.Z)(w.current,document.activeElement)||(B.current=document.activeElement)}function en(){if(!(0,ie.Z)(w.current,document.activeElement)){var E;(E=L.current)===null||E===void 0||E.focus()}}function tn(E){if(E)en();else{if(Ne(!1),h&&B.current&&l){try{B.current.focus({preventScroll:!0})}catch(ne){}B.current=null}_&&(x==null||x())}C==null||C(E)}function ee(E){m==null||m(E)}var V=(0,a.useRef)(!1),te=(0,a.useRef)(),nn=function(){clearTimeout(te.current),V.current=!0},on=function(){te.current=setTimeout(function(){V.current=!1})},Te=null;R&&(Te=function(ne){V.current?V.current=!1:w.current===ne.target&&ee(ne)});function an(E){if(s&&E.keyCode===re.Z.ESC){E.stopPropagation(),ee(E);return}r&&E.keyCode===re.Z.TAB&&L.current.changeActive(!E.shiftKey)}return(0,a.useEffect)(function(){r&&(Ne(!0),_t())},[r]),(0,a.useEffect)(function(){return function(){clearTimeout(te.current)}},[]),a.createElement("div",(0,z.Z)({className:P()("".concat(n,"-root"),W)},Je(e,{data:!0})),a.createElement(nt,{prefixCls:n,visible:h&&r,motionName:se(n,O,I),style:(0,T.Z)({zIndex:o},j),maskProps:N}),a.createElement("div",(0,z.Z)({tabIndex:-1,onKeyDown:an,className:P()("".concat(n,"-wrap"),g),ref:w,onClick:Te,style:(0,T.Z)((0,T.Z)({zIndex:o},d),{},{display:_?null:"none"})},u),a.createElement(tt,(0,z.Z)({},e,{onMouseDown:nn,onMouseUp:on,ref:L,closable:S,ariaId:kt,prefixCls:n,visible:r&&_,onClose:ee,onVisibleChanged:tn,motionName:se(n,y,b)}))))}var ue=function(t){var n=t.visible,o=t.getContainer,i=t.forceRender,r=t.destroyOnClose,f=r===void 0?!1:r,s=t.afterClose,c=a.useState(n),l=(0,J.Z)(c,2),d=l[0],g=l[1];return a.useEffect(function(){n&&g(!0)},[n]),!i&&f&&!d?null:a.createElement(Ge.Z,{open:n||i||d,autoDestroy:!1,getContainer:o,autoLock:n||d},a.createElement(ot,(0,z.Z)({},t,{destroyOnClose:f,afterClose:function(){s==null||s(),g(!1)}})))};ue.displayName="Dialog";var at=ue,it=at,rt=p(96619),lt=p(74274),st=p(23685),ge=p(65393),Ce=p(24832),ct=p(6696),dt=p(38054),mt=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};function ve(e,t){return a.createElement("span",{className:`${e}-close-x`},t||a.createElement(ge.Z,{className:`${e}-close-icon`}))}const pe=e=>{const{okText:t,okType:n="primary",cancelText:o,confirmLoading:i,onOk:r,onCancel:f,okButtonProps:s,cancelButtonProps:c}=e,[l]=(0,U.Z)("Modal",(0,dt.A)());return a.createElement(a.Fragment,null,a.createElement(Ce.ZP,Object.assign({onClick:f},c),o||(l==null?void 0:l.cancelText)),a.createElement(Ce.ZP,Object.assign({},(0,ct.n)(n),{loading:i,onClick:r},s),t||(l==null?void 0:l.okText)))},dn=e=>{const{prefixCls:t,className:n,closeIcon:o,closable:i,type:r,title:f,children:s}=e,c=mt(e,["prefixCls","className","closeIcon","closable","type","title","children"]),{getPrefixCls:l}=React.useContext(ConfigContext),d=l(),g=t||l("modal"),[,u]=useStyle(g),m=`${g}-confirm`;let C={};return r?C={closable:i!=null?i:!1,title:"",footer:"",children:React.createElement(ConfirmContent,Object.assign({},e,{confirmPrefixCls:m,rootPrefixCls:d,content:s}))}:C={closable:i!=null?i:!0,title:f,footer:e.footer===void 0?React.createElement(pe,Object.assign({},e)):e.footer,children:s},React.createElement(Panel,Object.assign({prefixCls:g,className:classNames(u,`${g}-pure-panel`,r&&m,r&&`${m}-${r}`,n)},c,{closeIcon:ve(g,o),closable:i},C))};var mn=null,A=p(23773),F=p(33569),ft=p(6521);const ut=new F.E4("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),gt=new F.E4("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),Ct=function(e){let t=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:n}=e,o=`${n}-fade`,i=t?"&":"";return[(0,ft.R)(o,ut,gt,e.motionDurationMid,t),{[`
        ${i}${o}-enter,
        ${i}${o}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${i}${o}-leave`]:{animationTimingFunction:"linear"}}]};var vt=p(94120),q=p(44875),ye=p(23707);function be(e){return{position:e,top:0,insetInlineEnd:0,bottom:0,insetInlineStart:0}}const pt=e=>{const{componentCls:t,antCls:n}=e;return[{[`${t}-root`]:{[`${t}${n}-zoom-enter, ${t}${n}-zoom-appear`]:{transform:"none",opacity:0,animationDuration:e.motionDurationSlow,userSelect:"none"},[`${t}${n}-zoom-leave ${t}-content`]:{pointerEvents:"none"},[`${t}-mask`]:Object.assign(Object.assign({},be("fixed")),{zIndex:e.zIndexPopupBase,height:"100%",backgroundColor:e.colorBgMask,[`${t}-hidden`]:{display:"none"}}),[`${t}-wrap`]:Object.assign(Object.assign({},be("fixed")),{overflow:"auto",outline:0,WebkitOverflowScrolling:"touch"})}},{[`${t}-root`]:Ct(e)}]},yt=e=>{const{componentCls:t}=e;return[{[`${t}-root`]:{[`${t}-wrap`]:{zIndex:e.zIndexPopupBase,position:"fixed",inset:0,overflow:"auto",outline:0,WebkitOverflowScrolling:"touch"},[`${t}-wrap-rtl`]:{direction:"rtl"},[`${t}-centered`]:{textAlign:"center","&::before":{display:"inline-block",width:0,height:"100%",verticalAlign:"middle",content:'""'},[t]:{top:0,display:"inline-block",paddingBottom:0,textAlign:"start",verticalAlign:"middle"}},[`@media (max-width: ${e.screenSMMax})`]:{[t]:{maxWidth:"calc(100vw - 16px)",margin:`${e.marginXS} auto`},[`${t}-centered`]:{[t]:{flex:1}}}}},{[t]:Object.assign(Object.assign({},(0,A.Wf)(e)),{pointerEvents:"none",position:"relative",top:100,width:"auto",maxWidth:`calc(100vw - ${e.margin*2}px)`,margin:"0 auto",paddingBottom:e.paddingLG,[`${t}-title`]:{margin:0,color:e.modalHeadingColor,fontWeight:e.fontWeightStrong,fontSize:e.modalHeaderTitleFontSize,lineHeight:e.modalHeaderTitleLineHeight,wordWrap:"break-word"},[`${t}-content`]:{position:"relative",backgroundColor:e.modalContentBg,backgroundClip:"padding-box",border:0,borderRadius:e.borderRadiusLG,boxShadow:e.boxShadow,pointerEvents:"auto",padding:`${e.paddingMD}px ${e.paddingContentHorizontalLG}px`},[`${t}-close`]:Object.assign({position:"absolute",top:(e.modalHeaderCloseSize-e.modalCloseBtnSize)/2,insetInlineEnd:(e.modalHeaderCloseSize-e.modalCloseBtnSize)/2,zIndex:e.zIndexPopupBase+10,padding:0,color:e.modalCloseColor,fontWeight:e.fontWeightStrong,lineHeight:1,textDecoration:"none",background:"transparent",borderRadius:e.borderRadiusSM,width:e.modalConfirmIconSize,height:e.modalConfirmIconSize,border:0,outline:0,cursor:"pointer",transition:`color ${e.motionDurationMid}, background-color ${e.motionDurationMid}`,"&-x":{display:"block",fontSize:e.fontSizeLG,fontStyle:"normal",lineHeight:`${e.modalCloseBtnSize}px`,textAlign:"center",textTransform:"none",textRendering:"auto"},"&:hover":{color:e.modalIconHoverColor,backgroundColor:e.wireframe?"transparent":e.colorFillContent,textDecoration:"none"},"&:active":{backgroundColor:e.wireframe?"transparent":e.colorFillContentHover}},(0,A.Qy)(e)),[`${t}-header`]:{color:e.colorText,background:e.modalHeaderBg,borderRadius:`${e.borderRadiusLG}px ${e.borderRadiusLG}px 0 0`,marginBottom:e.marginXS},[`${t}-body`]:{fontSize:e.fontSize,lineHeight:e.lineHeight,wordWrap:"break-word"},[`${t}-footer`]:{textAlign:"end",background:e.modalFooterBg,marginTop:e.marginSM,[`${e.antCls}-btn + ${e.antCls}-btn:not(${e.antCls}-dropdown-trigger)`]:{marginBottom:0,marginInlineStart:e.marginXS}},[`${t}-open`]:{overflow:"hidden"}})},{[`${t}-pure-panel`]:{top:"auto",padding:0,display:"flex",flexDirection:"column",[`${t}-content,
          ${t}-body,
          ${t}-confirm-body-wrapper`]:{display:"flex",flexDirection:"column",flex:"auto"},[`${t}-confirm-body`]:{marginBottom:"auto"}}}]},bt=e=>{const{componentCls:t}=e,n=`${t}-confirm`;return{[n]:{"&-rtl":{direction:"rtl"},[`${e.antCls}-modal-header`]:{display:"none"},[`${n}-body-wrapper`]:Object.assign({},(0,A.dF)()),[`${n}-body`]:{display:"flex",flexWrap:"wrap",alignItems:"center",[`${n}-title`]:{flex:"0 0 100%",display:"block",overflow:"hidden",color:e.colorTextHeading,fontWeight:e.fontWeightStrong,fontSize:e.modalHeaderTitleFontSize,lineHeight:e.modalHeaderTitleLineHeight,[`+ ${n}-content`]:{marginBlockStart:e.marginXS,flexBasis:"100%",maxWidth:`calc(100% - ${e.modalConfirmIconSize+e.marginSM}px)`}},[`${n}-content`]:{color:e.colorText,fontSize:e.fontSize},[`> ${e.iconCls}`]:{flex:"none",marginInlineEnd:e.marginSM,fontSize:e.modalConfirmIconSize,[`+ ${n}-title`]:{flex:1},[`+ ${n}-title + ${n}-content`]:{marginInlineStart:e.modalConfirmIconSize+e.marginSM}}},[`${n}-btns`]:{textAlign:"end",marginTop:e.marginSM,[`${e.antCls}-btn + ${e.antCls}-btn`]:{marginBottom:0,marginInlineStart:e.marginXS}}},[`${n}-error ${n}-body > ${e.iconCls}`]:{color:e.colorError},[`${n}-warning ${n}-body > ${e.iconCls},
        ${n}-confirm ${n}-body > ${e.iconCls}`]:{color:e.colorWarning},[`${n}-info ${n}-body > ${e.iconCls}`]:{color:e.colorInfo},[`${n}-success ${n}-body > ${e.iconCls}`]:{color:e.colorSuccess}}},xt=e=>{const{componentCls:t}=e;return{[`${t}-root`]:{[`${t}-wrap-rtl`]:{direction:"rtl",[`${t}-confirm-body`]:{direction:"rtl"}}}}},ht=e=>{const{componentCls:t,antCls:n}=e,o=`${t}-confirm`;return{[t]:{[`${t}-content`]:{padding:0},[`${t}-header`]:{padding:e.modalHeaderPadding,borderBottom:`${e.modalHeaderBorderWidth}px ${e.modalHeaderBorderStyle} ${e.modalHeaderBorderColorSplit}`,marginBottom:0},[`${t}-body`]:{padding:e.modalBodyPadding},[`${t}-footer`]:{padding:`${e.modalFooterPaddingVertical}px ${e.modalFooterPaddingHorizontal}px`,borderTop:`${e.modalFooterBorderWidth}px ${e.modalFooterBorderStyle} ${e.modalFooterBorderColorSplit}`,borderRadius:`0 0 ${e.borderRadiusLG}px ${e.borderRadiusLG}px`,marginTop:0}},[o]:{[`${n}-modal-body`]:{padding:`${e.padding*2}px ${e.padding*2}px ${e.paddingLG}px`},[`${o}-body`]:{[`> ${e.iconCls}`]:{marginInlineEnd:e.margin,[`+ ${o}-title + ${o}-content`]:{marginInlineStart:e.modalConfirmIconSize+e.margin}}},[`${o}-btns`]:{marginTop:e.marginLG}}}};var $t=(0,q.Z)("Modal",e=>{const t=e.padding,n=e.fontSizeHeading5,o=e.lineHeightHeading5,i=(0,ye.TS)(e,{modalBodyPadding:e.paddingLG,modalHeaderBg:e.colorBgElevated,modalHeaderPadding:`${t}px ${e.paddingLG}px`,modalHeaderBorderWidth:e.lineWidth,modalHeaderBorderStyle:e.lineType,modalHeaderTitleLineHeight:o,modalHeaderTitleFontSize:n,modalHeaderBorderColorSplit:e.colorSplit,modalHeaderCloseSize:o*n+t*2,modalContentBg:e.colorBgElevated,modalHeadingColor:e.colorTextHeading,modalCloseColor:e.colorTextDescription,modalFooterBg:"transparent",modalFooterBorderColorSplit:e.colorSplit,modalFooterBorderStyle:e.lineType,modalFooterPaddingVertical:e.paddingXS,modalFooterPaddingHorizontal:e.padding,modalFooterBorderWidth:e.lineWidth,modalConfirmTitleFontSize:e.fontSizeLG,modalIconHoverColor:e.colorIconHover,modalConfirmIconSize:e.fontSize*e.lineHeight,modalCloseBtnSize:e.controlHeightLG*.55});return[yt(i),bt(i),xt(i),pt(i),e.wireframe&&ht(i),(0,vt._y)(i,"zoom")]}),St=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};let k;const Et=e=>{k={x:e.pageX,y:e.pageY},setTimeout(()=>{k=null},100)};(0,st.jD)()&&document.documentElement.addEventListener("click",Et,!0);var Pt=e=>{var t;const{getPopupContainer:n,getPrefixCls:o,direction:i}=a.useContext(D.E_),r=j=>{const{onCancel:N}=e;N==null||N(j)},f=j=>{const{onOk:N}=e;N==null||N(j)},{prefixCls:s,className:c,rootClassName:l,open:d,wrapClassName:g,centered:u,getContainer:m,closeIcon:C,focusTriggerAfterClose:x=!0,visible:y,width:b=520,footer:$}=e,S=St(e,["prefixCls","className","rootClassName","open","wrapClassName","centered","getContainer","closeIcon","focusTriggerAfterClose","visible","width","footer"]),v=o("modal",s),h=o(),[O,I]=$t(v),M=P()(g,{[`${v}-centered`]:!!u,[`${v}-wrap-rtl`]:i==="rtl"}),R=$===void 0?a.createElement(pe,Object.assign({},e,{onOk:f,onCancel:r})):$;return O(a.createElement(lt.BR,null,a.createElement(rt.Ux,{status:!0,override:!0},a.createElement(it,Object.assign({width:b},S,{getContainer:m===void 0?n:m,prefixCls:v,rootClassName:P()(I,l),wrapClassName:M,footer:R,visible:d!=null?d:y,mousePosition:(t=S.mousePosition)!==null&&t!==void 0?t:k,onClose:r,closeIcon:ve(v,C),focusTriggerAfterClose:x,transitionName:(0,Z.mL)(h,"zoom",e.transitionName),maskTransitionName:(0,Z.mL)(h,"fade",e.maskTransitionName),className:P()(I,c)})))))};function Ot(e){const{icon:t,onCancel:n,onOk:o,close:i,okText:r,okButtonProps:f,cancelText:s,cancelButtonProps:c,confirmPrefixCls:l,rootPrefixCls:d,type:g,okCancel:u,footer:m,locale:C}=e;let x=t;if(!t&&t!==null)switch(g){case"info":x=a.createElement(Y.Z,null);break;case"success":x=a.createElement(X.Z,null);break;case"error":x=a.createElement(K.Z,null);break;default:x=a.createElement(Q.Z,null)}const y=e.okType||"primary",b=u!=null?u:g==="confirm",$=e.autoFocusButton===null?!1:e.autoFocusButton||"ok",[S]=(0,U.Z)("Modal"),v=C||S,h=b&&a.createElement(ae.Z,{actionFn:n,close:i,autoFocus:$==="cancel",buttonProps:c,prefixCls:`${d}-btn`},s||(v==null?void 0:v.cancelText));return a.createElement("div",{className:`${l}-body-wrapper`},a.createElement("div",{className:`${l}-body`},x,e.title===void 0?null:a.createElement("span",{className:`${l}-title`},e.title),a.createElement("div",{className:`${l}-content`},e.content)),m===void 0?a.createElement("div",{className:`${l}-btns`},h,a.createElement(ae.Z,{type:y,actionFn:o,close:i,autoFocus:$==="ok",buttonProps:f,prefixCls:`${d}-btn`},r||(b?v==null?void 0:v.okText:v==null?void 0:v.justOkText))):m)}var It=e=>{const{close:t,zIndex:n,afterClose:o,visible:i,open:r,keyboard:f,centered:s,getContainer:c,maskStyle:l,direction:d,prefixCls:g,wrapClassName:u,rootPrefixCls:m,iconPrefixCls:C,bodyStyle:x,closable:y=!1,closeIcon:b,modalRender:$,focusTriggerAfterClose:S}=e,v=`${g}-confirm`,h=e.width||416,O=e.style||{},I=e.mask===void 0?!0:e.mask,M=e.maskClosable===void 0?!1:e.maskClosable,R=P()(v,`${v}-${e.type}`,{[`${v}-rtl`]:d==="rtl"},e.className);return a.createElement(We.ZP,{prefixCls:m,iconPrefixCls:C,direction:d},a.createElement(Pt,{prefixCls:g,className:R,wrapClassName:P()({[`${v}-centered`]:!!e.centered},u),onCancel:()=>t==null?void 0:t({triggerCancel:!0}),open:r,title:"",footer:null,transitionName:(0,Z.mL)(m,"zoom",e.transitionName),maskTransitionName:(0,Z.mL)(m,"fade",e.maskTransitionName),mask:I,maskClosable:M,maskStyle:l,style:O,bodyStyle:x,width:h,zIndex:n,afterClose:o,keyboard:f,centered:s,getContainer:c,closable:y,closeIcon:b,modalRender:$,focusTriggerAfterClose:S},a.createElement(Ot,Object.assign({},e,{confirmPrefixCls:v}))))};const Nt=(e,t)=>{let{afterClose:n,config:o}=e;var i;const[r,f]=a.useState(!0),[s,c]=a.useState(o),{direction:l,getPrefixCls:d}=a.useContext(D.E_),g=d("modal"),u=d(),m=()=>{var b;n(),(b=s.afterClose)===null||b===void 0||b.call(s)},C=function(){f(!1);for(var b=arguments.length,$=new Array(b),S=0;S<b;S++)$[S]=arguments[S];const v=$.some(h=>h&&h.triggerCancel);s.onCancel&&v&&s.onCancel.apply(s,[()=>{}].concat((0,H.Z)($.slice(1))))};a.useImperativeHandle(t,()=>({destroy:C,update:b=>{c($=>Object.assign(Object.assign({},$),b))}}));const x=(i=s.okCancel)!==null&&i!==void 0?i:s.type==="confirm",[y]=(0,U.Z)("Modal",Ae.Z.Modal);return a.createElement(It,Object.assign({prefixCls:g,rootPrefixCls:u},s,{close:C,open:r,afterClose:m,okText:s.okText||(x?y==null?void 0:y.okText:y==null?void 0:y.justOkText),direction:s.direction||l,cancelText:s.cancelText||(y==null?void 0:y.cancelText)}))};var Tt=a.forwardRef(Nt),wt=[];let xe=0;const Mt=a.memo(a.forwardRef((e,t)=>{const[n,o]=je();return a.useImperativeHandle(t,()=>({patchElement:o}),[]),a.createElement(a.Fragment,null,n)}));function Rt(){const e=a.useRef(null),[t,n]=a.useState([]);a.useEffect(()=>{t.length&&((0,H.Z)(t).forEach(f=>{f()}),n([]))},[t]);const o=a.useCallback(r=>function(s){var c;xe+=1;const l=a.createRef();let d;const g=a.createElement(Tt,{key:`modal-${xe}`,config:r(s),ref:l,afterClose:()=>{d==null||d()}});return d=(c=e.current)===null||c===void 0?void 0:c.patchElement(g),d&&wt.push(d),{destroy:()=>{function u(){var m;(m=l.current)===null||m===void 0||m.destroy()}l.current?u():n(m=>[].concat((0,H.Z)(m),[u]))},update:u=>{function m(){var C;(C=l.current)===null||C===void 0||C.update(u)}l.current?m():n(C=>[].concat((0,H.Z)(C),[m]))}}},[]);return[a.useMemo(()=>({info:o(He),success:o(Le),error:o(De),warning:o(Be),confirm:o(Ze)}),[]),a.createElement(Mt,{key:"modal-holder",ref:e})]}var jt=Rt,zt=p(37757);function Ft(e,t,n){let o;switch(e){case"top":o={left:"50%",transform:"translateX(-50%)",right:"auto",top:t,bottom:"auto"};break;case"topLeft":o={left:0,top:t,bottom:"auto"};break;case"topRight":o={right:0,top:t,bottom:"auto"};break;case"bottom":o={left:"50%",transform:"translateX(-50%)",right:"auto",top:"auto",bottom:n};break;case"bottomLeft":o={left:0,top:"auto",bottom:n};break;default:o={right:0,top:"auto",bottom:n};break}return o}function Bt(e){return{motionName:`${e}-fade`}}var Ht=e=>{const{componentCls:t,width:n,notificationMarginEdge:o}=e,i=new F.E4("antNotificationTopFadeIn",{"0%":{marginTop:"-100%",opacity:0},"100%":{marginTop:0,opacity:1}}),r=new F.E4("antNotificationBottomFadeIn",{"0%":{marginBottom:"-100%",opacity:0},"100%":{marginBottom:0,opacity:1}}),f=new F.E4("antNotificationLeftFadeIn",{"0%":{right:{_skip_check_:!0,value:n},opacity:0},"100%":{right:{_skip_check_:!0,value:0},opacity:1}});return{[`&${t}-top, &${t}-bottom`]:{marginInline:0},[`&${t}-top`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:i}},[`&${t}-bottom`]:{[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:r}},[`&${t}-topLeft, &${t}-bottomLeft`]:{marginInlineEnd:0,marginInlineStart:o,[`${t}-fade-enter${t}-fade-enter-active, ${t}-fade-appear${t}-fade-appear-active`]:{animationName:f}}}};const Lt=e=>{const{iconCls:t,componentCls:n,boxShadow:o,fontSizeLG:i,notificationMarginBottom:r,borderRadiusLG:f,colorSuccess:s,colorInfo:c,colorWarning:l,colorError:d,colorTextHeading:g,notificationBg:u,notificationPadding:m,notificationMarginEdge:C,motionDurationMid:x,motionEaseInOut:y,fontSize:b,lineHeight:$,width:S,notificationIconSize:v}=e,h=`${n}-notice`,O=new F.E4("antNotificationFadeIn",{"0%":{left:{_skip_check_:!0,value:S},opacity:0},"100%":{left:{_skip_check_:!0,value:0},opacity:1}}),I=new F.E4("antNotificationFadeOut",{"0%":{maxHeight:e.animationMaxHeight,marginBottom:r,opacity:1},"100%":{maxHeight:0,marginBottom:0,paddingTop:0,paddingBottom:0,opacity:0}});return[{[n]:Object.assign(Object.assign(Object.assign(Object.assign({},(0,A.Wf)(e)),{position:"fixed",zIndex:e.zIndexPopup,marginInlineEnd:C,[`${n}-hook-holder`]:{position:"relative"},[`&${n}-top, &${n}-bottom`]:{[`${n}-notice`]:{marginInline:"auto auto"}},[`&${n}-topLeft, &${n}-bottomLeft`]:{[`${n}-notice`]:{marginInlineEnd:"auto",marginInlineStart:0}},[`${n}-fade-enter, ${n}-fade-appear`]:{animationDuration:e.motionDurationMid,animationTimingFunction:y,animationFillMode:"both",opacity:0,animationPlayState:"paused"},[`${n}-fade-leave`]:{animationTimingFunction:y,animationFillMode:"both",animationDuration:x,animationPlayState:"paused"},[`${n}-fade-enter${n}-fade-enter-active, ${n}-fade-appear${n}-fade-appear-active`]:{animationName:O,animationPlayState:"running"},[`${n}-fade-leave${n}-fade-leave-active`]:{animationName:I,animationPlayState:"running"}}),Ht(e)),{"&-rtl":{direction:"rtl",[`${n}-notice-btn`]:{float:"left"}}})},{[h]:{position:"relative",width:S,maxWidth:`calc(100vw - ${C*2}px)`,marginBottom:r,marginInlineStart:"auto",padding:m,overflow:"hidden",lineHeight:$,wordWrap:"break-word",background:u,borderRadius:f,boxShadow:o,[`${n}-close-icon`]:{fontSize:b,cursor:"pointer"},[`${h}-message`]:{marginBottom:e.marginXS,color:g,fontSize:i,lineHeight:e.lineHeightLG},[`${h}-description`]:{fontSize:b},[`&${h}-closable ${h}-message`]:{paddingInlineEnd:e.paddingLG},[`${h}-with-icon ${h}-message`]:{marginBottom:e.marginXS,marginInlineStart:e.marginSM+v,fontSize:i},[`${h}-with-icon ${h}-description`]:{marginInlineStart:e.marginSM+v,fontSize:b},[`${h}-icon`]:{position:"absolute",fontSize:v,lineHeight:0,[`&-success${t}`]:{color:s},[`&-info${t}`]:{color:c},[`&-warning${t}`]:{color:l},[`&-error${t}`]:{color:d}},[`${h}-close`]:{position:"absolute",top:e.notificationPaddingVertical,insetInlineEnd:e.notificationPaddingHorizontal,color:e.colorIcon,outline:"none",width:e.notificationCloseButtonSize,height:e.notificationCloseButtonSize,borderRadius:e.borderRadiusSM,transition:`background-color ${e.motionDurationMid}, color ${e.motionDurationMid}`,display:"flex",alignItems:"center",justifyContent:"center","&:hover":{color:e.colorIconHover,backgroundColor:e.wireframe?"transparent":e.colorFillContent}},[`${h}-btn`]:{float:"right",marginTop:e.marginSM}}},{[`${h}-pure-panel`]:{margin:0}}]};var Dt=(0,q.Z)("Notification",e=>{const t=e.paddingMD,n=e.paddingLG,o=(0,ye.TS)(e,{notificationBg:e.colorBgElevated,notificationPaddingVertical:t,notificationPaddingHorizontal:n,notificationPadding:`${e.paddingMD}px ${e.paddingContentHorizontalLG}px`,notificationMarginBottom:e.margin,notificationMarginEdge:e.marginLG,animationMaxHeight:150,notificationIconSize:e.fontSizeLG*e.lineHeightLG,notificationCloseButtonSize:e.controlHeightLG*.55});return[Lt(o)]},e=>({zIndexPopup:e.zIndexPopupBase+50,width:384})),Zt=p(62918),At=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};const vn={info:a.createElement(Y.Z,null),success:a.createElement(X.Z,null),error:a.createElement(K.Z,null),warning:a.createElement(Q.Z,null),loading:a.createElement(Zt.Z,null)};function he(e,t){return t||a.createElement("span",{className:`${e}-close-x`},a.createElement(ge.Z,{className:`${e}-close-icon`}))}const Wt={success:X.Z,info:Y.Z,error:K.Z,warning:Q.Z};function $e(e){let{prefixCls:t,icon:n,type:o,message:i,description:r,btn:f}=e,s=null;return n?s=a.createElement("span",{className:`${t}-icon`},n):o&&(s=a.createElement(Wt[o]||null,{className:P()(`${t}-icon`,`${t}-icon-${o}`)})),a.createElement("div",{className:P()({[`${t}-with-icon`]:s}),role:"alert"},s,a.createElement("div",{className:`${t}-message`},i),a.createElement("div",{className:`${t}-description`},r),f&&a.createElement("div",{className:`${t}-btn`},f))}function pn(e){const{prefixCls:t,className:n,icon:o,type:i,message:r,description:f,btn:s,closable:c=!0,closeIcon:l}=e,d=At(e,["prefixCls","className","icon","type","message","description","btn","closable","closeIcon"]),{getPrefixCls:g}=React.useContext(ConfigContext),u=t||g("notification"),m=`${u}-notice`,[,C]=useStyle(u);return React.createElement(Notice,Object.assign({},d,{prefixCls:u,className:classNames(n,C,`${m}-pure-panel`),eventKey:"pure",duration:null,closable:c,closeIcon:he(u,l),content:React.createElement($e,{prefixCls:m,icon:o,type:i,message:r,description:f,btn:s})}))}var Gt=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&t.indexOf(o)<0&&(n[o]=e[o]);if(e!=null&&typeof Object.getOwnPropertySymbols=="function")for(var i=0,o=Object.getOwnPropertySymbols(e);i<o.length;i++)t.indexOf(o[i])<0&&Object.prototype.propertyIsEnumerable.call(e,o[i])&&(n[o[i]]=e[o[i]]);return n};const Se=24,Vt=4.5,Ut=a.forwardRef((e,t)=>{const{top:n,bottom:o,prefixCls:i,getContainer:r,maxCount:f,rtl:s,onAllRemoved:c}=e,{getPrefixCls:l,getPopupContainer:d}=a.useContext(D.E_),g=i||l("notification"),u=$=>Ft($,n!=null?n:Se,o!=null?o:Se),[,m]=Dt(g),C=()=>P()(m,{[`${g}-rtl`]:s}),x=()=>Bt(g),[y,b]=(0,zt.l)({prefixCls:g,style:u,className:C,motion:x,closable:!0,closeIcon:he(g),duration:Vt,getContainer:()=>(r==null?void 0:r())||(d==null?void 0:d())||document.body,maxCount:f,onAllRemoved:c});return a.useImperativeHandle(t,()=>Object.assign(Object.assign({},y),{prefixCls:g,hashId:m})),b});function Xt(e){const t=a.useRef(null);return[a.useMemo(()=>{const o=s=>{if(!t.current)return;const{open:c,prefixCls:l,hashId:d}=t.current,g=`${l}-notice`,{message:u,description:m,icon:C,type:x,btn:y,className:b}=s,$=Gt(s,["message","description","icon","type","btn","className"]);return c(Object.assign(Object.assign({placement:"topRight"},$),{content:a.createElement($e,{prefixCls:g,icon:C,type:x,message:u,description:m,btn:y}),className:P()(x&&`${g}-${x}`,d,b)}))},r={open:o,destroy:s=>{var c,l;s!==void 0?(c=t.current)===null||c===void 0||c.close(s):(l=t.current)===null||l===void 0||l.destroy()}};return["success","info","warning","error"].forEach(s=>{r[s]=c=>o(Object.assign(Object.assign({},c),{type:s}))}),r},[]),a.createElement(Ut,Object.assign({key:"notification-holder"},e,{ref:t}))]}function Kt(e){return Xt(e)}const Ee=a.createContext({});var Pe=a.createContext({message:{},notification:{},modal:{}});const Qt=e=>{const{componentCls:t,colorText:n,fontSize:o,lineHeight:i,fontFamily:r}=e;return{[t]:{color:n,fontSize:o,lineHeight:i,fontFamily:r}}};var Yt=(0,q.Z)("App",e=>[Qt(e)]);const Jt=()=>a.useContext(Pe),Oe=e=>{const{prefixCls:t,children:n,className:o,rootClassName:i,message:r,notification:f,style:s}=e,{getPrefixCls:c}=(0,a.useContext)(D.E_),l=c("app",t),[d,g]=Yt(l),u=P()(g,l,o,i),m=(0,a.useContext)(Ee),C=a.useMemo(()=>({message:Object.assign(Object.assign({},m.message),r),notification:Object.assign(Object.assign({},m.notification),f)}),[r,f,m.message,m.message]),[x,y]=(0,Re.Z)(C.message),[b,$]=Kt(C.notification),[S,v]=jt(),h=a.useMemo(()=>({message:x,notification:b,modal:S}),[x,b,S]);return d(a.createElement(Pe.Provider,{value:h},a.createElement(Ee.Provider,{value:C},a.createElement("div",{className:u,style:s},v,y,$,n))))};Oe.useApp=Jt;var qt=Oe}}]);