(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-caijuan"],{5900:function(t,i,a){"use strict";var e;a.d(i,"b",(function(){return n})),a.d(i,"c",(function(){return c})),a.d(i,"a",(function(){return e}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"my-caiquan"},[0!==t.caiquanList.length?a("v-uni-view",{staticClass:"caiquan-wrap"},t._l(t.caiquanList,(function(i){return a("v-uni-view",{key:i.ID,staticClass:"caiquan-item"},[a("v-uni-image",{staticClass:"caiquan-icon",attrs:{src:"https://fucai.yiruit.com/UpFiles/shouye/caiquan.png"}}),a("v-uni-view",{staticClass:"caiquan-content",on:{click:function(a){arguments[0]=a=t.$handleEvent(a),t.selectquan(i)}}},[a("v-uni-view",{staticClass:"caiquan-money"},[t._v(t._s(i.FaceValue))]),a("v-uni-view",{staticClass:"caiquan-info"},[a("v-uni-view",{staticClass:"caiquan-youhui"},[t._v("体验券")]),a("v-uni-view",{staticClass:"caiquan-time"},[t._v("有效期至"+t._s(i.OverdueTime))])],1),a("v-uni-view",{staticClass:"caiquan-btn"},[a("v-uni-text",[t._v(t._s("1"==i.state?"已过期":"立即使用"))]),a("v-uni-view",{staticClass:"iconfont icon-xiajiantou"})],1)],1)],1)})),1):a("v-uni-view",{staticClass:"img"},[a("v-uni-image",{attrs:{src:"https://fucai.yiruit.com/UpFiles/tupian/line.png",mode:"widthFix"}}),a("v-uni-view",{staticClass:"img_btn"},[a("v-uni-view",{staticClass:"img_text"},[t._v("您暂未拥有体验券")]),a("v-uni-view",{staticClass:"btn",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.handleHuoqu.apply(void 0,arguments)}}},[t._v("获取体验券")])],1)],1),t.isHide?a("v-uni-view",{staticClass:"isHide"},[t._v("加载中")]):t._e(),t.Merchants?a("v-uni-view",{staticClass:"title"},[t._v("没有更多啦!!!...")]):t._e()],1)},c=[]},"5fc7":function(t,i,a){"use strict";a.r(i);var e=a("fa44"),n=a.n(e);for(var c in e)["default"].indexOf(c)<0&&function(t){a.d(i,t,(function(){return e[t]}))}(c);i["default"]=n.a},"8ebb":function(t,i,a){"use strict";a.r(i);var e=a("5900"),n=a("5fc7");for(var c in n)["default"].indexOf(c)<0&&function(t){a.d(i,t,(function(){return n[t]}))}(c);a("bea9");var o,u=a("f0c5"),r=Object(u["a"])(n["default"],e["b"],e["c"],!1,null,"12b425e0",null,!1,e["a"],o);i["default"]=r.exports},"9de1":function(t,i,a){var e=a("a6f7");"string"===typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);var n=a("4f06").default;n("fd57285e",e,!0,{sourceMap:!1,shadowMode:!1})},a6f7:function(t,i,a){var e=a("24fb");i=e(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.title[data-v-12b425e0]{width:100%;text-align:center;padding:%?40?% 0;color:#ccc}.isHide[data-v-12b425e0]{height:100vh;width:100%;position:absolute;left:0;top:0;z-index:100;background:#fff;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;font-size:16px;color:#999}.img[data-v-12b425e0]{height:100vh;width:100vw;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center;margin-top:%?-140?%}.img uni-image[data-v-12b425e0]{width:40%}.img .img_btn[data-v-12b425e0]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.img .img_btn .img_text[data-v-12b425e0]{font-size:%?32?%;color:#666}.img .img_btn .btn[data-v-12b425e0]{margin-top:%?60?%;padding:%?10?% %?40?%;background-color:#999;border-radius:%?50?%;text-align:center;color:#fff}.my-caiquan[data-v-12b425e0]{height:100vh;background-color:#f7f5f6;padding:%?30?%}.my-caiquan .caiquan-wrap .caiquan-item[data-v-12b425e0]{position:relative}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-icon[data-v-12b425e0]{height:%?160?%}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content[data-v-12b425e0]{position:absolute;top:0;width:100%;display:-webkit-box;display:-webkit-flex;display:flex}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content .caiquan-money[data-v-12b425e0]{-webkit-box-flex:1;-webkit-flex:1;flex:1;color:#ff3c36;font-size:50px;padding-left:%?20?%;text-align:center}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content .caiquan-info[data-v-12b425e0]{-webkit-box-flex:3;-webkit-flex:3;flex:3;border-left:%?1?% dotted #ff3c36;height:%?140?%;padding-top:%?20?%;color:#ff3c36;padding-left:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-around;justify-content:space-around}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content .caiquan-info .caiquan-man[data-v-12b425e0]{width:80%;border-top:%?1?% solid #ff3c36;border-bottom:%?1?% solid #ff3c36;padding:%?5?% 0;font-size:%?24?%}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content .caiquan-info .caiquan-time[data-v-12b425e0]{margin-top:%?-52?%;color:#999;font-size:%?20?%}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content .caiquan-btn[data-v-12b425e0]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content .caiquan-btn uni-text[data-v-12b425e0]{display:block;color:#ff3c36;font-size:%?35?%;letter-spacing:%?4?%;width:%?100?%;margin:%?30?% auto 0;text-align:center}.my-caiquan .caiquan-wrap .caiquan-item .caiquan-content .caiquan-btn .iconfont[data-v-12b425e0]{text-align:center;color:#ff3c36}',""]),t.exports=i},bea9:function(t,i,a){"use strict";var e=a("9de1"),n=a.n(e);n.a},fa44:function(t,i,a){"use strict";var e=a("4ea4");Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n,c=e(a("aa1a")),o={data:function(){return{caiquanList:[],par:[],type:"",isHide:!0,page:1,total:0,Merchants:!1}},onLoad:function(t){n=this,n.par=t.par,n.type=t.type,n.getCaiquan(1)},onReachBottom:function(){n.page+=1,n.page>n.total?n.Merchants=!0:n.getCaiquan(n.page)},methods:{selectquan:function(t){n.par?uni.navigateTo({url:"../selectOrder/selectOrder?totalnum="+n.par+"&yhq="+JSON.stringify(t)+"&type="+n.type}):uni.switchTab({url:"../getHome/getHome"})},getCaiquan:function(t){c.default.request({path:"Development/getcoupon",data:{state:"dsy",memberid:c.default.getstate().ID,page:t,rows:10,sidx:"OverdueTime",sord:"desc"},success:function(t){n.caiquanList=t.data.rows,n.isHide=!1,n.total=t.data.total}})},handleHuoqu:function(){uni.showModal({title:"友情提示",content:"请前往福彩到家线下门店了解详细活动",confirmText:"前往网点",success:function(t){if(t.confirm)uni.navigateTo({url:"../giveSelect/giveSelect?current=0&from=buy"});else if(t.cancel)return}})}}};i.default=o}}]);