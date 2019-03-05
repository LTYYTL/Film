// pages/reviewEitd/reviewEitd.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    userInfo:[],
    filmInfo:[],
    reviewContant:'',
    filmId:'',
    state:'begin'
  },

/**
  * 提示
  */
  tip: function (msg) {
    wx.showModal({
      title: '提示',
      content: msg,
      showCancel: false
    })
  },

//录音
  radioBtn(){
    this.recorderManager.start({
      format: 'mp3'
    });
    this.setData({
      state:'star'
    })
  },

  stopRecord(){
    this.recorderManager.stop()
    this.setData({
      state: 'begin'
    })
  },

  //数据封装
  dataPackage(){
    let userName = this.data.userInfo.nickName
    let userImage = this.data.userInfo.avatarUrl
    let filmImage = this.data.filmInfo.image
    let filmTitle = this.data.filmInfo.title
    wx.navigateTo({
      url: '/pages/reviewShow/reviewShow?userName=' + userName + '&&userImage=' + userImage + '&&filmImage=' + filmImage + '&&filmTitle=' + filmTitle + '&&reviewContant=' + this.data.reviewContant + '&&filmId=' + this.data.filmId,
    })
  },

  //完成跳转
  finishReview(){
    let that = this
    wx.getSetting({
      success(res) {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.userInfo
              })
              console.log(res.userInfo)
            }
          })
        }
      }
    })
    
  },

  //获取用户输入
  reviewContantInput: function (e) {
    console.log(e.detail.value)
    this.setData({
      reviewContant: e.detail.value
    })
  },

  //获得电影信息
  getFilmInfo(id) {
    qcloud.request({
      url: config.service.filmInfo + id,
      success: result => {
        console.log(result.data.data)
        wx.hideLoading();
        if (!result.data.code) {
          this.setData({
            filmInfo: result.data.data,
          })
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000);
        }
      },
      fail: result => {
        setTimeout(() => {
          wx.navigateBack()
        }, 2000);
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getFilmInfo(options.id)
      this.finishReview()
      let reviewContant =''
      if(options.reviewContant===''){
        reviewContant = ''
      }else{
        reviewContant = options.reviewContant
      }
      this.setData({
        filmId: options.id,
        reviewContant: reviewContant
      })

    var that = this;
    this.recorderManager = wx.getRecorderManager();
    this.recorderManager.onError(function () {
      that.tip("录音失败！")
    });
    this.recorderManager.onStop(function (res) {
      that.setData({
        src: res.tempFilePath
      })
      console.log(res.tempFilePath)
      that.tip("录音完成！")
    });

    this.innerAudioContext = wx.createInnerAudioContext();
    this.innerAudioContext.onError((res) => {
      that.tip("播放录音失败！")
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

  }
})