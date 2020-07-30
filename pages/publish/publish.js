// pages/publish/publish.js
Page({
  gotocheck (e) {
    let app = getApp()
    app.selectcontent = this.data.content[e.currentTarget.dataset.index]
    wx.navigateTo({
      url: `../publishcheck/publishcheck?type=${this.data.type}`,
    })
  },
  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    wx.setNavigationBarTitle({
      title: options.title
    })
    this.setData({
      type: options.type
    })
    if (options.type === '课件') {
      this.setData({
        content: app.myppts
      })
    }else if(options.type === '试卷') {
      this.setData({
        content: app.mytests
      })
    }
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