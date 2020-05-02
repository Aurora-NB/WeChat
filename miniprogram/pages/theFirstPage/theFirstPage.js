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
      detail: 'asd',
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

    //新增事件
    if (options.type === 'newEvent') {
      console.log('new',options)
      var listEvent = this.data.listEvent
      var l = listEvent.length
      if (options.dimension) {
        listEvent.push({
          dimension: options.dimension,
          detail: this.options.detail,
          tag: [
            options.tags0 === 'undefined' ? '' : options.tags0,
            options.tags1 === 'undefined' ? '' : options.tags1,
            options.tags2 === 'undefined' ? '' : options.tags2
          ],
          index: l,
          hasdone: false,
          imgpath: options.imgpath,tagscolor:[options.tagsmirrorcolor1=== 'undefined' ? '' : options.tagsmirrorcolor1
          ,               options.tagsmirrorcolor2=== 'undefined' ? '' : options.tagsmirrorcolor2
          ,               options.tagsmirrorcolor3=== 'undefined' ? '' :options.tagsmirrorcolor3 ]
        })
        this.setData({
          listEvent: listEvent
        })
      }
    }
    else if(options.type === 'saveEvent'){
      console.log('save',options)
      //保存事件
      var list = this.data.listEvent
      list[options.index].dimension = options.dimension
      list[options.index].detail = options.detail
      list[options.index].hasdone = (options.hasdone === 'true')?true:false
      this.setData({
        listEvent : list
      })
    }
    else if(options.type === 'deleteEvent'){
      //删除事件
      console.log('delete',options)

      var list = this.data.listEvent
      list.splice(options.index,1)
      
      this.setData({
        listEvent : list
      })
    }

  },
  //圆圈被点击
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
    wx.navigateTo({
      url: '../eventDetail/eventDetail?dimension=' + dimension + '&hasdone=' + hasdone + '&time=' + time + '&detail=' + detail + '&tag1=' + tag1 + '&tag2=' + tag2 + '&tag3=' + tag3 + '&index=' + index,
      complete: (res) => {},
    })
  }
})