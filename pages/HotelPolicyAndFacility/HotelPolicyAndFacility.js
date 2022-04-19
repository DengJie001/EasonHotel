// pages/HotelPolicyAndFacility/HotelPolicyAndFacility.js
import { HttpPost, HttpGet } from '../../utils/Request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        tabList: ['酒店设施', '酒店政策'],
        curTab: 0,
        showFacilityTab: true,
        showPolicyTab: false,
        hotelFacility: {},
        hotelPolicy: {}
    },

    onTabChange: function (e) {
        if (e.currentTarget.dataset.index === 0) {
            this.setData({
                showFacilityTab: true,
                showPolicyTab: false
            })
        } else {
            this.setData({
                showFacilityTab: false,
                showPolicyTab: true
            })
        }
        this.setData({
            curTab: e.currentTarget.dataset.index
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        HttpGet(
            '/eh/hotelFacility/getByHotelId?hotelId=' + wx.getStorageSync('hotelId')
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    hotelFacility: res.data.data
                })
            }
        });
        HttpGet(
            '/eh/hotelPolicy/getByHotelId?hotelId=' + wx.getStorageSync('hotelId')
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    hotelPolicy: res.data.data
                })
            }
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