let URL = 'https://fucaiapi.yiruit.com/';
let PicURL = 'https://fucai.yiruit.com';
let request = (params)=>{
  return new Promise((resolve,reject)=>{
    uni.showLoading({
      title: "加载中...",
      mask: true,
    });
    // let token = uni.getStorageSync('token');
    // if(!token){
    //   uni.navigateTo({
    //     url: '/pages/login/userLogin',
    //   });
    //   uni.hideLoading();
    //   return;
    // }
    uni.request({
      url:URL + params.url,
      data: params.data?params.data:"",
      // header:{
      //   token
      // },
      dataType:"json",
      method: 'GET',
      success: (res)=>{
        resolve(res.data);
      },
      fail: (err)=>{
        reject(err)
      },
      complete: ()=>{
        uni.hideLoading();
      }
    });
  })
}
module.exports = {
  request,PicURL
}