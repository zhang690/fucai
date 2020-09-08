<template>
	<view>
			<web-view src="https://apis.map.qq.com/tools/locpicker?search=1&type=1&key=5XTBZ-SXL6R-7OYWX-WTOCF-M7BUK-TSFBQ"></web-view>
		</view>
</template>

<script>
	export default {
			data() {
				return {
					
				}
			},
			onLoad(options) {
				window.addEventListener('message', event=> {
				  // 接收位置信息，用户选择确认位置点后选点组件会触发该事件，回传用户的位置信息
				    var loc = event.data;
					if (loc && loc.module == 'locationPicker') {
				        //防止其他应用也会向该页面post信息，需判断module是否为'locationPicker'
				        console.log('location', loc);
						uni.redirectTo({
							url:"../editAddress/editAddress?loc="+JSON.stringify(loc)
						})
					}
				}, false);
			},
			onHide() {
				window.removeEventListener();
			},
			methods: {
			}
		}
</script>

<style>
</style>
