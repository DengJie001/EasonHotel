const { HttpGet, HttpPost } = require("../../utils/Request");

// pages/AddHotelOrder/AddHotelOrder.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        startDate: {},
        endDate: {},
        roomInfo: {},
        roomNumberInfo: {},
        showDetailModal: false,
        days: 0,
        name: '',
        telNumber: '',
        peopleNumber: '',
        remark: '',
        userId: '66ab5d040e7aece7806ace1d8c7eced6'
    },

    /**
     * 打开房型详情Modal
     */
    openDetailModal: function () {
        this.setData({
            showDetailModal: true
        })
    },

    /**
     * 关闭房型详情Modal
     */
    closeDetailModal: function () {
        this.setData({
            showDetailModal: false
        })
    },

    /**
     * 跳转到酒店政策 设施页面
     */
    toFacilityAndPolicy: function () {
        wx.navigateTo({
          url: '../HotelPolicyAndFacility/HotelPolicyAndFacility',
        })
    },

    /**
     * 计算两个日期之间相差的天数
     */
    getDaysBetween: function () {
        var startDate = Date.parse(wx.getStorageSync('startDate'));
        var endDate = Date.parse(wx.getStorageSync('endDate'));
        return parseInt((endDate - startDate) / (1 * 24 * 60 * 60 * 1000));
    },

    /**
     * 获取输入框的值
     */
    getInputValue: function (e) {
        if (e.currentTarget.dataset.key === 'name') {
            this.setData({
                name: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'telNumber') {
            this.setData({
                telNumber: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'peopleNumber') {
            this.setData({
                peopleNumber: Number.parseInt(e.detail.value)
            })
        } else if (e.currentTarget.dataset.key === 'remark') {
            this.setData({
                remark: e.detail.value
            })
        }
    },

    /**
     * 验证需要提交的表单数据
     */
    verifyFormData: function () {
        if (this.data.name === '' || this.data.name === null) {
            wx.showToast({
              title: '请输入姓名',
              mask: true,
              duration: 3000,
              icon: 'none'
            });
            return false;
        } else if (this.data.telNumber === '' || this.data.telNumber === null || !(/^1[34578]\d{9}$/.test(this.data.telNumber))) {
            wx.showToast({
              title: '请输入电话号码',
              mask: true,
              duration: 3000,
              icon: 'none'
            })
            return false;
        } else if (this.data.peopleNumber === '' || this.data.peopleNumber === null || this.data.peopleNumber === 0) {
            wx.showToast({
              title: '请输入正确的人数',
              mask:true,
              duration: 3000,
              icon: 'none'
            })
            return false;
        }
        return true;
    },

    /**
     * 模拟支付
     */
    mockPay: async function (e) {
        // 表单数据验证
        if (!this.verifyFormData()) {
            return;
        }
        // 先查询余额是否足够支付
        wx.showLoading({
          title: '支付中',
          mask: true
        });
        // 到后端请求用户余额
        var userBalanceRes = await HttpGet(`/eh/user/balance?id=${wx.getStorageSync('__memberId')}`);
        if (userBalanceRes.data.data.balance >= this.data.roomNumberInfo.price * this.data.days) {
            // 执行支付
            var payRes = await HttpPost(
                '/eh/order/addHotelOrder',
                {
                    hotelId: wx.getStorageSync('hotelId'),
                    roomId: this.data.roomInfo.id,
                    roomNumberId: this.data.roomNumberInfo.id,
                    userId: wx.getStorageSync('__memberId'),
                    status: 'HOTEL_ORDER_STATUS_PAYED_NOT_STAY',
                    stayTime: Date.parse(wx.getStorageSync('startDate')),
                    days: this.data.days,
                    price: this.data.roomNumberInfo.price * this.data.days,
                    userName: this.data.name,
                    telNumber: this.data.telNumber,
                    peopleNumber: this.data.peopleNumber,
                    remark: this.data.remark
                }
            ).catch((e) => {
                wx.hideLoading();
                wx.showToast({
                  title: '服务器异常',
                  duration: 3000,
                  mask: true,
                  icon: 'error'
                })
            });
            if (payRes.data.code === 0) {
                wx.setStorageSync('orderId', payRes.data.data.id);
                wx.hideLoading();
                wx.showToast({
                  title: '支付成功',
                  mask: true,
                  duration: 3000,
                  icon: 'success'
                }).then((res) => {
                    wx.switchTab({
                      url: '../Trip/Trip',
                    })
                })
            }
        } else {
            wx.hideLoading();
            wx.showToast({
              title: '余额不足',
              duration: 3000,
              mask: true,
              icon: 'error'
            });
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var startDate = {
            year: wx.getStorageSync('startDate').split('-')[0],
            month: wx.getStorageSync('startDate').split('-')[1],
            date: wx.getStorageSync('startDate').split('-')[2]
        }
        var endDate = {
            year: wx.getStorageSync('endDate').split('-')[0],
            month: wx.getStorageSync('endDate').split('-')[1],
            date: wx.getStorageSync('endDate').split('-')[2]
        }
        this.setData({
            startDate: startDate,
            endDate: endDate,
            roomInfo: wx.getStorageSync('roomInfo'),
            roomNumberInfo: wx.getStorageSync('roomNumberInfo'),
            days: this.getDaysBetween()
        })
        console.log('--------------------------------')
        console.log(this.getDaysBetween());
        console.log(this.data.roomInfo);
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