// 红球 篮球的过滤
const isRedBall = value =>{
	if(value) return value.replace(/,/g,"  ")
}
// 球的玩法类型
const TypesInfo = value =>{
	switch(value){
		case null :
			return value = '直选';
			break;
		case '' :
			return value = '直选';
			break;
		case '1' :
			return value = '直选';
			break;
		case '2' :
			return value = '组三';
			break;
		case '3' :
			return value = '组六';
			break;
		case '4' :
			return value = '和值';
			break;
		case '5' :
			return value = '和值-组三';
			break;
		case '6' :
			return value = '和值-组六';
			break;
		case '7' :
			return value = '胆拖';
			break;
	}	
}
// 配送方式
const Delivery = value =>{
	switch(value){
		case '1' :
			return value = '自提';
			break;
		case '2' :
			return value = '外送';
			break;
		case '3' :
			return value = '托管';
			break;
	}
}

// 用户图像的修改
const Revise = value =>{
	if(value){
		if(value.indexOf('http')){
			return 'http://fucai.yiruit.com' + value
		}else{
			return value
		}
	}	
}			
export{
	isRedBall,
	TypesInfo,
	Delivery,
	Revise
}