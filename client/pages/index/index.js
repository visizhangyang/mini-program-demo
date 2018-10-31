
Page({
    data: {
    },
    login:function(e){
      wx.getSetting({
        success(res) {
          if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称
            wx.getUserInfo({
              success: function (res) {
                console.log(res.userInfo)
              }
            })
          }
        }
      })
    },
  onLoad: function () {
    // 查看是否授权
    console.log(getApp().userInfo)
  },
  get:function(){
    console.log(getApp().userInfo)
  }
    // 用户登录示例
    
})
