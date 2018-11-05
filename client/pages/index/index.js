
Page({
    data: {
      infoGot:false,
      activeIndex:0
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
  getUserInfo:function(){
    var that=this
    wx.getUserInfo({
      success:function(res){
        var userInfo=res.userInfo
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: 'https://wx.11lang.cn/api/test',
                data: {
                  code: res.code,
                  userInfo: userInfo
                },
                method: 'post',
                success: function (res) {
                  if (res.data.third_Session != '') {
                    that.setData({
                      infoGot:true
                    })
                  }
                }
              })
            }
          }
        })
      }
    })
  },
  changeIndex:function(e){
    var that=this;
    var title=''
    switch(parseInt(e.currentTarget.dataset['index'])){
      case 0:
      title='约一波';
      break;
      case 1:
      title='表白墙';
      break;
      case 2:
      title='我的';
      break;
    }
    
    wx.setNavigationBarTitle({
      title:title,
      success:function(){
        that.setData({
          activeIndex:e.currentTarget.dataset['index']
        })
      }
    })
    
  }
    // 用户登录示例
    
})
