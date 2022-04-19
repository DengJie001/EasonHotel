const { HttpGet } = require("../../utils/Request")

// pages/MarketIndex/MarketIndex.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        orders: []
    },

    toMarket: function (e) {
        wx.navigateTo({
          url: `../Market/Market?order=${JSON.stringify(this.data.orders[e.currentTarget.dataset.index])}`,
        })
    },

    toBookingHotel: function (e) {
        wx.navigateTo({
          url: '../RoomBooking/RoomBooking',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        HttpGet(
            `/eh/order/listValidOrder?userId=${wx.getStorageSync('__memberId')}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    orders: res.data.data
                })
            }
        }).catch((e) => {});
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