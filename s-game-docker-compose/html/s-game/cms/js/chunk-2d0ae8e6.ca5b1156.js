(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0ae8e6"],{"0b20":function(e,n,t){"use strict";t.r(n);var r=t("a34a"),a=t.n(r),u=t("dfd8");function c(e,n,t,r,a,u,c){try{var o=e[u](c),s=o.value}catch(i){return void t(i)}o.done?n(s):Promise.resolve(s).then(r,a)}function o(e){return function(){var n=this,t=arguments;return new Promise(function(r,a){var u=e.apply(n,t);function o(e){c(u,r,a,o,s,"next",e)}function s(e){c(u,r,a,o,s,"throw",e)}o(void 0)})}}function s(e,n){if(!(e instanceof n))throw new TypeError("Cannot call a class as a function")}function i(e,n){for(var t=0;t<n.length;t++){var r=n[t];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function p(e,n,t){return n&&i(e.prototype,n),t&&i(e,t),e}var l=function(){function e(){s(this,e)}return p(e,[{key:"addComment",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["post"])("comment/normal",n,{handleError:!0});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"getComment",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["get"])("comment/normal/".concat(n));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"getComments",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["get"])("comment/normal",n,{handleError:!0});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"editComment",value:function(){var e=o(a.a.mark(function e(n,t){var r;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["put"])("comment/normal/".concat(n),t);case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},e)}));function n(n,t){return e.apply(this,arguments)}return n}()},{key:"recoverComment",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["put"])("comment/normal/recover",n);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"deleteComment",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["_delete"])("comment/normal/".concat(n));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"addReply",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["post"])("comment/reply",n,{handleError:!0});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"getReply",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["get"])("comment/reply/".concat(n));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"getReplys",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["get"])("comment/reply",n,{handleError:!0});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"editReply",value:function(){var e=o(a.a.mark(function e(n,t){var r;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["put"])("comment/reply/".concat(n),t);case 2:return r=e.sent,e.abrupt("return",r);case 4:case"end":return e.stop()}},e)}));function n(n,t){return e.apply(this,arguments)}return n}()},{key:"recoverReply",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["put"])("comment/reply/recover",n);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"deleteReply",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["_delete"])("comment/reply/".concat(n));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"getAdvise",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["get"])("comment/advise/".concat(n));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"getAdvises",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["get"])("comment/advise",n,{handleError:!0});case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"recoverAdvise",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["put"])("comment/advise/recover",n);case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()},{key:"deleteAdvise",value:function(){var e=o(a.a.mark(function e(n){var t;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(u["_delete"])("comment/advise/".concat(n));case 2:return t=e.sent,e.abrupt("return",t);case 4:case"end":return e.stop()}},e)}));function n(n){return e.apply(this,arguments)}return n}()}]),e}();n["default"]=new l}}]);