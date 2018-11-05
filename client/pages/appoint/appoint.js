
Component({
    data: {
      list:['','','','','']
    },
    created:function(){
        wx.setNavigationBarColor({
          backgroundColor:'#3cc51f',
          frontColor:'#ffffff',
          animation:{}
        })
      },
  methods: {
    goWrite: function () {
      wx.navigateTo({
        url: '/pages/writeLove/writeLove'
      })
    },
    goWrite: function () {
      wx.navigateTo({
        url: '/pages/writeAppoint/writeAppoint'
      })
    }
  },
      options: {
        addGlobalClass: true,
      }
    
})

