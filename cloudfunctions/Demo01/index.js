// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
// 云函数入口函数
const db=cloud.database()
exports.main = (event, context) => {
  // ...
  db.collection("test2").add({
    data: {
      // _id: 'todo-identifiant-aleatoire', // 可选自定义 _id，在此处场景下用数据库自动分配的就可以了
      description: "learn cloud database",
      due: new Date("2018-09-01"),
      tags: [
        "cloud",
        "database"
      ],
      // 为待办事项添加一个地理位置（113°E，23°N）
      location: new db.Geo.Point(113, 23),
      done: false
    },
    success: function(res) {
      // res 是一个对象，其中有 _id 字段标记刚创建的记录的 id
      console.log(res)
    }
    
  })
  
  return {
    sum: event.a + event.b
  }
} 