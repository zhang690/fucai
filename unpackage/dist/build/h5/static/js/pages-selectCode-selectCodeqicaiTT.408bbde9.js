(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-selectCode-selectCodeqicaiTT"],{"0fd7":function(t,e,i){"use strict";var n=i("4ea4");i("99af"),i("c740"),i("4160"),i("13d5"),i("e25e"),i("ac1f"),i("1276"),i("159b"),Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=n(i("aa1a")),l=i("122c"),a={data:function(){return{formatRedList:[],formatBlueList:[],goodRedList:[],goodBlueList:[],historyList:[],titles:[{id:0,active:!0,title:"红球走势"},{id:1,active:!1,title:"蓝球走势"}],flag:0}},onLoad:function(){(0,l.forNum)(this.formatRedList,31),(0,l.forNum)(this.formatBlueList,17),this.getKaijiang()},onShow:function(){},methods:{chooseColor:function(t){this.flag=t,this.titles.forEach((function(e){e.active=e.id==t}))},getKaijiang:function(){var t=this;r.default.request({path:"Development/getpage",data:{rows:20,page:1,sidx:"PrizeTime",sord:"desc",caizhongid:"3"},success:function(e){e.data.rows.forEach((function(t){t.RedBall&&(t.RedBall=t.RedBall.split(","))})),t.historyList=e.data.rows;var i=[],n=[];t.historyList.forEach((function(e){e.PeriodsNumber=e.PeriodsNumber.substring(e.PeriodsNumber,e.PeriodsNumber.length-3);var r=[];r=(0,l.forNum)(r,31),e.RedBall.forEach((function(t){t=parseInt(t)-1,r[t].isActive=!0})),t.goodRedList.push(r);var a=[];a=(0,l.forNum)(a,17);var c=parseInt(e.BlueBall)-1;a[c].isActive=!0,t.goodBlueList.push(a),i.push(e.RedBall),n.push(e.BlueBall)}));var r=i.reduce((function(t,e){return t.concat(e)}));t.appearTimes(r,t.formatRedList),t.appearTimes(n,t.formatBlueList)}})},appearTimes:function(t,e){for(var i=function(i){var n=t[i],r=e.findIndex((function(t){return n==t.num}));-1!=r&&(e[r].times?e[r].times++:e[r].times=1)},n=0;n<t.length;n++)i(n);e.forEach((function(t){t.times||(t.times=0)}))}}};e.default=a},"122c":function(t,e){var i=function(t,e){for(var i=1;i<e;i++)i<10&&(i="0"+i),t.push({isActive:!1,isActiveSpecil:!1,num:i});return t},n=function(t,e){for(var i=0;i<=e;i++)t.push({isActive:!1,isActiveSpecil:!1,num:i})};t.exports={forNum:i,forGroup:n}},1456:function(t,e,i){"use strict";var n=i("6ff2"),r=i.n(n);r.a},"6ff2":function(t,e,i){var n=i("8b35");"string"===typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);var r=i("4f06").default;r("912e487e",n,!0,{sourceMap:!1,shadowMode:!1})},7464:function(t,e,i){"use strict";i.r(e);var n=i("0fd7"),r=i.n(n);for(var l in n)["default"].indexOf(l)<0&&function(t){i.d(e,t,(function(){return n[t]}))}(l);e["default"]=r.a},"8b35":function(t,e,i){var n=i("24fb");e=n(!1),e.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.content[data-v-cf58f088]{padding:0}.content .content_title[data-v-cf58f088]{display:-webkit-box;display:-webkit-flex;display:flex;height:%?60?%;-webkit-box-pack:center;-webkit-justify-content:center;justify-content:center}.content .content_title .content_title_item[data-v-cf58f088]{height:100%;width:%?300?%;line-height:%?60?%;text-align:center;font-size:%?30?%;color:#999}.content .content_title .content_title_item_active[data-v-cf58f088]{font-size:%?34?%;color:#333}.content .content_warp[data-v-cf58f088]{font-size:%?34?%}.content .content_warp .fixed_item[data-v-cf58f088]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;height:%?80?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.content .content_warp .fixed_item .fixed_item_name[data-v-cf58f088]{box-sizing:border-box;-webkit-box-sizing:border-box;padding-left:%?25?%;-webkit-flex-shrink:0;flex-shrink:0;width:%?130?%;color:#999;background-color:#f6f6f6}.content .content_warp .fixed_item .fixed_item_times[data-v-cf58f088]{padding-left:%?10?%;margin-right:%?12?%;font-size:%?30?%;background-color:#fee6e5}.content .content_warp .fixed_item .fixed_item_red[data-v-cf58f088]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.content .content_warp .fixed_item .fixed_item_red .fixed_item_red_ball[data-v-cf58f088]{color:#999;width:%?60?%;height:%?60?%;text-align:center;line-height:%?60?%;border-radius:50%;margin-right:%?40?%}.content .content_warp .fixed_item .fixed_item_blue[data-v-cf58f088]{display:-webkit-box;display:-webkit-flex;display:flex}.content .content_warp .fixed_item .fixed_item_blue .fixed_item_blue_ball[data-v-cf58f088]{color:#999;width:%?60?%;height:%?60?%;text-align:center;line-height:%?60?%;border-radius:50%;margin-right:%?40?%}.content .content_warp .flex_item_bg[data-v-cf58f088]{height:%?80?%;background-color:#fee6e5}.content .content_warp .scroll[data-v-cf58f088]{height:100vh}.content .content_warp .scroll .scroll_item[data-v-cf58f088]{height:%?80?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;-webkit-flex-wrap:nowrap;flex-wrap:nowrap}.content .content_warp .scroll .scroll_item .scroll_item_qishu uni-view[data-v-cf58f088]{-webkit-flex-shrink:0;flex-shrink:0;margin-right:%?40?%;color:#999;white-space:nowrap;padding-left:%?10?%}.content .content_warp .scroll .scroll_item .scroll_item_red[data-v-cf58f088]{display:-webkit-box;display:-webkit-flex;display:flex}.content .content_warp .scroll .scroll_item .scroll_item_red .scroll_item_reditem[data-v-cf58f088]{color:#999;width:%?60?%;height:%?60?%;text-align:center;line-height:%?60?%;border-radius:50%;margin-right:%?40?%}.content .content_warp .scroll .scroll_item .scroll_item_red .scroll_item_reditem_red[data-v-cf58f088]{background-color:red;color:#fff}.content .content_warp .scroll .scroll_item .scroll_item_blue[data-v-cf58f088]{display:-webkit-box;display:-webkit-flex;display:flex}.content .content_warp .scroll .scroll_item .scroll_item_blue .scroll_item_blueitem[data-v-cf58f088]{color:#999;width:%?60?%;height:%?60?%;text-align:center;line-height:%?60?%;border-radius:50%;margin-right:%?40?%}.content .content_warp .scroll .scroll_item .scroll_item_blue .scroll_item_blueitem_blue[data-v-cf58f088]{background-color:#00f;color:#fff}.content .content_warp .scroll .scroll_item .scroll_item_interleave[data-v-cf58f088]{background-color:#f6f6f6}',""]),t.exports=e},cbc8:function(t,e,i){"use strict";i.r(e);var n=i("ccee"),r=i("7464");for(var l in r)["default"].indexOf(l)<0&&function(t){i.d(e,t,(function(){return r[t]}))}(l);i("1456");var a,c=i("f0c5"),s=Object(c["a"])(r["default"],n["b"],n["c"],!1,null,"cf58f088",null,!1,n["a"],a);e["default"]=s.exports},ccee:function(t,e,i){"use strict";var n;i.d(e,"b",(function(){return r})),i.d(e,"c",(function(){return l})),i.d(e,"a",(function(){return n}));var r=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("v-uni-view",{staticClass:"content"},[i("v-uni-view",{staticClass:"content_title"},t._l(t.titles,(function(e,n){return i("v-uni-view",{staticClass:"content_title_item",class:e.active?"content_title_item_active":"",on:{click:function(e){arguments[0]=e=t.$handleEvent(e),t.chooseColor(n)}}},[t._v(t._s(e.title))])})),1),i("v-uni-view",{staticClass:"content_warp"},[i("v-uni-scroll-view",{staticClass:"scroll",attrs:{"scroll-y":!0,"scroll-x":!0}},[i("v-uni-view",{staticClass:"fixed_item"},[i("v-uni-view",{staticClass:"fixed_item_name"},[t._v("期数")]),0==t.flag?i("v-uni-view",{staticClass:"fixed_item_red"},t._l(t.formatRedList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"fixed_item_red_ball"},[t._v(t._s(e.num))])})),1):i("v-uni-view",{staticClass:"fixed_item_blue"},t._l(t.formatBlueList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"fixed_item_blue_ball"},[t._v(t._s(e.num))])})),1)],1),t._l(t.historyList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"scroll_item"},[i("v-uni-view",{staticClass:"scroll_item_qishu"},[i("v-uni-view",[t._v(t._s(e.PeriodsNumber)+"期")])],1),0==t.flag?i("v-uni-view",{staticClass:"scroll_item_red",class:n%2==1?"scroll_item_interleave":""},t._l(t.goodRedList[n],(function(e,n){return i("v-uni-view",{key:n,staticClass:"scroll_item_reditem",class:e.isActive?"scroll_item_reditem_red":""},[t._v(t._s(e.num))])})),1):i("v-uni-view",{staticClass:"scroll_item_blue",class:n%2==1?"scroll_item_interleave":""},t._l(t.goodBlueList[n],(function(e,n){return i("v-uni-view",{key:n,staticClass:"scroll_item_blueitem",class:e.isActive?"scroll_item_blueitem_blue":""},[t._v(t._s(e.num))])})),1)],1)})),i("v-uni-view",{staticClass:"fixed_item flex_item_bg"},[i("v-uni-view",{staticClass:"fixed_item_name fixed_item_times"},[t._v("出现次数")]),0==t.flag?i("v-uni-view",{staticClass:"fixed_item_red flex_item_bg"},t._l(t.formatRedList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"fixed_item_red_ball"},[t._v(t._s(e.times))])})),1):i("v-uni-view",{staticClass:"fixed_item_blue flex_item_bg"},t._l(t.formatBlueList,(function(e,n){return i("v-uni-view",{key:n,staticClass:"fixed_item_blue_ball"},[t._v(t._s(e.times))])})),1)],1)],2)],1)],1)},l=[]}}]);