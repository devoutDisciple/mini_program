var app = getApp();

Page({
    data: {},
    onLoad: function(e) {
        var o = wx.getStorageSync("bqxx");
        if ("1" == o.more) var t = wx.getStorageSync("bqxx").color;
        if ("2" == o.more) t = wx.getStorageSync("nbcolor");
        var a = this;
        a.setData({
            color: t,
            options: e
        });
        var n = wx.getStorageSync("users").id;
        console.log(n), app.util.request({
            url: "entry/wxapp/Coupons",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                console.log(e);
                var o = a.getIdDataSet(e.data.ok);
                a.classify(e.data.all, o);
            }
        }), app.util.request({
            url: "entry/wxapp/Voucher",
            cachetime: "0",
            data: {
                user_id: n
            },
            success: function(e) {
                console.log(e);
                var o = a.cash(e.data.ok);
                a.again(e.data.all, o);
            }
        });
    },
    getIdDataSet: function(e) {
        for (var o = new Array(), t = e.length, a = 0; a < t; a++) o.push(e[a].coupons_id);
        return o;
    },
    classify: function(e, o) {
        for (var t = new Array(), a = new Array(), n = e.length, s = 0; s < n; s++) -1 === o.indexOf(e[s].id) ? a.push(e[s]) : t.push(e[s]);
        if (console.log(t), console.log(a), console.log(this.data.options), null == this.data.options.dnjr) console.log("从个人中心进入"), 
        this.setData({
            received: t,
            unreceive: a
        }); else {
            console.log("从店铺优惠券进入");
            for (var r = [], i = [], c = 0; c < a.length; c++) a[c].store_id == getApp().sjid && r.push(a[c]);
            this.setData({
                unreceive: r
            });
            for (var u = 0; u < t.length; u++) t[u].store_id == getApp().sjid && i.push(t[u]);
            this.setData({
                unreceive: r,
                received: i
            });
        }
    },
    cash: function(e) {
        for (var o = new Array(), t = e.length, a = 0; a < t; a++) o.push(e[a].vouchers_id);
        return o;
    },
    again: function(e, o) {
        for (var t = new Array(), a = new Array(), n = e.length, s = 0; s < n; s++) -1 === o.indexOf(e[s].id) ? a.push(e[s]) : t.push(e[s]);
        if (console.log(t), console.log(a), null == this.data.options.dnjr) console.log("从个人中心进入"), 
        this.setData({
            draw: t,
            undraw: a
        }); else {
            console.log("从店铺优惠券进入");
            for (var r = [], i = [], c = 0; c < a.length; c++) a[c].store_id == getApp().sjid && r.push(a[c]);
            this.setData({
                undraw: r
            });
            for (var u = 0; u < t.length; u++) t[u].store_id == getApp().sjid && i.push(t[u]);
            this.setData({
                undraw: r,
                draw: i
            });
        }
    },
    use: function() {
        wx.navigateBack({});
    },
    details: function(e) {
        console.log(e);
        var o = e.currentTarget.id;
        wx.navigateTo({
            url: "coupons_details?id=" + o + "&type=1&state=1"
        });
    },
    detail: function(e) {
        console.log(e);
        var o = e.currentTarget.id;
        wx.navigateTo({
            url: "coupons_details?id=" + o + "&type=2&state=1"
        });
    },
    draws: function(e) {
        var a = e.currentTarget.dataset.index, o = wx.getStorageSync("users").id, t = this.data.undraw[a].id;
        console.log(t);
        var n = this;
        app.util.request({
            url: "entry/wxapp/AddVoucher",
            cachetime: "0",
            data: {
                user_id: o,
                vouchers_id: t
            },
            success: function(e) {
                if (console.log(e), 1 == e.data) {
                    wx.showToast({
                        title: "领取成功",
                        icon: "success",
                        duration: 1e3
                    });
                    var o = n.data.undraw, t = n.data.draw;
                    t.push(o[a]), o.splice(a, 1), console.log(t), console.log(o), setTimeout(function() {
                        n.setData({
                            draw: t,
                            undraw: o
                        });
                    }, 1e3);
                }
            }
        });
    },
    receive: function(e) {
        var a = e.currentTarget.dataset.index, o = wx.getStorageSync("users").id, t = this.data.unreceive[a].id;
        console.log(t);
        var n = this;
        app.util.request({
            url: "entry/wxapp/AddCoupons",
            cachetime: "0",
            data: {
                user_id: o,
                coupons_id: t
            },
            success: function(e) {
                if (console.log(e), 1 == e.data) {
                    wx.showToast({
                        title: "领取成功",
                        icon: "success",
                        duration: 1e3
                    });
                    var o = n.data.unreceive, t = n.data.received;
                    t.push(o[a]), o.splice(a, 1), console.log(t), console.log(o), setTimeout(function() {
                        n.setData({
                            received: t,
                            unreceive: o
                        });
                    }, 1e3);
                }
            }
        });
    },
    onReady: function() {},
    onShow: function() {},
    onHide: function() {},
    onPullDownRefresh: function() {
        this.onLoad(), wx.stopPullDownRefresh();
    },
    onUnload: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});