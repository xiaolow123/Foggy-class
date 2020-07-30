// pages/test/test.js
function fillzero (num) {
  return num / 10 < 1 ? '0' + num : num 
}
Page({
  answerchange (e) {
    let answers = this.data.answers
    answers[e.currentTarget.dataset.index] = e.detail.value
    this.setData({
      answers: answers
    })
   },
   complete () {
     let _this = this
     const db = wx.cloud.database()
     const messages = db.collection('messages')
     messages.where({
       "_id": _this.data.message._id
     }).update({
       data: {
         answers: _this.data.answers
       }
     })
   },
  /**
   * 页面的初始数据
   */
  data: {
    alphas: ['A','B','C','D','E','F','G'],
    answers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    this.setData({
      message: app.data.messages[options.index]
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this
    this.data.interval = setInterval(function(){
      if (_this.data.message.ms - Date.now() + _this.data.message.now <= 0) {
         clearInterval(_this.data.interval)
      }
      let now = new Date(_this.data.message.ms - Date.now() + _this.data.message.now)
      _this.setData({
        lefttime: fillzero(now.getHours() - 8) + ':' + fillzero(now.getMinutes()) + ':' + fillzero(now.getSeconds())
      })
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})