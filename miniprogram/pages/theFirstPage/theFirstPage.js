const db = wx.cloud.database()
const usres = db.collection('users')
const music = db.collection('music')
var app = getApp()
const usersDaily = db.collection('usersDaily')
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listEvent: [],
    musicUrl: ''
  },
  onLoad: function (options) {
     wx.getUserInfo({
      success:res=>{
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
        var time = util.formatTime(new Date())
        music.get({
          success: res => {
            console.log(4);
            console.log(res)
          },
          fail:console.error
        })
        var listEvent = this.data.listEvent
        usres.where({
          time:time
        }).get({
          success: res => {
            console.log(res);
            for (var i = 0; i < res.data.length; i++) {
              listEvent.push(res.data[i])
              }
          },
          fail:console.error
        })
        setTimeout(()=>{
          usersDaily.get({
            success:res=>{
              console.log(res);
              for (var i = 0; i < res.data.length; i++) {
                listEvent.push(res.data[i])
                console.log(listEvent);
              }
              console.log(listEvent);
              for (var i = 0; i < listEvent.length; i++) {
                listEvent[i].index=i;
              }
              console.log(listEvent)
              // 如果没有则引导用户添加日常
              if (listEvent.length === 0) {
                wx.hideLoading()
                wx.showModal({
                  title: '',
                  content: '你还没有任何日常呢，快去添加吧！',
                  success: res => {
                    if (res.confirm) {
                      wx.redirectTo({
                        url: '../newevent/newevent',
                      })
                    } else if (res.cancel) {
                      console.log('用户点击取消')
                    }
                  }
                })
              } else {
                console.log(res);
                setTimeout(
                  () => {
                    this.setData({
                      listEvent: listEvent
                    })
                    wx.hideLoading()
                  }, 200)
              }
            },
            fail:console.error
          })
        },100)
      },
      fail:error=>{
        console.log(error)
        wx.showToast({
          title: '请登录后再试',
          icon: 'none',
          duration: 1500,
          mask:true
        })
        setTimeout(
          () => {
            wx.reLaunch({
              url: '../Individuals/Individuals',
            })
          }, 800
        )
      }
    })
   
    
   
  },
  //圆圈被点击
  circleTap: function (e) {
    app.changeEvent(e, this)
    var list = this.data.listEvent
    if(!list[e.currentTarget.dataset.index - 0].Daily){
    usres.doc(list[e.currentTarget.dataset.index - 0]._id).update({
      data: {
        hasdone: list[e.currentTarget.dataset.index].hasdone

      },
      success: res => {
        console.log(res);
      },fail:console.error
    })
  }
  else{
    usersDaily.doc(list[e.currentTarget.dataset.index - 0]._id).update({
      data: {
        hasdone: list[e.currentTarget.dataset.index].hasdone
      },
      success: res => {
        console.log(res);
      },fail:console.error
    })
  }
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
  eventtoptap(e) {
    wx.getUserInfo({
      success: res => {
        console.log(res);

        wx.navigateTo({
          url: '../newevent/newevent',
        })
      },
      fail: res => {
        console.log(res);
        wx.showToast({
          title: '请登录后再试',
          icon: 'none',
          duration: 800
        })
        setTimeout(
          () => {
            wx.reLaunch({
              url: '../Individuals/Individuals',
            })
          }, 800
        )
      }
    })
  },
  // 长时间点击事件
  circleLongTap(e){
    console.log(e);
    var list = this.data.listEvent
    list[e.currentTarget.dataset.index - 0].Daily=!list[e.currentTarget.dataset.index - 0].Daily
    if(list[e.currentTarget.dataset.index - 0].Daily){
      usres.doc(list[e.currentTarget.dataset.index - 0]._id).remove({
        success:res=>{
          console.log(res);
        }
      })
      usersDaily.add({
        data:{
             _id:list[e.currentTarget.dataset.index - 0]._id,
              Daily:true,
              tag: list[e.currentTarget.dataset.index - 0].tag,
              tagscolor: list[e.currentTarget.dataset.index - 0].tagscolor,
              imgPath: list[e.currentTarget.dataset.index - 0].imgPath,
              fileID:list[e.currentTarget.dataset.index - 0].fileID,
              detail: list[e.currentTarget.dataset.index - 0].detail,
              dimension: list[e.currentTarget.dataset.index - 0].dimension,
              // index:data.listEvent.index,
              date: list[e.currentTarget.dataset.index - 0].date,
              time: list[e.currentTarget.dataset.index - 0].time,
              hasdone: false
        }
      })
    }
    else{
      usersDaily.doc(list[e.currentTarget.dataset.index - 0]._id).remove({
        success:res=>{
          console.log(res);
          console.log(123456789);
          
        }
      })
      usres.add({
        data:{
              _id:list[e.currentTarget.dataset.index - 0]._id,
              Daily:false,
              tag: list[e.currentTarget.dataset.index - 0].tag,
              tagscolor: list[e.currentTarget.dataset.index - 0].tagscolor,
              imgPath: list[e.currentTarget.dataset.index - 0].imgPath,
              fileID:list[e.currentTarget.dataset.index - 0].fileID,
              detail: list[e.currentTarget.dataset.index - 0].detail,
              dimension: list[e.currentTarget.dataset.index - 0].dimension,
              // index:data.listEvent.index,
              date: list[e.currentTarget.dataset.index - 0].date,
              time: list[e.currentTarget.dataset.index - 0].time,
              hasdone: false
        }
      })
    }
    this.setData({
      listEvent:list
    })
    
  }
})