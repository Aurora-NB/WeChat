const db = wx.cloud.database()
const phtotos = db.collection('phtotos')
const usres = db.collection('users')
const usersDaily = db.collection('usersDaily')
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
    tags: [''],
    imgPath: "../../image/download1.png",
    tagsindex: 0,
    baioqianvalue: '',
    tapexist: [false, false, false],
    tagscolor: ['#fa5a5a','#f0d264','#82c8a0','#7fccde','#6698cb','#cb99c5'],
    tagsmirrorcolor: [],
    colorindex: 0,
    datasrcs:["../../image/data (1).png","../../image/data.png"],
    dataindex:0

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var tagscolor = this.data.tagscolor
    tagscolor.sort(function () {
      return Math.random() - 0.5;
    });
    var tagsmirrorcolor = this.data.tagsmirrorcolor
    if (!tagsmirrorcolor[0])
      tagsmirrorcolor.push(tagscolor[0])
    var listEvent = this.data.listEvent;
    listEvent.index = options.index - 0 + 1;
    this.setData({
      tagsmirrorcolor: tagsmirrorcolor,
      listEvent: listEvent,
      baioqianvalue: '',
      biaoqianplacehold:''
    })
  },

  // 页面数据提交的函数
  formSubmit: function (e) {
    var data = this.data
    console.log(e);
    var n = 1;
    setTimeout(function () {
      //要延时执行的代码
      if (data.listEvent.dimension === '' || data.listEvent.detail === '') {
        n = 0;
      }
      if (n === 1) {
        console.log(1233534351);
        
        wx.showToast({
          icon: 'none',
          title: '提交成功',
          duration: 2000
        });
        var tags = data.tags;
        var tagsmirrorcolor = data.tagsmirrorcolor
        while (tags.length < 3) {
          tags.push('')
        }
        while (tagsmirrorcolor.length < 3) {
          tagsmirrorcolor.push('')
        }
        var time = util.formatTime(new Date());
        var tags0 = data.tags[0]
        var tags1 = data.tags[1]
        var tags2 = data.tags[2]
        var index = data.listEvent.index - 0
        var dimension = data.listEvent.dimension
        var detail = data.listEvent.detail
        var imgPath = data.listEvent.imgPath
        var tagsmirrorcolor1 = data.tagsmirrorcolor[0]
        var tagsmirrorcolor2 = data.tagsmirrorcolor[1]
        var tagsmirrorcolor3 = data.tagsmirrorcolor[2]
        var fileID = data.fileID
        var date = new Date().getTime()
        console.log(tagsmirrorcolor3);
        setTimeout(function () {
          if(data. dataindex===0){
            console.log(12131);
            
          usres.add({
            data: {
              Daily:false,
              tag: tags,
              tagscolor: tagsmirrorcolor,
              imgPath: data.listEvent.imgPath,
              fileID: data.fileID,
              detail: detail,
              dimension: dimension,
              // index:data.listEvent.index,
              date: date,
              time: time,
              hasdone: false,
              now:true
            },
            success: res => {
              console.log(res);
            }
          })
        }
        else if(data. dataindex===1){
          usersDaily.add({
            data: {
              Daily:true,
              tag: tags,
              tagscolor: tagsmirrorcolor,
              imgPath: data.listEvent.imgPath,
              fileID: data.fileID,
              detail: detail,
              dimension: dimension,
              // index:data.listEvent.index,
              date: date,
              time: time,
              hasdone: false
            },
            success: res => {
              console.log(res);
            }
          })
       }
          //要延时执行的代码
          wx.reLaunch({
            url: '../theFirstPage/theFirstPage?tags0=' + tags0 + '&tags1=' + tags1 + '&tags2=' + tags2 + '&index=' + index + '&dimension=' + detail + '&header=' + dimension + ' &tagsmirrorcolor1=' + tagsmirrorcolor1 + '&tagsmirrorcolor2=' + tagsmirrorcolor2 + '&tagsmirrorcolor3=' + tagsmirrorcolor3 + '&imgPath=' + imgPath + '&fileID=' + fileID + '&type=newEvent' + '&time=' + time,
          })
        }, 1000)
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
console.log(e);

  },
  //图片简单的上传操作
  photoload(e) {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType: ['album'],
      success: res => {
        //res.tempFilePaths 返回图片本地文件路径列表
        var tempFilePaths = res.tempFilePaths;
        var day1 = new Date();
        var endimgpath = tempFilePaths[0].match(/\.*?(\.\w+)$/)
        console.log(endimgpath[1]);
        wx.showLoading({
          title: '上传中',
          mask: true
        })
        setTimeout(function () {
          wx.hideLoading()
        }, 2500)
        wx.cloud.uploadFile({
          cloudPath: Math.floor(Math.random() * 100000) + day1.getTime() + endimgpath[1],
          filePath: tempFilePaths[0],
          success: res => {
            console.log(res)
            wx.cloud.getTempFileURL({
              fileList: [{
                fileID: res.fileID,
              }]
            }).then(res => {
              wx.showToast({
                icon: 'none',
                title: '上传成功',
                duration: 2000
              });
              that.setData({
                imgPath: res.fileList[0].tempFileURL,
                fileID: res.fileList[0].fileID
              })
              // get temp file URL
              console.log(res.fileList)
            })
          }
        })
      }

    });
  },
  //输入得到标签的样式
  biaoqianblur(e) {
    console.log(e);
    if(e.detail.value!=='')
    {
      var tags=this.data.tags
      if(this.data.tags.length!==1){
      tags.push(e.detail.value)
      console.log(tags);
      }
      else
      {
        tags[0]=e.detail.value;
      }
      this.setData({
        biaoqianplacehold: '标签输入',
        tags:tags
      })
    }
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
      biaoqianplacehold: '标签输入',
      tagsmirrorcolor: tagsmirrorcolor
    })
  },
  // 当标签的光标消失
  tapsblur(e) {
    var tags = this.data.tags
    var tagscolor = this.data.tagscolor
    var tagsmirrorcolor = this.data.tagsmirrorcolor
    tagscolor.sort(function () {
      return Math.random() - 0.5;
    });
    var n = 0;
    for (var i = 0; i < tagsmirrorcolor.length && n < tagscolor.length; i++) {
      if (tagscolor[n] === tagsmirrorcolor[i]) {
        n++
        i = 0
      }
    }
    if (tags.length < 3) {
      tagsmirrorcolor.push(tagscolor[n])
      tags.push(e.detail.value)
      this.setData({
        tags: tags,
        baioqianvalue: '',
        tagscolor: tagscolor,
        tagsmirrorcolor: tagsmirrorcolor,
        biaoqianplacehold:'输入标签'
      })
    }
  },
  datachange(e){
    console.log(e);
    
    var dataindex=this.data.dataindex;
    if(dataindex===0)
    {
      dataindex=1;
    }
    else if(dataindex===1)
    {
      dataindex=0;
    }
    this.setData({
      dataindex:dataindex
    })
  }
})