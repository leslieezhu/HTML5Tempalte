var express = require('express');
var bodyParser = require("body-parser"); 
var app = express();
    app.use(bodyParser.urlencoded({extended: false}));

//设置跨域访问
app.all('*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});


function get_list(){
    return {
        status: 1,
        msg: '',
        data: [{
            id:1,
            img:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567346094.jpg",
            name:'诛仙',
            stars:7,
            year:'2019'
        },{
            id:2,
            img:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2561439800.jpg",
            name:'寄生虫',
            stars:8.7,
            year:'2019'
        },{
            id:3,
            img:"https://img1.doubanio.com/view/photo/s_ratio_poster/public/p2576088318.jpg",
            name:'星际探索',
            stars:6.8,
            year:'2019'
        },{
            id:4,
            img:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572166063.jpg",
            name:'少年的你',
            stars:8.3,
            year:'2019'
        },{
            id:5,
            img:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2574278284.jpg",
            name:'南方车站的聚会',
            stars:7.4,
            year:'2019'
        },{
            id:6,
            img:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2581835383.jpg",
            name:'囧妈',
            stars:6,
            year:'2019'
        },{
            id:7,
            img:"https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2572847101.jpg",
            name:'冰雪奇缘2',
            stars:7,
            year:'2019'
        },{
            id:8,
            img:"https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567346094.jpg",
            name:'诛仙',
            stars:7,
            year:'2019'
        }]
           
    };
}

function get_detail() {
    return {
        status: 1,
        msg: '',
        data: {
            id:1,
            desc:{
                name:"诛仙",
                rate:9,
                persons:1236,
                type:'134分钟 动作/奇幻/冒险',
                show:'2019-10-12 中国大陆',
                actors:'导演（xxx）/ 演员（xxx）/ 演员（xxx）',
                img:'https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2567346094.jpg'
            },
            tag:[
                '黑色幽默',
                '喜剧',
                '喜剧',
                '方言',
                '人性',
                '方言',
                '方言',
            ],
            comment:[{
                user_name:'reuxo',
                user_img:'https://img3.doubanio.com/icon/u203774998-3.jpg',
                rate:6,
                time:'2020-03-12 12:23:33',
                content:'草庙村被屠，少年张小凡双亲离世，被青云门大竹峰收留。机缘巧合之下，他习得佛门天音功法，又意外获得魔教法器烧火棍，踏上强者之路的同时，也让他陷入了巨大的危机。至魔法器的现世，与陆雪琪、碧瑶、田灵儿三个女生间命运的交错，都让他原本单纯的人生轨迹充满变数。一个勇者驳斥命运的传奇之旅就此展开'
            },{
                user_name:'reuxo',
                user_img:'https://img3.doubanio.com/icon/u203774998-3.jpg',
                rate:6,
                time:'2020-03-12 12:23:33',
                content:'草庙村被屠，少年张小凡双亲离世，被青云门大竹峰收留。机缘巧合之下，他习得佛门天音功法，又意外获得魔教法器烧火棍，踏上强者之路的同时，也让他陷入了巨大的危机。至魔法器的现世，与陆雪琪、碧瑶、田灵儿三个女生间命运的交错，都让他原本单纯的人生轨迹充满变数。一个勇者驳斥命运的传奇之旅就此展开'
            },{
                user_name:'reuxo',
                user_img:'https://img3.doubanio.com/icon/u203774998-3.jpg',
                rate:6,
                time:'2020-03-12 12:23:33',
                content:'草庙村被屠，少年张小凡双亲离世，被青云门大竹峰收留。机缘巧合之下，他习得佛门天音功法，又意外获得魔教法器烧火棍，踏上强者之路的同时，也让他陷入了巨大的危机。至魔法器的现世，与陆雪琪、碧瑶、田灵儿三个女生间命运的交错，都让他原本单纯的人生轨迹充满变数。一个勇者驳斥命运的传奇之旅就此展开'
            }]
        }
    };
}


//写个接口123
app.post('/api/v1/list', function(req, res) {
    console.log(req.body)
    res.status(200),
    res.json(get_list())
});
app.post('/api/v1/detail', function(req, res) {
    console.log(req.body)
    res.status(200),
    res.json(get_detail())
});



//配置服务端口
var server = app.listen(3000, function() {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
})