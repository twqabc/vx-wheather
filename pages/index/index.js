// pages/index/index.js
const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['江苏省', '南京市', '秦淮区'],
    now:{
      tmp:0,
      cond_txt:'未知',
      cond_code:'999',
      hum:0,
      pres:0,
      vis:0,
      wind_dir:0,
      wind_spd:0,
      wind_sc:0,
      nowcolor:"#FFC0CB",
      twocolor:"#3883FA",
      onecolor:"#3883FA",
      threecolor:"#3883FA",

    },
    i:9,
    future:false,
    date:0
  },
  
  
now:function(e){
  this.setData({
nowcolor:"#FFC0CB",
twocolor:"#3883FA",
onecolor:"#3883FA",
threecolor:"#3883FA"
  })
  this.data.i=9
  this.getWeather()
},

  toone:function(){
  this.data.i=0
  this.setData({
onecolor:"#FFC0CB",
nowcolor:"#3883FA",
twocolor:"#3883FA",
threecolor:"#3883FA"
  })
  this.getWeather()
  },

  totwo:function(){
    this.data.i=1
    this.setData({
      twocolor:"#FFC0CB",
  nowcolor:"#3883FA",
  onecolor:"#3883FA",
  threecolor:"#3883FA"
    })
this.getWeather()
      },


      tothree:function(){
        this.data.i=0
        this.setData({
          threecolor:"#FFC0CB",
      twocolor:"#3883FA",
      onecolor:"#3883FA",
      nowcolor:"#3883FA"
        })
        this.getWeather()
      },


  /**
   * 更新省市区信息
   */
  regionChange: function(e) {
    this.setData({region: e.detail.value});
    this.getWeather();//更新天气
  },
  /**
   * 获取实况天气数据
   */
  getWeather: function () {
    var that = this;//this不可以直接在wxAPI函数内部使用
    // 调用函数时，传入new Date()参数，返回值是日期和时间
    var date = util.formatTime(new Date());
    // 再通过setData更改Page()里面的data，动态更新页面的数据
    that.setData({
      date: date
    });
    wx.request({
      url: 'https://free-api.heweather.com/s6/weather',
      data:{
        location:that.data.region[1],
        key:'f0671b6589ff43019e72970d334ea93e'
      },
      success:function(res){
        
        if(that.data.i==9){
        that.setData({
          future:false,
          now:res.data.HeWeather6[0].now
        });}
        if(that.data.i==0){
          that.setData({
            future:true,
            now:res.data.HeWeather6[0].daily_forecast[0]
          });
         }
         if(that.data.i==1){
          that.setData({future:true,now:res.data.HeWeather6[0].daily_forecast[1]});
         }
         if(that.data.i==2){
          that.setData({future:true,now:res.data.HeWeather6[0].daily_forecast[2]});
         }
         console.log(res);
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getWeather();//更新天气
        // 调用函数时，传入new Date()参数，返回值是日期和时间
        var date = util.formatTime(new Date());
        // 再通过setData更改Page()里面的data，动态更新页面的数据
        this.setData({
          nowcolor:"#FFC0CB",
      twocolor:"#3883FA",
      onecolor:"#3883FA",
      threecolor:"#3883FA",
          date: date
        });
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})