const { HttpGet, HttpPost } = require("../../utils/Request")

// pages/AccountSetting/AccountSetting.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        nickName: '',
        realName: '',
        phoneNumber: '',
        email: '',
        idCard: ''
    },

    getInputValue: function (e) {
        if (e.currentTarget.dataset.key === 'nickName') {
            this.setData({
                nickName: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'realName') {
            this.setData({
                realName: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'phoneNumber') {
            this.setData({
                phoneNumber: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'email') {
            this.setData({
                email: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'idCard') {
            this.setData({
                idCard: e.detail.value
            })
        }
    },

    verifyData: function (e) {
        if (!(/^1[34578]\d{9}$/.test(this.data.phoneNumber))) {
            wx.showToast({
                title: '手机号格式有误',
                icon: 'error',
                mask: true,
                duration: 3000
            })
            return false;
        } else if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.email))) {
            wx.showToast({
                title: '邮箱格式有误',
                icon: 'error',
                mask: true,
                duration: 3000
            })
            return false;
        } else if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.idCard))) {
            wx.showToast({
                title: '身份证格式有误',
                icon: 'error',
                duration: 3000,
                mask: true
            })
            return false;
        }
        return true;
    },

     submit: function (e) {
         if (!this.verifyData()) {
             return;
         }
         var that = this;
         HttpPost(
             '/eh/user/update',
             {
                 id: that.data.userInfo.id,
                 nickName: that.data.nickName || that.data.userInfo.nickName,
                 realName: that.data.realName || that.data.userInfo.realName,
                 phoneNumber: that.data.phoneNumber || that.data.userInfo.phoneNumber,
                 email: that.data.email || that.data.userInfo.email,
                 idCard: that.data.idCard || that.data.userInfo.idCard
             }
         ).then((res) => {
             if (res.data.code === 0) {
                 wx.showToast({
                   title: '操作成功',
                   icon: 'success',
                   mask: true,
                   duration: 3000
                 })
             }
         }).catch((e) => {});
     },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        HttpGet(
            `/eh/user/info/${wx.getStorageSync('__memberId')}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    userInfo: res.data.data,
                    realName: res.data.data.realName,
                    nickName: res.data.data.nickName,
                    phoneNumber: res.data.data.phoneNumber,
                    email: res.data.data.email,
                    idCard: res.data.data.idCard
                })
                console.log(that.data.userInfo);
            }
        }).catch((e) => { });
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