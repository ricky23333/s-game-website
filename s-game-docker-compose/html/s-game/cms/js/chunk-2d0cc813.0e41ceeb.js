(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cc813"],{"4de2":function(t,e,n){"use strict";n.r(e),n.d(e,"default",function(){return p});var r=n("a34a"),i=n.n(r),o=n("dfd8");function u(t,e,n,r,i,o,u){try{var a=t[o](u),c=a.value}catch(l){return void n(l)}a.done?e(c):Promise.resolve(c).then(r,i)}function a(t){return function(){var e=this,n=arguments;return new Promise(function(r,i){var o=t.apply(e,n);function a(t){u(o,r,i,a,c,"next",t)}function c(t){u(o,r,i,a,c,"throw",t)}a(void 0)})}}function c(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function l(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function f(t,e,n){return e&&l(t.prototype,e),n&&l(t,n),t}function s(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var p=function(){function t(e){c(this,t),s(this,"router_type",null),this.router_type=e}return f(t,null,[{key:"getPublicInformation",value:function(){var e=a(i.a.mark(function e(){var n;return i.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(o["get"])("public-information");case 2:return n=e.sent,n.router_type.forEach(function(t){if(t.navInfo=[],t.child_types){var e=t.child_types.split("*");e.forEach(function(e){var n={},r=e.split("|");if(1===r.length){var i=r[0].split("&");2===i.length&&(n.titleName=i[0],n.titleRouter=i[1])}else n.titleRouter=null,n.childNav=[],r.forEach(function(t){var e=t.split("&");1===e.length?n.titleName=e[0]:2===e.length&&n.childNav.push({titleName:e[0],titleRouter:e[1]})});t.navInfo.push(n)})}}),console.log("routerInfo",n.router_type),e.abrupt("return",new t(n.router_type));case 6:case"end":return e.stop()}},e)}));function n(){return e.apply(this,arguments)}return n}()}]),t}()}}]);