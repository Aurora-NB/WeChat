const app = getApp()
Page({
  data: {
    userInfo: {
      avatarUrl: '../../image/userhead2.png'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    text1: '登录',

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
          text1: app.globalData.userInfo.nickName,
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true,
            text1: app.globalData.userInfo.nickName,
          })
        }
      })
    }

  },
  getUserInfo: function (e) {
    if (e.detail.userInfo) {
      console.log(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
      setTimeout(()=>{
        wx.reLaunch({
          url:'../theFirstPage/theFirstPage'
        })
      },500)
    }
  },
  about: function () {
    wx.navigateTo({
      url: '../about/about',
    })
  }


})