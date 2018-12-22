// pages/login/login.js
let util = require("../../js/util.js");
//获取应用实例
var app = getApp()
var self

Page({

    /**
     * 页面的初始数据
     */
    data: {
        appName: '',
        userInfo: {}
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        self = this
        self.setData({
            'appName': wx.appConfig.appName
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    /**
     * 用户点击登陆
     * @param {Object} wxUserInfo 获取的用户信息
     */
    login: function (wxUserInfo) {
        const system = app.globalData.systemInfo.system

        wx.login({
            success: (res) => {
                const js_code = res.code
                wx.getUserInfo({
                    withCredentials: true,
                    success: (res) => {
                        app.globalData.userInfo = res.userInfo
                        const userParams = {
                            js_code: js_code,
                            iv: res.iv,
                            encryptedData: res.encryptedData
                        }
                        app.userLogin(userParams, (token) => {
                            if (token !== '') {
                                if (system.indexOf('iOS') !== -1) {
                                    wx.navigateBack({})
                                } else {
                                    wx.navigateBack({
                                        delta: 4
                                    })
                                }
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: '登陆遇到问题，请重试！',
                                    showCancel: false,
                                    success: (r) => {}
                                })
                            }
                        })


                    }
                })

            }
        })

    }
})