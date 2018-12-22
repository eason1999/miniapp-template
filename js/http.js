// 注入配置
let appConfig = require('../app.config');
wx.appConfigs = appConfig;

export default wx.axios = (options) => {

    return new Promise((resolve, reject) => {
        // 传参处理
        let params = {};
        let defaults = {
            url: '',
            data: {},
            method: 'get',
            header: {
                'content-type': 'application/json'
            }
        };
        let env = wx.appConfigs.env;

        params = Object.assign({}, defaults, options);

        switch (env) {
            case 'mock':
                params.url = wx.appConfigs.apiService.mock + params.url;
                break;
            case 'debug':
                params.url = wx.appConfigs.apiService.debug + params.url;
                break;
            case 'test':
                params.url = wx.appConfigs.apiService.test + params.url;
                break;
            case 'release':
                params.url = wx.appConfigs.apiService.release + params.url;
                break;
            case 'production':
                params.url = wx.appConfigs.apiService.production + params.url;
                break;
            default:
                break;
        }

        params.fail = function (err) {
            return reject(err);
        }
        params.success = function (res) {
            if (res.data.code == 1000 || res.data.status == 1000) {
                wx.removeStorageSync("token");
                getApp().getUserInfo();
            } else {
                resolve(res);
            }
        }
        // 微信官方请求
        wx.request(params);
    })
}