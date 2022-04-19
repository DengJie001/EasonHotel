const { HttpPost } = require("../../utils/Request");

// pages/HotelZone/HotelZone.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        buttonTop: 0,
        buttonLeft: 0,
        windowHeight: 0,
        windowWidth: 0,
        startPoint: {},
        page: 1,
        size: 10,
        hotelZoneList: []
    },

    buttonStart: function (e) {
        this.setData({
            startPoint: e.touches[0]
        })
    },

    buttonMove: function (e) {
        var endPoint = e.touches[e.touches.length - 1];
        var translateX = endPoint.clientX - this.data.startPoint.clientX;
        var translateY = endPoint.clientY - this.data.startPoint.clientY;
        this.setData({
            startPoint: endPoint
        })
        var buttonTop = this.data.buttonTop + translateY;
        var buttonLeft = this.data.buttonLeft + translateX;
        if (buttonLeft + 50 >= this.data.windowWidth) {
            buttonLeft = this.data.windowWidth - 50;
        }
        if (buttonLeft <= 0) {
            buttonLeft = 0;
        }
        if (buttonTop <= 0) {
            buttonTop = 0;
        }
        if (buttonTop + 50 >= this.data.windowHeight) {
            buttonTop = this.data.windowHeight - 50;
        }
        this.setData({
            buttonTop: buttonTop,
            buttonLeft: buttonLeft
        })
    },

    buttonEnd: function (e) {

    },

    openSubmitPage: function (e) {
        wx.navigateTo({
            url: '../HotelZoneSubmit/HotelZoneSubmit',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: (result) => {
                this.setData({
                    windowHeight: result.windowHeight,
                    windowWidth: result.windowWidth,
                    buttonTop: result.windowHeight * 0.70,
                    buttonLeft: result.windowWidth * 0.70
                })
            },
        })
        HttpPost(
            '/eh/hotelZone/pageList',
            {
                page: that.data.page,
                size: that.data.size
            }
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    hotelZoneList: res.data.data
                })
            }
        }).catch((e) => {
            wx.showToast({
                title: '预期之外的错误',
                mask: true,
                duration: 3000,
                icon: 'none'
            });
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