// pages/createpaper/createpaper.js
import Title from '../../utils/title.js'
import datetransfer from '../../utils/date.js'
Page({
  complete () {
    if (this.data.name === '') {
      wx.showToast({
        title: '请输入试卷名称',
        icon: 'none'
      })
      return
    }
    if (this.data.titles.length === 0) {
      wx.showToast({
        title: '请在左上角点击+添加题目',
        icon: 'none'
      })
      return
    }
    let test = {
      name: this.data.name,
      titles: this.data.titles,
      date: datetransfer(new Date())
    }
    wx.cloud.init({
      env: 'xiaolow123-h69e7'
    })
    const db = wx.cloud.database()
    const tests = db.collection('tests')
    tests.add({
      data: test
    }).then((res) => {
      wx.showToast({
        title: '创建试卷成功',
        icon: 'success',
        success () {
          setTimeout(wx.navigateBack,2000)
        }
      })
    }).catch((err) => {

    })
  },
  namechange (e) {
    this.setData({
     name: e.detail.value
    })
  },
  answerchange (e) {
    this.setData({
      ['current.answer']: e.detail.value
    })
  },
  chooseTitle (e) {
    this.setData({
      current: this.data.titles[e.currentTarget.dataset.index],
      currentIndex: e.currentTarget.dataset.index
    })
  },
  appendoption () {
    if (this.data.current.options.length < 7) {
      this.data.current.options.push('')
    }
    this.setData({
      current: this.data.current
    })
  },
  discchange (e) {
    this.setData({
      ['current.disc'] : e.detail.value
    })
  },
  inputchange (e) {
    this.setData({
      [`current.options[${e.currentTarget.dataset.index}]`]: e.detail.value
    })
  },
  delete (event) {
    this.data.titles.splice(event.currentTarget.dataset.index, 1)
    this.setData({
      titles: this.data.titles
    })
  },
  cancel () {
    this.setData({
      showModal: false
    })
  },
  createsingleselect () {
    this.cancel()
    if (this.data.titles.length < 15) {
      this.data.titles.push(new Title('单选题'))
    }
    let length = this.data.titles.length - 1
    this.setData({
      titles: this.data.titles,
      current: this.data.titles[length],
      currentIndex: length
    })
  },
  createmultiselect() {
    if (this.data.titles.length < 15) {
      this.data.titles.push(new Title('多选题'))
    }
    let length = this.data.titles.length - 1
    this.setData({
      showModal: false,
      titles: this.data.titles,
      current: this.data.titles[length],
      currentIndex: length
    })
  },
  createsimpleanswer() {
    if (this.data.titles.length < 15) {
      this.data.titles.push(new Title('简答题'))
    }
    let length = this.data.titles.length - 1
    this.setData({
      showModal: false,
      titles: this.data.titles,
      current: this.data.titles[length],
      currentIndex: length
    })
  },
  add () {
    this.setData({
      showModal: true
    })
  },
  cancel () {
    this.setData({
      showModal:false
    })
  },
  /**
   * 页面的初始数据
   */
  data: {
    showModal:false,
    titles:[],
    current: {},
    alphas: ['A','B','C','D','E','F','G'],
    name:'',
    currentIndex: -1
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