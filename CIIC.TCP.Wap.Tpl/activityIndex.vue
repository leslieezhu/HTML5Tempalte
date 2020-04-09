<template>
  <div>
    <!--xxxxxxxx top 广告bg+搜索 xxxxxxxx -->
    <div class="home-top">
      <div class="top-sousou">
        <form @submit.prevent action="#">
          <input
            type="search"
            placeholder="请输入职位关键字"
            @blur="animateWidth"
            v-model="SearchText"
            @keypress="search"
            ref="input"
          />
          <i class="iconfont">&#xe628;</i>
        </form>
      </div>
      <a class="banner-zx" @click="ToLogin">{{ShowLoginOrCancellation}}</a>
    </div>

    <!--xxxxxxxx最新职位 xxxxxxxx -->
    <div class="content">
      <h2>
        <i class="iconfont">&#xe665;</i>最新职位
      </h2>
      <ul>
        <li class="textbox" v-for="(item,id) in itemList" :key="id">
          <div @click="Todetail(item,$event)">
            <h3>
              {{WorkName(item.name)}}
              <span>{{item.pubTime}}</span>
            </h3>
            <!-- <p>{{item.nikeName}}</p> -->
            <p>{{item.nikeName===''?item.companyName:item.nikeName}}</p>
            <div>
              <i class="iconfont">&#xe681;</i>
              {{ShowAddress(item.city)}}
              <i class="iconfont">&#xe604;</i>
              {{item.salaryRange}}/月
            </div>
            <button class="button-sq">申请</button>
          </div>
        </li>
      </ul>
    </div>

    <div class="clear h20">&nbsp;</div>
  </div>
</template>

<script>
import { Tabbar, TabbarItem, XHeader, XButton, XImg, Actionsheet, Search } from 'vux'
// import Bg2 from '../../../assets/images/indextop-bg.png'
export default {
  mounted () {
    this.SetUserInfo()
    this.GetDicList();
    this.GetAddressList();
    setTimeout(() => {
      this.loadLatest();
    }, 1000)
  },
  data () {
    return {
      itemList: [],
      //bg2: Bg2,
      SearchText: '',
      diclist: [],
      UserCode: '',
      dataList: [],
      ShowLoginOrCancellation: ''

    }
  },
  methods: {
    animateWidth () {
      if (this.SearchText) {
        localStorage.setItem('Search', this.SearchText)
        this.$router.push('/memberHome/AllWorkList');
      }
      // console.log('12313' + this.SearchText)
    },
    search (event) {
      if (event.keyCode == 13) { //如果按的是enter键 13是enter 
        event.preventDefault(); //禁止默认事件（默认是换行） 
        console.log(event.target.value)
        Toast("点击了确认")
      }
    },
    SetUserInfo () {
      this.UserCode = localStorage.getItem('UserCode')
      if (this.UserCode) {
        this.ShowLoginOrCancellation = '注销'
      }
      else {
        this.ShowLoginOrCancellation = '登录'
      }
    },
    loadLatest () {
      let self = this;
      this.baseAjax({
        url: 'api/position/getLastPositions',
        showLoading: true,
        type: "POST",
        data: {
          checkStatus: 5
        },
        success: function (data) {
          self.itemList = data.data
          if (self.itemList.length > 0) {
            for (let i = 0; i < self.itemList.length; i++) {
              let obj = {}
              obj = self.diclist.find(element => {
                if (element.value === self.itemList[i].salaryRange.toString()) { return element }
              });
              if (obj != null) {
                self.itemList[i].salaryRange = obj.text
              }
            }
          }
        }
      })
    },
    GetAddressList () {
      let self = this;
      self.baseAjax({
        url: '/api/city/getList',
        showLoading: true,
        type: "POST",
        timeout: 30000,
        success: function (data) {
          self.dataList = data
        }
      })
    },
    ShowAddress (val) {
      let self = this;
      var showtext = ''
      if (val) {
        var str = val.split(',')
        for (var i = 0; i < str.length; i++) {
          let obj = {}
          obj = self.dataList.find(element => {
            if (element.id === parseInt(str[i])) { return element }
          });
          if (obj != null) {
            if (showtext != '') {
              showtext = showtext + '-' + obj.name
            }
            else {
              showtext = obj.name
            }
          }
        }
        if (showtext)
          if (showtext.length > 5) { return showtext.substring(0, 5) + '....' }
          else { return showtext }
        else
          return ''
      }
      else { return '' }
    },
    GetDicList () {
      let self = this;
      this.baseAjax({
        url: '/api/dic/getList/preSalary',
        showLoading: true,
        type: "POST",
        success: function (data) {
          self.diclist = data
        }
      })
    },
    ToLogin () {
      // this.$router.push('/login/login');
      if (this.ShowLoginOrCancellation = '登录') {
        this.$router.push('/login/login');
      }
      else {
        localStorage.removeItem('UserCode')
      }
    },
    GetTimeAgo (createdTime) {
      return this.timeAgo(createdTime)
    },
    timeAgo (stringTime) {
      let date = new Date(Date.parse(stringTime))
      let dateTimeStamp = date.getTime()
      let minute = 1000 * 60
      let hour = minute * 60
      let day = hour * 24
      let week = day * 7
      let month = day * 30

      let now = new Date().getTime() // 获取当前时间毫秒
      let diffValue = now - dateTimeStamp// 时间差

      if (diffValue < 0) { return }

      let minC = diffValue / minute // 计算时间差的分，时，天，周，月
      let hourC = diffValue / hour
      let dayC = diffValue / day
      let weekC = diffValue / week
      let monthC = diffValue / month

      let result = ''
      if (monthC >= 1) {
        result = '' + parseInt(monthC) + '月前'
      } else if (weekC >= 1) {
        result = '' + parseInt(weekC) + '周前'
      } else if (dayC >= 1) {
        result = '' + parseInt(dayC) + '天前'
      } else if (hourC >= 1) {
        result = '' + parseInt(hourC) + '小时前'
      } else if (minC >= 1) {
        result = '' + parseInt(minC) + '分钟前'
      } else { result = '今天' }
      return result
    },
    Todetail (item, e) {//跳转明细页面
      // console.log(e.target.innerHTML)
      if (e.target.innerHTML == '申请') {
        //申请页面
        // let self = this;
        // self.baseAjax({
        //   url: ' /api/user/sendVitae/' + self.UserCode + '/' + item.id,
        //   showLoading: true,
        //   type: "POST",
        //   success: function (data) {
        //     if (data.errCode === "0") {
        //       self.$vux.alert.show({
        //         title: '提示',
        //         content: '投递成功!',
        //       })
        //     }
        //     else {
        //       self.$vux.alert.show({
        //         title: '提示',
        //         content: '投递失败!原因：' + data.message,
        //       })
        //     }
        //   }
        // })
        this.$router.push('/memberHome/activityDetail/' + item.id + '/1');
      }
      else {
        //明细页面
        // this.$router.push('/memberHome/activityDetail/' + item.id);
      }
    },
    CompanyName (val) {
      if (val.length > 10) {
        return val.substring(0, 7) + '....'
      }
      else {
        return val
      }
    },
    WorkName (val) {
      if (val.length > 10) {
        return val.substring(0, 7) + '....'
      }
      else {
        return val
      }
    }
  },
  components: {
    Tabbar,
    TabbarItem,
    XHeader,
    XButton,
    XImg,
    Actionsheet,
    Search
  }
}
</script>

<style  lang="stylus" scoped>
@import '../../../assets/css/css';

// 顶部检索
.home-top {
  height: 150px;
  padding: 12px 16px;
  background: transparent url('../../../assets/images/indextop-bg.png') no-repeat center center;
  background-size: cover;
}

.top-sousou {
  width: 80%;
  height: 28px;
  padding: 6px 10px 4px 26px;
  float: left;
  position: relative;
  border-radius: 14px;
  background-color: #fff;

  i {
    font-size: 15px;
    color: $hui2;
    position: absolute;
    left: 8px;
    top: 6px;
  }

  input {
    font-size: 12px;
    width: 100%;
    height: 100%;
    background-color: transparent;
  }
}

// 最新职位
.content {
  width: 100%;
  padding: 12px 16px;

  h2 {
    font-size: 14px;
    color: #62cbff;
    padding: 0 0 12px 4px;

    i {
      font-size: 16px;
      margin-right: 8px;
    }
  }
}

.textbox {
  width: 100%;
  min-height: 106px;
  color: #93959f;
  margin-bottom: 16px;
  padding: 16px 0px 16px 12px;
  background-color: #fff;
  border-radius: 4px;
  border-left: 4px solid #fca6a7;
  box-shadow: 0px 3px 3px 0px #e8edf1;
  position: relative;

  h3 {
    font-size: 16px;
    font-weight: 700;
    color: #282828;
    padding-top:5px;

    span {
      font-size: 12px;
      color: #93959f;
      position: absolute;
      right: 16px;
      top: 18px;
    }
  }

  i {
    font-size: 12px;
    margin-right: 2px;

    &:nth-child(2) {
      font-size: 13px;
      margin-left: 10px;
    }
  }

  button {
    position: absolute;
    right: 16px;
    bottom: 12px;
    font-size: 14px;
    color: #0097e0;
    width: 50px;
    height: 22px;
    border: 1px solid #0097e0;
    background-color: #fff;
    -webkit-border-radius: 11px;
    border-radius: 11px;
  }

  p, div {
    margin-top: 14px;
  }
}

// 列表颜色循环
$textbox-c1 = #fca6a7; // 粉
$textbox-c2 = #8cccdf; // 蓝
$textbox-c3 = #f9d471; // 黄
$textbox-c4 = #9dd2ec; // 蓝
$textbox-c5 = #c5dca0;
$textbox-c6 = #a2ccff;
$textbox-c7 = #acddd7;
$textbox-c8 = #8cccdf;

.textbox:nth-child(8n+1) {
  border-left: 4px solid $textbox-c1;
}

.textbox:nth-child(8n+2) {
  border-left: 4px solid $textbox-c2;
}

.textbox:nth-child(8n+3) {
  border-left: 4px solid $textbox-c3;
}

.textbox:nth-child(8n+4) {
  border-left: 4px solid $textbox-c4;
}

.textbox:nth-child(8n+5) {
  border-left: 4px solid $textbox-c5;
}

.textbox:nth-child(8n+6) {
  border-left: 4px solid $textbox-c6;
}

.textbox:nth-child(8n+7) {
  border-left: 4px solid $textbox-c7;
}

.textbox:nth-child(8n+8) {
  border-left: 4px solid $textbox-c8;
}
</style>
