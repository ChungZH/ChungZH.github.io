(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{221:function(t,e,n){},222:function(t,e,n){},223:function(t,e,n){"use strict";n.d(e,"c",(function(){return a})),n.d(e,"d",(function(){return c})),n.d(e,"e",(function(){return l})),n.d(e,"a",(function(){return u})),n.d(e,"b",(function(){return p}));const i=/#.*$/,r=/\.(md|html)$/,s=/\/$/,o=/^(https?:|mailto:|tel:)/;function a(t){return o.test(t)}function c(t){return/^mailto:/.test(t)}function l(t){return/^tel:/.test(t)}function u(t){if(a(t))return t;const e=t.match(i),n=e?e[0]:"",o=function(t){return decodeURI(t).replace(i,"").replace(r,"")}(t);return s.test(o)?t:o+".html"+n}function p(t,e,n){if(!t)return n;let i,r=e;for(;(r=r.$parent)&&!i;)i=r.$refs[t];return i&&i.$el&&(i=i.$el),i||n}},224:function(t,e,n){},225:function(t,e,n){},226:function(t,e,n){},227:function(t,e,n){},228:function(t,e,n){"use strict";var i=n(221);n.n(i).a},229:function(t,e,n){"use strict";var i=n(222);n.n(i).a},230:function(t,e,n){var i=n(82),r=n(75),s=n(231),o=n(235);t.exports=function(t,e){if(null==t)return{};var n=i(o(t),(function(t){return[t]}));return e=r(e),s(t,n,(function(t,n){return e(t,n[0])}))}},231:function(t,e,n){var i=n(44),r=n(232),s=n(39);t.exports=function(t,e,n){for(var o=-1,a=e.length,c={};++o<a;){var l=e[o],u=i(t,l);n(u,l)&&r(c,s(l,t),u)}return c}},232:function(t,e,n){var i=n(233),r=n(39),s=n(42),o=n(28),a=n(14);t.exports=function(t,e,n,c){if(!o(t))return t;for(var l=-1,u=(e=r(e,t)).length,p=u-1,h=t;null!=h&&++l<u;){var d=a(e[l]),m=n;if(l!=p){var f=h[d];void 0===(m=c?c(f,d,h):void 0)&&(m=o(f)?f:s(e[l+1])?[]:{})}i(h,d,m),h=h[d]}return t}},233:function(t,e,n){var i=n(234),r=n(41),s=Object.prototype.hasOwnProperty;t.exports=function(t,e,n){var o=t[e];s.call(t,e)&&r(o,n)&&(void 0!==n||e in t)||i(t,e,n)}},234:function(t,e,n){var i=n(83);t.exports=function(t,e,n){"__proto__"==e&&i?i(t,e,{configurable:!0,enumerable:!0,value:n,writable:!0}):t[e]=n}},235:function(t,e,n){var i=n(76),r=n(236),s=n(238);t.exports=function(t){return i(t,s,r)}},236:function(t,e,n){var i=n(40),r=n(237),s=n(77),o=n(78),a=Object.getOwnPropertySymbols?function(t){for(var e=[];t;)i(e,s(t)),t=r(t);return e}:o;t.exports=a},237:function(t,e,n){var i=n(81)(Object.getPrototypeOf,Object);t.exports=i},238:function(t,e,n){var i=n(79),r=n(239),s=n(43);t.exports=function(t){return s(t)?i(t,!0):r(t)}},239:function(t,e,n){var i=n(28),r=n(80),s=n(240),o=Object.prototype.hasOwnProperty;t.exports=function(t){if(!i(t))return s(t);var e=r(t),n=[];for(var a in t)("constructor"!=a||!e&&o.call(t,a))&&n.push(a);return n}},240:function(t,e){t.exports=function(t){var e=[];if(null!=t)for(var n in Object(t))e.push(n);return e}},241:function(t,e,n){},249:function(t,e,n){"use strict";n.d(e,"b",(function(){return s})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return h}));var i={data:()=>({comp:null}),computed:{page(){return this.$pagination.paginationIndex+1}},mounted(){n.e(2).then(n.t.bind(null,267,7)).then(t=>{this.comp=t.default})},methods:{clickCallback(t){const e=this.$pagination.getSpecificPageLink(t-1);this.$router.push(e)}}},r=(n(228),n(5)),s=Object(r.a)(i,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.comp?n(t.comp,{tag:"component",attrs:{value:t.page,"page-count":t.$pagination.length,"click-handler":t.clickCallback,"prev-text":t.$pagination.prevText,"next-text":t.$pagination.nextText,"container-class":"pagination","page-class":"page-item"}}):t._e()}),[],!1,null,null,null).exports,o=(n(229),Object(r.a)({},(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"pagination simple-pagination"},[t.$pagination.hasPrev?n("router-link",{attrs:{to:t.$pagination.prevLink}},[t._v("\n    "+t._s(t.$pagination.prevText)+"\n  ")]):t._e(),t._v(" "),t.$pagination.hasNext?n("router-link",{attrs:{to:t.$pagination.nextLink}},[t._v("\n    "+t._s(t.$pagination.nextText)+"\n  ")]):t._e()],1)}),[],!1,null,null,null).exports),a=n(29),c=n.n(a),l=n(230),u=n.n(l),p={props:{title:{type:[String,Function],required:!1},issueId:{type:[String,Number],required:!1},options:{type:Object,required:!1},shortname:{type:String,required:!1},identifier:{type:String,required:!1},url:{type:String,required:!1},remote_auth_s3:{type:String,required:!1},api_key:{type:String,required:!1},sso_config:{type:Object,required:!1},language:{type:String,required:!1}},computed:{propsWithoutEmptyProperties(){return u()(this.$props,c.a)},commentProps(){return Object.assign({},this.propsWithoutEmptyProperties,this.$frontmatter.comment)},vssueProps(){return Object.assign({title:this.$page.title},this.commentProps)},disqusProps(){return Object.assign({identifier:this.$page.key},this.commentProps)}}},h=Object(r.a)(p,(function(){var t=this.$createElement,e=this._self._c||t;return"vssue"===this.$service.comment.service?e("Vssue",this._b({},"Vssue",this.vssueProps,!1)):"disqus"===this.$service.comment.service?e("Disqus",this._b({},"Disqus",this.disqusProps,!1)):this._e()}),[],!1,null,null,null).exports},250:function(t,e,n){"use strict";var i=n(224);n.n(i).a},251:function(t,e,n){"use strict";var i=n(225);n.n(i).a},252:function(t,e,n){"use strict";var i=n(226);n.n(i).a},253:function(t,e,n){"use strict";var i=n(227);n.n(i).a},254:function(t,e,n){"use strict";var i=n(241);n.n(i).a},268:function(t,e,n){"use strict";n.r(e);var i=n(223),r={props:["stick","tag"],data:()=>({needFloat:!1,stickBottom:0}),watch:{stick(){this.unStick(),this.stickHandle()}},mounted(){this.stickHandle()},beforeDestroy(){this.unStick()},methods:{stickHandle(){if(!this.stick)return;const t=Object(i.b)(this.stick,this);t&&(this._stickerScroll=()=>{const e=this.$el.getBoundingClientRect(),n=document.body.scrollTop+document.documentElement.scrollTop;this.needFloat=document.body.offsetHeight-n-e.height<t.offsetHeight,this.stickBottom=t.offsetHeight},this._stickerScroll(),window.addEventListener("scroll",this._stickerScroll))},unStick(){this.needFloat=!1,this.stickBottom=0,window.removeEventListener("scroll",this._stickerScroll)}}},s=(n(250),n(5));let o;function a(t){return t&&t.getBoundingClientRect?t.getBoundingClientRect().top+document.body.scrollTop+document.documentElement.scrollTop:0}var c={components:{Sticker:Object(s.a)(r,(function(){var t=this.$createElement;return(this._self._c||t)(this.tag||"div",{tag:"component",staticClass:"sticker",class:this.needFloat?["stick-float"]:void 0,style:this.needFloat?{bottom:this.stickBottom+"px"}:void 0},[this._t("default")],2)}),[],!1,null,null,null).exports},data:()=>({activeIndex:0}),computed:{visible(){return this.$frontmatter&&!1!==this.$frontmatter.toc&&!!(this.$page&&this.$page.headers&&this.$page.headers.length)}},watch:{activeIndex(){const t=(this.$refs.chairTocItem||[])[this.activeIndex];if(!t)return;const e=t.getBoundingClientRect(),n=this.$el.getBoundingClientRect(),i=e.top-n.top;i<20?this.$el.scrollTop=this.$el.scrollTop+i-20:i+e.height>n.height&&(this.$el.scrollTop+=e.top-(n.height-e.height))},$route(){}},mounted(){const t=()=>{this.$emit("visible-change",this.visible)};t(),this.$watch("visible",t),setTimeout(()=>this.triggerEvt(),1e3),this._onScroll=()=>this.onScroll(),this._onHashChange=()=>{const t=decodeURIComponent(location.hash.substring(1)),e=(this.$page.headers||[]).findIndex(e=>e.slug===t);e>=0&&(this.activeIndex=e);const n=t&&document.getElementById(t);n&&window.scrollTo(0,a(n)-20)},window.addEventListener("scroll",this._onScroll)},beforeDestroy(){window.removeEventListener("scroll",this._onScroll),window.removeEventListener("hashchange",this._onHashChange)},methods:{onScroll(){void 0===o&&(o=a(this.$el));const t=document.body.scrollTop+document.documentElement.scrollTop,e=this.$page.headers||[];let n=0;const i=t=>{this.activeIndex=t};for(;n<e.length;n++){if(!(a(document.getElementById(e[n].slug))-50<t)){n||i(n);break}i(n)}},triggerEvt(){this._onScroll(),this._onHashChange()}}},l=(n(251),Object(s.a)(c,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return t.visible?n("Sticker",t._b({staticClass:"vuepress-toc"},"Sticker",t.$attrs,!1),t._l(t.$page.headers,(function(e,i){return n("div",{key:i,ref:"chairTocItem",refInFor:!0,staticClass:"vuepress-toc-item",class:["vuepress-toc-h"+e.level,{active:t.activeIndex===i}]},[n("a",{attrs:{href:"#"+e.slug,title:e.title}},[t._v(t._s(e.title))])])})),0):t._e()}),[],!1,null,null,null).exports),u=n(45),p=n.n(u),h=n(4),d={name:"PostTag",props:{tag:{type:String,required:!0}}},m=(n(252),Object(s.a)(d,(function(){var t=this.$createElement,e=this._self._c||t;return e("li",{staticClass:"post-tag"},[e("router-link",{attrs:{to:"/tag/"+this.tag}},[this._v(" "+this._s(this.tag)+" ")])],1)}),[],!1,null,"d832e844",null).exports),f={name:"PostMeta",components:{NavigationIcon:h.n,ClockIcon:h.a,PostTag:m},props:{tags:{type:[Array,String]},author:{type:String},date:{type:String},location:{type:String}},computed:{resolvedDate(){return p()(this.date).format(this.$themeConfig.dateFormat||"ddd MMM DD YYYY")},resolvedTags(){return!this.tags||Array.isArray(this.tags)?this.tags:[this.tags]}}},g=(n(253),{components:{Toc:l,PostMeta:Object(s.a)(f,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"post-meta"},[t.author?n("div",{staticClass:"post-meta-author",attrs:{itemprop:"publisher author",itemtype:"http://schema.org/Person",itemscope:""}},[n("NavigationIcon"),t._v(" "),n("span",{attrs:{itemprop:"name"}},[t._v(t._s(t.author))]),t._v(" "),t.location?n("span",{attrs:{itemprop:"address"}},[t._v("   in "+t._s(t.location))]):t._e()],1):t._e(),t._v(" "),t.date?n("div",{staticClass:"post-meta-date"},[n("ClockIcon"),t._v(" "),n("time",{attrs:{pubdate:"",itemprop:"datePublished",datetime:t.date}},[t._v("\n      "+t._s(t.resolvedDate)+"\n    ")])],1):t._e(),t._v(" "),t.tags?n("ul",{staticClass:"post-meta-tags",attrs:{itemprop:"keywords"}},t._l(t.resolvedTags,(function(t){return n("PostTag",{key:t,attrs:{tag:t}})})),1):t._e()])}),[],!1,null,null,null).exports,Comment:n(249).a,Newsletter:()=>Promise.all([n.e(0),n.e(5)]).then(n.bind(null,269))}}),v=(n(254),Object(s.a)(g,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"vuepress-theme-blog__post-layout"}},[n("article",{staticClass:"vuepress-blog-theme-content",attrs:{itemscope:"",itemtype:"https://schema.org/BlogPosting"}},[n("header",[n("h1",{staticClass:"post-title",attrs:{itemprop:"name headline"}},[t._v("\n        "+t._s(t.$frontmatter.title)+"\n      ")]),t._v(" "),n("PostMeta",{attrs:{tags:t.$frontmatter.tags,author:t.$frontmatter.author,date:t.$frontmatter.date,location:t.$frontmatter.location}})],1),t._v(" "),n("Content",{attrs:{itemprop:"articleBody"}}),t._v(" "),n("footer",[t.$service.email.enabled?n("Newsletter"):t._e(),t._v(" "),n("hr"),t._v(" "),n("Comment")],1)],1),t._v(" "),n("Toc")],1)}),[],!1,null,null,null));e.default=v.exports}}]);