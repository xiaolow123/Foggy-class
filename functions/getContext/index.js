// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let {OPENID,APPID,UNIONID} = wxContext
  return {
    sum: event.a +event.b,
    OPENID,
    APPID,
    UNIONID
  }
}