// client/pages/loveDeatil/loveDeatil.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visitorList: [],
    info: {},
    commentList:[],
    comment:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var info = JSON.parse(options.info)
    this.setData({
      info: info
    })
    var data = {};
    data.id = info.id;
    data.nickName = getApp().userInfo.nickName;
    data.avatarUrl = getApp().userInfo.avatarUrl;
    wx.request({
      url: 'https://wx.11lang.cn/api/addLoveVisitor',
      method: "post",
      data: data,
      success: function (res) {
        wx.request({
          url: 'https://wx.11lang.cn/api/getLoveVisitor',
          method:"post",
          data:{
            id:info.id
          },
          success: function (res) {
            that.setData({
              visitorList:res.data
            })
          }
        })
      }
    })
    wx.request({
      url: 'https://wx.11lang.cn/api/getLoveComment',
      method:"post",
      data:{
        id:info.id
      },
      success: function (res) {
        that.setData({
          commentList:res.data.reverse()
        })
      }
    })
  },

  comment:function(){
    var info=this.data.info;
    var that=this;
    var data={
      id:info.id,
      nickName:getApp().userInfo.nickName,
      avatarUrl:getApp().userInfo.avatarUrl,
      content:that.data.comment,
      commentTime:getApp().getTime()
    }
    wx.request({
      url: 'https://wx.11lang.cn/api/addLoveComment',
      method:"post",
      data:data,
      success:function(){
        that.setData({
          comment:'',
          commentList:[data,...that.data.commentList]
        })
        wx.showToast({
          title: '评论成功',
          icon: 'success',
          duration: 1000
        })
      }
    })
  },
  input:function(e){
    this.setData({
      comment:e.detail.value
    })
  }
})