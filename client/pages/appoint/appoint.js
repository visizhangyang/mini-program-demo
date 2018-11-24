
Component({
    data: {
      list:['','','','',''],
      showContact:false,
      content:''
    },
    properties: {
      appointList:{
        type:Array,
        value:[]
      }
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
        url: '/pages/writeAppoint/writeAppoint'
      })
    },
    show:function(e){
      var id=this.properties.appointList[e.currentTarget.dataset['index']].openid
      this.setData({
        showContact:true,
        currentId:id
      })
    },
    hide:function(e){
      if(e.target.id!=e.currentTarget.id){
        return 
      }else{
        this.setData({
          showContact:false
        })
      }
      
    },
    input:function(e){
      this.setData({
        content:e.detail.value
      })
    },
    join:function(){
      if(this.data.content.trim()==''){
        wx.showToast({
          title:"信息不完整",
          duration:1000,
          icon:"none"
        })
        return 
      }
      var data={};
      var that=this;
      var userInfo=getApp().userInfo
      data.avatarUrl = userInfo.avatarUrl;
      data.nickName=userInfo.nickName;
      data.writeTime=getApp().getTime();
      data.toWho=this.data.currentId;
      data.content=this.data.content;
      wx.request({
        url:"https://wx.11lang.cn/api/addMes",
        method:"post",
        data:data,
        success:function(){
          that.setData({
            showContact:false
          })
        }
      })
    }
  },
      options: {
        addGlobalClass: true,
      }
    
})

