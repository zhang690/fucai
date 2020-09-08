<template>
	<view>
		<view class="news">
			<view class="news_title">{{newsDetail.Title}}</view>
			<view class="news_time">{{newsDetail.AddTime}}</view>
			<view class="news_image">
				<image :src="newsDetail.image" mode="scaleToFill"></image>
			</view>
			<view>
				<rich-text :nodes="strings"></rich-text>
			</view>
		</view>
	</view>
</template>

<script>
	import common from '../../common/common.js'
	export default {
		data() {
			return {
				newsDetail: {},
				nodes: [{
					name: 'div',
					attrs: {
						class: 'div-class',
						style: 'line-height: 60px; color: red; text-align:center;'
					},
					children: [{
						type: 'text',
						text: 'Hello&nbsp;uni-app!'
					}]
				}],
				strings: ''
			}
		},
		onLoad(options) {
			this.newsDetail = JSON.parse(decodeURIComponent(options.item))
			this.getNewsDetail(this.newsDetail.ID)
		},
		methods: {
			getNewsDetail(ID) {
				common.request({
					path: 'Development/GetNew',
					data: ID,
					success: (res) => {
						res.data.rows.image = common.PicURL + res.data.rows.image;
						this.newsDetail = res.data.rows;
						this.strings = this.newsDetail.Conte
						this.strings=this.strings.replace(/&lt;/g,"<")
						this.strings=this.strings.replace(/&gt;/g,">")
						this.strings=this.strings.replace(/&quot;/g,"'")
						this.strings=this.strings.replace(/img/g,"image")
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	.news {
		padding: 0 30rpx;

		.news_title {
			font-size: 40rpx;
			margin-top: 60rpx;
			color: #383838;
		}

		.news_time {
			color: #A2A2A2;
			margin-top: 30rpx;
			font-size: 24rpx;
			margin-bottom: 55rpx;
		}

		.news_image {
			width: 100%;
			height: 368rpx;
			margin-bottom: 80rpx;

			image {
				width: 100%;
				height: 368rpx;
			}
		}

		.news_detail {}
	}
</style>
