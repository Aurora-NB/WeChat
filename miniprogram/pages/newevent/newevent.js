const db = wx.cloud.database()
const phtotos=db.collection('phtotos');
var util = require('../../utils/util.js');
Page({
  /**
   * 页面的初始数据
   */
  data: {
    listEvent: {
      dimension: '',
      index: 0,
      hasdone: false,
      time: "",
      tag: ['', '', ''],
      detail: '',
    },
    tags: [],
    imgPath: "../../image/download1.png",
    tagsindex: 0,
    baioqianvalue: '',
    tapexist: [false, false, false],
    tagscolor: ['rgb(39,106,132)','rab(0,49,79)','rgb(250,227,123)','rgb(113,150,159)','rgb(255,150,128)','rgb(254,67,101)','rgb(229,187,129)','rgb(205,179,128)','rgb(140, 210, 225)','rgb(13, 29, 40)','rgb(247, 184, 69)','rgb(154, 196, 219)','rgb(174, 50, 81)','rgb(221, 178, 188)','rgb(171, 163, 171)','rgb(11, 62, 102)','rgb(219, 175, 167)','rgb(209, 230, 166)','rgb(204, 171, 219)','rgb(118, 204, 232)','rgb(213, 166, 221)','rgb(197, 230, 241)','rgb(196, 162, 119)','rgb(235, 214, 160)','rgb(201, 188, 201)','rgb(120, 78, 62)','rgb(219, 111, 49)','rgb(254, 201, 47)','rgb(28, 150, 215)','rgb(130, 199, 137)'],
    tagsmirrorcolor: [],
    colorindex: 0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var listEvent = this.data.listEvent;
    listEvent.index = options.index - 0 + 1;
    this.setData({
      listEvent: listEvent,
      baioqianvalue: ''
    })
  },

  // 页面数据提交的函数
  formSubmit: function (e) {
    var data=this.data
    console.log(e);
    var n = 1;
    
    setTimeout(function () {
      //要延时执行的代码
      if (data.listEvent.dimension === '' || data.listEvent.detail === '') {
        n = 0;
      }
      if (n === 1) {
        wx.showToast({
          icon: 'none',
          title: '提交成功',
          duration: 2000
        });
        var time = util.formatTime(new Date());
        var tags0 = data.tags[0]
        var tags1 = data.tags[1]
        var tags2 = data.tags[2]
        var index = data.listEvent.index - 0
        var dimension = data.listEvent.dimension
        var detail = data.listEvent.detail
        var imgPath = data.listEvent.imgPath
        var  tagsmirrorcolor1=data. tagsmirrorcolor[0]
        var  tagsmirrorcolor2=data. tagsmirrorcolor[1]
        var  tagsmirrorcolor3=data. tagsmirrorcolor[2]
        console.log(tagsmirrorcolor3);
        
        setTimeout(function () {
          //要延时执行的代码
          wx.reLaunch({

            url: '../theFirstPage/theFirstPage?tags0=' + tags0 + '&tags1=' + tags1 + '&tags2=' + tags2 + '&index=' + index + '&dimension=' + dimension +'&detail='+detail+'&tagsmirrorcolor1='+tagsmirrorcolor1+'&tagsmirrorcolor2='+tagsmirrorcolor2+'&tagsmirrorcolor3='+tagsmirrorcolor3+ '&imgPath=' + imgPath + '&type=newEvent' + '&time=' + time,
          })
        }, 500)
      } else {
        wx.showToast({
          icon: 'none',
          title: '未添加标题或事件请重新添加',
          duration: 2000
        });
      }
    }, 20)

  },
  // 当输入事件的事件的光标消失时的事件
  whenblur(e) {
    var listEvent = this.data.listEvent
    listEvent.detail = e.detail.value
    this.setData({
      listEvent: listEvent
    });

  },
  //标签光标消失的事件
  biaoqian(e) {
    console.log(e)
    var tags = this.data.tags
    var tagscolor = this.data.tagscolor
    tagscolor.sort(function () {
      return Math.random() - 0.5;
    });
    if (tags.length < 3) {
      tags.push(e.detail.value);
      this.setData({
        tags: tags,
        baioqianvalue: '',
        tagscolor: tagscolor
      })
    }
  },
  //图片简单的上传操作
  photoload(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: res=> {
        //res.tempFilePaths 返回图片本地文件路径列表
        var tempFilePaths = res.tempFilePaths;
        var  day1=new Date();
        var endimgpath= tempFilePaths[0].match(/\.*?(\.\w+)$/)
        console.log(endimgpath[1]);
        wx.cloud.uploadFile({
          cloudPath:Math.floor( Math.random()*100000)+day1.toLocaleTimeString()+endimgpath[1],
          filePath:tempFilePaths[0],
          success:res=>{
            console.log(res)
            phtotos.add(
              {
                data:{
                  fileID:res.fileID
                }
              }
            )
              wx.showToast({
                icon: 'none',
                title: '上传成功',
                duration: 2000
              });
              that.setData({
                imgPath: tempFilePaths[0],
                fileId:res.fileID
              })
          }
        })
      },
      fail:console.error
      
    });
  },
  //输入得到标签的样式
  biaoqianblur(e) {
    var tags = this.data.tags
    var value = e.detail.value
    tags[e.target.dataset.index] = value;
    this.setData({
      tags: tags
    });
  },
  headerblur(e) {
    var listEvent = this.data.listEvent;
    listEvent.dimension = e.detail.value;
    this.setData({
      listEvent: listEvent
    })
  },
  // 当标签提交的样式
  // biaoqianconfim(e) {
  //  console.log(e)
  //   var tags = this.data.tags
  //   var tagscolor = this.data.tagscolor
  //   var tagsmirrorcolor = this.data.tagsmirrorcolor
  //   tagscolor.sort(function () {
  //     return Math.random() - 0.5;
  //   });
  //   if (tags.length < 3) {
  //     tagsmirrorcolor.push(tagscolor[tags.length])
  //     tags.push(e.detail.value)
  //     this.setData({
  //       tags: tags,
  //       baioqianvalue: '',
  //       tagscolor: tagscolor,
  //       tagsmirrorcolor: tagsmirrorcolor
  //     })
  //   }
  // },
  // 删除标签的函数
  deletetap(e) {
    console.log(e)
    var tags = this.data.tags
    var tagsmirrorcolor = this.data.tagsmirrorcolor
    tagsmirrorcolor.splice(e.target.dataset.index, 1)
    tags.splice(e.target.dataset.index, 1)
    this.setData({
      tags: tags,
      tagsmirrorcolor: tagsmirrorcolor
    })
  },
  // 当标签的光标消失
  tapsblur(e){
    var tags = this.data.tags
    var tagscolor = this.data.tagscolor
    var tagsmirrorcolor = this.data.tagsmirrorcolor
    tagscolor.sort(function () {
      return Math.random() - 0.5;
    });
    var n=0;
    for(var  i=0;i<tagsmirrorcolor.length&&n<tagscolor.length;i++)
    {
      if(tagscolor[n]===tagsmirrorcolor[i])
      {
        n++
        i=0
      }
    }
    if (tags.length < 3) {
      tagsmirrorcolor.push(tagscolor[n])
      tags.push(e.detail.value)
      this.setData({
        tags: tags,
        baioqianvalue: '',
        tagscolor: tagscolor,
        tagsmirrorcolor: tagsmirrorcolor
      })
    }
  }
})