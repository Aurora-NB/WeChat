const db = wx.cloud.database()

const usres = db.collection('users')
const phtotos = db.collection('phtotos')
var app = getApp()
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listEvent: []
  },
  onLoad: function (options) {
    var openid;
    wx.cloud.callFunction({
      // 云函数名称
      name: 'getApid',
      // 传给云函数的参数
      data: {},
      success: function (res) {
        openid = res.openid
        console.log(res);
      },
      fail: console.error
    })
    wx.showLoading({
      title: '正在加载界面',
      mask: true
    })
    var time = util.formatTime(new Date());
    usres.where({
      time: time,
      _openid: openid
    }).get({
      success: res => {
        // 如果没有则引导用户添加日常
        if (res.data.length === 0) {
          wx.hideLoading()
          wx.showModal({
            title: '',
            content: '你还没有任何日常呢，快去添加吧！',
            success:res=> {
              if (res.confirm) {
                wx.redirectTo({
                  url: '../newevent/newevent',
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
        }
        else{
         
        for (var i = 0; i < res.data.length; i++) {
          var listEvent = this.data.listEvent
          res.data[i].index = listEvent.length
          listEvent.push(res.data[i])
        }
        console.log(res);
        setTimeout(
          () => {
            wx.hideLoading()
            this.setData({
              listEvent: listEvent
            })
          }, 200)
      }
    }
    })
    //新增事件
    // if (options.type === 'newEvent') {
    //   console.log('new', options)
    //   var listEvent = this.data.listEvent
    //   var l = listEvent.length
    //   if (options.dimension) {
    //     listEvent.push({
    //       dimension: options.dimension,
    //       detail: options.detail,
    //       tag: [
    //         options.tags0 === 'undefined' ? '' : options.tags0,
    //         options.tags1 === 'undefined' ? '' : options.tags1,
    //         options.tags2 === 'undefined' ? '' : options.tags2
    //       ],
    //       index: l,
    //       hasdone: false,
    //       time : options.time,
    //       imgpath: options.imgpath,
    //       tagscolor: [options.tagsmirrorcolor1 === 'undefined' ? '' : options.tagsmirrorcolor1, options.tagsmirrorcolor2 === 'undefined' ? '' : options.tagsmirrorcolor2, options.tagsmirrorcolor3 === 'undefined' ? '' : options.tagsmirrorcolor3]
    //     })
    //   }
    // }
    // else
    //  if (options.type === 'saveEvent') {
    //   console.log('save', options)
    //   //保存事件
    //   var list = this.data.listEvent
    //   var index=options.index-0;
    //   list[index].dimension = options.dimension
    //   list[index].detail = options.detail
    //   this.setData({
    //     listEvent: list
    //   })
    // } 
    // else 
    // if (options.type === 'deleteEvent') {
    //   //删除事件
    //   console.log('delete', options)
    //   var list = this.data.listEvent
    //   list.splice(options.index, 1)
    //   this.setData({
    //     listEvent: list
    //   })
    // }
  },
  //圆圈被点击
  circleTap: function (e) {
    app.changeEvent(e, this)
    var list = this.data.listEvent
    usres.doc(list[e.currentTarget.dataset.index - 0]._id).update({
      data: {
        hasdone: list[e.currentTarget.dataset.index].hasdone

      },
      success: res => {
        console.log(res);
      }
    })
    var sn = true
    for (var i = 0; i < list.length; i++) {
      if (list[i].hasdone === false) sn = false
    }
    if (sn === true) {
      wx.showToast({
        title: '你完成了所有日常！',
        icon: 'none',
        duration: 2000
      })
    }
  },
  //事件被点击
  eventTap: function (e) {
    var index = e.currentTarget.dataset.index
    var dimension = this.data.listEvent[index].dimension
    var hasdone = this.data.listEvent[index].hasdone
    var time = this.data.listEvent[index].time
    var detail = this.data.listEvent[index].detail
    var tag1 = this.data.listEvent[index].tag[0]
    var tag2 = this.data.listEvent[index].tag[1]
    var tag3 = this.data.listEvent[index].tag[2]
    var id = this.data.listEvent[index]._id
    var openid = this.data.listEvent[index]._openid
    var fileID = this.data.listEvent[index].fileID ? '' : this.data.listEvent[index].fileID
    wx.navigateTo({
      url: '../eventDetail/eventDetail?dimension=' + dimension + '&hasdone=' + hasdone + '&time=' + time + '&detail=' + detail + '&tag1=' + tag1 + '&tag2=' + tag2 + '&tag3=' + tag3 + '&index=' + index + '&id=' + id + '&openid=' + openid + '&fileID=' + fileID,
      complete: (res) => {},
    })
  },
  eventtoptap(e){
    wx.getUserInfo({
      success:res=>{
        console.log(res);
        
        wx.navigateTo({
          url: '../newevent/newevent',
        })
      },
      fail:res=>{
        console.log(res);
        wx.showToast({
          title: '请登录后再试',
          icon: 'none',
          duration: 800
        })
        setTimeout(
          ()=>{
            wx.reLaunch({
              url: '../Individuals/Individuals',
            })
          },800
        )
      }
    })
  }
})