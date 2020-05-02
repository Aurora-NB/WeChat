// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
exports.main = (event, context) => {
  // ...

  var sum =1+1
  console.log(true);
  
  return {
    sum: event.a + event.b
  }
} 