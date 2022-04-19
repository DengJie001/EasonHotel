// pages/Market/Market.js
import { HttpGet, HttpPost } from '../../utils/Request'
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        curTab: 0,
        verticalNavTop: 0,
        tabList: [
        ],
        swiperCur: 0,
        swiperImages: [{
            id: 0,
            type: 'image',
            url: '../../images/th.jfif',
            src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th1.jfif',
            src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th2.jfif',
            src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th3.jfif',
            src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th4.jfif',
            src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th5.jfif',
            src: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
        }],
        MainCur: 0,
        commodityList: [
            {
                name: '个人洗护',
                sonCommodityList: [
                    {
                        name: '一次性牙刷',
                        coverImage: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
                        inventory: 123,
                        sales: 321
                    },
                    {
                        name: '一次性牙刷',
                        coverImage: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
                        inventory: 123,
                        sales: 321
                    },
                    {
                        name: '一次性牙刷',
                        coverImage: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
                        inventory: 123,
                        sales: 321
                    }
                ]
            },
            {
                name: '冷冻食品',
                sonCommodityList: [
                    {
                        name: '巧乐兹',
                        coverImage: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
                        inventory: 123,
                        sales: 321
                    },
                    {
                        name: '梦龙',
                        coverImage: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
                        inventory: 123,
                        sales: 321
                    },
                    {
                        name: '小布丁',
                        coverImage: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg',
                        inventory: 123,
                        sales: 321
                    }
                ]
            }
        ],
        load: true,
        hideDetail: false,
        commodityDetail: {},
        cartList: {},
        total: 0,
        roomNumberId: '',
        hotelId: ''
    },

    onTabChange: function (e) {
        this.setData({
            curTab: e.currentTarget.dataset.index,
            MainCur: e.currentTarget.dataset.index,
            verticalNavTop: (e.currentTarget.dataset.index - 1) * 50
        })
    },

    onMainTabChange: function (e) {

    },

    showDetail: function (e) {
        var that = this;
        HttpGet(
            `/eh/commodity/detail/${e.currentTarget.dataset.id}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    commodityDetail: res.data.data,
                    hideDetail: true
                })
            }
        })
    },

    showList: function (e) {
        this.setData({
            hideDetail: false
        })
    },

    toCart: function (e) {
        wx.navigateTo({
          url: `../Cart/Cart?roomNumber=${this.data.roomNumberId}`,
        })
    },

    addCart: function (e) {
        var that = this;
        HttpPost(
            '/eh/cart/modify',
            {
                commodityId: e.currentTarget.dataset.id,
                userId: wx.getStorageSync('__memberId'),
                count: 1
            }
        ).then((res) => {
            if (res.data.code === 0) {
                HttpGet(
                    `/eh/cart/calculateTotal?userId=${wx.getStorageSync('__memberId')}`
                ).then((res) => {
                    if (res.data.code === 0) {
                        that.setData({
                            total: res.data.data
                        })
                    }
                }).catch((e) => {});
            }
        }).catch((e) => {})
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            roomNumberId: JSON.parse(options.order).roomNumberId,
            hotelId: JSON.parse(options.order).hotelId
        });
        var that = this;
        HttpGet(
            '/eh/sys/dict/listSonDictByParentCode?parentCode=COMMODITY_TYPE'
        ).then((res) => {
            that.setData({
                tabList: res.data.data
            })
        });

        HttpGet(
            `/eh/commodity/list?hotelId=${that.data.hotelId}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    commodityList: res.data.data
                })
            }
        }).catch((e) => {});

        HttpGet(
            `/eh/cart/calculateTotal?userId=${wx.getStorageSync('__memberId')}`
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    total: res.data.data
                })
            }
        }).catch((e) => {});
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        wx.hideLoading({
            success: (res) => { },
        });
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