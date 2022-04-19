const { HttpGet } = require("../../utils/Request");

// pages/UserCenter/UserCenter.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        year: 2022,
        userInfo: {}
    },

    goto: function (e) {
        wx.navigateTo({
          url: e.currentTarget.dataset.url,
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        that.setData({
            year: new Date().getFullYear()
        })
        HttpGet(
            `/eh/user/info/${wx.getStorageSync('__memberId')}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    userInfo: res.data.data
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