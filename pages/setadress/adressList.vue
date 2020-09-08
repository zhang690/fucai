<template>
  <view class="adress-list">
    <view class="songhuo_wrap">
      <view class="songhuo_item" v-for="(item,index) in shouhuoList" :key="item.ID">
        <view class="songhuo_item_left">
          <view class="songhuo_title">
						<text v-if="item.Defaule == '1'" style="color:#FF0000">[默认]</text>
						{{item.Address}}
					</view>
          <view class="songhuo_info">
            {{item.Name}}
            <text>{{item.Phone}}</text>
          </view>
        </view>
        <view class="songhuo_item_right">
          <view  @click="handleUpdate(item.ID,index)">编辑</view>
          <view class="del-btn " @click="handleDelete(item.ID)">删除</view>
        </view>
      </view>
    </view>
    <navigator url="./setAdress" class="add-adress">添加地址</navigator>
  </view>
</template>
<script>
import common from "../../common/common";
var _self;
export default {
  data() {
    return {
      shouhuoList: []
    };
  },
  onLoad() {
    _self = this;
   
  },
  onShow(){
    // _self.getAdress();
		this.GetAddress();
		
  },
  methods: {
		promiseGetAddress(){
			return new Promise((resolve,reject)=>{
				common.request({
				  path: "Development/getaddress",
				  data: common.getstate().ID,
				  success: res => {
				    if(res.data.rows.length>0){
								resolve(res.data.rows)
						}
				  }
				});
			})
		},
		
		async GetAddress(){
			let res = await _self.promiseGetAddress();
			_self.shouhuoList = res;
		},
		
		
    // 点击修改地址
    handleUpdate(id,i){
      _self.shouhuoList.forEach((element,index) => {
          if(i == index){
            uni.setStorageSync("adress", element);
          }
        });
      wx.navigateTo({
        url: './setAdress?id=' + id,
      });
    },
    // 点击删除地址
    handleDelete(id) {
      common.request({
        path: "Development/deladdress",
        data: id,
        success: res => {
          // _self.shouhuoList = res.data.rows
        }
      });
      _self.shouhuoList.forEach((element, index) => {
        if (element.ID == id) {
          _self.shouhuoList.splice(index, 1);
        }
      });
    },
    // 获取地址列表
    getAdress() {
      //let { ID } = uni.getStorageSync("userinfo");

      common.request({
        path: "Development/getaddress",
        data: common.getstate().ID,
        success: res => {
          _self.shouhuoList = res.data.rows;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.adress-list {
  .songhuo_wrap {
    .songhuo_item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin: 0 auto;
      padding: 20rpx;
      margin-top: 15rpx;
      background-color: #fff;
      width: 90%;

      .songhuo_item_left {
				flex:5;
        .songhuo_title {
          font-size: 30rpx;
        }
        .songhuo_info {
          font-size: 24rpx;
          color: #999;
          margin-top: 20rpx;
          text {
            margin-left: 30rpx;
          }
        }
      }
      .songhuo_item_right {
				padding-left: 50rpx;
				flex:2;
        display: flex;
        color: #999;
        font-size: 24rpx;
        .del-btn{
          margin-left: 30rpx;
        }
      }
    }
  }
  .add-adress {
    position: fixed;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    height: 70rpx;
    background-color: $color;
    color: #fff;
    text-align: center;
    line-height: 70rpx;
    bottom: 50rpx;
    border-radius: 35rpx;
  }
}
</style>