//app.js
var con = require("utils/data.js");
App({
  onLaunch: function() {
    //调用API从本地缓存中获取数据
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData = {}
  },

  getUserInfo: function(cb) {
    var that = this
    if (this.globalData.userInfo) {
      typeof cb == "function" && cb(this.globalData.userInfo)
    } else {
      //调用登录接口
      wx.login({
        success:function(o){
          // console.log(o);
          wx.getUserInfo({
            success:function(res){
            // console.log(res);
            wx.request({
              url: con.index_slogin,
              // data: {
              //   code: o.code,
              //   encryptedData: res.encryptedData,
              //   iv: res.iv,
              // },
              data: {
                code: o.code,
                wxappid: con.wyy_user_wxappid,
                nickname: res.userInfo.nickName,
                pic: res.userInfo.avatarUrl
              },
              method:'POST',
              header:{
                'content-type': 'application/x-www-form-urlencoded'
              },
              success:function(res){
                // console.log(res.data.openid);
                wx.setStorage({
                  key: 'openid',
                  data: res.data.openid,
                })  
              }
            })
            }
          })
        }
      })

    }
  },

  globalData: {
    userInfo: null
  }
})
