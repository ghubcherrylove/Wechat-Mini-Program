// pages/me/me.js
const app = getApp();
Page({

 // 页面的初始数据
 data: {
  isShowUserName: false,
  userInfo: null,
 },
 // button获取用户信息
 onGotUserInfo: function(e) {
  if (e.detail.userInfo) {
    console.log('--e--')
    console.log(e)
   var user = e.detail.userInfo;
   this.setData({
    isShowUserName: true,
    userInfo: e.detail.userInfo,
   })
   user.openid = app.globalData.openid;
   app._saveUserInfo(user);
  } else {
   app._showSettingToast('登陆需要允许授权');
  }
 },

 goToMyOrder: function() {
  wx.navigateTo({
   url: '../myOrder/myOrder',
  })
 },

 goToMyComment: function() {
  wx.navigateTo({
   url: '../mycomment/mycomment?type=1',
  })
 },
 change(){
  wx.navigateTo({
   url: '../change/change',
  })
 },
 onShow(options) {
  console.log("个人show", options)
  var user = app.globalData.userInfo;
  console.log('user')
  console.log(user)
  if (user) {
   this.setData({
    isShowUserName: true,
    userInfo: user,
   })
  }
 },

 //生命周期函数--监听页面加载
 onLoad: function(options) {
  console.log("个人onLoad")
  // var that = this;
  var that = this;
  wx.getStorage({
    key: 'user',
    success (res) {
      console.log('res')
      console.log(res.data)
      that.setData({isShowUserName: true,userInfo: res.data})
    }
  })
  var user = app.globalData.userInfo;
  if (user) {
   that.setData({
    isShowUserName: true,
    userInfo: user,
   })
  } else {
   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
   // 所以此处加入 callback 以防止这种情况
   app.userInfoReadyCallback = res => {
    that.setData({
     userInfo: res.userInfo,
     isShowUserName: true
    })
   }
  }
 },
})