//index.js
//获取应用实例
const app = getApp()
const http = require("../../utils/http.js")

Page({
    data: {
        movits:[],
        tvplay:[],
        variety:[]
    },
    onLoad: function () {
        let that=this;
        http.post(http.GET_LIST, {type:1, num:7}, function(ret){
        let data = ret.data.data;
            that.setData({
                movits: data
            })
        })
        http.post(http.GET_LIST, { type: 2, num: 7 }, function (ret) {
            let data = ret.data.data;
            that.setData({
                tvplay: data
            })
        })
        http.post(http.GET_LIST, { type: 3, num: 7 }, function (ret) {
            let data = ret.data.data;
            that.setData({
                variety: data
            })
        })
    },
})
