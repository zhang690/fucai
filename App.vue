<script>
	import common from "./common/common";
	export default {
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		}, 
		onHide: function() {
			console.log('App Hide')
		},
		globalData:{
			
		}
	}
</script>
 
<style>
	/*每个页面公共css */
	@import url("./common/base.css");
	@import url("./common/iconfont.css");
</style>
