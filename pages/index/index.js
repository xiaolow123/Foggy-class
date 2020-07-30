// pages/index/index.js
import datetransfer from '../../utils/date.js'
Page({
  invitecodechange (e) {
    this.setData({
      invitecode: e.detail.value
    })
  },
  save () {
    wx.chooseMessageFile({
      count: 10,
      success(res) {
        wx.openDocument({
          filePath: res.tempFiles[0].path
        })
      }
    })
  },
  gotocourseware () {
    wx.navigateTo({
      url: '../store/store?title=我的课件库',
    })
  },
  gotopaper() {
    wx.navigateTo({
      url: '../store/store?title=我的试卷库',
    })
  },
  complete () {
    let _this = this
    let app = getApp()
    let invitecode = _this.data.invitecode
    const query = wx.createSelectorQuery()
    const db = wx.cloud.database()
    const _ = db.command
    const courses = db.collection('courses')
    const users = db.collection('users')
    query.select('.join-input').fields({
      properties:['value']
    },function (res) {
      if (!res.value) {
        wx.showToast({
          title: '请输入内容',
          icon: 'none'
        })
        return
      }
    }).exec()
    courses.where({
      "invitecode": invitecode.substring(0,6)
    }).get().then((res) => {
      if (res.data.length === 0) {
        wx.showToast({
          title: '请输入正确的邀请码',
          icon: 'none'
        })
      }
      courses.where({
        "invitecode": invitecode.substring(0,6)   
      }).get().then((res) => {
        if (res.data[0].classarray[invitecode.substring(6)].classmates.indexOf(app.openid) === -1) {
          courses.where({
            "invitecode": invitecode.substring(0,6)   
          }).update({
            data: {
              [`classarray.${_this.data.invitecode.substring(6)}.classmates`]:_.push(app.openid)
            }
          })
          users.where({
            "_openid": app.openid
          }).update({
            data: {
              listenclass: _.push(invitecode)
            }
          })
        }
      })
    }).catch((err) => {
      console.log(err)
    })
  },
  join () {
    this.setData({
      ifjoin:true
    })
  },
  hidejoin () {
    this.setData({
      ifjoin: false,
      showModal: false
    })
  },
  change1 () {
    this.setData({
      now:1,state:'teach'
    })
  },
  change2 () {
    this.setData({
      now: 2, state: 'listen'
    })
  },
  show () {
    this.setData({
      showModal: true
    })
  },
  cancel () {
    this.setData({
      showModal: false
    })
  },
  createPaper () {
    wx.navigateTo({
      url: '../createpaper/createpaper',
    })
    this.cancel()
  },
  createClass () {
    wx.navigateTo({
      url: '../create/create',
    })
    this.cancel()
  },
  /**
   * 页面的初始数据
   */
  data: {
    swiperUrl: ['../../images/request.jpg', '../../images/index.jpg'], 
    now: 2, 
    teachClass: [],
    state: 'listen',
    showModal:false,
    ifjoin:false,
    invitecode:'',
    listenClass: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let openid,listenclass
    let _this = this
    let app = getApp()
    wx.cloud.init({
      env: 'xiaolow123-h69e7'
    })
    wx.cloud.callFunction({
      name: 'getContext',
      success(res) {
        openid = res.result.OPENID
        app.openid = openid
      }
    })
    const db = wx.cloud.database()
    const users = db.collection('users')
    const courses = db.collection('courses')
    const ppts = db.collection('ppts')
    const tests = db.collection('tests')
    users.where({
      "_openid": openid
    }).get().then((res) => {
      if (res.data.length === 0) {
        wx.getSetting({
          success(res) {
            if (res.authSetting['scope.userInfo']) {
              wx.getUserInfo({
                success(res) {
                    app.name = res.userInfo.nickName,
                    app.avatarurl = res.userInfo.avatarUrl
                    users.add({
                      data: {
                        name: app.data.name,
                        avatarurl: app.data.avatarurl,
                        date: datetransfer(new Date()),
                        indent: '',
                        email: '',
                        listenclass: []
                      }
                    }).then((res) => {

                    })
                }
              })
            } else {
              wx.authorize({
                scope: 'scope.userInfo',
              }).then((res) => {
                wx.getUserInfo({
                  success(res) {
                    app.name = res.userInfo.nickName,
                    app.avatarurl = res.userInfo.avatarUrl
                  }
                })
              })
            }
          }
        })
      } else {
        app.name = res.data[0].name,
        app.avatarurl = res.data[0].avatarurl
        app.indent = res.data[0].indent
        app.email = res.data[0].email
      }
    }).catch((err) => {
    })
    courses.where({
      "_openid": openid
    }).get().then((res) => {
      _this.setData({
        teachClass: res.data
      })
    })
    ppts.where({
      "_openid":openid
    }).get().then((res) => {
      app.myppts = res.data
    })
    tests.where({
      "_openid":openid
    }).get().then((res) => {
      app.mytests = res.data
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
    let app = getApp()
    let _this = this
    const db = wx.cloud.database()
    const users = db.collection('users')
    const courses = db.collection('courses')
    const messages = db.collection('messages')
    this.setData({
      listenClass: []
    })
    app.data.messages = []
    users.where({
      "_openid": app.openid
    }).get().then((res) => {
      if (!res.data.length) {
        return
      }
      let listenclass = res.data[0].listenclass
      for (let i = 0; i < listenclass.length; i++) {
        courses.where({
          "invitecode": listenclass[i].substring(0,6)
        }).get().then((res) => {
          if (!res.data.length) {
            return
          }
          let listenClass = _this.data.listenClass
          listenClass.push({
            coursename: res.data[0].coursename,
            date: res.data[0].date
          })
          _this.setData({
            listenClass
          })
        })
        messages.where({
          "classcode": listenclass[i]
        }).get().then((res) => {
          let data = res.data
          for (let i = 0; i < data.length; i++) {
            app.data.messages.push(res.data[i])
          }
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