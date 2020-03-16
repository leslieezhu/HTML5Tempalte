// pages/search/search.js
const http = require("../../utils/http.js")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        search_data:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    onSearcjInput:function(event){
        let key = event.detail.value;
        let that = this;
        if (key){
            http.post(http.GET_LIST, { key: key}, function(ret){
                let data = ret.data.data;
                that.setData({
                    search_data: data
                })
            });
        }
    }
})