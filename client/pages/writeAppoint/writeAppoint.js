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
}
})