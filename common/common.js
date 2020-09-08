const URL = 'https://fucaiapi.yiruit.com/yiru/rds/';
const PicURL = 'https://fucai.yiruit.com';
const cachetime = 30;
var flagIndex = 0;
//判断是否登录
//url_keyvalue格式：ID=123&UserName=abc
function isLogin(obj, zhuantiao) {
	var userState = getstate();
	if (!!userState.ID) {
		return true;
	} else {
		if (zhuantiao) {
			uni.reLaunch({
				url: "/pages/login/userLogin"
			});
		}
		return false;
	}
}

function logout(_bool) {
	// uni.removeStorageSync('jingwei');
	// uni.removeStorageSync('userinfo');
	// uni.removeStorageSync('userforlogin');
	uni.removeStorageSync('fucaistate');
	uni.removeStorageSync('riderinfo');
	// uni.removeStorageSync('openid');
	// if (!_bool) {
	uni.navigateTo({
		url: "/pages/login/userLogin"
	})
	// ({
	// 	url: "/pages/login/userLogin"
	// });
	// }
}

function getHeadImg(_url, _sex) {
	if (!!_url) {
		return _url.substr(0, 4) == "http" ? _url : PicURL + _url;
	}
	if (_sex == 1) {
		return "/static/on-boy.jpg";
	} else {
		return "/static/on-girl.jpg";
	}
}


function request(par) {
	if (flagIndex == 0) {
		uni.showLoading({
			title: "数据加载中...",
			mask: true,
		});
	}
	flagIndex++;
	// return new Promise((resolve, reject) => {
	if (par.cache) {
		var _value = uni.getStorageSync(par.cache.key);
		if (_value) {
			var _valuejson = JSON.parse(_value);
			if (TimeDifference(new Date(_valuejson.addtime), new Date()) < (par.cache.time ? par.cache.time : cachetime)) {
				// uni.hideLoading();
				return par.success(_valuejson.data);
			}
		}
	}

	uni.request({
		url: URL + par.path,
		data: postdata(par.data || ""),
		method: par.method ? par.method : 'POST',
		dataType: 'json',
		success: (res) => {
			if (!par.isloading) {
				// uni.hideLoading();
			}
			if (res.data.code == 200 || res.data.code == 400) {
				if (par.cache) {
					uni.setStorageSync(par.cache.key, JSON.stringify({
						data: res.data.data,
						addtime: new Date()
					}));
				}
				return par.success(res.data);
				// resolve(par.success(res.data.data))
			}
			if (res.data.code == 410) {
				logout(true);
				uni.reLaunch({
					url: "/pages/login/userLogin"
				});
			} else {
				if (!par.fail) {
					uni.showToast({
						icon: 'none',
						title: res.data.info
					});
				} else {
					return par.fail(res.data);
					// reject(res.data)
				}
			}
		},
		fail: (e) => {
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: '网络异常,请稍后重试'
			});

		},
		complete: (res1) => {
			flagIndex--;

			if (flagIndex == 0) uni.hideLoading();
		}
	});
	// })
}

function requestFile(par) {
	flagIndex++;
	var up = uni.uploadFile({
		url: URL + par.path,
		filePath: par.file,
		name: 'upload',
		formData: postdata(par.data),
		success: function(res) {
			// uni.hideLoading();
			if (res.statusCode == 200) {
				var arr = JSON.parse(res.data);
				if (arr.code == 200) {
					return par.success(arr.data);
				}
				if (arr.code == 410) {
					setstate({});
					uni.reLaunch({
						url: "/pages/login/userLogin"
					});
				} else {
					uni.showToast({
						icon: 'none',
						title: arr.info
					});
				}
			} else {
				uni.showToast({
					icon: 'none',
					title: '请求错误，请稍后再试'
				});
			}
		},
		fail: (e) => {
			uni.hideLoading();
			uni.showToast({
				icon: 'none',
				title: '网络异常,请稍后重试'
			});
		},
		complete: () => {
			flagIndex--;
			console.log('文件请求', flagIndex);
			if (flagIndex == 0) uni.hideLoading();
		}
	});
	if (par.Progress) {
		up.onProgressUpdate(function(res) {
			return par.Progress(res);
		});
	}
}
//2各日期相差分钟数
function TimeDifference(k, j) {
	return (j.getTime() - k.getTime()) / 1000 / 60; //时间差的毫秒数
};
//统计封装的请求数据
function postdata(data) {
	var pos = {};
	pos.loginMark = getloginMark();
	pos.token = getstate().token;
	if (isJsonFormat(data)) {
		pos.data = JSON.stringify(data || {});
	} else {
		pos.data = data;
	}
	//pos.data = JSON.stringify(data);
	return pos;
};

function isJsonFormat(str) {
	var obj = str;
	var xy = Object.prototype.toString.call(obj);
	if (xy == "[object Object]" || xy == "[object Array]") {
		return true;
	} else {
		return false;
	}
};
//获取会员缓存的信息
function getstate() {
	var state = uni.getStorageSync('fucaistate') || "{}";
	return JSON.parse(state);
}
//设置会员缓存信息
function setstate(state) {
	uni.setStorageSync('fucaistate', JSON.stringify(state));
}

function checkPhone(phone) {
	phone = phone || '';
	var reg = /^0?(13|15|18|16|14|17|19)[0-9]{9}$/;
	return (reg.test(phone));
};

function checkNumber(Number) {
	if (Number === "" || Number == null) {
		return false;
	}
	if (!isNaN(Number)) {
		return true;
	}
	return false;
};
//小程序端自动生成设备识别码
function customuuid() {
	var len = 29;
	var radix = 16; //基数
	var chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
	var uuid = [],
		i;
	radix = radix || chars.length;
	if (len) {
		for (i = 0; i < len; i++) uuid[i] = chars[0 | Math.random() * radix];
	} else {
		var r;
		uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
		uuid[14] = '4';
		for (i = 0; i < 36; i++) {
			if (!uuid[i]) {
				r = 0 | Math.random() * 16;
				uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
			}
		}
	}
	return 'MP_' + uuid.join('');
}
//获取设备识别码
function getloginMark() {
	//uni.removeStorageSync('loginMark');
	var mark = uni.getStorageSync('loginMark');
	if (!mark) {
		mark = customuuid();
		uni.setStorageSync('loginMark', mark);
	}
	return mark;
}
// 获取复选的组数
// 比如8个数 每7个数组合一组，可以有多少组 即有多少注彩票
// 默认 6 个球一组
function getGroups(max, min = 6) {
	let allmax = max;
	let allmin = min;
	let flagmax = 1;
	while (flagmax < min) {
		flagmax++;
		allmax = allmax * (max - 1);
		max = max - 1;
	};
	while (min > 1) {
		allmin = allmin * (min - 1);
		min = min - 1;
	};
	return allmax / allmin;
};
// 小程序获取城市信息
function getCity(city) {
	return new Promise((resolve, reject) => {
		uni.getLocation({
			type: "gcj02",
			success(res1) {
				const latitude = res1.latitude;
				const longitude = res1.longitude;
				uni.setStorageSync("jingwei", {
					latitude,
					longitude
				});
				uni.request({
					url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=5XTBZ-SXL6R-7OYWX-WTOCF-M7BUK-TSFBQ`,
					data: {},
					header: {
						"content-type": "application/json"
					},
					method: "GET",
					dataType: "json",
					responseType: "text",
					success: result => {
						city = result.data.result.address_component.city;
						resolve(city);
					},
					fail: err => {
						reject(err)
					}
				});
			},
			fail: err => {
				reject(err);
			},
			complete: () => {

			}
		});
	})
}

function Time() {
	let now = new Date();
	let year = now.getFullYear(); //得到年份
	let month = now.getMonth(); //得到月份
	let date = now.getDate(); //得到日期
	let day = now.getDay(); //得到周几
	let hour = now.getHours(); //得到小时
	let minu = now.getMinutes(); //得到分钟
	let sec = now.getSeconds(); //得到秒


	if (date < 10) {
		date = "0" + date
	}
	if (hour < 10) {
		hour = "0" + hour
	}
	if (minu < 10) {
		minu = "0" + minu
	}
	if (sec < 10) {
		sec = "0" + sec
	}
	if (month < 10) {
		month = "0" + (month + 1)
	}

	let time = year + "-" + month + "-" + date + " " + hour + ":" + minu + ":" + sec;
	return time
}

function showModal(title = "", content = "", icon = "none", showCancel = false, confirmText = "确定", cancelText = "取消") {
	return new Promise((resolve, reject) => {
		uni.showModal({
			title,
			content,
			icon,
			showCancel,
			confirmText,
			cancelText,
			success(res) {
				if (res.confirm) {
					resolve(true);
				} else if (res.cancel) {
					resolve(false);
				}
			},
			fail(){reject('hehe')}
		})
	})
}
// uni.showToast封装
function showToast(title = " ", icon = "none", mask = true, duration = 1500, position = "center") {
	return new Promise((resolve, reject) => {
		uni.showToast({
			title,
			icon,
			mask,
			duration,
			position,
			success: () => { resolve(true) },
			fail: () => { reject(false) }
		})
	})
}

export default {
	URL,
	isLogin,
	logout,
	getloginMark,
	request,
	requestFile,
	setstate,
	getstate,
	checkPhone,
	checkNumber,
	PicURL,
	getHeadImg,
	getGroups,
	postdata,
	getCity,
	Time,
	showModal,
	showToast
}
