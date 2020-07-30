// pages/userInfo/userInfo.js
Page({
  save () {
    let app = getApp()
    let _this = this
    const db = wx.cloud.database()
    const users = db.collection('users')
    var reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/
    app.name = this.data.name
    app.email = this.data.email
    app.indent = this.data.indent
    if (this.data.indent !== '学生' && this.data.indent !== '老师') {
      wx.showToast({
        title: '身份出错',
        icon: 'none'
      })
      return 
    }
    if (!reg.test(this.data.email)) {
      wx.showToast({
        title: '邮箱格式错误',
        icon: 'none'
      })
      return
    }
    users.where({
      "_openid": app.openid
    }).update({
      data: {
        name: _this.data.name,
        indent: _this.data.indent,
        email: _this.data.email
      }
    }).then(() => {
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        success() {
          setTimeout(wx.navigateBack, 2000)
        }
      })
    })
  },
  namechange (e) {
    this.setData({
      name: e.detail.value
    })
  },
  indentchange(e) {
    this.setData({
      indent: e.detail.value
    })
  },
  emailchange(e) {
    this.setData({
      email: e.detail.value
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
    var app = getApp()
    this.setData({
      name: app.name,
      avatarurl: app.avatarurl,
      indent: app.indent,
      email: app.email
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