(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-0189a0ea","chunk-4e9065f4","chunk-2d0d09e9","chunk-2d0cc813"],{"17af":function(t,e,r){"use strict";var n=r("55fc"),a=r.n(n);a.a},2108:function(t,e,r){"use strict";var n=r("314e"),a=r.n(n);a.a},"314e":function(t,e,r){},"44b0":function(t,e,r){"use strict";var n=r("4df2"),a=r.n(n);a.a},"4de2":function(t,e,r){"use strict";r.r(e),r.d(e,"default",function(){return f});var n=r("a34a"),a=r.n(n),i=r("dfd8");function c(t,e,r,n,a,i,c){try{var l=t[i](c),o=l.value}catch(s){return void r(s)}l.done?e(o):Promise.resolve(o).then(n,a)}function l(t){return function(){var e=this,r=arguments;return new Promise(function(n,a){var i=t.apply(e,r);function l(t){c(i,n,a,l,o,"next",t)}function o(t){c(i,n,a,l,o,"throw",t)}l(void 0)})}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e,r){return e&&s(t.prototype,e),r&&s(t,r),t}function p(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var f=function(){function t(e){o(this,t),p(this,"router_type",null),this.router_type=e}return u(t,null,[{key:"getPublicInformation",value:function(){var e=l(a.a.mark(function e(){var r;return a.a.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(i["get"])("public-information");case 2:return r=e.sent,r.router_type.forEach(function(t){if(t.navInfo=[],t.child_types){var e=t.child_types.split("*");e.forEach(function(e){var r={},n=e.split("|");if(1===n.length){var a=n[0].split("&");2===a.length&&(r.titleName=a[0],r.titleRouter=a[1])}else r.titleRouter=null,r.childNav=[],n.forEach(function(t){var e=t.split("&");1===e.length?r.titleName=e[0]:2===e.length&&r.childNav.push({titleName:e[0],titleRouter:e[1]})});t.navInfo.push(r)})}}),console.log("routerInfo",r.router_type),e.abrupt("return",new t(r.router_type));case 6:case"end":return e.stop()}},e)}));function r(){return e.apply(this,arguments)}return r}()}]),t}()},"4df2":function(t,e,r){},"55fc":function(t,e,r){},"696f":function(t,e,r){"use strict";r.r(e);var n=r("a34a"),a=r.n(n),i=r("dfd8");function c(t,e,r,n,a,i,c){try{var l=t[i](c),o=l.value}catch(s){return void r(s)}l.done?e(o):Promise.resolve(o).then(n,a)}function l(t){return function(){var e=this,r=arguments;return new Promise(function(n,a){var i=t.apply(e,r);function l(t){c(i,n,a,l,o,"next",t)}function o(t){c(i,n,a,l,o,"throw",t)}l(void 0)})}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){for(var r=0;r<e.length;r++){var n=e[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function u(t,e,r){return e&&s(t.prototype,e),r&&s(t,r),t}var p=function(){function t(){o(this,t)}return u(t,[{key:"addArticle",value:function(){var t=l(a.a.mark(function t(e){var r;return a.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["post"])("article",e,{handleError:!0});case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"getArticle",value:function(){var t=l(a.a.mark(function t(e){var r;return a.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["get"])("article/".concat(e));case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"editArticle",value:function(){var t=l(a.a.mark(function t(e,r){var n;return a.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["put"])("article/".concat(e),r);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}},t)}));function e(e,r){return t.apply(this,arguments)}return e}()},{key:"recoverArticle",value:function(){var t=l(a.a.mark(function t(e){var r;return a.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["put"])("article/recover",e);case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()},{key:"deleteArticle",value:function(){var t=l(a.a.mark(function t(e,r){var n;return a.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["_delete"])("article/".concat(e),r);case 2:return n=t.sent,t.abrupt("return",n);case 4:case"end":return t.stop()}},t)}));function e(e,r){return t.apply(this,arguments)}return e}()},{key:"getArticles",value:function(){var t=l(a.a.mark(function t(e){var r;return a.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(i["get"])("article",e,{handleError:!0});case 2:return r=t.sent,t.abrupt("return",r);case 4:case"end":return t.stop()}},t)}));function e(e){return t.apply(this,arguments)}return e}()}]),t}();e["default"]=new p},"6c69":function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"title"},[t._v("新建文章")]),r("div",{staticClass:"wrap"},[t.form&&t.public_Information&&t.public_Information.router_type?r("article-editor",{ref:"articleEditor",attrs:{articleDate:t.form,articleTypeDate:t.public_Information.router_type},on:{submitOnClick:t.submitArticleDate,resetOnClick:t.resetArticleDate}}):t._e()],1)])},a=[],i=r("a34a"),c=r.n(i),l=r("2f62"),o=r("696f"),s=r("4de2"),u=r("c2fa");function p(t,e,r,n,a,i,c){try{var l=t[i](c),o=l.value}catch(s){return void r(s)}l.done?e(o):Promise.resolve(o).then(n,a)}function f(t){return function(){var e=this,r=arguments;return new Promise(function(n,a){var i=t.apply(e,r);function c(t){p(i,n,a,c,l,"next",t)}function l(t){p(i,n,a,c,l,"throw",t)}c(void 0)})}}function m(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter(function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})),r.push.apply(r,n)}return r}function d(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?m(r,!0).forEach(function(e){h(t,e,r[e])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):m(r).forEach(function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))})}return t}function h(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}var v={components:{ArticleEditor:u["default"]},mounted:function(){this.checkPublicInformation()},watch:{},data:function(){return{form:{main_type:"",child_type:"",title:"",article_describe:"",cover_image_url:"",head_bg_url:"",head_media_url:"",head_media_param:"",keywords:"",content:"",hitcount:0,likecount:0,commentcount:0,author:"",show_type:0}}},computed:{public_Information:function(){return this.$store.state.public_Information}},methods:d({submitArticleDate:function(){var t=f(c.a.mark(function t(){var e;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.prev=0,this.handleTextContent(),t.next=4,o["default"].addArticle(this.form);case 4:e=t.sent,0===e.error_code&&(this.$message.success("".concat(e.msg)),this.resetArticleDate()),t.next=12;break;case 8:t.prev=8,t.t0=t["catch"](0),this.$message.error(t.t0.data.msg),console.log(t.t0);case 12:case"end":return t.stop()}},t,this,[[0,8]])}));function e(){return t.apply(this,arguments)}return e}(),resetArticleDate:function(){this.form={main_type:this.public_Information.router_type[1].router_name,child_type:this.public_Information.router_type[1].navInfo[0].titleRouter,title:"",article_describe:"",cover_image_url:"",head_bg_url:"",head_media_url:"",head_media_param:"",keywords:"",content:"",hitcount:0,likecount:0,commentcount:0,author:"",show_type:0},this.$nextTick(function(){this.$refs.articleEditor.resetUI()})}},Object(l["b"])(["setPublicInformation"]),{checkPublicInformation:function(){var t=f(c.a.mark(function t(){var e;return c.a.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(this.public_Information){t.next=15;break}return t.prev=1,this.loading=!0,t.next=5,s["default"].getPublicInformation();case 5:e=t.sent,this.setPublicInformation(e),this.loading=!1,t.next=15;break;case 10:t.prev=10,t.t0=t["catch"](1),this.loading=!1,this.$message.error(t.t0.data.msg),console.log(t.t0);case 15:this.form.main_type=this.public_Information.router_type[1].router_name,this.form.child_type=this.public_Information.router_type[1].navInfo[0].titleRouter;case 17:case"end":return t.stop()}},t,this,[[1,10]])}));function e(){return t.apply(this,arguments)}return e}(),handleTextContent:function(){}})},b=v,y=(r("17af"),r("2877")),_=Object(y["a"])(b,n,a,!1,null,"465a3c41",null);e["default"]=_.exports},c2fa:function(t,e,r){"use strict";r.r(e);var n=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"container"},[r("div",{staticClass:"wrap"},[r("el-row",[r("el-col",{attrs:{lg:16,md:20,sm:24,xs:24}},[r("el-form",{ref:"articleDate",attrs:{model:t.articleDate,"status-icon":"","label-width":"100px"},nativeOn:{submit:function(t){t.preventDefault()}}},[r("el-form-item",{attrs:{id:"article-select-container"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前编辑文章所属网页分类，必选项",placement:"top"}},[r("Span",[t._v("文章类型")])],1),r("div",{staticClass:"select-first"},[r("el-select",{staticStyle:{width:"200px"},attrs:{size:"medium",filterable:"",placeholder:"请选择主类型"},on:{change:t.changeArticleMainType},model:{value:t.selectMainTypeIndex,callback:function(e){t.selectMainTypeIndex=e},expression:"selectMainTypeIndex"}},t._l(t.articleTypeDate,function(e,n){return e.child_types?r("el-option",{key:e.tab_name,attrs:{label:e.tab_name,value:n}}):t._e()}),1)],1),r("div",{staticClass:"article-select-second"},[r("el-select",{staticStyle:{width:"200px"},attrs:{size:"medium",filterable:"",placeholder:"请选择子类型"},on:{change:t.changeArticleChildType},model:{value:t.selectChildTypeRouter,callback:function(e){t.selectChildTypeRouter=e},expression:"selectChildTypeRouter"}},t._l(t.articleTypeDate[t.selectMainTypeIndex].navInfo,function(e){return r("el-option-group",{key:e.titleName,attrs:{label:e.titleName}},[t._l(e.childNav,function(n){return e.childNav?r("el-option",{key:n.titleName,attrs:{label:n.titleName,value:n.titleRouter}}):t._e()}),e.childNav?t._e():r("el-option",{key:e.titleName,attrs:{label:e.titleName,value:e.titleRouter}})],2)}),1)],1)],1),r("el-form-item",{attrs:{id:"article-title-container"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前编辑文章标题",placement:"top"}},[r("Span",[t._v("文章标题")])],1),r("el-input",{attrs:{size:"medium",placeholder:"请填写文章标题"},model:{value:t.articleDate.title,callback:function(e){t.$set(t.articleDate,"title",e)},expression:"articleDate.title"}})],1),r("el-form-item",{attrs:{id:"article-describe-container"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章描述，请尽量精简，网页上若出现显示不全情况，自行斟酌控制长度",placement:"top"}},[r("Span",[t._v("简介")])],1),r("el-input",{attrs:{size:"medium",type:"textarea",autosize:{minRows:1,maxRows:8},placeholder:"请填写文章简介"},model:{value:t.articleDate.article_describe,callback:function(e){t.$set(t.articleDate,"article_describe",e)},expression:"articleDate.article_describe"}})],1),r("el-form-item",{attrs:{id:"article-image-container"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章封面url，默认分辨率250x170，必填项",placement:"top"}},[r("Span",[t._v("封面")])],1),r("el-input",{attrs:{size:"medium",placeholder:"请填写文章封面图地址"},model:{value:t.articleDate.cover_image_url,callback:function(e){t.$set(t.articleDate,"cover_image_url",e)},expression:"articleDate.cover_image_url"}})],1),r("el-form-item",{attrs:{id:"article-head-bg-container"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章标题底背景url，默认分辨率1920x300，或者填写背景渐变样式，格式为‘to left, rgba(115,104,118,.9) 0%, rgba(17,11,15,.9) 80%’必填项",placement:"top"}},[r("Span",[t._v("头部背景/样式")])],1),r("el-input",{attrs:{size:"medium",placeholder:"请填写文章头部背景地址"},model:{value:t.articleDate.head_bg_url,callback:function(e){t.$set(t.articleDate,"head_bg_url",e)},expression:"articleDate.head_bg_url"}})],1),r("el-form-item",{attrs:{id:"article-head-media-container"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章对应视频/音频/图集url,必填项,若为图集，格式为url+'&&'+'描述'+'|'",placement:"top"}},[r("Span",[t._v("头部媒体地址")])],1),r("el-input",{attrs:{size:"medium",placeholder:"请填写文章头部媒体地址"},model:{value:t.articleDate.head_media_url,callback:function(e){t.$set(t.articleDate,"head_media_url",e)},expression:"articleDate.head_media_url"}})],1),r("el-form-item",{attrs:{id:"article-head-param-container"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章标题底背景参数，可控制视频分辨率，或填写音频封面图url",placement:"top"}},[r("Span",[t._v("头部背景参数")])],1),r("el-input",{attrs:{size:"medium",placeholder:"请填写文章头部背景参数"},model:{value:t.articleDate.head_media_param,callback:function(e){t.$set(t.articleDate,"head_media_param",e)},expression:"articleDate.head_media_param"}})],1),r("el-form-item",{attrs:{id:"article-inform-container-1"}},[r("div",{attrs:{id:"inform-box-1"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章作者，不填网页默认显示‘佚名’",placement:"top"}},[r("Span",[t._v("作者")])],1),r("el-input",{attrs:{size:"medium"},model:{value:t.articleDate.author,callback:function(e){t.$set(t.articleDate,"author",e)},expression:"articleDate.author"}}),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章关键词，每个词之间用'*'号间隔",placement:"top"}},[r("Span",[t._v("关键词")])],1),r("el-input",{attrs:{size:"medium"},model:{value:t.articleDate.keywords,callback:function(e){t.$set(t.articleDate,"keywords",e)},expression:"articleDate.keywords"}})],1)]),r("el-form-item",{attrs:{id:"article-inform-container-2"}},[r("div",{attrs:{id:"inform-box-2"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章点击量，每被访问一次都会在当前基础上+1，也可自己填",placement:"top"}},[r("Span",[t._v("点击量")])],1),r("el-input",{attrs:{size:"medium",type:"number"},model:{value:t.articleDate.hitcount,callback:function(e){t.$set(t.articleDate,"hitcount",e)},expression:"articleDate.hitcount"}}),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章点赞量",placement:"top"}},[r("Span",[t._v("点赞量")])],1),r("el-input",{attrs:{size:"medium",type:"number"},model:{value:t.articleDate.likecount,callback:function(e){t.$set(t.articleDate,"likecount",e)},expression:"articleDate.likecount"}}),r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"当前文章评论量",placement:"top"}},[r("Span",[t._v("评论量")])],1),r("el-input",{attrs:{size:"medium",type:"number"},model:{value:t.articleDate.commentcount,callback:function(e){t.$set(t.articleDate,"commentcount",e)},expression:"articleDate.commentcount"}})],1)]),r("el-form-item",{attrs:{id:"article-inform-container-3"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"网站上文章banner的显示样式",placement:"top"}},[r("Span",[t._v("显示样式")])],1),r("el-select",{staticStyle:{width:"300px"},attrs:{size:"medium",filterable:"",placeholder:"请选择类型"},model:{value:t.articleDate.show_type,callback:function(e){t.$set(t.articleDate,"show_type",e)},expression:"articleDate.show_type"}},t._l(t.showTypeArray,function(t,e){return r("el-option",{key:t.type,attrs:{label:t.type,value:e}})}),1)],1),r("el-form-item",{attrs:{id:"article-inform-container-4"}},[r("el-tooltip",{staticClass:"item",attrs:{effect:"dark",content:"文章内容编辑器,视频文件只支持mp4格式，请在插入视频地址内写明文件格式后缀名",placement:"top"}},[r("Span",[t._v("文章内容")])],1),r("tinymce",{ref:"textEditor",attrs:{upload_url:"",defaultContent:t.articleDate.content},on:{change:t.changeContent}})],1),r("el-form-item",{staticClass:"submit"},[r("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.submitVisible,callback:function(e){t.submitVisible=e},expression:"submitVisible"}},[r("p",[t._v("确定保存到服务器吗？")]),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.submitVisible=!1}}},[t._v("取消")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.submitVisible=!1,t.submitForm()}}},[t._v("确定\n                                ")])],1),r("el-button",{attrs:{slot:"reference",id:"submitBtn"},slot:"reference"},[t._v("保 存")])],1),r("el-popover",{attrs:{placement:"top",width:"160"},model:{value:t.resetVisible,callback:function(e){t.resetVisible=e},expression:"resetVisible"}},[r("p",[t._v("确定重置已编辑内容吗？")]),r("div",{staticStyle:{"text-align":"right",margin:"0"}},[r("el-button",{attrs:{size:"mini",type:"text"},on:{click:function(e){t.resetVisible=!1}}},[t._v("取消")]),r("el-button",{attrs:{type:"primary",size:"mini"},on:{click:function(e){t.resetVisible=!1,t.resetForm()}}},[t._v("确定\n                                ")])],1),r("el-button",{attrs:{slot:"reference",id:"resetBtn"},slot:"reference"},[t._v("重 置")])],1)],1)],1)],1)],1)],1)])},a=[],i=(r("696f"),r("a2fb")),c={components:{Tinymce:i["default"]},created:function(){},mounted:function(){this.resetUI()},props:{articleDate:{},articleTypeDate:{}},data:function(){return{selectMainTypeIndex:1,selectChildTypeRouter:this.articleTypeDate[1].navInfo[0].titleRouter,submitVisible:!1,resetVisible:!1,showTypeArray:[{type:"标准样式(封面+标题+描述+其他信息)"},{type:"简单样式(封面+标题+其他信息)"}]}},methods:{submitForm:function(){this.$emit("submitOnClick")},resetForm:function(){this.$emit("resetOnClick")},changeArticleMainType:function(t){this.selectMainTypeIndex=t,this.articleTypeDate[this.selectMainTypeIndex].navInfo[0],this.selectChildTypeRouter=this.articleTypeDate[this.selectMainTypeIndex].navInfo[0].titleRouter,this.articleDate.main_type=this.articleTypeDate[this.selectMainTypeIndex].router_name,this.articleDate.child_type=this.selectChildTypeRouter},changeArticleChildType:function(t){this.articleDate.child_type=t},changeContent:function(t){this.articleDate.content=t},resetUI:function(){var t=this,e=this.articleTypeDate.findIndex(function(e){return e.router_name===t.articleDate.main_type});e<0&&(e=1),this.selectMainTypeIndex=e,this.selectChildTypeRouter=this.articleDate.child_type,this.$refs.textEditor.resetContent()}}},l=c,o=(r("2108"),r("44b0"),r("2877")),s=Object(o["a"])(l,n,a,!1,null,"1be516f0",null);e["default"]=s.exports}}]);