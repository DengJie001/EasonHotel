const { HttpPost, HttpGet } = require("../../utils/Request");

// pages/Trip/Trip.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orderList: []
    },

    toHotelComment: function (e) {
        wx.navigateTo({
          url: '../HotelComment/HotelComment?order=' + JSON.stringify(e.currentTarget.dataset.order),
        })
    },

    refund: function (e) {
        var that = this;
        HttpGet(
            `/eh/order/refund?orderId=${e.currentTarget.dataset.id}`
        ).then((res) => {
            if (res.data.code === 0) {
                this.onLoad();
                wx.showToast({
                  title: '操作成功',
                  duration: 3000,
                  mask: true,
                  icon: 'success'
                })
            } else {
                wx.showToast({
                  title: '操作失败',
                  duration: 3000,
                  mask: true,
                  icon: 'error'
                })
            }
        }).catch((e) => {
            wx.showToast({
              title: '预期之外的错误',
              mask: true,
              duration: 3000,
              icon: 'none'
            })
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        HttpPost(
            '/eh/order/queryHotelOrder',
            {
                userId: wx.getStorageSync('__memberId')
            }
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    orderList: res.data.data
                })
            }
        }).catch((e) => {
            wx.showToast({
              title: '预期之外的错误',
              duration: 3000,
              mask: true,
              icon: 'none'
            })
        });
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
        this.onLoad();
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