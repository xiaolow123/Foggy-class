// pages/mine/mine.js
Page({
  gotopaper() {
    wx.navigateTo({
      url: '../store/store?title=我的试卷库',
    })
  },
  gotocourseware() {
    wx.navigateTo({
      url: '../store/store?title=我的课件库',
    })
  },
  edit () {
    wx.navigateTo({
      url: '../userInfo/userInfo',
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    username:'',
    userimage:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    this.setData({
      username: app.name,
      userimage: app.avatarurl
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