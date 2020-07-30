// pages/classmanage/classmanage.js
Page({
  publishnotice () {
    wx.navigateTo({
      url: '../publishcheck/publishcheck?type=公告',
    })
  },
  publishtest () {
    wx.navigateTo({
      url: '../publish/publish?type=试卷&title=发布试卷',
    })
  },
  publishppt () {
    wx.navigateTo({
      url: '../publish/publish?type=课件&title=发布课件',
    })
  },
  showclassmates () {
    let app = getApp()
    app.classmates = this.data.classmates
    wx.navigateTo({
      url: '../classmates/classmates',
    })
  },
  focusitem (e) {
    this.setData({
      focus: e.currentTarget.dataset.index,
      state: e.currentTarget.dataset.state
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    journalarray: ['全部','课件','试卷','公告'],
    focus: 0,
    classmates: [],
    state: '全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this
    let app = getApp()
    const db= wx.cloud.database()
    const courses = db.collection('courses')
    const messages = db.collection('messages')
    const users = db.collection('users')
    app.classcode = options.invitecode + options.index //班级邀请码，在publishcheck页面中使用，用于发布消息。
    wx.setNavigationBarTitle({
      title: app.classname
    })
    this.setData({
      classname: app.classname,
      invitecode: options.invitecode,
      index: options.index
    })
    courses.where({
      "invitecode": _this.data.invitecode.substring(0,6)
    }).get().then((res) => {
      let Classmates = res.data[0].classarray[_this.data.index].classmates
      Classmates.unshift(res.data[0]._openid)
      for (let i = 0; i < Classmates.length; i++) {
        users.where({
          "_openid": Classmates[i]
        }).get().then((res) => {
          let classmates = _this.data.classmates
          classmates.push(res.data[0])
          _this.setData({
            classmates
          })
        })
      }
    })
    messages.where({
      "_openid": app.openid
    }).get().then((res) => {
      _this.setData({
        messages: res.data
      })
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