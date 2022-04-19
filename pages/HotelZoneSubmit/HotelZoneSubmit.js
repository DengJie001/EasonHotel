// pages/HotelZoneSubmit/HotelZoneSubmit.js
import { HttpPost, HttpUpload } from '../../utils/Request'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgList: [],
        content: ''
    },

    chooseImage: function () {
        wx.chooseImage({
            count: 9,
            sizeType: ['compressed', 'original'],
            sourceType: ['album'],
            success: (res) => {
                if (this.data.imgList.length != 0) {
                    this.setData({
                        imgList: this.data.imgList.concat(res.tempFilePaths)
                    })
                } else {
                    this.setData({
                        imgList: res.tempFilePaths
                    })
                }
            }
        })
    },

    previewImage: function (e) {
        var that = this;
        wx.previewImage({
            urls: that.data.imgList,
            current: e.currentTarget.dataset.url
        })
    },

    deleteImage: function (e) {
        this.data.imgList.splice(e.currentTarget.dataset.index, 1);
        this.setData({
            imgList: this.data.imgList
        })
    },

    getInputValue: function (e) {
        this.setData({
            content: e.detail.value
        })
    },

    onSubmit: async function (e) {
        var that = this;
        var imageIds = [];
        var picIds = '';
        wx.showLoading({
          title: '上传中',
        });
        for (let i = 0; i < this.data.imgList.length; ++i) {
            var res = await HttpUpload('/static/upload', that.data.imgList[i]);
            imageIds.push(JSON.parse(res.data).data);
            picIds = picIds + JSON.parse(res.data).data
            if (i < this.data.imgList.length - 1) {
                picIds = picIds + ','
            }
        }
        HttpPost(
            '/eh/hotelZone/add',
            {
                content: that.data.content,
                images: picIds,
                userId: wx.getStorageSync('__memberId')
            }
        ).then((res) => {
            if (res.data.code === 0) {
                wx.hideLoading();
                wx.showToast({
                  title: '操作成功',
                  mask: true,
                  duration: 3000,
                  icon: 'success'
                });
                wx.switchTab({
                  url: '../HotelZone/HotelZone',
                })
            } else {
                wx.hideLoading();
                wx.showToast({
                  title: '服务异常',
                  mask: true,
                  duration: 3000,
                  icon: 'error'
                })
            }
        }).catch((e) => {
            wx.hideLoading();
            wx.showToast({
              title: '预期之外的错误',
              mask: true,
              duration: 3000,
              icon: 'none'
            });
        });
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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