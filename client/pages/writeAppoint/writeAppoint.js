// client/pages/writeAppoint/writeAppoint.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    time:'请选择',
    date:'请选择'
  },

 selectTime:function(e){
   this.setData({
     time:e.detail.value
   })
 },
 selectDate:function(e){
  this.setData({
    date:e.detail.value
  })
},
submit: function (e) {
  var userInfo = getApp().userInfo;
  var detail = e.detail.value;
  var data = {};
  if(detail.theme==''||detail.want==''||detail.detail==''||detail.date==''
  ||detail.time==''||detail.location==''){
    wx.showToast({
      title:"信息不完整",
      duration:1000,
      icon:"none"
    })
    return 
  }
  data.want = detail.want;
  data.detail = detail.detail;
  data.appointTime=detail.date+' '+detail.time;
  data.appointLocation=detail.location
  data.avatarUrl = userInfo.avatarUrl;
  data.nickName=userInfo.nickName;
  data.theme=detail.theme;
  data.openid = getApp().openid;
  data.writeTime=getApp().getTime();
  wx.request({
    url: 'https://wx.11lang.cn/api/writeAppoint',
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