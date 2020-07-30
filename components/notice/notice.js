// components/notice/notice.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    teacher: {
      type: String,
      value: ''
    }, 
    date: {
      type: String,
      value: ''
    },
    type: {
      type: String,
      value: ''
    },
    classname: {
      type: String,
      value: ''
    },
    name: {
      type: String,
      value: ''
    },
    content: {
      type: Object,
      value: {}
    },
    follow: {
      type: String,
      value: 'listen'
    },
    readstudents: {
      type: Array,
      value: []
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
    con () {
      console.log(this.properties.readstudents)
    }
  }
})
