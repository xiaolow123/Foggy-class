// pages/create/create.js
import datetransfer from '../../utils/date.js'
Page({
  complete () {
    let _this = this
    const db = wx.cloud.database()
    const courses = db.collection('courses')
    if (!_this.data.coursename || !_this.data.classarray.length) {
      wx.showToast({
        title: '课程名或班级不能为空',
        icon: 'none'
      })
      return
    }
    courses.add({
      data: {
        coursename: _this.data.coursename,
        classarray: _this.data.classarray,
        invitecode: Math.random().toString(16).substring(2, 8),
        date: datetransfer(new Date())
      }
    }).then((res) => {
      wx.showToast({
        title: '创建课程成功',
        icon: 'success',
        success() {
          setTimeout(wx.navigateBack, 2000)
          _this.onLoad()
        }
      })
    }).catch((err) => {
       this.complete()
    })
  },
  coursename (e) {
    this.setData({
      coursename : e.detail.value
    })  
  },
  classname (e) {
    this.data.classarray[e.currentTarget.dataset.index] = {
      classname: e.detail.value,
      classmates: []
    }
    this.setData({
      classarray: this.data.classarray
    })
  },
  appendclass () {
    this.data.classarray.push({})
    let _this = this
    this.setData({
      classarray:_this.data.classarray
    })
  },
  deleteitem (event) {
    this.data.classarray.splice(event.currentTarget.dataset.index, 1) 
    let _this = this
    this.setData({
      classarray: _this.data.classarray
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    classarray:[{}]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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