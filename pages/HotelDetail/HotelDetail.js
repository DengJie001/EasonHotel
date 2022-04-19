// pages/HotelDetail/HotelDetail.js
import { HttpGet, HttpPost } from "../../utils/Request";
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hotelInfo: {},
        hidden: true,
        startDateSelected: "",
        todayStart: "",
        todayEnd: "",
        endDateSelected: "",
        tomorrowStart: "",
        tomorrowEnd: ""
    },

    showMore: function () {
        this.setData({
            hidden: !this.data.hidden
        })
    },

    datePickerChange: function (e) {
        if (e.currentTarget.dataset.key === 'today') {
            this.setData({
                startDateSelected: e.detail.value
            })
        } else {
            this.setData({
                endDateSelected: e.detail.value
            })
        }
        wx.setStorageSync('startDate', this.data.startDateSelected);
        wx.setStorageSync('endDate', this.data.endDateSelected);
    },

    toPolicyAndFacility: function () {
        wx.navigateTo({
          url: '../HotelPolicyAndFacility/HotelPolicyAndFacility',
        })
    },

    initDatePicker: function () {
        var today = new Date();
        var tomorrow = new Date(Date.now() + 86400000);
        this.setData({
            startDateSelected: (today.getFullYear() + '-') + ((today.getMonth() + 1 >= 10 ? today.getMonth() + 1 + '': '0' + (today.getMonth() + 1))) + ('-' + today.getDate()),
            todayStart: (today.getFullYear() + '-') + ((today.getMonth() + 1 >= 10 ? today.getMonth() + 1 + '': '0' + (today.getMonth() + 1))) + ('-' + today.getDate()),
            todayEnd: ((today.getFullYear() + 1) + '-') + ((today.getMonth() + 1 >= 10 ? today.getMonth() + 1 + '': '0' + (today.getMonth() + 1))) + ('-' + today.getDate()),
            endDateSelected: (tomorrow.getFullYear() + '-') + ((tomorrow.getMonth() + 1 >= 10 ? tomorrow.getMonth() + 1 + '': '0' + (tomorrow.getMonth() + 1))) + ('-' + tomorrow.getDate()),
            tomorrowStart: (tomorrow.getFullYear() + '-') + ((tomorrow.getMonth() + 1 >= 10 ? tomorrow.getMonth() + 1 + '': '0' + (tomorrow.getMonth() + 1))) + ('-' + tomorrow.getDate()),
            tomorrowEnd: ((tomorrow.getFullYear() + 1) + '-') + ((tomorrow.getMonth() + 1 >= 10 ? tomorrow.getMonth() + 1 + '': '0' + (tomorrow.getMonth() + 1))) + ('-' + tomorrow.getDate())
        })
        wx.setStorageSync('startDate', this.data.startDateSelected);
        wx.setStorageSync('endDate', this.data.endDateSelected);
    },

    toAddHotelOrder: function (e) {
        wx.setStorageSync('roomInfo', e.currentTarget.dataset.roominfo);
        wx.setStorageSync('roomNumberInfo', e.currentTarget.dataset.roomnumberinfo)
        wx.navigateTo({
          url: '../AddHotelOrder/AddHotelOrder',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(this.initDatePicker());
        var that = this;
        HttpGet(
            '/eh/hotel/info?id=' + wx.getStorageSync('hotelId')
        ).then((res) => {
            that.setData({
                hotelInfo: res.data.data
            })
            console.log(that.data.hotelInfo);
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