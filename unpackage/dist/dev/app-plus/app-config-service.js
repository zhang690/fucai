
var isReady=false;var onReadyCallbacks=[];
var isServiceReady=false;var onServiceReadyCallbacks=[];
var __uniConfig = {"pages":["pages/index/index","pages/login/userLogin","pages/rider/riderList","pages/index/caijuan","pages/rider/riderPeisong","pages/rider/riderWancheng","pages/setadress/adressList","pages/kaijiang/fucaiDetail","pages/rider/riderDetail","pages/getHome/getHome","pages/login/merchantLogin","pages/intimidate/intimidateList","pages/intimidate/intimidateDetail","pages/intimidate/intimidateFinish","pages/merchant/merchantList","pages/merchant/memberHistory","pages/merchant/merchantInfo","pages/login/riderLogin","pages/login/intimidateLogin","pages/selectOrder/locationWebView","pages/mine/tuijian","pages/luckyWheel/luckyWheel","pages/mine/duihuanRecord","pages/mine/jifenIntegral","pages/selectOrder/selectOrder","pages/selectCode/selectCodeqicai","pages/selectCode/selectThreeD","pages/kaijiang/kaijiang","pages/kaijiang/qilecaiDetail","pages/kaijiang/shuangseDetail","pages/selectCode/selectCode","pages/mine/mine","pages/mine/jifen","pages/mine/myjifen","pages/mine/waitTicket","pages/mine/waitRecive","pages/mine/wancheng","pages/setadress/setAdress","pages/giveSelect/giveSelect","pages/order/myOrder","pages/prize/prizeList","pages/prize/prizeFinish","pages/mine/nearbyLottery","pages/mine/jifenAll","pages/merchant/collectRecords","pages/merchant/merchantHistoryDetails","pages/account/accountList","pages/account/myName","pages/account/nickename","pages/account/phone","pages/account/loginName","pages/selectCode/selectCodeTT","pages/selectCode/selectCodeqicaiTT","pages/selectCode/selectThreeDTT","pages/news/newsDetail","pages/news/comment","pages/news/concerns","pages/kaijiang/search"],"window":{"navigationBarTextStyle":"black","navigationBarTitleText":"uni-app","navigationBarBackgroundColor":"#F8F8F8","backgroundColor":"#F8F8F8"},"tabBar":{"color":"#000","selectedColor":"#f0716f","backgroundColor":"#fff","position":"bottom","borderStyle":"black","list":[{"pagePath":"pages/index/index","text":"首页","iconPath":"./static/tabbar/index.png","selectedIconPath":"./static/tabbar/index_active.png"},{"pagePath":"pages/kaijiang/kaijiang","text":"资讯","iconPath":"./static/tabbar/jiangbei.png","selectedIconPath":"./static/tabbar/jiangbei_active.png"},{"pagePath":"pages/getHome/getHome","text":"关注","iconPath":"./static/tabbar/book.png","selectedIconPath":"./static/tabbar/book_active.png"},{"pagePath":"pages/mine/mine","text":"我的","iconPath":"./static/tabbar/me.png","selectedIconPath":"./static/tabbar/me_active.png"}]},"nvueCompiler":"uni-app","renderer":"auto","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":false},"appname":"77派","compilerVersion":"2.8.8","entryPagePath":"pages/index/index","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000}};
var __uniRoutes = [{"path":"/pages/index/index","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"推荐","navigationStyle":"custom"}},{"path":"/pages/login/userLogin","meta":{},"window":{"navigationBarTitleText":"用户登录","navigationStyle":"custom"}},{"path":"/pages/rider/riderList","meta":{},"window":{"navigationBarTitleText":"我的配送"}},{"path":"/pages/index/caijuan","meta":{},"window":{"navigationBarTitleText":"我的体验券"}},{"path":"/pages/rider/riderPeisong","meta":{},"window":{"navigationBarTitleText":"待配送"}},{"path":"/pages/rider/riderWancheng","meta":{},"window":{"navigationBarTitleText":"已送达"}},{"path":"/pages/setadress/adressList","meta":{},"window":{"navigationBarTitleText":"收货地址"}},{"path":"/pages/kaijiang/fucaiDetail","meta":{},"window":{"navigationBarTitleText":"福彩3D开奖历史"}},{"path":"/pages/rider/riderDetail","meta":{},"window":{"navigationBarTitleText":"待领取"}},{"path":"/pages/getHome/getHome","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"关注","navigationStyle":"custom"}},{"path":"/pages/login/merchantLogin","meta":{},"window":{"navigationBarTitleText":"站长登录","navigationStyle":"custom"}},{"path":"/pages/intimidate/intimidateList","meta":{},"window":{"navigationBarTitleText":"我的打单"}},{"path":"/pages/intimidate/intimidateDetail","meta":{},"window":{"navigationBarTitleText":"待打单"}},{"path":"/pages/intimidate/intimidateFinish","meta":{},"window":{"navigationBarTitleText":"打单完成"}},{"path":"/pages/merchant/merchantList","meta":{},"window":{"navigationBarTitleText":"站长","navigationStyle":"custom"}},{"path":"/pages/merchant/memberHistory","meta":{},"window":{"navigationBarTitleText":"会员历史记录"}},{"path":"/pages/merchant/merchantInfo","meta":{},"window":{"navigationBarTitleText":"扫码成功"}},{"path":"/pages/login/riderLogin","meta":{},"window":{"navigationBarTitleText":"骑手登录","navigationStyle":"custom"}},{"path":"/pages/login/intimidateLogin","meta":{},"window":{"navigationBarTitleText":"业务员登录","navigationStyle":"custom"}},{"path":"/pages/selectOrder/locationWebView","meta":{},"window":{"navigationBarTitleText":"业务员登录","navigationStyle":"custom"}},{"path":"/pages/mine/tuijian","meta":{},"window":{"navigationBarTitleText":"推荐有礼"}},{"path":"/pages/luckyWheel/luckyWheel","meta":{},"window":{"navigationBarTitleText":"抽奖"}},{"path":"/pages/mine/duihuanRecord","meta":{},"window":{"navigationBarTitleText":"兑换记录"}},{"path":"/pages/mine/jifenIntegral","meta":{},"window":{"navigationBarTitleText":"积分兑换"}},{"path":"/pages/selectOrder/selectOrder","meta":{},"window":{"navigationBarTitleText":"选号单"}},{"path":"/pages/selectCode/selectCodeqicai","meta":{},"window":{"navigationBarTitleText":"七乐彩模拟选号工具"}},{"path":"/pages/selectCode/selectThreeD","meta":{},"window":{"navigationBarTitleText":"福彩3D模拟选号工具"}},{"path":"/pages/kaijiang/kaijiang","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"资讯","navigationStyle":"custom"}},{"path":"/pages/kaijiang/qilecaiDetail","meta":{},"window":{"navigationBarTitleText":"七乐彩历史开奖"}},{"path":"/pages/kaijiang/shuangseDetail","meta":{},"window":{"navigationBarTitleText":"双色球历史开奖"}},{"path":"/pages/selectCode/selectCode","meta":{},"window":{"navigationBarTitleText":"双色球模拟选号工具"}},{"path":"/pages/mine/mine","meta":{"isQuit":true,"isTabBar":true},"window":{"navigationBarTitleText":"我的","navigationStyle":"custom"}},{"path":"/pages/mine/jifen","meta":{},"window":{"navigationBarTitleText":"积分商城"}},{"path":"/pages/mine/myjifen","meta":{},"window":{"navigationBarTitleText":"我的积分"}},{"path":"/pages/mine/waitTicket","meta":{},"window":{"navigationBarTitleText":"兑票中"}},{"path":"/pages/mine/waitRecive","meta":{},"window":{"navigationBarTitleText":"待领取"}},{"path":"/pages/mine/wancheng","meta":{},"window":{"navigationBarTitleText":"已完成"}},{"path":"/pages/setadress/setAdress","meta":{},"window":{"navigationBarTitleText":"编辑地址"}},{"path":"/pages/giveSelect/giveSelect","meta":{},"window":{"navigationBarTitleText":"配送方式"}},{"path":"/pages/order/myOrder","meta":{},"window":{"navigationBarTitleText":"我的体验"}},{"path":"/pages/prize/prizeList","meta":{},"window":{"navigationBarTitleText":"我的中奖"}},{"path":"/pages/prize/prizeFinish","meta":{},"window":{"navigationBarTitleText":"中奖详细"}},{"path":"/pages/mine/nearbyLottery","meta":{},"window":{"navigationBarTitleText":"附近彩票网点"}},{"path":"/pages/mine/jifenAll","meta":{},"window":{"navigationBarTitleText":"活动专场"}},{"path":"/pages/merchant/collectRecords","meta":{},"window":{"navigationBarTitleText":"领取记录"}},{"path":"/pages/merchant/merchantHistoryDetails","meta":{},"window":{"navigationBarTitleText":"领取详情"}},{"path":"/pages/account/accountList","meta":{},"window":{"navigationBarTitleText":"账户设置"}},{"path":"/pages/account/myName","meta":{},"window":{"navigationBarTitleText":"头像设置"}},{"path":"/pages/account/nickename","meta":{},"window":{"navigationBarTitleText":"姓名设置"}},{"path":"/pages/account/phone","meta":{},"window":{"navigationBarTitleText":"手机号设置"}},{"path":"/pages/account/loginName","meta":{},"window":{"navigationBarTitleText":"昵称设置"}},{"path":"/pages/selectCode/selectCodeTT","meta":{},"window":{"navigationBarTitleText":"双色球走势"}},{"path":"/pages/selectCode/selectCodeqicaiTT","meta":{},"window":{"navigationBarTitleText":"七乐彩走势"}},{"path":"/pages/selectCode/selectThreeDTT","meta":{},"window":{"navigationBarTitleText":"3D走势"}},{"path":"/pages/news/newsDetail","meta":{},"window":{"navigationBarTitleText":"资讯详情"}},{"path":"/pages/news/comment","meta":{},"window":{"navigationBarTitleText":"我的评论"}},{"path":"/pages/news/concerns","meta":{},"window":{"navigationBarTitleText":"我的关注"}},{"path":"/pages/kaijiang/search","meta":{},"window":{"navigationBarTitleText":"搜索"}}];
__uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
__uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:Math.round(f/20)})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:void 0,window:void 0,document:void 0,frames:void 0,self:void 0,location:void 0,navigator:void 0,localStorage:void 0,history:void 0,Caches:void 0,screen:void 0,alert:void 0,confirm:void 0,prompt:void 0,fetch:void 0,XMLHttpRequest:void 0,WebSocket:void 0,webkit:void 0,print:void 0}}}});
