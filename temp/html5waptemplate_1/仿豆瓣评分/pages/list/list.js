// pages/list/list.js
const http = require("../../utils/http.js")

Page({

    /**
     * 页面的初始数据
     */
    data: {
        items:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let type = options.type;
        let title = '';
        wx.showLoading({
            title: '正在加载中...',
        })
        switch (type){
            case "1":
                title = "影院热映"
                break;
            case "2":
                title = "电视剧"
                break;
            case "3":
                title = "综艺"
                break;
        }
        wx.setNavigationBarTitle({
            title: title
        })
        http.post(http.GET_LIST, { type: type, num: 12 }, function (ret) {
            wx.hideLoading();
            let data = ret.data.data;
            if (data.length%3 == 2 ){
                data.push(null)
            }
            that.setData({
                items: data
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