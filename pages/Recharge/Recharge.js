const { HttpPost } = require("../../utils/Request")

// pages/Recharge/Recharge.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        canRechargeList: [500, 1000, 2000, 5000, 10000, 50000],
        selectedAmount: 0,
        showModal: false,
        showOtherInputModal: false,
        amount: 0
    },

    openConfirmModal: function (e) {
        this.setData({
            showModal: true,
            selectedAmount: e.currentTarget.dataset.amount,
            amount: e.currentTarget.dataset.amount
        })
    },

    hideModal: function (e) {
        this.setData({
            showModal: false
        })
    },

    openOtherAmountInputModal: function (e) {
        this.setData({
            showOtherInputModal: true
        })
    },

    hideOtherAmountInputModal: function (e) {
        this.setData({
            showOtherInputModal: false
        })
    },

    getInputValue: function (e) {
        this.setData({
            amount: Number.parseInt(e.detail.value)
        })
    },

    applyRecharge: function (e) {
        if (this.data.amount === 0 || this.data.amount === '' || this.data.amount === null || this.data.amount === undefined) {
            return;
        }
        var that = this;
        wx.showLoading({
            title: '操作中...',
        });
        HttpPost(
            '/eh/recharge/apply',
            {
                userId: wx.getStorageSync('__memberId'),
                amount: that.data.amount
            }
        ).then((res) => {
            if (res.data.code === 0) {
                wx.hideLoading();
                wx.showToast({
                    title: '等待管理员确认',
                    mask: true,
                    duration: 3000,
                    icon: 'success'
                })
                this.setData({
                    showOtherInputModal: false,
                    showModal: false
                })
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '服务异常',
                    mask: true,
                    duration: 3000,
                    icon: 'error'
                })
            }
        }).catch((e) => {
            wx.hideLoading();
            wx.showToast({
                title: '预期之外的错误',
                mask: true,
                duration: 3000,
                icon: 'none'
            })
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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