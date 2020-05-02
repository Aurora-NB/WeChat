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
      detail: '',
      imgpath: '',
      tagscolor:[]
    }, {
      dimension: "事件2",
      index: 1,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: '',
      imgpath: '',
      tagscolor:['red','green','yellow']
    }, {
      dimension: "事件3",
      index: 2,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: '',
      imgpath: '',
      tagscolor:['red','green','yellow']
    }, {
      dimension: "事件4",
      index: 3,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: '',
      imgpath: '',
      tagscolor:['red','green','yellow']
    }, {
      dimension: "事件5",
      index: 4,
      hasdone: false,
      time: "2000-08-11",
      tag: ['健身', '运动', '开会'],
      detail: '',
      imgpath: '',
      tagscolor:['red','green','yellow']
    }]
  },
  onLoad: function (options) {
    var listEvent = this.data.listEvent
    var l = listEvent.length
    var data=new Date()
    var time=data.toLocaleDateString()
    if (options.dimension) {
      listEvent.push({
        dimension: options.header,
        detail: options.dimension,
        tag: [
          options.tags0 === 'undefined' ? '' : options.tags0,
          options.tags1 === 'undefined' ? '' : options.tags1,
          options.tags2 === 'undefined' ? '' : options.tags2
        ],
        index: l,
        hasdone: false,
        imgpath: options.imgpath,
        time:time,
        tagscolor:[options.tagsmirrorcolor1=== 'undefined' ? '' : options.tagsmirrorcolor1
          ,               options.tagsmirrorcolor2=== 'undefined' ? '' : options.tagsmirrorcolor2
          ,               options.tagsmirrorcolor3=== 'undefined' ? '' :options.tagsmirrorcolor3 ]
      })
      this.setData({
        listEvent: listEvent
      })
    }
    console.log(options);

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
      url: '../eventDetail/eventDetail?dimension=' + dimension + '&hasdone=' + hasdone + '&time=' + time + '&detail=' + detail,
      complete: (res) => {},
    })
  }
})