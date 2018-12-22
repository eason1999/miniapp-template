/**
 * APP应用配置
 */
module.exports = {
  appId: "wxd5b553bb5637e200",
  appName: "小程序模板",
  // App发布版本
  version: "a14fa14adb3f12b2",
  // 环境配置
  env: "debug",
  // 数据接口配置
  apiService: {
    mock: "http://demo",
    debug: "http://demo",
    test: "http://demo",
    release: "https://demo",
    production: "https://demo"
  },
  // 登录授权
  apiLogin: {
    api: "/api/user/saveuser"
  },
  // 是否强制授权
  isMustAuth: true
};