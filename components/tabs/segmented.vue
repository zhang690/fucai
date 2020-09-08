<template>
  <view class="segmented">
    <view class="segmented-wrap">
      <view class="segmented-item" :class="item.isActive?'segmented-active':''" v-for="item in tabs" :key="item.id" @click="handleClick(item.id)">{{item.name}}</view>
    </view>
  </view>
</template>
<script>
export default {
  props:{
    tabs:Array
  },
  methods: {
    handleClick(id){
      this.$emit("handleParent",id);
      // console.log(id);
    }
  },
}
</script>
<style lang="scss" scoped>
  .segmented{
    width: 100%;
    .segmented-wrap{      
      display: flex;
      justify-content: space-between;
	  align-items: center;
      padding:5rpx 30rpx;
      height: 50rpx;
      background-color: $color;
      border-radius: 63rpx;
      font-weight: 600;
      .segmented-item{
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
		font-size: 14px;
		height: 97%;
		&:first-of-type{
			margin-left: -24rpx;
		}	
		&:last-of-type{
			margin-right: -24rpx;
		}
      }
      .segmented-active{
        background-color: #fff;
        color: $color;
        border-radius: 35rpx;
      }
    }
  }
</style>