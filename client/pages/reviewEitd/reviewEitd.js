// pages/reviewEitd/reviewEitd.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const recorderManager = wx.getRecorderManager()//调用录音借口函数
const innerAudioContext = wx.createInnerAudioContext()//调用播放语音借口函数

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
    state:'begin',
    states: '',
    src:'',
    timeOfAudio:0,
    addtype:''
  },

onPlayVoice(){
  innerAudioContext.src = this.data.src
  innerAudioContext.onPlay(() => {
    console.log('开始播放', this.data.src)
  })
  innerAudioContext.onError((res) => {
    wx.showToast({
      icon: 'none',
      title: '录音失败'
    })
    console.log(res.errMsg)
    console.log(res.errCode)
  })
  innerAudioContext.play()
  this.setData({
    state: 'begin'
  })
},

//录音
  radioBtn(){
    recorderManager.start({
      format: 'mp3'
    });
    this.setData({
      state:'star',
      
    })
  },

  stopRecord(){
    
    recorderManager.onStop((res) =>{
      const { tempFilePath } = res
      let timeOfAudio = Math.floor(res.duration / 1000)
      this.setData({
        src: res.tempFilePath,
        timeOfAudio: timeOfAudio,
        state: 'begin',
        states:'play'
      })
    })
    recorderManager.stop()
  },

  //数据封装
  dataPackage(){
    let userName = this.data.userInfo.nickName
    let userImage = this.data.userInfo.avatarUrl
    let filmImage = this.data.filmInfo.image
    let filmTitle = this.data.filmInfo.title
    let reviewContant = encodeURIComponent(this.data.src)
    console.log(reviewContant)
    if(reviewContant===undefined){
      wx.navigateTo({
        url: '/pages/reviewShow/reviewShow?userName=' + userName + '&&userImage=' + userImage + '&&filmImage=' + filmImage + '&&filmTitle=' + filmTitle + '&&reviewContant=' + this.data.reviewContant + '&&filmId=' + this.data.filmId,
      })
    }else{
      wx.navigateTo({
        url: '/pages/reviewShow/reviewShow?userName=' + userName + '&&userImage=' + userImage + '&&filmImage=' + filmImage + '&&filmTitle=' + filmTitle + '&&reviewContant=' + reviewContant + '&&filmId=' + this.data.filmId + '&&timeOfAudio=' + this.data.timeOfAudio,
      })
    }
    
   
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
        reviewContant: reviewContant,
        addtype: options.addtype
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