// pages/Register/Register.js
import { HttpPost, HttpGet } from '../../utils/Request';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        name: '',
        idCard: '',
        email: '',
        phoneNumber: ''
    },

    register: function (e) {
        var that = this;
        // 参数验证
        // if (this.data.name === '' || this.data.name === null) {
        //     wx.showToast({
        //       title: '请输入姓名',
        //       duration: 3000,
        //       icon: 'error'
        //     });
        //     return;
        // }
        // if (!(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/.test(this.data.idCard))) {
        //     wx.showToast({
        //       title: '身份证格式有误',
        //       duration: 3000,
        //       icon: 'error'
        //     });
        //     return;
        // }
        // if (!(/^[a-zA-Z0-9_.-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*\.[a-zA-Z0-9]{2,6}$/.test(this.data.email))) {
        //     wx.showToast({
        //       title: '邮箱格式有误',
        //       duration: 3000,
        //       icon: 'error'
        //     });
        //     return;
        // }
        // if (!(/^1[34578]\d{9}$/.test(this.data.phoneNumber))) {
        //     wx.showToast({
        //       title: '手机号格式有误',
        //       duration: 3000,
        //       icon: 'error'
        //     });
        //     return;
        // }
        wx.getUserProfile({
          desc: '用户注册',
        }).then((res) => {
            console.log(res);
            wx.login({
              timeout: 6000,
            }).then((res1) => {
                HttpPost(
                    '/eh/user/login',
                    {
                        code: res1.code,
                        cloudId: res.cloudID,
                        encryptData: res.encryptedData,
                        iv: res.iv,
                        rawData: res.rawData,
                        signature: res.signature,
                        wxUserInfo: {
                            avatarUrl: res.userInfo.avatarUrl,
                            gender: res.userInfo.gender,
                            nickName: res.userInfo.nickName,
                            name: this.data.name,
                            idCard: this.data.idCard,
                            email: this.data.email,
                            phoneNumber: this.data.phoneNumber
                        }
                    }
                ).then((res2) => {
                    console.log('res2')
                    console.log(res2);
                    if (res2.data.code === 0) {
                        wx.setStorageSync('__memberId', res2.data.data.id);
                        wx.setStorageSync('__token', res2.data.data.token);
                        wx.setStorageSync('loginStatus', true);
                        wx.switchTab({
                          url: '../index/index',
                        })
                    }
                })
            })
        }).catch(() => {
            wx.showToast({
              title: '用户取消授权',
              duration: 3000,
              icon: 'error'
            })
        })
    },

    getInputValue: function (e) {
        if (e.currentTarget.dataset.key === 'name') {
            this.setData({
                name: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'idCard') {
            this.setData({
                idCard: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'email') {
            this.setData({
                email: e.detail.value
            })
        } else if (e.currentTarget.dataset.key === 'phoneNumber') {
            this.setData({
                phoneNumber: e.detail.value
            })
        }
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