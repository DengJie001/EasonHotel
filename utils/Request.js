const BASE_URL = "http://localhost:8080"

function get(url) {
    var that = this;
    return new Promise(function (resolve, reject) {
        wx.request({
            url: BASE_URL + url,
            method: 'GET',
            dataType: 'json',
            header: {
                'Content-Type': 'application/json',
                '__memberId': wx.getStorageSync('__memberId'),
                '__token': wx.getStorageSync('__token')
            },
            success: function (res) {
                if (res.statusCode === 403) {
                    wx.redirectTo({
                        url: '../Register/Register',
                    })
                    return;
                }
                resolve(res);
            },
            fail: function (res) {
                reject(res);
            }
        })
    })
}

function post(url, data) {
    var that = this;
    return new Promise(function (resolve, reject) {
        wx.request({
            url: BASE_URL + url,
            data: data,
            method: 'POST',
            dataType: 'json',
            header: {
                'Content-Type': 'application/json',
                '__memberId': wx.getStorageSync('__memberId'),
                '__token': wx.getStorageSync('__token')
            },
            success: function (res) {
                if (res.statusCode === 403) {
                    wx.redirectTo({
                        url: '../Register/Register',
                    })
                    return;
                }
                resolve(res);
            },
            fail: function (res) {
                reject(res)
            },
        });
    });
}

function upload(url, data) {
    return new Promise(function (resolve, reject) {
        wx.uploadFile({
            filePath: data,
            name: 'file',
            url: BASE_URL + url,
            header: {
                'Content-Type': "multipart/x-www-form-urlencoded",
                '__member': wx.getStorageSync('__member'),
                '__token': wx.getStorageSync('__token')
            },
            dataType: 'json',
            success: function (res) {
                resolve(res);
            },
            fail: function (err) {
                reject(err);
            }
        })
    })
}

module.exports = {
    HttpPost: post,
    HttpGet: get,
    HttpUpload: upload
}