// pages/eventDetail/eventDetail.js
Page({
  data: {
    dimension: '事件',
    index: 0,
    hasdone: false,
    time: "2000-08-11",
    tag: ['健身', '运动', '开会'],
    detail: 'detail1',
  },

  onLoad: function (options) {
    //获取事件数据
    this.setData({
      dimension: options.dimension,
      index: options.index,
      hasdone: (options.hasdone === 'true') ? true : false,
      time: options.time,
      detail: options.detail,
    })
  },

  //标题改变
  titleChange: function (e) {
    this.setData({
      dimension: e.detail.value
    })
  },

  //详情改变
  detailChange: function (e) {
    this.setData({
      detail: e.detail.detail
    })
  },

  // 保存
  saveTap: function () {
    var n = 1;
    if (this.data.dimension === '') {
      n = 0;
    }
    if (n === 1) {
      wx.showToast({
        icon: 'none',
        title: '保存成功',
        duration: 2000
      })
      var index = this.data.index
      var dimension = this.data.dimension
      var hasdone = this.data.hasdone
      var detail = this.data.detail
      setTimeout(function () {
        //要延时执行的代码
        wx.reLaunch({
          url: '../theFirstPage/theFirstPage?index=' + index + '&dimension=' + dimension + '&hasdone=' + hasdone + '&detail=' + detail + '&type=saveEvent',
        })
      }, 500)
    } else {
      wx.showToast({
        icon: 'none',
        title: '标题不能为空',
        duration: 2000
      })
    }
  },

  //删除标签
  deleteTap: function () {
    var that = this
    wx.showModal({
      title: '你确定要删除么',
      content: '删除后将无法恢复',
      success(res) {
        if (res.confirm) {
          var index = that.data.index
          //要延时执行的代码
          wx.reLaunch({
            url: '../theFirstPage/theFirstPage?index=' + index + '&type=deleteEvent',
          })
        }
      }
    })
  },
  onShareAppMessage: function () {
    return {
      title:'微光',
      imageUrl: '../../image/mainIcon.png'
    }
  }
  ,ifhasdone(e){
    var hasdone=!this.data.hasdone
    this.setData({
      hasdone:hasdone
    })
  }
})