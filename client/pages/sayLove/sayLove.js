// pages/sayLove/sayLove.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    loveLists:['','','']
  },
  created:function(){
    wx.setNavigationBarColor({
      backgroundColor:'#e07883',
      frontColor:'#ffffff',
      animation:{}
    })
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goWrite:function(){
      wx.navigateTo({
        url: '/pages/writeLove/writeLove'
      })
    }
  },
  options: {
    addGlobalClass: true,
  }
})
