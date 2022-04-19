const { HttpPost, HttpGet } = require("../../utils/Request");

// pages/Cart/Cart.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartList: {},
        cartDetailList: [],
        totalPrice: 0,
        roomNumber: ''
    },

    /**
     * 加载该用户所有的购物车商品列表
     */
    loadData: function () {
        var that = this;
        var total = 0;
        HttpGet(
            `/eh/cart/listByUserId?userId=${wx.getStorageSync('__memberId')}`
        ).then((res) => {
            if (res.data.code === 0) {
                for (let i = 0; i < res.data.data.length; ++i) {
                    total += (res.data.data[i].count * res.data.data[i].price);
                }
                that.setData({
                    cartDetailList: res.data.data,
                    totalPrice: total
                });
            }
        }).catch((e) => {});
    },

    /**
     * 模拟支付
     * @param {*} e 
     */
    pay: async function (e) {
        var that = this;
        if (this.data.cartDetailList.length == 0) {
            return;
        }
        wx.showLoading({
            title: '支付中',
        })
        // 查询用户余额是否足够支付
        var balanceRes = await HttpGet(
            '/eh/user/balance?id=' + wx.getStorageSync('__memberId')
        );
        if (balanceRes.data.code === 0 && balanceRes.data.data.balance < that.data.totalPrice) {
            wx.hideLoading();
            wx.showToast({
                title: '余额不足',
                mask: true,
                duration: 3000,
                icon: 'error'
            });
            return;
        } else if (balanceRes.statusCode != 200) {
            wx.hideLoading()
            wx.showToast({
              title: '余额查询异常',
              mask: true,
              duration: 3000,
              icon: 'none'
            })
            return;
        }
        // 进行支付
        HttpPost(
            '/eh/commodityOrder/add',
            {
                userId: wx.getStorageSync('__memberId'),
                roomNumber: that.data.roomNumber
            }
        ).then((res) => {
            if (res.data.code === 0) {
                wx.hideLoading();
                wx.showToast({
                    title: '支付成功',
                    mask: true,
                    duration: 3000,
                    icon: 'success'
                });
                that.setData({
                    cartList: {},
                    cartDetailList: []
                });
                wx.switchTab({
                  url: '../index/index',
                })
            } else if (res.data.code !== 0) {
                this.loadData();
                wx.hideLoading();
                wx.showToast({
                    title: '商品库存不足，已为您自动修改，请重新支付',
                    duration: 3000,
                    mask: true,
                    icon: 'none'
                });
            } else {
                wx.hideLoading();
                wx.showToast({
                    title: '服务异常',
                    duration: 3000,
                    mask: true,
                    icon: 'error'
                })
            }
        }).catch((e) => {
            console.log(e);
            wx.hideLoading();
            wx.showToast({
                title: '预期之外的错误',
                mask: true,
                duration: 3000,
                icon: 'none'
            })
        })
    },

    delete: function (e) {
        var that = this;
        HttpGet(
            `/eh/cart/delete?commodityId=${e.currentTarget.dataset.id}&userId=${wx.getStorageSync('__memberId')}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.loadData();
            }
        }).catch((e) => {});
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.loadData();
        this.setData({
            roomNumber: options.roomNumber
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