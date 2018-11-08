// client/pages/writeLove/writeLove.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  submit: function (e) {
    var userInfo = getApp().userInfo;
    var detail = e.detail.value;
    var data = {};
    if(detail.toWho==''||detail.content==''){
      wx.showToast({
        title:"信息不完整",
        icon:"none",
        duration:1000
      })
      return 
    }
    data.toWho = detail.toWho;
    data.content = detail.content;
    data.watchCount = data.commentCount = data.thumpCount = 0;
    data.nickName = userInfo.nickName;
    data.gender = userInfo.gender;
    data.avatarUrl = userInfo.avatarUrl;
    data.openid = getApp().openid;
    data.writeTime=getApp().getTime();
    if (e.detail.value.withoutName) {
      data.nickName = '匿名'
      data.avatarUrl = './noname.jpeg'
    }
    wx.request({
      url: 'https://wx.11lang.cn/api/writeLove',
      data: data,
      method: 'post',
      success: function (res) {
        wx.showToast({
          title:"发布成功",
          duration:2000
        })
      }
    })
  }
})