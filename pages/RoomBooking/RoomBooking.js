// pages/RoomBooking/RoomBooking.js
import { HttpGet, HttpPost } from '../../utils/Request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cityList: [
            ['上海', '北京', '广东'],
            ['浦东新区', '宝山区', '闵行区', '杨浦区']
        ],
        multiIndex: [0, 0],
        cityInfos: {},
        hotelName: '',
        cityId: '',
        page: 1,
        size: 10,
        hotelInfos: []
    },

    pickerChange: function (e) {
        this.setData({
            multiIndex: e.detail.value,
            cityId: this.data.cityList[1][e.detail.value[1]].id
        });
        console.log(this.data.cityId);
    },

    pickerColumnChange: function (e) {
        var cityList = [[], []];
        if (e.detail.column === 1) {
            return;
        }
        for (let i = 0; i < this.data.cityInfos.length; ++i) {
            cityList[0].push(this.data.cityInfos[i]);
        }
        cityList[1] = this.data.cityInfos[e.detail.value].children;
        this.setData({
            cityList: cityList
        })
    },

    getInputValue: function (e) {
        this.setData({
            hotelName: e.detail.value
        });
    },

    search: function (e) {
        wx.showLoading({
            title: '加载中',
            mask: true,
        });
        var that = this;
        HttpPost(
            '/eh/hotel/pageList',
            {
                page: that.data.page,
                size: that.data.size,
                hotelName: that.data.hotelName,
                cityId: that.data.cityId
            }
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    hotelInfos: res.data.data
                })
                wx.hideLoading();
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '服务异常',
                    icon: 'error',
                    duration: 3000,
                    mask: true
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

    toDetail: function (e) {
        wx.setStorageSync('hotelId', e.currentTarget.dataset.hotelid)
        wx.navigateTo({
            url: '../HotelDetail/HotelDetail',
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        var cityList = [[], []];
        HttpGet(
            '/eh/city/list'
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    cityInfos: res.data.data,
                })
                for (let i = 0; i < res.data.data.length; ++i) {
                    cityList[0].push(res.data.data[i]);
                }
                cityList[1] = res.data.data[0].children
                that.setData({
                    cityList: cityList,
                    cityId: res.data.data[0].children[0].id
                })
            }
        }).catch((e) => {
            wx.showToast({
                title: '获取城市列表失败',
                mask: true,
                duration: 3000,
                icon: 'none'
            })
        })

        HttpPost(
            '/eh/hotel/pageList',
            {
                page: that.data.page,
                size: that.data.size
            }
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    hotelInfos: res.data.data
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