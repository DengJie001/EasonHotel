const { HttpGet, HttpPost } = require("../../utils/Request");

// pages/HotelComment/HotelComment.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderInfo: {},
        hotelCoverImageId: '',
        starIndex: -1,
        content: '',
        score: 0,
    },

    onTapStar: function (e) {
        this.setData({
            starIndex: e.currentTarget.dataset.index
        })
    },

    onSubmit: function (e) {
        if (this.data.starIndex === -1) {
            this.setData({
                score: 6
            })
        } else {
            this.setData({
                score: (this.data.starIndex + 1) * 2
            })
        }
        wx.showLoading({
          title: '提交中',
        })
        HttpPost(
            '/eh/hotelComment/addHotelComment',
            {
                orderId: this.data.orderInfo.id,
                hotelId: this.data.orderInfo.hotelId,
                userId: wx.getStorageSync('__memberId'),
                content: this.data.content,
                score: this.data.score
            }
        ).then((res) => {
            if (res.data.code === 0) {
                wx.hideLoading();
                wx.showToast({
                  title: '操作成功',
                  duration: 3000,
                  mask: true,
                  icon: 'success'
                }).then(() => {
                    wx.switchTab({
                        url: '../Trip/Trip',
                      })
                })
            } else {
                wx.hideLoading();
                wx.showToast({
                  title: '服务异常',
                  icon: 'none',
                  duration: 3000,
                  mask: true
                });
            }
        }).catch(() => {
            wx.hideLoading();
            wx.showToast({
              title: '预期之外的错误',
              duration: 3000,
              mask: true,
              icon: 'none'
            })
        });
    },

    getInputValue: function(e) {
        this.setData({
            content: e.detail.value
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.setData({
            orderInfo: JSON.parse(options.order)
        });
        HttpGet(
            `/eh/hotel/getHotelCoverImageId?hotelId=${that.data.orderInfo.hotelId}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    hotelCoverImageId: res.data.data
                })
            }
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})