var con = require("../../../utils/data.js");
var app = getApp()
Page({
  data: {
    type: [],
    list: [],
    galler: []
  },
  onLoad: function () {
    var that = this;
    //从云数据库找出导航栏图片
    const db = wx.cloud.database()
    db.collection('navimgs').where({
      //条件
    }).get({
      success: res => {
        this.setData({
          list: res.data
        })
        console.log('[navimgs] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[navimgs] [查询记录] 失败：', err)
      }
    })
    //从云数据库中找出首页类别图片
    db.collection('typeimgs').where({
      //条件
    }).get({
      success: res => {
        this.setData({
          type: res.data
        })
        console.log('[typeimgs] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[typeimgs] [查询记录] 失败：', err)
      }
    })
   

   //从云数据库中找出推荐图
    db.collection('recimgs').where({
      //条件
    }).get({
      success: res => {
        this.setData({
          galler: res.data
        })
        console.log('[recimgs] [查询记录] 成功: ', res.data)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[recimgs] [查询记录] 失败：', err)
      }
    })

  },
  bindType: function (e) {
     console.log(e.currentTarget.dataset.id);
    var len = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../article/article?id=' + len,
    });
  },
  bindgaller: function (e) {
    var len = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../gallerItem/gallerItem?id=' + len,
    })
  }
})

