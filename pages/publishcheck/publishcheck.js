// pages/publishcheck/publishcheck.js
import datetransfer from '../../utils/date'
Page({
  noticechange (e) {
    this.setData({
      content: e.detail.value
    })
  },
  timechange (e) {
     console.log(e.detail.value)
    this.setData({
      ms: e.detail.value * 60 * 1000
    })
  },
  namechange (e) {
    this.setData({
      contentname: e.detail.value
    })
  },
  publish () {
    if (!this.data.contentname || !this.data.content) {
      wx.showToast({
        title: '名称或公告内容不能为空',
        icon: 'none'
      })
      return
    }
    let _this = this
    let app = getApp()
    const db = wx.cloud.database()
    const messages = db.collection('messages')
    let newmessage = {
      date: datetransfer(new Date()),
      type: _this.data.type,
      content: _this.data.content,
      ifread: false,
      name: _this.data.contentname,
      classcode: app.classcode,
      classname: app.classname,
      teacher: app.name,
      readstudents: [],
      ms: _this.data.ms,
      now: Date.now()
    }
    messages.add({
      data: newmessage
    }).then((res) => {
      newmessage._id = res._id
      app.data.messages.push(newmessage)
      wx.showToast({
        title: '发布成功',
        success () {
          wx.navigateBack({
            complete: (res) => {},
          })
        }
      })
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    name: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    if (options.type === '公告') {
      this.setData({
        classname: app.classname,
        type:options.type,
        contentname: '',
        content: ''
      })
      return
    }
    this.setData({
      contentname: app.selectcontent.name,
      content: app.selectcontent,
      classname: app.classname,
      type:options.type
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