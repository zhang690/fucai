(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-mine-wancheng"],{"00c2":function(t,i,e){"use strict";var a=e("4ea4");e("d81d"),e("acd8"),e("ac1f"),e("1276"),Object.defineProperty(i,"__esModule",{value:!0}),i.default=void 0;var n,c=a(e("7f30")),o=a(e("aa1a")),s=(e("dd01"),{data:function(){return{detail:{},list:[],item:{},imgUrl:[]}},onLoad:function(t){n=this,n.item=JSON.parse(decodeURIComponent(t.item)),n.detail=n.item.orde,n.list=n.item.list,n.imgUrl=n.detail.LotteryImage.split(","),n.imgUrl=n.imgUrl.map((function(t){return o.default.PicURL+t}))},methods:{handleTanke:function(t){uni.makePhoneCall({phoneNumber:t})},goNavigation:function(){var t={latitude:parseFloat(n.detail.F_latitude),longitude:parseFloat(n.detail.F_longitude),name:n.detail.OutletsName,address:n.detail.F_Address};o.default.request({path:"login/getcode",method:"GET",data:encodeURIComponent(location.href.split("#")[0]),success:function(i){var e=i.data;c.default.initJssdk(e),c.default.openlocation(t)}})},previewImage:function(t){uni.previewImage({current:t,urls:n.imgUrl,loop:!0})}}});i.default=s},"02ff":function(t,i,e){"use strict";e.r(i);var a=e("df6d"),n=e("bad6");for(var c in n)["default"].indexOf(c)<0&&function(t){e.d(i,t,(function(){return n[t]}))}(c);e("0f3d");var o,s=e("f0c5"),l=Object(s["a"])(n["default"],a["b"],a["c"],!1,null,"cb87c2d4",null,!1,a["a"],o);i["default"]=l.exports},"0f3d":function(t,i,e){"use strict";var a=e("2f00"),n=e.n(a);n.a},"2f00":function(t,i,e){var a=e("7855");"string"===typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);var n=e("4f06").default;n("4cddb3f6",a,!0,{sourceMap:!1,shadowMode:!1})},7855:function(t,i,e){var a=e("24fb");i=a(!1),i.push([t.i,'@charset "UTF-8";\r\n/**\r\n * 这里是uni-app内置的常用样式变量\r\n *\r\n * uni-app 官方扩展插件及插件市场（https://ext.dcloud.net.cn）上很多三方插件均使用了这些样式变量\r\n * 如果你是插件开发者，建议你使用scss预处理，并在插件代码中直接使用这些变量（无需 import 这个文件），方便用户通过搭积木的方式开发整体风格一致的App\r\n *\r\n */\r\n/**\r\n * 如果你是App开发者（插件使用者），你可以通过修改这些变量来定制自己的插件主题，实现自定义主题功能\r\n *\r\n * 如果你的项目同样使用了scss预处理，你也可以直接在你的 scss 代码中使用如下变量，同时无需 import 这个文件\r\n */\r\n/* 颜色变量 */\r\n/* 行为相关颜色 */\r\n/* 文字基本颜色 */\r\n/* 背景颜色 */\r\n/* 边框颜色 */\r\n/* 尺寸变量 */\r\n/* 文字尺寸 */\r\n/* 图片尺寸 */\r\n/* Border Radius */\r\n/* 水平间距 */\r\n/* 垂直间距 */\r\n/* 透明度 */\r\n/* 文章场景相关 */.wancheng[data-v-cb87c2d4]{background-color:#f7f5f6}.wancheng .header_adress[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?20?% %?40?%;-webkit-box-align:center;-webkit-align-items:center;align-items:center;background-color:#fff}.wancheng .header_adress .adress_left .left_title[data-v-cb87c2d4]{font-size:%?30?%;font-weight:600}.wancheng .header_adress .adress_left .left_text[data-v-cb87c2d4]{color:#666;margin-top:%?10?%}.wancheng .header_adress .adress_right[data-v-cb87c2d4]{font-size:%?24?%}.wancheng .header_adress .adress_right .right_distance[data-v-cb87c2d4]{color:#666}.wancheng .header_adress .adress_right .right_go[data-v-cb87c2d4]{color:#ff3c36;margin-top:%?10?%}.wancheng .wancheng_container[data-v-cb87c2d4]{background-color:#fff;margin-top:%?15?%}.wancheng .wancheng_container .wancheng_title[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;padding:%?20?%;border-bottom:%?1?% solid #eee}.wancheng .wancheng_container .wancheng_title .wancheng_title_left[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;font-weight:600;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wancheng .wancheng_container .wancheng_title .wancheng_title_left uni-text[data-v-cb87c2d4]{display:block;background-color:#ff3c36;color:#fff;width:%?65?%;height:%?32?%;text-align:center;line-height:%?32?%;font-size:%?24?%;border-radius:%?5?%;margin-right:%?10?%}.wancheng .wancheng_container .wancheng_title .wancheng_title_right[data-v-cb87c2d4]{white-space:normal;word-break:keep-all;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center;color:#999}.wancheng .wancheng_container .wait_list .wait_item[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;border-bottom:%?1?% solid #eee;padding:%?20?%}.wancheng .wancheng_container .wait_list .wait_item .wait_item_icon[data-v-cb87c2d4]{width:%?60?%;margin-top:%?15?%}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap[data-v-cb87c2d4]{-webkit-box-flex:3;-webkit-flex:3;flex:3}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info[data-v-cb87c2d4]{color:#ff3c36;font-weight:600;margin-left:%?10?%;line-height:%?50?%;display:-webkit-box;display:-webkit-flex;display:flex;margin-top:%?15?%}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info .qiu_text[data-v-cb87c2d4]{width:%?400?%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info .qiu_text .blue[data-v-cb87c2d4]{color:#00f}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info .wait_item_qishu[data-v-cb87c2d4]{-webkit-box-flex:2;-webkit-flex:2;flex:2;font-size:%?24?%;text-align:center}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info .wait_item_qishu .qishu_text[data-v-cb87c2d4]{color:#666}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info .wait_item_qishu .qishu_text uni-text[data-v-cb87c2d4]{margin-left:%?20?%}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info .wait_item_qishu .qishu_info[data-v-cb87c2d4]{width:%?90?%;height:%?32?%;color:#333;background-color:#f7f5f6;margin-left:%?130?%;margin-top:%?20?%;line-height:%?32?%}.wancheng .wancheng_container .wait_list .wait_item .wait_item_wrap .wait_item_info uni-text[data-v-cb87c2d4]{margin-left:%?15?%}.wancheng .wancheng_container .wait_list .total_wrap[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-pack:justify;-webkit-justify-content:space-between;justify-content:space-between;font-size:%?30?%;font-weight:600;padding:%?20?% %?30?%}.wancheng .wancheng_container .wait_list .total_wrap .total_title[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wancheng .wancheng_container .wait_list .total_wrap .total_title[data-v-cb87c2d4] :nth-child(2){margin-left:%?20?%}.wancheng .wancheng_container .wait_list .total_wrap .total_item_text[data-v-cb87c2d4]{font-size:%?24?%;color:#999}.wancheng .chupiao_container[data-v-cb87c2d4]{margin-top:%?20?%;background-color:#fff;color:#999}.wancheng .chupiao_container .chupiao_time[data-v-cb87c2d4]{padding:%?20?%;margin-bottom:%?10?%;border-bottom:%?1?% solid #eee}.wancheng .chupiao_container .chupiao_phone[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wancheng .chupiao_container .chupiao_phone .chupiao_phone_img[data-v-cb87c2d4]{margin-left:%?40?%;width:%?30?%;height:%?30?%}.wancheng .chupiao_container .chupiao_phone .chupiao_phone_img uni-image[data-v-cb87c2d4]{width:%?30?%;height:%?30?%}.wancheng .chupiao_container .shop_address[data-v-cb87c2d4]{display:-webkit-box;display:-webkit-flex;display:flex;-webkit-box-align:center;-webkit-align-items:center;align-items:center}.wancheng .chupiao_container .shop_address .shop_address_title[data-v-cb87c2d4]{-webkit-box-flex:4;-webkit-flex:4;flex:4}.wancheng .chupiao_container .shop_address .shop_address_detail[data-v-cb87c2d4]{-webkit-box-flex:9;-webkit-flex:9;flex:9}.wancheng .chupiao_container .shop_address .shop_address_icon[data-v-cb87c2d4]{-webkit-box-flex:1;-webkit-flex:1;flex:1}.wancheng .chupiao_container .recive_time[data-v-cb87c2d4]{padding:%?20?%}.wancheng .chupiao[data-v-cb87c2d4]{margin-top:%?15?%;background-color:#fff;font-weight:600}.wancheng .chupiao .chupiao_title[data-v-cb87c2d4]{border:%?1?% solid #eee;padding:%?20?% %?30?%}.wancheng .chupiao .laod_chupiao[data-v-cb87c2d4]{text-align:center;margin-top:%?20?%;color:#999}.wancheng .chupiao_title_photo[data-v-cb87c2d4]{width:100%;display:-webkit-box;display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap;box-sizing:border-box;padding-bottom:%?22?%;-webkit-box-sizing:border-box}.wancheng .chupiao_title_photo .chupiao_title_photo_warp[data-v-cb87c2d4]{margin-left:%?22?%;margin-top:%?22?%;width:%?220?%;height:%?220?%}.wancheng .chupiao_title_photo .chupiao_title_photo_warp uni-image[data-v-cb87c2d4]{width:%?220?%;height:%?220?%!important}',""]),t.exports=i},a32e:function(t,i,e){t.exports=e.p+"static/img/telephone.f8b3a254.png"},bad6:function(t,i,e){"use strict";e.r(i);var a=e("00c2"),n=e.n(a);for(var c in a)["default"].indexOf(c)<0&&function(t){e.d(i,t,(function(){return a[t]}))}(c);i["default"]=n.a},df6d:function(t,i,e){"use strict";var a;e.d(i,"b",(function(){return n})),e.d(i,"c",(function(){return c})),e.d(i,"a",(function(){return a}));var n=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("v-uni-view",{staticClass:"wancheng"},[a("v-uni-view",{staticClass:"wancheng_container"},[a("v-uni-view",{staticClass:"wancheng_title"},[a("v-uni-view",{staticClass:"wancheng_title_left"},[a("v-uni-text",[t._v(t._s(t.detail.Self_Delivery))]),t._v(t._s(t.detail.OutletsName)+"投注站")],1),a("v-uni-view",{staticClass:"wancheng_title_right"},[t._v(t._s(t.detail.name))])],1),a("v-uni-view",{staticClass:"wait_list"},[a("v-uni-view",{staticClass:"wait_item"},[a("v-uni-view",{staticClass:"wait_item_icon"},[a("v-uni-image",{attrs:{src:t.detail.icon,mode:"widthFix"}})],1),a("v-uni-view",{staticClass:"wait_item_wrap"},t._l(t.list,(function(i,e){return a("v-uni-view",{key:e,staticClass:"wait_item_info"},[a("v-uni-view",{staticClass:"qiu_text"},[t._l(i.RedBall,(function(e){return a("v-uni-text",{key:e},[t._v(t._s(e)+t._s(4==t.detail.LotteryType?" * "+i.Price/e+"元":""))])})),t._l(i.BlueBall,(function(i){return a("v-uni-text",{key:i,staticClass:"blue"},[t._v(t._s(i))])}))],2),t.detail.LotteryType<4?a("v-uni-view",{staticClass:"wait_item_qishu"},[a("v-uni-view",{staticClass:"qishu_text"},[a("v-uni-text",[t._v("期数*"+t._s(i.Num))]),a("v-uni-text",[t._v("倍数*"+t._s(i.Multiple))])],1),a("v-uni-view",{staticClass:"qishu_info"},[t._v("第"+t._s(i.Fixed)+"期")])],1):t._e()],1)})),1)],1),a("v-uni-view",{staticClass:"total_wrap"},[a("v-uni-view",{staticClass:"total_title"},[a("v-uni-view",[t._v("第 "+t._s(t.list[0].Number)+" 期")]),a("v-uni-view",[t._v("共 "+t._s(t.list.length)+" 注")])],1),a("v-uni-view",{staticClass:"total_item"},[1!=t.detail.OrderState?a("v-uni-view",[t._v("合计："+t._s(t.detail.SinglePrice)+" 福豆")]):a("v-uni-view",[t._v("合计："+t._s(t.detail.Price)+" 福豆")]),t.detail.DeductionAmount>0?a("v-uni-view",{staticClass:"total_item_item"},[t._v("(体验券:-"+t._s(t.detail.DeductionAmount)+")")]):t._e()],1)],1)],1)],1),a("v-uni-view",{staticClass:"chupiao_container"},[a("v-uni-view",{staticClass:"chupiao_time"},[t._v("兑换编码："+t._s(t.detail.OrderNumber))]),a("v-uni-view",{staticClass:"chupiao_time"},[t._v("兑换体验时间："+t._s(t.detail.AddTime))]),a("v-uni-view",{staticClass:"chupiao_time"},[t._v("出票时间："+t._s(t.detail.LssueTime))]),a("v-uni-view",{staticClass:"chupiao_time"},[t._v("领取时间："+t._s(t.detail.ReceiveTime))]),a("v-uni-view",{staticClass:"chupiao_time"},[t._v("自提站点名称："+t._s(t.detail.OutletsName))]),a("v-uni-view",{staticClass:"chupiao_time shop_address",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.goNavigation.apply(void 0,arguments)}}},[a("v-uni-view",{staticClass:"shop_address_title"},[t._v("自提站点地址：")]),a("v-uni-view",{staticClass:"shop_address_detail"},[t._v(t._s(t.detail.F_Address))]),a("v-uni-view",{staticClass:"shop_address_icon iconfont icon-dizhi"})],1),a("v-uni-view",{staticClass:"chupiao_time chupiao_phone"},[a("v-uni-view",[t._v("站点联系方式："+t._s(t.detail.F_OuterPhone))]),a("v-uni-view",{staticClass:"chupiao_phone_img",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.handleTanke(t.detail.F_OuterPhone)}}},[a("v-uni-image",{attrs:{src:e("a32e").replace(/^\./,""),mode:"widthFix"}})],1)],1)],1),a("v-uni-view",{staticClass:"chupiao"},[a("v-uni-view",{staticClass:"chupiao_title"},[t._v("已完成")])],1),a("v-uni-view",{staticClass:"chupiao_title_photo"},t._l(t.imgUrl,(function(i,e){return a("v-uni-view",{key:e,staticClass:"chupiao_title_photo_warp",on:{click:function(i){arguments[0]=i=t.$handleEvent(i),t.previewImage(e)}}},[a("v-uni-image",{attrs:{src:i,mode:"widthFix"}})],1)})),1)],1)},c=[]}}]);