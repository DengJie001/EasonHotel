// pages/CommodityOrder/CommodityOrder.js
import { HttpGet, HttpPost } from '../../utils/Request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hideDetail: true,
        showContent: '展开详情',
        showStatusList: [],
        orders: [],
        page: 1,
        size: 10
    },

    showDetail: function (e) {
        this.setData({
            ["orders[" + e.currentTarget.dataset.index + "].hideDetail"]: !this.data.orders[e.currentTarget.dataset.index].hideDetail,
        })
        if (this.data.orders[e.currentTarget.dataset.index].hideDetail) {
            this.setData({
                ["orders[" + e.currentTarget.dataset.index + "].showContent"]: '展开详情'
            })
        } else {
            this.setData({
                ["orders[" + e.currentTarget.dataset.index + "].showContent"]: '收起'
            })
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        wx.showLoading({
            title: '获取中...',
        })
        var that = this;
        HttpPost(
            '/eh/commodityOrder/pageList',
            {
                page: that.data.page,
                size: that.data.size,
                userId: wx.getStorageSync('__memberId')
            }
        ).then((res) => {
            if (res.data.code === 0) {
                wx.hideLoading();
                for (let i = 0; i < res.data.data.length; ++i) {
                    res.data.data[i].hideDetail = true;
                    res.data.data[i].showContent = '展开详情';
                }
                that.setData({
                    orders: res.data.data
                })
            } else {
                wx.hideLoading()
                wx.showToast({
                    title: '服务异常',
                    mask: true,
                    duration: 3000,
                    icon: 'error'
                })
            }
        }).catch((e) => {
            wx.hideLoading()
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