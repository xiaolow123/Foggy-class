// pages/message/message.js
Page({
  change () {
    this.setData({
      now: 0, state: '全部'
    })
  },
  change1 () {
    this.setData({
      now: 1, state: '课件'
    })
  },
  change2 () {
    this.setData({
      now: 2, state: '试卷'
    })
  },
  change3 () {
    this.setData({
      now: 3, state: '公告'
    })
  },
  read (event) {
    let app = getApp()
    let _this = this
    let currentmessage = this.data.messages[event.currentTarget.dataset.index]
    const db = wx.cloud.database()
    const _ = db.command
    const messages = db.collection('messages')
    messages.where({
      "_id": currentmessage._id
    }).get().then((res) => {
      if (res.data[0].readstudents.indexOf(app.openid) === -1) {
        messages.where({
          "_id": currentmessage._id
        }).update({
          data: {readstudents:_.push(app.openid)}
        })
      }
    })
    if (currentmessage.type === '课件') {
      wx.cloud.downloadFile({
        fileID: currentmessage.content.fileid,
        success: res => {
          // get temp file path
          wx.openDocument({
            filePath: res.tempFilePath
          })  
        },
        fail: err => {
          // handle error
        }
      })
    } else if(currentmessage.type === '试卷'){
      if ((currentmessage.ms - Date.now() + currentmessage.now) <= 0) {
        wx.showToast({
          title: '试卷已过期',
          icon: 'none'
        })
        return
      }
      wx.navigateTo({
        url: `../test/test?index=${event.currentTarget.dataset.index}`,
      })
    } else {
      wx.navigateTo({
        url: `../noticepage/noticepage?index=${event.currentTarget.dataset.index}`,
      })
    }
  },
  /**
   * 页面的初始数据
   */
  data: {
    now:0,
    state:'全部'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let app = getApp()
    let _this = this
    const db = wx.cloud.database()
    const _ = db.command
    const messages = db.collection('messages')
    const Messages = app.data.messages 
    for (let i = 0; i < Messages.length; i++) {
      messages.where({
        "_id": Messages[i]._id
      }).get().then((res) => {
        if (res.data[0].readstudents.indexOf(app.openid) === -1) {
          Messages[i].ifread = false
        }else {
          Messages[i].ifread = true
        }
        _this.setData({
          messages: Messages
        })
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