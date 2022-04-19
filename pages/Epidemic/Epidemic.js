const { HttpGet } = require("../../utils/Request");

// pages/Epidemic/Epidemic.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        provinceInfos: [],
        fromProvinces: [],
        toProvinces: [],
        fromPickerIndex: [0, 0],
        toPickerIndex: [0, 0],
        from: '',
        to: '',
        riskRegion: {},
        hidePolicy: false,
        hideRiskRegion: true,
        hidePolicyDetail: true,
        policy: {},
        hideModal: true,
        healthCodeUrl: ''
    },

    openModal: function (e) {
        this.setData({
            healthCodeUrl: e.currentTarget.dataset.url,
            hideModal: false
        })
    },

    hideModal: function (e) {
        this.setData({
            hideModal: true
        })
    },

    queryPolicy: function (e) {
        var that = this;
        HttpGet(
            `/eh/epidemic/policy?from=${this.data.from}&to=${this.data.to}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    policy: res.data.data,
                    hidePolicyDetail: false
                })
            }
        })
    },

    showPolicy: function (e) {
        this.setData({
            hidePolicy: false,
            hideRiskRegion: true
        })
    },

    showRiskRegion: function (e) {
        this.setData({
            hidePolicy: true,
            hideRiskRegion: false
        })
    },

    fromPickerChange: function (e) {
        this.setData({
            fromPickerIndex: e.detail.value,
            from: this.data.fromProvinces[1][e.detail.value[1]].id
        });
        this.queryPolicy();
    },

    fromPickerColumnChange: function (e) {
        var fromProvinces = [[], []];
        if (e.detail.column === 1) {
            return;
        }
        for (let i = 0; i < this.data.provinceInfos.length; ++i) {
            fromProvinces[0].push(this.data.provinceInfos[i]);
        }
        fromProvinces[1] = this.data.provinceInfos[e.detail.value].cityList;
        this.setData({
            fromProvinces: fromProvinces
        })
    },

    toPickerChange: function (e) {
        this.setData({
            toPickerIndex: e.detail.value,
            to: this.data.toProvinces[1][e.detail.value[1]].id
        });
        this.queryPolicy();
    },

    toPickerColumnChange: function (e) {
        var toProvinces = [[], []];
        if (e.detail.column === 1) {
            return;
        }
        for (let i = 0; i < this.data.provinceInfos.length; ++i) {
            toProvinces[0].push(this.data.provinceInfos[i]);
        }
        toProvinces[1] = this.data.provinceInfos[e.detail.value].cityList;
        this.setData({
            toProvinces: toProvinces
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        var that = this;
        var provinceInfos = wx.getStorageSync('provinceInfos');
        var provinces = [[], []]
        HttpGet(
            '/eh/epidemic/riskRegion'
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    riskRegion: res.data.data
                })
            }
        });
        if (provinceInfos === '' || provinceInfos === null || provinceInfos === undefined) {
            var res = await HttpGet('/eh/epidemic/cityList');
            if (res.data.code === 0) {
                wx.setStorageSync('provinceInfos', res.data.data);
                provinceInfos = res.data.data;
            }
        } else {
            provinceInfos = wx.getStorageSync('provinceInfos');
        }
        that.setData({
            provinceInfos: provinceInfos
        });
        for (let i = 0; i < this.data.provinceInfos.length; ++i) {
            provinces[0].push(this.data.provinceInfos[i]);
        }
        provinces[1] = this.data.provinceInfos[0].cityList;
        that.setData({
            fromProvinces: provinces,
            toProvinces: provinces,
            from: provinces[1][0].id,
            to: provinces[1][0].id
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