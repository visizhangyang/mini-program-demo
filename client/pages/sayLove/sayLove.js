// pages/sayLove/sayLove.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loveList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    loveLists:['','','','','','']
  },
  created:function(){
    wx.setNavigationBarColor({
      backgroundColor:'#e07883',
      frontColor:'#ffffff',
      animation:{}
    })
    console.log(getApp().getTime())
  },
  /**
   * 组件的方法列表
   */
  methods: {
    goWrite:function(){
      wx.navigateTo({
        url: '/pages/writeLove/writeLove'
      })
    },
    goDetail:function(e){
      wx.navigateTo({
        url: '/pages/loveDetail/loveDetail?info='+JSON.stringify(this.properties.loveList[e.currentTarget.dataset['index']])
      })
    },
    upper:function(){
      console.log('1')
    }
  },
  options: {
    addGlobalClass: true,
  }
})
