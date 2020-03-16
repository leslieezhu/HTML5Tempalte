// const path = 'http://127.0.0.1:3000/api/v1/';
const path = 'http://192.168.1.107:3000/api/v1/';

const GET_LIST = 'list' //获取列表数据
const GET_DETAIL = 'detail' //获取详情数据

module.exports = {
    GET_LIST,
    GET_DETAIL,
    get(apiUrl, yes, error) {
        wx.request({
            url: path + apiUrl,
            header: { 'Content-Type': 'json' },
            success: yes,
            fail: error
        })
    },
    post(apiUrl, params, yes, error) {
        wx.request({
            url: path + apiUrl,
            method: "POST",
            data: params,
            header: { 'Content-Type': 'json' },
            success: yes,
            fail: error
        })
    }
}