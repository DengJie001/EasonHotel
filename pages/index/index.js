// index.js
// 获取应用实例
import {HttpGet, HttpPost} from '../../utils/Request'
const app = getApp()

Page({
    data: {
        swiperCur: 0,
        swiperImages: [{
            id: 0,
            type: 'image',
            url: '../../images/th.jfif'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th1.jfif'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th2.jfif'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th3.jfif'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th4.jfif'
        }, {
            id: 0,
            type: 'image',
            url: '../../images/th5.jfif'
        },
        ],
        recommendHotelList: []
    },
    // 事件处理函数
    onLoad() {
        var that = this;
        HttpGet(
            '/eh/hotel/getRecommend'
        ).then((res) => {
            if (res.data.code === 0) {
                that.setData({
                    recommendHotelList: res.data.data
                })
                console.log(that.data.recommendHotelList);
            }
        }).catch((e) => {});
    },

    goto (e) {
        var url = '';
        switch(e.currentTarget.dataset.tag) {
            case 'RoomBooking':
                url = '../RoomBooking/RoomBooking';
                break;
            case 'Market':
                url = '../MarketPre/MarketPre';
                break;
            case 'Epidemic':
                url = '../Epidemic/Epidemic';
                break;
            case 'Recharge':
                url = '../Recharge/Recharge';
                break;
            case 'Complaint':
                url = '../Complaint/Complaint';
                break;
        }
        wx.navigateTo({
            url: url
        })
    },

    toDetail(e) {
        wx.setStorageSync("hotelId", e.currentTarget.dataset.id);
        wx.navigateTo({
          url: '../HotelDetail/HotelDetail',
        });
    }
})
