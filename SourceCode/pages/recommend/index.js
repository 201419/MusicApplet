//index.js
var data = require('../../utils/data.js').songs;

Page({
	data: {
		imgUrls: [
			'http://p1.music.126.net/m37bk4r8P1feHoosyilDSw==/109951163304929506.jpg',
			'http://p4.music.126.net/n15ddawhY4cyIzFu23CSJA==/1401877341861315.jpg',
			'http://p1.music.126.net/1cXYP34W2hxW3D2NaU13Pg==/109951163305512992.jpg'
		]
	},
	onLoad: function() {
		var rs = [],
			idsMap = {},
			keys = Object.keys(data),
			len = keys.length;

		for (var i = 0; i < len; i++) {
			var k = keys[i];

			rs.push(Object.assign({
				id: k,
			}, data[k]));

			idsMap[k] = {
				preid: i > 0 ? keys[i - 1] : 0,
				nextid: i < len - 1 ? keys[i + 1] : 0
			}
		}

		idsMap[keys[0]].preid = keys[len - 1];
		idsMap[keys[len - 1]].nextid = keys[0];

		this.setData({
			recommends: rs
		});

		wx.setStorageSync('ids', idsMap);
	},
	playTap: function(e) {
		const dataset = e.currentTarget.dataset;
		wx.navigateTo({
			url: `../play/index?id=${dataset.id}`
		})
	}
})