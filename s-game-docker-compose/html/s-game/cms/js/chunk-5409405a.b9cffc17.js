(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-5409405a","chunk-5e0b9ecd","chunk-2d0f158e"],{"2a92":function(e,t,n){},"339b":function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("video",{ref:"videoPlayer",staticClass:"video-js vjs-big-play-centered"})])},a=[],i=n("f0e2"),o={name:"VideoPlayer",props:{options:{type:Object,default:function(){return{}}}},data:function(){return{player:null}},mounted:function(){this.player=Object(i["a"])(this.$refs.videoPlayer,this.options,function(){console.log("onPlayerReady",this)})},beforeDestroy:function(){this.player&&this.player.dispose()}},c=o,s=(n("7dff"),n("2877")),u=Object(s["a"])(c,r,a,!1,null,null,null);t["default"]=u.exports},"4abc":function(e,t,n){"use strict";var r=n("82e9"),a=n.n(r);a.a},"6cf3":function(e,t,n){},"6f39":function(e,t,n){"use strict";var r=n("2a92"),a=n.n(r);a.a},"7dff":function(e,t,n){"use strict";var r=n("6cf3"),a=n.n(r);a.a},"82e9":function(e,t,n){},8351:function(e,t,n){"use strict";n.r(t);var r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"lin-container"},[n("div",{staticClass:"lin-title"},[e._v("视频列表")]),n("div",{staticClass:"lin-wrap container"},[n("div",{staticClass:"imgs-upload-container"},e._l(e.videoData,function(t,r){return n("div",{key:r,staticClass:"img-box",on:{click:function(n){return e.preview(t.url)}}},[n("i",{staticClass:"el-icon-video-camera-solid",attrs:{id:"video-icon"}}),n("div",{staticClass:"control"},[n("div",{staticClass:"bottom-banner"},[n("div",{staticClass:"info",on:{click:function(n){return n.stopPropagation(),e.handleInfo(t)}}},[n("i",{staticClass:"el-icon-date"})]),n("div",{directives:[{name:"auth",rawName:"v-auth",value:{auth:"删除视频",type:"disabled"},expression:"{ auth: '删除视频', type: 'disabled'}"}],staticClass:"delete",on:{click:function(n){return n.stopPropagation(),e.handleDelete(t.id)}}},[n("i",{staticClass:"el-icon-delete"})]),n("div",{staticClass:"preview",on:{click:function(n){return n.stopPropagation(),e.preview(t.url)}}},[n("i",{staticClass:"el-icon-view"})]),n("div",{staticClass:"download",on:{click:function(n){return n.stopPropagation(),e.handleDownload(t.id)}}},[n("i",{staticClass:"el-icon-download"})])])])])}),0),e.page_meta?n("div",{staticClass:"pagination"},[e.refreshPagination?n("el-pagination",{attrs:{background:!0,"page-size":e.page_meta.per_page_count,"current-page":e.page_meta.current_page_index,layout:"prev, pager, next, jumper",total:e.page_meta.total},on:{"current-change":e.handleCurrentChange}}):e._e()],1):e._e()]),[n("div",[e.dialogFormVisible?n("div",{staticClass:"video-dialog-container",on:{click:function(t){return t.target!==t.currentTarget?null:e.handleClose(t)}}},[n("div",{staticClass:"video-dialog-box"},[e.currentVideoUrl&&e.videoInfo?n("video-player",{style:e.videoInfo.videoStyleText,attrs:{options:e.videoInfo.playerOption}}):e._e(),n("div",{staticClass:"video-close-btn",on:{click:function(t){return t.target!==t.currentTarget?null:e.handleClose(t)}}},[e._v("\n                        X\n                    ")])],1)]):e._e()])]],2)},a=[],i=n("a34a"),o=n.n(i),c=n("9ff1"),s=n("f121"),u=n("339b");function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter(function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable})),n.push.apply(n,r)}return n}function p(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(n,!0).forEach(function(t){d(e,t,n[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(n).forEach(function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))})}return e}function d(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function f(e){return g(e)||h(e)||v()}function v(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function h(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}function g(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}function m(e,t,n,r,a,i,o){try{var c=e[i](o),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(r,a)}function y(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var i=e.apply(t,n);function o(e){m(i,r,a,o,c,"next",e)}function c(e){m(i,r,a,o,c,"throw",e)}o(void 0)})}}var w={components:{videoPlayer:u["default"]},data:function(){return{dialogFormVisible:!1,videoInfo:null,videoData:[],refreshPagination:!0,currentVideoUrl:null,page_meta:{current_page_index:1,per_page_count:28,total:0,total_page_count:0},playerOptions:{controls:!0,preload:"auto",playbackRates:[.7,1,1.5,2],language:"zh-CN",fluid:!0,aspectRatio:"16:9",autoplay:!1,loop:!1,muted:!1,notSupportedMessage:"此视频暂时无法播放",controlBar:{timeDivider:!0,durationDisplay:!0,remainingTimeDisplay:!1,fullscreenToggle:!0}}}},mounted:function(){this._getTableData()},methods:{_getTableData:function(){var e=y(o.a.mark(function e(){var t;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,this.loading=!0,e.next=4,c["default"].getVideos({type:2,page:this.page_meta.current_page_index});case 4:t=e.sent,t.page_meta&&(this.page_meta=t.page_meta),this.videoData=f(t.date),this.loading=!1,e.next=15;break;case 10:e.prev=10,e.t0=e["catch"](0),this.loading=!1,this.$message.error(e.t0.data.msg),console.log(e.t0);case 15:case"end":return e.stop()}},e,this,[[0,10]])}));function t(){return e.apply(this,arguments)}return t}(),preview:function(e){this.currentVideoUrl=e;var t=p({},this.playerOptions),n=e.split(".");2!==n.length&&this.$message.error("无法识别的url地址"),n&&("mp4"===n[1]?(this.playerOptions.techOrder=["html5"],t.sources=[{type:"video/mp4",src:e}]):(this.playerOptions.techOrder=["flash"],t.sources=[{type:"video/x-flv",src:e}]));var r="640",a="360",i='style="width: '+r+";height: "+a+';"';this.videoInfo={videoStyleText:i,playerOption:t},this.dialogFormVisible=!0},handleInfo:function(){var e=y(o.a.mark(function e(t){var n;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:n=this.$createElement,this.$msgbox({title:"视频信息",message:n("p",null,[n("span",null,"文件ID: "),n("i",{style:"color: teal"},t.id),n("br",null,""),n("span",null,"文件名: "),n("i",{style:"color: teal"},t.name.split("|")[0]),n("br",null,""),n("span",null,"文件md5: "),n("i",{style:"color: teal"},t.md5),n("br",null,""),n("span",null,"文件url: "),n("i",{style:"color: teal"},t.url)]),confirmButtonText:"确定"}).then(function(e){}).catch(function(){});case 2:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),handleDelete:function(){var e=y(o.a.mark(function e(t){var n=this;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.$confirm("此操作将永久删除该文件, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(y(o.a.mark(function e(){var r;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return n.loading=!0,e.next=3,c["default"].deleteVideo(t);case 3:r=e.sent,0===r.error_code&&(n.$message.success("".concat(r.msg)),setTimeout(function(){n._getTableData()},1e3));case 5:case"end":return e.stop()}},e)}))).catch(function(e){n.loading=!1,e.data&&e.data.msg&&n.$message.error(e.data.msg),console.log(e)});case 1:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),handleDownload:function(){var e=y(o.a.mark(function e(t){return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:window.open(s["default"].baseURL+"/file/download-video/"+t,"_blank");case 1:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}(),handleCurrentChange:function(){var e=y(o.a.mark(function e(t){var n=this;return o.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:this.page_meta.current_page_index=t,this.loading=!0,setTimeout(function(){n._getTableData()},1e3);case 3:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),handleClose:function(){this.dialogFormVisible=!1}}},b=w,_=(n("6f39"),n("4abc"),n("2877")),x=Object(_["a"])(b,r,a,!1,null,"01c5d38e",null);t["default"]=x.exports},"9ff1":function(e,t,n){"use strict";n.r(t);var r=n("a34a"),a=n.n(r),i=n("dfd8");function o(e,t,n,r,a,i,o){try{var c=e[i](o),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(r,a)}function c(e){return function(){var t=this,n=arguments;return new Promise(function(r,a){var i=e.apply(t,n);function c(e){o(i,r,a,c,s,"next",e)}function s(e){o(i,r,a,c,s,"throw",e)}c(void 0)})}}function s(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function u(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}function l(e,t,n){return t&&u(e.prototype,t),n&&u(e,n),e}var p=function(){function e(){s(this,e)}return l(e,[{key:"deleteImage",value:function(){var e=c(a.a.mark(function e(t){var n;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["_delete"])("file/delete-image/".concat(t));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getImages",value:function(){var e=c(a.a.mark(function e(t){var n;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["get"])("file/get-image",t,{handleError:!0});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteVideo",value:function(){var e=c(a.a.mark(function e(t){var n;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["_delete"])("file/delete-video/".concat(t));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getVideos",value:function(){var e=c(a.a.mark(function e(t){var n;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["get"])("file/get-video",t,{handleError:!0});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"deleteAudio",value:function(){var e=c(a.a.mark(function e(t){var n;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["_delete"])("file/delete-audio/".concat(t));case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()},{key:"getAudios",value:function(){var e=c(a.a.mark(function e(t){var n;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["get"])("file/get-audio",t,{handleError:!0});case 2:return n=e.sent,e.abrupt("return",n);case 4:case"end":return e.stop()}},e)}));function t(t){return e.apply(this,arguments)}return t}()}]),e}();t["default"]=new p}}]);