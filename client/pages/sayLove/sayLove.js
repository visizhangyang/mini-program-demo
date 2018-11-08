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
    loveLists:['','','','','',''],
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
    },
    goDetail:function(e){
      wx.navigateTo({
        url: '/pages/loveDetail/loveDetail?info='+JSON.stringify(this.properties.loveList[e.currentTarget.dataset['index']])
      })
    },
    thump:function(e){
      var data={};
      var index=e.currentTarget.dataset['index']//点赞的索引
      var info=this.properties.loveList[index];
      var that=this;
      data.id=info.id;
      data.count=info.thumpCount+1
      if(getApp().thumpList.indexOf(index)>=0){
        wx.showToast({
          title:"不可重复点赞",
          duration:1000,
          icon:"none"
        })
      }else{
        wx.request({
          url: 'https://wx.11lang.cn/api/addThumpCount',
          data: data,
          method: 'post',
          success: function (res) {
            getApp().thumpList.push(index)//存入索引至点赞列表
            that.triggerEvent('thump',{index:index,count:data.count})//更新视图
          }
        })
      }
    },
    upper:function(){
      console.log('1')
    }
  },
  options: {
    addGlobalClass: true,
  }
})
