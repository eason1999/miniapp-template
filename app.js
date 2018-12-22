//app.js
let http = require("./js/http.js")
let util = require("./js/util.js")
// 注入配置
let appConfig = require('./app.config')
wx.appConfig = appConfig

let self

App({
  onLaunch: function(options) {
    self = this;
    // 获取系统信息
    wx.getSystemInfo({
      success: function(res) {
        // 获取系统信息
        self.globalData.systemInfo = res;
      }
    });
    // 获取网络类型
    wx.getNetworkType({
      success: function(res) {
        // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
        self.globalData.systemInfo.networkType = res.networkType;
      }
    });
  },
  onShow: function(options) {
    self.options = options;
    if (wx.appConfig.isMustAuth) {
      self.getUserInfo();
    }
  },
  onHide() {},
  /**
   * 跳转登陆
   */
  toLogin: function() {
    wx.navigateTo({
      url: "/pages/login/login"
    });
  },
  /**
   * 跳转到首页
   */
  toHome: function() {
    wx.switchTab({
      url: "/pages/index/index"
    });
  },
  /**
   * 获取用户授权
   * v1.1.0
   * 2018-05-31
   */
  getUserAuthorize: function(cb) {
    const token = wx.getStorageSync("token") || "";
    if (token === "") {
      self.toLogin();
    } else {
      typeof cb == "function" && cb(self.globalData.userInfo);
    }
  },
  /**
   * 用户登陆
   * @param {Object} userParams 获取的用户信息
   */
  userLogin: function(userParams, cb) {
    // 获取token接口
    let api = wx.appConfig.apiLogin.api;
    wx.axios({
      url: api,
      data: userParams,
      method: "GET"}).then((res) => {
        if (res.data.code == 1 || res.data.status == 1) {
          let token = res.data.data.token;
          wx.setStorageSync("token", token);
          typeof cb == "function" && cb(token);
        } else {
          wx.showModal({
            title: '提示',
            content: '登陆遇到问题，请重试',
            showCancel: false,
            success: function (r) { }
          })
        }
      }).catch((err) => {
      wx.showModal({
        title: "提示",
        content: err.msg,
        showCancel: false,
        success: function (r) { }
      });
    });
  },
  getUserInfo: function(cb) {
    self.getUserAuthorize(cb);
  },
  globalData: {
      userInfo: null
  }
});
