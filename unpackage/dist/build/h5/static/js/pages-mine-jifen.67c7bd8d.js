(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-jifen"],{"0ef7":function(t,e,n){"use strict";n.r(e);var i=n("806e"),a=n.n(i);for(var r in i)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return i[t]}))}(r);e["default"]=a.a},"285d":function(t,e,n){"use strict";n.r(e);var i=n("74e0"),a=n("0ef7");for(var r in a)["default"].indexOf(r)<0&&function(t){n.d(e,t,(function(){return a[t]}))}(r);n("58b8");var c,o=n("f0c5"),f=Object(o["a"])(a["default"],i["b"],i["c"],!1,null,"52f7c9ab",null,!1,i["a"],c);e["default"]=f.exports},"56fe":function(t,e,n){var i=n("24fb");e=i(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.jifen .header_bg[data-v-52f7c9ab]{height:30vh;width:100vw;background-color:#000;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.jifen .header_nav[data-v-52f7c9ab]{margin-top:%?-145?%;background-color:#fff;width:100%;padding-top:%?120?%;padding-bottom:%?20?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-justify-content:space-around;justify-content:space-around;border-top-left-radius:%?50?%;border-top-right-radius:%?50?%}.jifen .header_nav .nav_item .nav_title[data-v-52f7c9ab]{color:#999;font-size:%?26?%;margin-top:%?10?%}.jifen .jifen_content[data-v-52f7c9ab]{padding-top:%?60?%;padding:%?20?% %?30?%;background-color:#fff}.jifen .jifen_content .jifen_title_wrap[data-v-52f7c9ab]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?15?% 0}.jifen .jifen_content .jifen_title_wrap .title_left[data-v-52f7c9ab]{font-size:%?30?%;font-weight:600}.jifen .jifen_content .jifen_title_wrap .title_right[data-v-52f7c9ab]{font-size:%?26?%;color:#999}.jifen .jifen_content .jifen_card_wrap[data-v-52f7c9ab]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;-webkit-box-orient:horizontal;-webkit-box-direction:normal;-webkit-flex-direction:row;flex-direction:row;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between}.jifen .jifen_content .jifen_card_wrap .jifen_card_item[data-v-52f7c9ab]{width:48%;text-align:center;padding:%?20?% 0}.jifen .jifen_content .jifen_card_wrap .jifen_card_item .card_icon[data-v-52f7c9ab]{width:100%;margin:0 auto;height:%?500?%}.jifen .jifen_content .jifen_card_wrap .jifen_card_item .card_icon uni-image[data-v-52f7c9ab]{display:block;width:100%;height:100%}.jifen .jifen_content .jifen_card_wrap .jifen_card_item .card_title[data-v-52f7c9ab]{margin:%?13?% 0}.jifen .jifen_content .jifen_card_wrap .jifen_card_item .card_jifen[data-v-52f7c9ab]{color:#ff3c36;font-size:%?24?%}.jifen .footer_icon[data-v-52f7c9ab]{width:90%;margin:%?50?% auto}',""]),t.exports=e},"58b8":function(t,e,n){"use strict";var i=n("a649"),a=n.n(i);a.a},"74e0":function(t,e,n){"use strict";var i;n.d(e,"b",(function(){return a})),n.d(e,"c",(function(){return r})),n.d(e,"a",(function(){return i}));var a=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-uni-view",{staticClass:"jifen"},[n("v-uni-view",{staticClass:"header_bg"},[n("v-uni-image",{attrs:{src:"https://fucai.yiruit.com/UpFiles/static/lijicanyu.png",mode:"widthFix"}})],1),n("v-uni-view",{staticClass:"header_nav"},[n("v-uni-view",{staticClass:"nav_item",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.handleJifen.apply(void 0,arguments)}}},[n("v-uni-view",{staticClass:"nav_icon"},[n("v-uni-image",{attrs:{src:"https://fucai.yiruit.com/UpFiles/static/wodejifen.png",mode:"widthFix"}})],1),n("v-uni-view",{staticClass:"nav_title"},[t._v("我的积分")])],1),n("v-uni-navigator",{staticClass:"nav_item",attrs:{url:"./duihuanRecord"}},[n("v-uni-view",{staticClass:"nav_icon"},[n("v-uni-image",{attrs:{src:"https://fucai.yiruit.com/UpFiles/mine/duihuan.png",mode:"widthFix"}})],1),n("v-uni-view",{staticClass:"nav_title"},[t._v("兑换记录")])],1),n("v-uni-navigator",{staticClass:"nav_item",attrs:{url:"./nearbyLottery"}},[n("v-uni-view",{staticClass:"nav_icon"},[n("v-uni-image",{attrs:{src:"https://fucai.yiruit.com/UpFiles/mine/fujin.png",mode:"widthFix"}})],1),n("v-uni-view",{staticClass:"nav_title"},[t._v("附近彩票")])],1)],1)],1)},r=[]},"806e":function(t,e,n){"use strict";var i=n("4ea4");Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,r=i(n("aa1a")),c={data:function(){return{num:4,products:[],jifenObj:""}},onLoad:function(t){a=this,a.jifenObj=t.content},onShow:function(){a.getData()},methods:{handleDuihuan:function(t){uni.setStorageSync("jifen",a.products[t]),uni.navigateTo({url:"./jifenIntegral"})},handleSelectcode:function(){wx.switchTab({url:"../getHome/getHome"})},getData:function(){r.default.request({path:"Development/getshopping",data:{rows:4,page:1,productname:"",sidx:"ReleaseTime",sord:"desc"},success:function(t){a.products=t.data.rows}})},handleJifen:function(){uni.navigateTo({url:"./myjifen?content="+a.jifenObj+"&id=1"})},handleAll:function(){uni.navigateTo({url:"jifenAll"})}}};e.default=c},a649:function(t,e,n){var i=n("56fe");"string"===typeof i&&(i=[[t.i,i,""]]),i.locals&&(t.exports=i.locals);var a=n("4f06").default;a("4b7f8742",i,!0,{sourceMap:!1,shadowMode:!1})}}]);