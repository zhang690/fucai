<template>
  <view class="tabs">
    <view class="tabs_wrap">
      <view :class="item.isActive?'tabs_item':''" v-for="item in tabs" :key="item.id" @click="handleParent(item.id,item.name)">{{item.name}}</view>
    </view>
  </view>
</template>
<script>
export default {
  props:{
    tabs:Array
  },
  methods: {
    handleParent(id,name){
      this.$emit('handelChild',{id,name});
    }
  },
}
</script>
<style lang="scss" scoped>
  .tabs{
    background-color: #fff;
    .tabs_wrap{
      display: flex;
      height: 60rpx;
      align-items: center;
      justify-content: space-between;
      padding: 30rpx 20rpx;
      .tabs_item{
        border-bottom: 6rpx solid $color;
        padding-bottom: 15rpx;
        font-size: 32rpx;
      }
    }
  }
</style>