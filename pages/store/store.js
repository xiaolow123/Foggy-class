// pages/store/store.js
import datetransfer from '../../utils/date.js'
Page({
  openppt (e) {
    wx.cloud.downloadFile({
      fileID: e.currentTarget.dataset.fileid,
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
  },
  submitppt () {
    const ppts = wx.cloud.database().collection('ppts')
    wx.chooseMessageFile({
      count: 10,
      type: 'file',
      success (res) {
        let files = res.tempFiles
        for (let i = 0; i < files.length; i++) {
          if (files[i].path.indexOf('pptx') === -1) {
            continue
          }
          wx.cloud.uploadFile({
            cloudPath: files[i].name,
            filePath: files[i].path,
            success (res) {
              ppts.add({
                data: {
                  name: files[i].name,
                  fileid: res.fileID,
                  date: datetransfer(new Date())
                }
              }).then((res) => {
                wx.showToast({
                  title: '上传课件成功',
                  icon: 'success',
                  success() {
                    setTimeout(wx.navigateBack, 2000)
                  }
                })
              }).catch( (err) => {
                console.log(err)
              })
            }
          })
        }
      }
    })
  },
  createpaper () {
    wx.navigateTo({
      url: '../createpaper/createpaper',
    })
  },
  change1() {
    this.setData({
      now: 1, state: 'submit'
    })
  },
  change2() {
    this.setData({
      now: 2, state: 'receive'
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    now:1,
    mysubmit: [],
    title: '',
    state: 'submit',
    mysubmitppt: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let myreceiveppts = [],myreceivetests = []
    const db = wx.cloud.database()
    const tests = db.collection('tests')
    const ppts = db.collection('ppts')
    let _this = this
    let app = getApp()
    const messages = app.data.messages // 只有messages需通过app.data获取，因为它需要先初始化为一个数组，其他全局变量
                                       // 只需通过app.xx获取即可，在app.js中也给出了这些全局变量，仅为了防止重复定义。
    wx.setNavigationBarTitle({
      title: options.title
    })
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].type === '课件') {
        myreceiveppts.push(messages[i])
      }else if(messages[i].type === '试卷') {
        myreceivetests.push(messages[i])
      }
    }
    this.setData({
      title: options.title,
      myreceiveppts: myreceiveppts,
      myreceivetests: myreceivetests
    })
    tests.where({
      "_openid": app.openid
    }).get({
      success(res) {
        _this.setData({
          mysubmit: res.data
        })
      }
    })
    ppts.where({
      "_openid": app.openid
    }).get({
      success(res) {
        _this.setData({
          mysubmitppt: res.data
        })
      }
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
    this.setData({
      mysubmit: [],
      mysubmitppt: []
    })
    let myreceiveppts = [],myreceivetests = []
    const db = wx.cloud.database()
    const tests = db.collection('tests')
    const ppts = db.collection('ppts')
    let _this = this
    let app = getApp()
    const messages = app.data.messages // 只有messages需通过app.data获取，因为它需要先初始化为一个数组，其他全局变量
                                       // 只需通过app.xx获取即可，在app.js中也给出了这些全局变量，仅为了防止重复定义。
    for (let i = 0; i < messages.length; i++) {
      if (messages[i].type === '课件') {
        myreceiveppts.push(messages[i])
      }else if(messages[i].type === '试卷') {
        myreceivetests.push(messages[i])
      }
    }
    this.setData({
      myreceiveppts: myreceiveppts,
      myreceivetests: myreceivetests
    })
    tests.where({
      "_openid": app.openid
    }).get({
      success(res) {
        _this.setData({
          mysubmit: res.data
        })
      }
    })
    ppts.where({
      "_openid": app.openid
    }).get({
      success(res) {
        _this.setData({
          mysubmitppt: res.data
        })
      }
    })
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