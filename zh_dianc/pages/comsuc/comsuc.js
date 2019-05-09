Page({
    data: {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    index: function(o) {
        console.log(1111)
        wx.switchTab({
            url: "../home/home"
        });
        wx.navigateTo({
            url: "../home/home"
          });
    },
    onLoad: function(o) {
        var n = wx.getStorageSync("bqxx");
        if ("1" == n.more) var t = wx.getStorageSync("bqxx").color;
        if ("2" == n.more) t = wx.getStorageSync("nbcolor");
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onUnload: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});