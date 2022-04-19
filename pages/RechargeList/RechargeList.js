const { HttpGet } = require("../../utils/Request")

// pages/RechargeList/RechargeList.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        rechargeList: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        HttpGet(
            '/eh/recharge/listByUserId/' + wx.getStorageSync('__memberId')
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    rechargeList: res.data.data
                })
            } else {
                wx.showToast({
                    title: '服务异常',
                    mask: true,
                    duration: 3000,
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