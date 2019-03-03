// pages/home/home.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    isHide: false,
    userName:'',
    userImage:''
  },

  goFilmList(){
    wx.navigateTo({
      url: '/pages/filmList/filmList',
    })
  },

  goMy() {
    wx.navigateTo({
      url: '/pages/user/user',
    })
  },

  addMy(){
    wx.showLoading({
      title: '登录中...',
    })
    let userName = this.data.userName
    let userImage = this.data.userImage

    qcloud.request({
      url: config.service.addUser,
      method: 'POST',
      login: true,
      data: {
        userName: userName,
        userImage: userImage
      },
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data)

        if (!data.code) {
          wx.showToast({
            title: '登录成功',
          })

        } else {
          wx.showToast({
            icon: 'none',
            title: '登录失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '登录失败',
        })
      }
    })
   
  },

  log(){
    qcloud.setLoginUrl(config.service.loginUrl)
    qcloud.login({
      success: result => {
        console.log('success')
        this.setData({
          userName:result.nickName,
          userImage:result.avatarUrl
        })
        this.addMy()
      },
      fail: result => {
        console.log('fail')
        console.log(result)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          qcloud.setLoginUrl(config.service.loginUrl)
          qcloud.login({
            success: result => {
             console.log('success')
             console.log(result)
            },
            fail: result => {
              console.log('fail')
              console.log(result)
            }
          })

        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });

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

  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.log()
      that.setData({
        isHide: false
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
  }
})