<template>
	<view class="storeAll">
		<view class="searchAll">			
			<view class="search">	
				<view class="iconfont icon-magnifier"></view>
				<input v-model="inpValue" type="text" @input="handleInput" placeholder="搜索更多" />
			</view>
			<view class="cencel" v-if="isFocus" @click="handleCencel">清除</view>
		</view>
		
		<view class="hongbao_info">
			<block v-for = "(item,index) in getListArray" :key = 'index'>
				<view class="recommend_item" @click="handleStore(item)">
					<view class="recommend_left">{{index + 1}}</view>
					<view class="recommend_right">{{item.Title}}</view>
				</view>
			</block>	
		</view>		
	</view>	
</template>

<script>	
	import common from '../../common/common';
	var _self
	export default {		
		data() {
			return {
				inpValue:'',
				isFocus:false,
				getListArray:[]
			}
		},
		onLoad(){
			_self = this;
			_self.getList().then(res=>{
				res.rows.forEach(item=>{
					item.image=common.PicURL+item.image;
				})
				_self.getListArray = res.rows
			})
		},		
		methods:{
			// 跳转详情新闻
			handleStore(item){
				uni.navigateTo({
					url:'../news/newsDetail?item='+encodeURIComponent(JSON.stringify(item))
				})
			},
			
			getList(){
				return new Promise((resolve,reject)=>{
					common.request({
						path:'Development/getnewlist',
						data:{
							type:1,
							rows: 20,
							page: 1,
						},
						success:(res)=>{
							if(res.info == '响应成功'){
								resolve(res.data);
							}else{
								reject(res.info)
							}
						}
					})
				})
			},	
			handleInput(){
				if(_self.inpValue){					
					_self.isFocus = true 
				}else{
					_self.isFocus = false
				}
			},
			handleCencel(){
				_self.isFocus = false;
				_self.inpValue = ''				
			}
		}
	}
</script>

<style lang="scss">
page{
	background-color: #fff;
}
.storeAll{
	width: 100%;
	height: auto;	
}
.searchAll{
	width: 94%;
	margin: 0 auto;
	display: flex;
	flex-direction: row;
	justify-content: space-around;
	.cencel{
		width: 110rpx;
		height: 80rpx;
		line-height: 80rpx;
		color: #999;
		text-align: center;
		background-color: #fff;
		margin: 20rpx 0;
	}
}
.search{
	flex: 1;
	margin: 20rpx auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: flex-start;
	background-color: #e8e8e8;
	border-radius: 100px;
	height: 80rpx;
	.icon-magnifier{
		color: #666;
		margin: 0 30rpx;
	}
	input{
		width: 100%;
		height: 100%;	
		background:transparent;
	}
	.input-placeholder{
		color: #999;
		font-size: 14px;
	}
}
.hongbao_info{
	width: 94%;
	height:auto;
	margin: 0 auto;
	background-color: white;
	margin-top: 40rpx;	
	.recommend_item{
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 80rpx;
		padding-bottom: 30rpx;
		margin-bottom: 30rpx;
		border-bottom: 1px solid #eee;
		&:last-of-type{
			border-bottom: none;
			margin-bottom: 0;
			padding-bottom: 0;
		}
		&:nth-of-type(1){
			.recommend_left{
				color: #f73768;
			}
		}
		&:nth-of-type(2){
			.recommend_left{
				color: #f73768;
			}
		}
		&:nth-of-type(3){
			.recommend_left{
				color: #f73768;
			}
		}
		.recommend_left{			
			font-size: 40rpx;
			color: #333;
			margin-right: 20rpx;
		}
		.recommend_right{				
			flex: 1;			
			overflow: hidden;
			text-overflow:ellipsis;
			white-space: nowrap;
		}
	}		
}


</style>
