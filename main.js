import Vue from 'vue'
import App from './App'
// 默认会找到Filters 过滤器下的 index.js
import * as filters from './filters'

// 遍历所有导出的过滤器并添加到全局过滤器
Object.keys(filters).forEach((key)=>{
	Vue.filter(key,filters[key])
})


Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
