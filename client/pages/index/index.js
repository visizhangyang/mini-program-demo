
Page({
    data: {
      infoGot:false,
      activeIndex:0,
      loveList:[],
      appointList:[]
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
    var that=this;
    wx.request({
      url: 'https://wx.11lang.cn/api/getLove',
      success: function (res) {
        that.setData({
          loveList:res.data.reverse()
        })
      }
    })
    wx.request({
      url: 'https://wx.11lang.cn/api/getAppoint',
      success: function (res) {
        that.setData({
          appointList:res.data.reverse()
        })
      }
    })
  },
  onPullDownRefresh:function(){
    var that=this;
    if(this.data.activeIndex==0){
      wx.request({
        url: 'https://wx.11lang.cn/api/getAppoint',
        success: function (res) {
          that.setData({
            appointList:res.data.reverse()
          })
          wx.stopPullDownRefresh()
        }
      })
    }
    else if(this.data.activeIndex==1){
      wx.request({
        url: 'https://wx.11lang.cn/api/getLove',
        success: function (res) {
          that.setData({
            loveList:res.data.reverse()
          })
          wx.stopPullDownRefresh()
        }
      })
    }else{

    }
  },
  getUserInfo:function(){
    var that=this
    wx.getUserInfo({
      success:function(res){
        var userInfo=res.userInfo
        getApp().userInfo=userInfo;
        wx.login({
          success: function (res) {
            if (res.code) {
              wx.request({
                url: 'https://wx.11lang.cn/api/login',
                data: {
                  code: res.code,
                  userInfo: userInfo
                },
                method: 'post',
                success: function (res) {
                  if (res.data.third_Session != '') {
                    getApp().openid=res.data.third_Session.split('_logined_')[1]
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
      title='邀约';
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
    
  },
  thump:function(e){
    var newList=this.data.loveList.map(function(love,index){
      return index==e.detail.index?Object.assign({},love,{thumpCount:e.detail.count}):love
    })
    this.setData({
      loveList:newList
    })
  }
  
    
})
