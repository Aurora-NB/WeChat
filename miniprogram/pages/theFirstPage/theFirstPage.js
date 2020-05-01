// pages/thefirstpage/demo01.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    listEvent: [{
      dimension: '事件1',
      index: 0,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: 'detail1',
    }, {
      dimension: "事件2",
      index: 1,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: 'detail2',
    }, {
      dimension: "事件3",
      index: 2,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: 'detail3',
    }, {
      dimension: "事件4",
      index: 3,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: 'detail4',
    }, {
      dimension: "事件5",
      index: 4,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: 'detail5',
    }]
  },

  circleTap: function (e) {
    app.changeEvent(e, this)
    var list = this.data.listEvent
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

  eventTap: function (e) {
    console.log(e)
    var index = e.currentTarget.dataset.index
    var dimension = this.data.listEvent[index].dimension
    var hasdone = this.data.listEvent[index].hasdone
    var time = this.data.listEvent[index].time
    var detail = this.data.listEvent[index].detail
    wx.navigateTo({
      url: '../eventDetail/eventDetail?dimension='+dimension+ '&hasdone=' + hasdone + '&time=' + time + '&detail=' + detail + '&index=' + index,
      complete: (res) => {},
    })
  }
})