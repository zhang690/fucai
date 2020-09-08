// 给球添加数量
let forNum = function(arr, num) {
  for (let index = 1; index < num; index++) {
    if (index < 10) {
      index = "0" + index;
    }
    arr.push({
      isActive: false,
			isActiveSpecil:false,
      num: index
    });
  }
	return arr;
}

let forGroup = function(arr, num){
	for (let index = 0; index <= num; index++) {
	  arr.push({
	    isActive: false,
			isActiveSpecil:false,
	    num: index
	  });
	}
}
module.exports = {
  forNum,
	forGroup
}