var Ae=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function F(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var R={exports:{}},n={};/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h=Symbol.for("react.element"),G=Symbol.for("react.portal"),K=Symbol.for("react.fragment"),X=Symbol.for("react.strict_mode"),Z=Symbol.for("react.profiler"),J=Symbol.for("react.provider"),Q=Symbol.for("react.context"),Y=Symbol.for("react.forward_ref"),ee=Symbol.for("react.suspense"),te=Symbol.for("react.memo"),re=Symbol.for("react.lazy"),x=Symbol.iterator;function ne(e){return e===null||typeof e!="object"?null:(e=x&&e[x]||e["@@iterator"],typeof e=="function"?e:null)}var N={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},A=Object.assign,L={};function y(e,t,r){this.props=e,this.context=t,this.refs=L,this.updater=r||N}y.prototype.isReactComponent={};y.prototype.setState=function(e,t){if(typeof e!="object"&&typeof e!="function"&&e!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,e,t,"setState")};y.prototype.forceUpdate=function(e){this.updater.enqueueForceUpdate(this,e,"forceUpdate")};function P(){}P.prototype=y.prototype;function g(e,t,r){this.props=e,this.context=t,this.refs=L,this.updater=r||N}var C=g.prototype=new P;C.constructor=g;A(C,y.prototype);C.isPureReactComponent=!0;var S=Array.isArray,V=Object.prototype.hasOwnProperty,b={current:null},O={key:!0,ref:!0,__self:!0,__source:!0};function T(e,t,r){var o,u={},c=null,i=null;if(t!=null)for(o in t.ref!==void 0&&(i=t.ref),t.key!==void 0&&(c=""+t.key),t)V.call(t,o)&&!O.hasOwnProperty(o)&&(u[o]=t[o]);var a=arguments.length-2;if(a===1)u.children=r;else if(1<a){for(var s=Array(a),f=0;f<a;f++)s[f]=arguments[f+2];u.children=s}if(e&&e.defaultProps)for(o in a=e.defaultProps,a)u[o]===void 0&&(u[o]=a[o]);return{$$typeof:h,type:e,key:c,ref:i,props:u,_owner:b.current}}function oe(e,t){return{$$typeof:h,type:e.type,key:t,ref:e.ref,props:e.props,_owner:e._owner}}function M(e){return typeof e=="object"&&e!==null&&e.$$typeof===h}function ue(e){var t={"=":"=0",":":"=2"};return"$"+e.replace(/[=:]/g,function(r){return t[r]})}var j=/\/+/g;function v(e,t){return typeof e=="object"&&e!==null&&e.key!=null?ue(""+e.key):t.toString(36)}function _(e,t,r,o,u){var c=typeof e;(c==="undefined"||c==="boolean")&&(e=null);var i=!1;if(e===null)i=!0;else switch(c){case"string":case"number":i=!0;break;case"object":switch(e.$$typeof){case h:case G:i=!0}}if(i)return i=e,u=u(i),e=o===""?"."+v(i,0):o,S(u)?(r="",e!=null&&(r=e.replace(j,"$&/")+"/"),_(u,t,r,"",function(f){return f})):u!=null&&(M(u)&&(u=oe(u,r+(!u.key||i&&i.key===u.key?"":(""+u.key).replace(j,"$&/")+"/")+e)),t.push(u)),1;if(i=0,o=o===""?".":o+":",S(e))for(var a=0;a<e.length;a++){c=e[a];var s=o+v(c,a);i+=_(c,t,r,s,u)}else if(s=ne(e),typeof s=="function")for(e=s.call(e),a=0;!(c=e.next()).done;)c=c.value,s=o+v(c,a++),i+=_(c,t,r,s,u);else if(c==="object")throw t=String(e),Error("Objects are not valid as a React child (found: "+(t==="[object Object]"?"object with keys {"+Object.keys(e).join(", ")+"}":t)+"). If you meant to render a collection of children, use an array instead.");return i}function k(e,t,r){if(e==null)return e;var o=[],u=0;return _(e,o,"","",function(c){return t.call(r,c,u++)}),o}function ce(e){if(e._status===-1){var t=e._result;t=t(),t.then(function(r){(e._status===0||e._status===-1)&&(e._status=1,e._result=r)},function(r){(e._status===0||e._status===-1)&&(e._status=2,e._result=r)}),e._status===-1&&(e._status=0,e._result=t)}if(e._status===1)return e._result.default;throw e._result}var p={current:null},m={transition:null},ae={ReactCurrentDispatcher:p,ReactCurrentBatchConfig:m,ReactCurrentOwner:b};function I(){throw Error("act(...) is not supported in production builds of React.")}n.Children={map:k,forEach:function(e,t,r){k(e,function(){t.apply(this,arguments)},r)},count:function(e){var t=0;return k(e,function(){t++}),t},toArray:function(e){return k(e,function(t){return t})||[]},only:function(e){if(!M(e))throw Error("React.Children.only expected to receive a single React element child.");return e}};n.Component=y;n.Fragment=K;n.Profiler=Z;n.PureComponent=g;n.StrictMode=X;n.Suspense=ee;n.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=ae;n.act=I;n.cloneElement=function(e,t,r){if(e==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+e+".");var o=A({},e.props),u=e.key,c=e.ref,i=e._owner;if(t!=null){if(t.ref!==void 0&&(c=t.ref,i=b.current),t.key!==void 0&&(u=""+t.key),e.type&&e.type.defaultProps)var a=e.type.defaultProps;for(s in t)V.call(t,s)&&!O.hasOwnProperty(s)&&(o[s]=t[s]===void 0&&a!==void 0?a[s]:t[s])}var s=arguments.length-2;if(s===1)o.children=r;else if(1<s){a=Array(s);for(var f=0;f<s;f++)a[f]=arguments[f+2];o.children=a}return{$$typeof:h,type:e.type,key:u,ref:c,props:o,_owner:i}};n.createContext=function(e){return e={$$typeof:Q,_currentValue:e,_currentValue2:e,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},e.Provider={$$typeof:J,_context:e},e.Consumer=e};n.createElement=T;n.createFactory=function(e){var t=T.bind(null,e);return t.type=e,t};n.createRef=function(){return{current:null}};n.forwardRef=function(e){return{$$typeof:Y,render:e}};n.isValidElement=M;n.lazy=function(e){return{$$typeof:re,_payload:{_status:-1,_result:e},_init:ce}};n.memo=function(e,t){return{$$typeof:te,type:e,compare:t===void 0?null:t}};n.startTransition=function(e){var t=m.transition;m.transition={};try{e()}finally{m.transition=t}};n.unstable_act=I;n.useCallback=function(e,t){return p.current.useCallback(e,t)};n.useContext=function(e){return p.current.useContext(e)};n.useDebugValue=function(){};n.useDeferredValue=function(e){return p.current.useDeferredValue(e)};n.useEffect=function(e,t){return p.current.useEffect(e,t)};n.useId=function(){return p.current.useId()};n.useImperativeHandle=function(e,t,r){return p.current.useImperativeHandle(e,t,r)};n.useInsertionEffect=function(e,t){return p.current.useInsertionEffect(e,t)};n.useLayoutEffect=function(e,t){return p.current.useLayoutEffect(e,t)};n.useMemo=function(e,t){return p.current.useMemo(e,t)};n.useReducer=function(e,t,r){return p.current.useReducer(e,t,r)};n.useRef=function(e){return p.current.useRef(e)};n.useState=function(e){return p.current.useState(e)};n.useSyncExternalStore=function(e,t,r){return p.current.useSyncExternalStore(e,t,r)};n.useTransition=function(){return p.current.useTransition()};n.version="18.3.1";R.exports=n;var d=R.exports;const Le=F(d);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const D=(...e)=>e.filter((t,r,o)=>!!t&&t.trim()!==""&&o.indexOf(t)===r).join(" ").trim();/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const se=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase();/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ie=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(t,r,o)=>o?o.toUpperCase():r.toLowerCase());/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const E=e=>{const t=ie(e);return t.charAt(0).toUpperCase()+t.slice(1)};/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */var w={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const le=e=>{for(const t in e)if(t.startsWith("aria-")||t==="role"||t==="title")return!0;return!1},fe=d.createContext({}),pe=()=>d.useContext(fe),de=d.forwardRef(({color:e,size:t,strokeWidth:r,absoluteStrokeWidth:o,className:u="",children:c,iconNode:i,...a},s)=>{const{size:f=24,strokeWidth:$=2,absoluteStrokeWidth:q=!1,color:z="currentColor",className:U=""}=pe()??{},H=o??q?Number(r??$)*24/Number(t??f):r??$;return d.createElement("svg",{ref:s,...w,width:t??f??w.width,height:t??f??w.height,stroke:e??z,strokeWidth:H,className:D("lucide",U,u),...!c&&!le(a)&&{"aria-hidden":"true"},...a},[...i.map(([W,B])=>d.createElement(W,B)),...Array.isArray(c)?c:[c]])});/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const l=(e,t)=>{const r=d.forwardRef(({className:o,...u},c)=>d.createElement(de,{ref:c,iconNode:t,className:D(`lucide-${se(E(e))}`,`lucide-${e}`,o),...u}));return r.displayName=E(e),r};/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ye=[["path",{d:"M10.268 21a2 2 0 0 0 3.464 0",key:"vwvbt9"}],["path",{d:"M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326",key:"11g9vi"}]],Pe=l("bell",ye);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const he=[["path",{d:"M3 3v16a2 2 0 0 0 2 2h16",key:"c24i48"}],["path",{d:"M18 17V9",key:"2bz60n"}],["path",{d:"M13 17V5",key:"1frdt8"}],["path",{d:"M8 17v-3",key:"17ska0"}]],Ve=l("chart-column",he);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ke=[["path",{d:"M20 6 9 17l-5-5",key:"1gmf2c"}]],Oe=l("check",ke);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const _e=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],Te=l("circle",_e);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const me=[["path",{d:"M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3.5-4-4-6.5c-.5 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z",key:"c7niix"}]],Ie=l("droplet",me);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ve=[["rect",{width:"7",height:"9",x:"3",y:"3",rx:"1",key:"10lvy0"}],["rect",{width:"7",height:"5",x:"14",y:"3",rx:"1",key:"16une8"}],["rect",{width:"7",height:"9",x:"14",y:"12",rx:"1",key:"1hutg5"}],["rect",{width:"7",height:"5",x:"3",y:"16",rx:"1",key:"ldoo1y"}]],De=l("layout-dashboard",ve);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const we=[["path",{d:"m16 17 5-5-5-5",key:"1bji2h"}],["path",{d:"M21 12H9",key:"dn1m92"}],["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}]],qe=l("log-out",we);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const ge=[["path",{d:"M4 5h16",key:"1tepv9"}],["path",{d:"M4 12h16",key:"1lakjw"}],["path",{d:"M4 19h16",key:"1djgab"}]],ze=l("menu",ge);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ce=[["path",{d:"M8 2h8",key:"1ssgc1"}],["path",{d:"M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2",key:"qtp12x"}],["path",{d:"M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0",key:"ygeh44"}]],Ue=l("milk",Ce);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const be=[["path",{d:"M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",key:"1a8usu"}]],He=l("pen",be);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Me=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"M12 5v14",key:"s699le"}]],We=l("plus",Me);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const $e=[["path",{d:"M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",key:"1c8476"}],["path",{d:"M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7",key:"1ydtos"}],["path",{d:"M7 3v4a1 1 0 0 0 1 1h7",key:"t51u73"}]],Be=l("save",$e);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const xe=[["path",{d:"m21 21-4.34-4.34",key:"14j7rj"}],["circle",{cx:"11",cy:"11",r:"8",key:"4ej97u"}]],Fe=l("search",xe);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Se=[["path",{d:"m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20",key:"she1j9"}],["path",{d:"M16 18h-5",key:"bq60fd"}],["path",{d:"M18 5a1 1 0 0 0-1 1v5.573",key:"1kv8ia"}],["path",{d:"M3 4h8.129a1 1 0 0 1 .99.863L13 11.246",key:"1q1ert"}],["path",{d:"M4 11V4",key:"9ft8pt"}],["path",{d:"M7 15h.01",key:"k5ht0j"}],["path",{d:"M8 10.1V4",key:"1jgyzo"}],["circle",{cx:"18",cy:"18",r:"2",key:"1emm8v"}],["circle",{cx:"7",cy:"15",r:"5",key:"ddtuc"}]],Ge=l("tractor",Se);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const je=[["path",{d:"M10 11v6",key:"nco0om"}],["path",{d:"M14 11v6",key:"outv1u"}],["path",{d:"M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6",key:"miytrc"}],["path",{d:"M3 6h18",key:"d0wm0j"}],["path",{d:"M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",key:"e791ji"}]],Ke=l("trash-2",je);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ee=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],Xe=l("trending-up",Ee);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=[["path",{d:"m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3",key:"wmoenq"}],["path",{d:"M12 9v4",key:"juzpu7"}],["path",{d:"M12 17h.01",key:"p32p05"}]],Ze=l("triangle-alert",Re);/**
 * @license lucide-react v1.16.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Ne=[["path",{d:"M18 6 6 18",key:"1bl5f8"}],["path",{d:"m6 6 12 12",key:"d8bk6v"}]],Je=l("x",Ne);export{Pe as B,Ve as C,Ie as D,De as L,ze as M,He as P,Le as R,Be as S,Ge as T,Je as X,Oe as a,Te as b,qe as c,Ue as d,We as e,Fe as f,Ke as g,Xe as h,Ze as i,Ae as j,F as k,d as r};
