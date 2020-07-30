// components/class/class.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    className: {
      type: String,
      value: ''
    },
    classDate: {
      type: String,
      value: ''
    },
    teacher: {
      type: String,
      value: ''
    },
    classarray: {
      type: Array,
      value: []
    },
    invitecode: {
      type: String,
      value:''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    gotoclass (e) {
      let app = getApp()
      app.classname = this.properties.classarray[e.currentTarget.dataset.index].classname
      let invitecode = this.properties.invitecode
      let index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: `../../pages/classmanage/classmanage?invitecode=${invitecode}&index=${index}`,
      })
    }
  }
})
