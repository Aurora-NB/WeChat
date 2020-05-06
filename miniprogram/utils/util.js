const formatTime = date => {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()
  if(month <10){
    month = '0' + month
  }if(day <10){
    day = '0' + day
  }
  return year + '-' + month + '-' + day
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime
}
