(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-giveSelect-giveSelect~pages-index-index~pages-login-userLogin~pages-mine-mine~pages-mine-nearb~082c7eb5"],{"1da1":function(e,t,n){"use strict";function r(e,t,n,r,i,o,a){try{var c=e[o](a),s=c.value}catch(u){return void n(u)}c.done?t(s):Promise.resolve(s).then(r,i)}function i(e){return function(){var t=this,n=arguments;return new Promise((function(i,o){var a=e.apply(t,n);function c(e){r(a,i,o,c,s,"next",e)}function s(e){r(a,i,o,c,s,"throw",e)}c(void 0)}))}}n("d3b7"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=i},"7f30":function(e,t,n){"use strict";(function(e){var r=n("4ea4");n("d3b7"),n("ac1f"),n("466d"),Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,n("96cf");var i=r(n("1da1")),o=n("dd01"),a={isWechat:function(){var e=window.navigator.userAgent.toLowerCase();return"micromessenger"==e.match(/micromessenger/i)},initJssdk:function(e,t){o.config({debug:!1,appId:"wxeb23f51daa27076e",timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["checkJsApi","onMenuShareAppMessage","getLocation","openLocation","scanQRCode","chooseWXPay","chooseImage","previewImage","uploadImage"]}),t&&t()},getlocation:function(t,n){var r=this;return new Promise((function(a,c){r.isWechat()?r.initJssdk(t,(function(e){o.ready((function(){o.getLocation({type:"gcj02",success:function(){var e=(0,i.default)(regeneratorRuntime.mark((function e(t){var r;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,n(t);case 2:r=e.sent,a(r);case 4:case"end":return e.stop()}}),e)})));function t(t){return e.apply(this,arguments)}return t}(),fail:function(e){c("需要获取您的位置信息，请确认已同意微信使用您的定位")}})}))})):e("log","不是微信客户端"," at common/wx-sdk.js:35")}))},openlocation:function(t,n){o.ready((function(){o.openLocation({latitude:t.latitude,longitude:t.longitude,name:t.name,address:t.address,scale:14,success:function(){e("log","H5-打开地图成功"," at common/wx-sdk.js:68")}})}))},previewImage:function(t){e("log","开始预览"," at common/wx-sdk.js:75"),o.previewImage({current:t,urls:[t]})},chooseImage:function(t){o.ready((function(){o.chooseImage({count:1,sizeType:["compressed"],sourceType:["album","camera"],success:function(n){e("log","======",n,"====="," at common/wx-sdk.js:89"),t(n)}})}))}};t.default=a}).call(this,n("0de9")["log"])},9523:function(e,t){function n(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}e.exports=n},"96cf":function(e,t,n){var r=function(e){"use strict";var t,n=Object.prototype,r=n.hasOwnProperty,i="function"===typeof Symbol?Symbol:{},o=i.iterator||"@@iterator",a=i.asyncIterator||"@@asyncIterator",c=i.toStringTag||"@@toStringTag";function s(e,t,n){return Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}),e[t]}try{s({},"")}catch(O){s=function(e,t,n){return e[t]=n}}function u(e,t,n,r){var i=t&&t.prototype instanceof m?t:m,o=Object.create(i.prototype),a=new M(r||[]);return o._invoke=T(e,n,a),o}function d(e,t,n){try{return{type:"normal",arg:e.call(t,n)}}catch(O){return{type:"throw",arg:O}}}e.wrap=u;var l="suspendedStart",f="suspendedYield",p="executing",h="completed",g={};function m(){}function v(){}function y(){}var w={};w[o]=function(){return this};var S=Object.getPrototypeOf,I=S&&S(S(E([])));I&&I!==n&&r.call(I,o)&&(w=I);var _=y.prototype=m.prototype=Object.create(w);function k(e){["next","throw","return"].forEach((function(t){s(e,t,(function(e){return this._invoke(t,e)}))}))}function x(e,t){function n(i,o,a,c){var s=d(e[i],e,o);if("throw"!==s.type){var u=s.arg,l=u.value;return l&&"object"===typeof l&&r.call(l,"__await")?t.resolve(l.__await).then((function(e){n("next",e,a,c)}),(function(e){n("throw",e,a,c)})):t.resolve(l).then((function(e){u.value=e,a(u)}),(function(e){return n("throw",e,a,c)}))}c(s.arg)}var i;function o(e,r){function o(){return new t((function(t,i){n(e,r,t,i)}))}return i=i?i.then(o,o):o()}this._invoke=o}function T(e,t,n){var r=l;return function(i,o){if(r===p)throw new Error("Generator is already running");if(r===h){if("throw"===i)throw o;return A()}n.method=i,n.arg=o;while(1){var a=n.delegate;if(a){var c=L(a,n);if(c){if(c===g)continue;return c}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===l)throw r=h,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=p;var s=d(e,t,n);if("normal"===s.type){if(r=n.done?h:f,s.arg===g)continue;return{value:s.arg,done:n.done}}"throw"===s.type&&(r=h,n.method="throw",n.arg=s.arg)}}}function L(e,n){var r=e.iterator[n.method];if(r===t){if(n.delegate=null,"throw"===n.method){if(e.iterator["return"]&&(n.method="return",n.arg=t,L(e,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var i=d(r,e.iterator,n.arg);if("throw"===i.type)return n.method="throw",n.arg=i.arg,n.delegate=null,g;var o=i.arg;return o?o.done?(n[e.resultName]=o.value,n.next=e.nextLoc,"return"!==n.method&&(n.method="next",n.arg=t),n.delegate=null,g):o:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function b(e){var t={tryLoc:e[0]};1 in e&&(t.catchLoc=e[1]),2 in e&&(t.finallyLoc=e[2],t.afterLoc=e[3]),this.tryEntries.push(t)}function P(e){var t=e.completion||{};t.type="normal",delete t.arg,e.completion=t}function M(e){this.tryEntries=[{tryLoc:"root"}],e.forEach(b,this),this.reset(!0)}function E(e){if(e){var n=e[o];if(n)return n.call(e);if("function"===typeof e.next)return e;if(!isNaN(e.length)){var i=-1,a=function n(){while(++i<e.length)if(r.call(e,i))return n.value=e[i],n.done=!1,n;return n.value=t,n.done=!0,n};return a.next=a}}return{next:A}}function A(){return{value:t,done:!0}}return v.prototype=_.constructor=y,y.constructor=v,v.displayName=s(y,c,"GeneratorFunction"),e.isGeneratorFunction=function(e){var t="function"===typeof e&&e.constructor;return!!t&&(t===v||"GeneratorFunction"===(t.displayName||t.name))},e.mark=function(e){return Object.setPrototypeOf?Object.setPrototypeOf(e,y):(e.__proto__=y,s(e,c,"GeneratorFunction")),e.prototype=Object.create(_),e},e.awrap=function(e){return{__await:e}},k(x.prototype),x.prototype[a]=function(){return this},e.AsyncIterator=x,e.async=function(t,n,r,i,o){void 0===o&&(o=Promise);var a=new x(u(t,n,r,i),o);return e.isGeneratorFunction(n)?a:a.next().then((function(e){return e.done?e.value:a.next()}))},k(_),s(_,c,"Generator"),_[o]=function(){return this},_.toString=function(){return"[object Generator]"},e.keys=function(e){var t=[];for(var n in e)t.push(n);return t.reverse(),function n(){while(t.length){var r=t.pop();if(r in e)return n.value=r,n.done=!1,n}return n.done=!0,n}},e.values=E,M.prototype={constructor:M,reset:function(e){if(this.prev=0,this.next=0,this.sent=this._sent=t,this.done=!1,this.delegate=null,this.method="next",this.arg=t,this.tryEntries.forEach(P),!e)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=t)},stop:function(){this.done=!0;var e=this.tryEntries[0],t=e.completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(e){if(this.done)throw e;var n=this;function i(r,i){return c.type="throw",c.arg=e,n.next=r,i&&(n.method="next",n.arg=t),!!i}for(var o=this.tryEntries.length-1;o>=0;--o){var a=this.tryEntries[o],c=a.completion;if("root"===a.tryLoc)return i("end");if(a.tryLoc<=this.prev){var s=r.call(a,"catchLoc"),u=r.call(a,"finallyLoc");if(s&&u){if(this.prev<a.catchLoc)return i(a.catchLoc,!0);if(this.prev<a.finallyLoc)return i(a.finallyLoc)}else if(s){if(this.prev<a.catchLoc)return i(a.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return i(a.finallyLoc)}}}},abrupt:function(e,t){for(var n=this.tryEntries.length-1;n>=0;--n){var i=this.tryEntries[n];if(i.tryLoc<=this.prev&&r.call(i,"finallyLoc")&&this.prev<i.finallyLoc){var o=i;break}}o&&("break"===e||"continue"===e)&&o.tryLoc<=t&&t<=o.finallyLoc&&(o=null);var a=o?o.completion:{};return a.type=e,a.arg=t,o?(this.method="next",this.next=o.finallyLoc,g):this.complete(a)},complete:function(e,t){if("throw"===e.type)throw e.arg;return"break"===e.type||"continue"===e.type?this.next=e.arg:"return"===e.type?(this.rval=this.arg=e.arg,this.method="return",this.next="end"):"normal"===e.type&&t&&(this.next=t),g},finish:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.finallyLoc===e)return this.complete(n.completion,n.afterLoc),P(n),g}},catch:function(e){for(var t=this.tryEntries.length-1;t>=0;--t){var n=this.tryEntries[t];if(n.tryLoc===e){var r=n.completion;if("throw"===r.type){var i=r.arg;P(n)}return i}}throw new Error("illegal catch attempt")},delegateYield:function(e,n,r){return this.delegate={iterator:E(e),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=t),g}},e}(e.exports);try{regeneratorRuntime=r}catch(i){Function("r","regeneratorRuntime = r")(r)}},dd01:function(e,t,n){(function(r){var i;n("c975"),n("ac1f"),n("466d"),n("5319"),n("1276");var o=n("9523");!function(r,o){i=function(){return o(r)}.call(t,n,t,e),void 0===i||(e.exports=i)}(window,(function(e,t){if(!e.jWeixin){var n,i,a={config:"preVerifyJSAPI",onMenuShareTimeline:"menu:share:timeline",onMenuShareAppMessage:"menu:share:appmessage",onMenuShareQQ:"menu:share:qq",onMenuShareWeibo:"menu:share:weiboApp",onMenuShareQZone:"menu:share:QZone",previewImage:"imagePreview",getLocation:"geoLocation",openProductSpecificView:"openProductViewWithPid",addCard:"batchAddCard",openCard:"batchViewCard",chooseWXPay:"getBrandWCPayRequest",openEnterpriseRedPacket:"getRecevieBizHongBaoRequest",startSearchBeacons:"startMonitoringBeacons",stopSearchBeacons:"stopMonitoringBeacons",onSearchBeacons:"onBeaconsInRange",consumeAndShareCard:"consumedShareCard",openAddress:"editAddress"},c=function(){var e={};for(var t in a)e[a[t]]=t;return e}(),s=e.document,u=s.title,d=navigator.userAgent.toLowerCase(),l=navigator.platform.toLowerCase(),f=!(!l.match("mac")&&!l.match("win")),p=-1!=d.indexOf("wxdebugger"),h=-1!=d.indexOf("micromessenger"),g=-1!=d.indexOf("android"),m=-1!=d.indexOf("iphone")||-1!=d.indexOf("ipad"),v=(i=d.match(/micromessenger\/(\d+\.\d+\.\d+)/)||d.match(/micromessenger\/(\d+\.\d+)/))?i[1]:"",y={initStartTime:N(),initEndTime:0,preVerifyStartTime:0,preVerifyEndTime:0},w={version:1,appId:"",initTime:0,preVerifyTime:0,networkType:"",isPreVerifyOk:1,systemType:m?1:g?2:-1,clientVersion:v,url:encodeURIComponent(location.href)},S={},I={_completes:[]},_={state:0,data:{}};B((function(){y.initEndTime=N()}));var k=!1,x=[],T=(n={config:function(t){C("config",S=t);var n=!1!==S.check;B((function(){if(n)P(a.config,{verifyJsApiList:V(S.jsApiList),verifyOpenTagList:V(S.openTagList)},function(){I._complete=function(e){y.preVerifyEndTime=N(),_.state=1,_.data=e},I.success=function(e){w.isPreVerifyOk=0},I.fail=function(e){I._fail?I._fail(e):_.state=-1};var e=I._completes;return e.push((function(){!function(){if(!(f||p||S.debug||v<"6.0.2"||w.systemType<0)){var e=new Image;w.appId=S.appId,w.initTime=y.initEndTime-y.initStartTime,w.preVerifyTime=y.preVerifyEndTime-y.preVerifyStartTime,T.getNetworkType({isInnerInvoke:!0,success:function(t){w.networkType=t.networkType;var n="https://open.weixin.qq.com/sdk/report?v="+w.version+"&o="+w.isPreVerifyOk+"&s="+w.systemType+"&c="+w.clientVersion+"&a="+w.appId+"&n="+w.networkType+"&i="+w.initTime+"&p="+w.preVerifyTime+"&u="+w.url;e.src=n}})}}()})),I.complete=function(t){for(var n=0,r=e.length;n<r;++n)e[n]();I._completes=[]},I}()),y.preVerifyStartTime=N();else{_.state=1;for(var e=I._completes,t=0,r=e.length;t<r;++t)e[t]();I._completes=[]}})),T.invoke||(T.invoke=function(t,n,r){e.WeixinJSBridge&&WeixinJSBridge.invoke(t,E(n),r)},T.on=function(t,n){e.WeixinJSBridge&&WeixinJSBridge.on(t,n)})},ready:function(e){0!=_.state?e():(I._completes.push(e),!h&&S.debug&&e())},error:function(e){v<"6.0.2"||(-1==_.state?e(_.data):I._fail=e)},checkJsApi:function(e){P("checkJsApi",{jsApiList:V(e.jsApiList)},(e._complete=function(e){if(g){var t=e.checkResult;t&&(e.checkResult=JSON.parse(t))}e=function(e){var t=e.checkResult;for(var n in t){var r=c[n];r&&(t[r]=t[n],delete t[n])}return e}(e)},e))},onMenuShareTimeline:function(e){M(a.onMenuShareTimeline,{complete:function(){P("shareTimeline",{title:e.title||u,desc:e.title||u,img_url:e.imgUrl||"",link:e.link||location.href,type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareAppMessage:function(e){M(a.onMenuShareAppMessage,{complete:function(t){"favorite"===t.scene?P("sendAppMessage",{title:e.title||u,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""}):P("sendAppMessage",{title:e.title||u,desc:e.desc||"",link:e.link||location.href,img_url:e.imgUrl||"",type:e.type||"link",data_url:e.dataUrl||""},e)}},e)},onMenuShareQQ:function(e){M(a.onMenuShareQQ,{complete:function(){P("shareQQ",{title:e.title||u,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareWeibo:function(e){M(a.onMenuShareWeibo,{complete:function(){P("shareWeiboApp",{title:e.title||u,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},onMenuShareQZone:function(e){M(a.onMenuShareQZone,{complete:function(){P("shareQZone",{title:e.title||u,desc:e.desc||"",img_url:e.imgUrl||"",link:e.link||location.href},e)}},e)},updateTimelineShareData:function(e){P("updateTimelineShareData",{title:e.title,link:e.link,imgUrl:e.imgUrl},e)},updateAppMessageShareData:function(e){P("updateAppMessageShareData",{title:e.title,desc:e.desc,link:e.link,imgUrl:e.imgUrl},e)},startRecord:function(e){P("startRecord",{},e)},stopRecord:function(e){P("stopRecord",{},e)},onVoiceRecordEnd:function(e){M("onVoiceRecordEnd",e)},playVoice:function(e){P("playVoice",{localId:e.localId},e)},pauseVoice:function(e){P("pauseVoice",{localId:e.localId},e)},stopVoice:function(e){P("stopVoice",{localId:e.localId},e)},onVoicePlayEnd:function(e){M("onVoicePlayEnd",e)},uploadVoice:function(e){P("uploadVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadVoice:function(e){P("downloadVoice",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},translateVoice:function(e){P("translateVoice",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},chooseImage:function(e){P("chooseImage",{scene:"1|2",count:e.count||9,sizeType:e.sizeType||["original","compressed"],sourceType:e.sourceType||["album","camera"]},(e._complete=function(e){if(g){var t=e.localIds;try{t&&(e.localIds=JSON.parse(t))}catch(e){}}},e))},getLocation:function(e){},previewImage:function(e){P(a.previewImage,{current:e.current,urls:e.urls},e)},uploadImage:function(e){P("uploadImage",{localId:e.localId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},downloadImage:function(e){P("downloadImage",{serverId:e.serverId,isShowProgressTips:0==e.isShowProgressTips?0:1},e)},getLocalImgData:function(e){!1===k?(k=!0,P("getLocalImgData",{localId:e.localId},(e._complete=function(e){if(k=!1,0<x.length){var t=x.shift();wx.getLocalImgData(t)}},e))):x.push(e)},getNetworkType:function(e){P("getNetworkType",{},(e._complete=function(e){e=function(e){var t=e.errMsg;e.errMsg="getNetworkType:ok";var n=e.subtype;if(delete e.subtype,n)e.networkType=n;else{var r=t.indexOf(":"),i=t.substring(r+1);switch(i){case"wifi":case"edge":case"wwan":e.networkType=i;break;default:e.errMsg="getNetworkType:fail"}}return e}(e)},e))},openLocation:function(e){P("openLocation",{latitude:e.latitude,longitude:e.longitude,name:e.name||"",address:e.address||"",scale:e.scale||28,infoUrl:e.infoUrl||""},e)}},o(n,"getLocation",(function(e){P(a.getLocation,{type:(e=e||{}).type||"wgs84"},(e._complete=function(e){delete e.type},e))})),o(n,"hideOptionMenu",(function(e){P("hideOptionMenu",{},e)})),o(n,"showOptionMenu",(function(e){P("showOptionMenu",{},e)})),o(n,"closeWindow",(function(e){P("closeWindow",{},e=e||{})})),o(n,"hideMenuItems",(function(e){P("hideMenuItems",{menuList:e.menuList},e)})),o(n,"showMenuItems",(function(e){P("showMenuItems",{menuList:e.menuList},e)})),o(n,"hideAllNonBaseMenuItem",(function(e){P("hideAllNonBaseMenuItem",{},e)})),o(n,"showAllNonBaseMenuItem",(function(e){P("showAllNonBaseMenuItem",{},e)})),o(n,"scanQRCode",(function(e){P("scanQRCode",{needResult:(e=e||{}).needResult||0,scanType:e.scanType||["qrCode","barCode"]},(e._complete=function(e){if(m){var t=e.resultStr;if(t){var n=JSON.parse(t);e.resultStr=n&&n.scan_code&&n.scan_code.scan_result}}},e))})),o(n,"openAddress",(function(e){P(a.openAddress,{},(e._complete=function(e){e=function(e){return e.postalCode=e.addressPostalCode,delete e.addressPostalCode,e.provinceName=e.proviceFirstStageName,delete e.proviceFirstStageName,e.cityName=e.addressCitySecondStageName,delete e.addressCitySecondStageName,e.countryName=e.addressCountiesThirdStageName,delete e.addressCountiesThirdStageName,e.detailInfo=e.addressDetailInfo,delete e.addressDetailInfo,e}(e)},e))})),o(n,"openProductSpecificView",(function(e){P(a.openProductSpecificView,{pid:e.productId,view_type:e.viewType||0,ext_info:e.extInfo},e)})),o(n,"addCard",(function(e){for(var t=e.cardList,n=[],r=0,i=t.length;r<i;++r){var o=t[r],c={card_id:o.cardId,card_ext:o.cardExt};n.push(c)}P(a.addCard,{card_list:n},(e._complete=function(e){var t=e.card_list;if(t){for(var n=0,r=(t=JSON.parse(t)).length;n<r;++n){var i=t[n];i.cardId=i.card_id,i.cardExt=i.card_ext,i.isSuccess=!!i.is_succ,delete i.card_id,delete i.card_ext,delete i.is_succ}e.cardList=t,delete e.card_list}},e))})),o(n,"chooseCard",(function(e){P("chooseCard",{app_id:S.appId,location_id:e.shopId||"",sign_type:e.signType||"SHA1",card_id:e.cardId||"",card_type:e.cardType||"",card_sign:e.cardSign,time_stamp:e.timestamp+"",nonce_str:e.nonceStr},(e._complete=function(e){e.cardList=e.choose_card_info,delete e.choose_card_info},e))})),o(n,"openCard",(function(e){for(var t=e.cardList,n=[],r=0,i=t.length;r<i;++r){var o=t[r],c={card_id:o.cardId,code:o.code};n.push(c)}P(a.openCard,{card_list:n},e)})),o(n,"consumeAndShareCard",(function(e){P(a.consumeAndShareCard,{consumedCardId:e.cardId,consumedCode:e.code},e)})),o(n,"chooseWXPay",(function(e){P(a.chooseWXPay,A(e),e)})),o(n,"openEnterpriseRedPacket",(function(e){P(a.openEnterpriseRedPacket,A(e),e)})),o(n,"startSearchBeacons",(function(e){P(a.startSearchBeacons,{ticket:e.ticket},e)})),o(n,"stopSearchBeacons",(function(e){P(a.stopSearchBeacons,{},e)})),o(n,"onSearchBeacons",(function(e){M(a.onSearchBeacons,e)})),o(n,"openEnterpriseChat",(function(e){P("openEnterpriseChat",{useridlist:e.userIds,chatname:e.groupName},e)})),o(n,"launchMiniProgram",(function(e){P("launchMiniProgram",{targetAppId:e.targetAppId,path:function(e){if("string"==typeof e&&0<e.length){var t=e.split("?")[0],n=e.split("?")[1];return t+=".html",void 0!==n?t+"?"+n:t}}(e.path),envVersion:e.envVersion},e)})),o(n,"openBusinessView",(function(e){P("openBusinessView",{businessType:e.businessType,queryString:e.queryString||"",envVersion:e.envVersion},(e._complete=function(e){if(g){var t=e.extraData;if(t)try{e.extraData=JSON.parse(t)}catch(t){e.extraData={}}}},e))})),o(n,"miniProgram",{navigateBack:function(e){e=e||{},B((function(){P("invokeMiniProgramAPI",{name:"navigateBack",arg:{delta:e.delta||1}},e)}))},navigateTo:function(e){B((function(){P("invokeMiniProgramAPI",{name:"navigateTo",arg:{url:e.url}},e)}))},redirectTo:function(e){B((function(){P("invokeMiniProgramAPI",{name:"redirectTo",arg:{url:e.url}},e)}))},switchTab:function(e){B((function(){P("invokeMiniProgramAPI",{name:"switchTab",arg:{url:e.url}},e)}))},reLaunch:function(e){B((function(){P("invokeMiniProgramAPI",{name:"reLaunch",arg:{url:e.url}},e)}))},postMessage:function(e){B((function(){P("invokeMiniProgramAPI",{name:"postMessage",arg:e.data||{}},e)}))},getEnv:function(t){B((function(){t({miniprogram:"miniprogram"===e.__wxjs_environment})}))}}),n),L=1,b={};return s.addEventListener("error",(function(e){if(!g){var t=e.target,n=t.tagName,r=t.src;if(("IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n)&&-1!=r.indexOf("wxlocalresource://")){e.preventDefault(),e.stopPropagation();var i=t["wx-id"];if(i||(i=L++,t["wx-id"]=i),b[i])return;b[i]=!0,wx.ready((function(){wx.getLocalImgData({localId:r,success:function(e){t.src=e.localData}})}))}}}),!0),s.addEventListener("load",(function(e){if(!g){var t=e.target,n=t.tagName;if(t.src,"IMG"==n||"VIDEO"==n||"AUDIO"==n||"SOURCE"==n){var r=t["wx-id"];r&&(b[r]=!1)}}}),!0),t&&(e.wx=e.jWeixin=T),T}function P(t,n,r){e.WeixinJSBridge?WeixinJSBridge.invoke(t,E(n),(function(e){O(t,e,r)})):C(t,r)}function M(t,n,r){e.WeixinJSBridge?WeixinJSBridge.on(t,(function(e){r&&r.trigger&&r.trigger(e),O(t,e,n)})):C(t,r||n)}function E(e){return(e=e||{}).appId=S.appId,e.verifyAppId=S.appId,e.verifySignType="sha1",e.verifyTimestamp=S.timestamp+"",e.verifyNonceStr=S.nonceStr,e.verifySignature=S.signature,e}function A(e){return{timeStamp:e.timestamp+"",nonceStr:e.nonceStr,package:e.package,paySign:e.paySign,signType:e.signType||"SHA1"}}function O(e,t,n){"openEnterpriseChat"!=e&&"openBusinessView"!==e||(t.errCode=t.err_code),delete t.err_code,delete t.err_desc,delete t.err_detail;var r=t.errMsg;r||(r=t.err_msg,delete t.err_msg,r=function(e,t){var n=e,r=c[n];r&&(n=r);var i="ok";if(t){var o=t.indexOf(":");"confirm"==(i=t.substring(o+1))&&(i="ok"),"failed"==i&&(i="fail"),-1!=i.indexOf("failed_")&&(i=i.substring(7)),-1!=i.indexOf("fail_")&&(i=i.substring(5)),"access denied"!=(i=(i=i.replace(/_/g," ")).toLowerCase())&&"no permission to execute"!=i||(i="permission denied"),"config"==n&&"function not exist"==i&&(i="ok"),""==i&&(i="fail")}return n+":"+i}(e,r),t.errMsg=r),(n=n||{})._complete&&(n._complete(t),delete n._complete),r=t.errMsg||"",S.debug&&!n.isInnerInvoke&&alert(JSON.stringify(t));var i=r.indexOf(":");switch(r.substring(i+1)){case"ok":n.success&&n.success(t);break;case"cancel":n.cancel&&n.cancel(t);break;default:n.fail&&n.fail(t)}n.complete&&n.complete(t)}function V(e){if(e){for(var t=0,n=e.length;t<n;++t){var r=e[t],i=a[r];i&&(e[t]=i)}return e}}function C(e,t){if(!(!S.debug||t&&t.isInnerInvoke)){var n=c[e];n&&(e=n),t&&t._complete&&delete t._complete,r("log",'"'+e+'",',t||""," at node_modules/jweixin-module/lib/index.js:1")}}function N(){return(new Date).getTime()}function B(t){h&&(e.WeixinJSBridge?t():s.addEventListener&&s.addEventListener("WeixinJSBridgeReady",t,!1))}}))}).call(this,n("0de9")["log"])}}]);