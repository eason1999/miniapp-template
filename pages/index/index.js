//index.js
//获取应用实例
var app = getApp();
var self;

Page({
  data: {
    userInfo: {},
    date: new Date()
  },
  onLoad: function(options) {
    self = this;
    wx.getSetting({
      success: function(res) {
        console.log(res)
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function(res) {
              self.setData({
                userInfo: res.userInfo
              })
            }
          })
        }
      }
    })
  },
  onShow() {
    //调用应用实例的方法获取全局数据
    app.getUserInfo(data => {
      self.setData({
        userInfo: data
      });
    });
    self.setTime()
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {},
  setTime() {
    setInterval(() => {
      self.setData({
        date: new Date()
      });
    }, 1000);
  }
});