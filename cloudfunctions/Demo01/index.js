// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
var db=wx.cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  // ...
  db.collection("test1").add({
    sum:sum
  })
  return {
    sum: event.a + event.b
  }
} 