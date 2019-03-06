// pages/reviewInfo/reviewInfo.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
const innerAudioContext = wx.createInnerAudioContext()//调用播放语音借口函数

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    filmInfo:[],
    myInfo:[],
    userInfo:[],
    reviewContant:'',
    reviewId:'',
    imageState:'f',
    timeOfAudio:0,
    addState:'f',
    nickName:''
  },
  goOneAddReview(){
    wx.showToast({
      title: '不能再次添加',
    })
  },
  //完成跳转
  finishReview() {
    let that = this
    wx.getSetting({
     
      success(res) {
        
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success(res) {
              that.setData({
                userInfo: res.userInfo,
                nickName: res.userInfo.nickName
              })
              
              that.checkMyReview(res.userInfo.nickName)
              console.log(res.userInfo.nickName)
            }
          })
        }
      }
    })
  },

  checkMyReview(nickName){
    let myImage = this.data.myInfo.userName
    console.log("qwertyuio+" + myImage)
    let userImage = nickName
    console.log("qwertyuio+" + userImage)
    if (myImage === userImage){
      this.setData({
        addState : 't'
      })
      console.log('tttt') 
    }else{
      this.setData({
        addState: 'f'
      })
      console.log('ffff') 
    }
  },
  //添加影评
  goAddReview() {
    let id = 0;
    id = this.data.filmInfo.id;
    let addtype = ''
    wx.showActionSheet({
      itemList: ['文字', '录音'],
      success: function (res) {
        if (res.tapIndex===0){
          addtype = 'word'
        }
        if (res.tapIndex === 1) {
          addtype = 'voice'
        }
        wx.navigateTo({
          url: '/pages/reviewEitd/reviewEitd?id=' + id + '&&addtype=' + addtype,
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
      }
    })
  },

  onPlayVoice() {
    innerAudioContext.src = decodeURIComponent(this.data.reviewContant)
    innerAudioContext.onPlay(() => {
      console.log('开始播放', decodeURIComponent(this.data.reviewContant))
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
  },
  //添加收藏
  collectionBtn(){
    qcloud.request({
      url:config.service.addCollection,
      method: 'POST',
      login: true,
      data:{
        reviewId:this.data.reviewId
      },
      success: result =>{
        wx.showToast({
          title: '收藏成功',
        })
        this.setData({
          imageState:'t'
        })
      },
      fail : result =>{
        wx.showToast({
          icon: 'none',
          title: '收藏失败',
        })
      }
    })
  },

  //查看是否收藏
  checkCollection(reviewId){
    qcloud.request({
      url: config.service.checkCollection + reviewId,
      login:true,
      success: result => {
        if (result.data.data.id === undefined){
          this.setData({
            imageState: 'f'
          })
          this.finishReview()
        }else{
          this.setData({
            imageState: 't'
          })
        }  
      },
      fail: result => {
        this.setData({
          imageState: 'f'
        })
      }
    })
  },

//获得电影信息
  getFilmInfo(id){
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

//获得用户信息
  getUserInfo(id) {
    qcloud.request({
      url: config.service.userInfo + id,
      success: result => {
        console.log(result.data.data)
        if (!result.data.code) {
          this.setData({
            myInfo: result.data.data[0],
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
    console.log('55555'+options.timeOfAudio)
    this.getFilmInfo(options.filmId)
    this.getUserInfo(options.userId)
    this.setData({
      reviewContant: options.reviewContant,
      reviewId:options.id,
      timeOfAudio: options.timeOfAudio
    })
    this.checkCollection(options.id)
    
   
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