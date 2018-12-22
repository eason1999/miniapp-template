// components/fixedAd/fixedAd.js
let app = getApp();
let self;


Component({
    /**
     * 组件的属性列表
     */
    properties: {
        
    },

    /**
     * 组件的初始数据
     */
    data: {
        
    },

    /**
     * 组件的方法列表
     */
    methods: {
        handleClick() {
            wx.showModal({
                title: '提示',
                content: '确定退出登录状态么？',
                success: function (res) {
                    if (res.confirm) {
                        wx.removeStorageSync("token");
                        app.getUserAuthorize();
                    }
                }
            })
        }
    },
    created() {
        self = this;
    },
    ready() {
        
    }
})
