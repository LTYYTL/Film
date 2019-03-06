// pages/reviewShow/reviewShow.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userName: '',
    userImage: '',
    filmTitle: '',
    filmImage: '',
    reviewContant:'',
    filmId:'',
    type:0,
    timeOfAudio:0
  },

  //重新编辑
  backEdit(){
    let addtype=''
    if (this.data.timeOfAudio===undefined){
      addtype = 'word'
      wx.navigateTo({
        url: '/pages/reviewEitd/reviewEitd?id=' + this.data.filmId + '&&reviewContant=' + this.data.reviewContant + '&&addtype=' + addtype,
      })
    }else{
      addtype = 'voice'
      wx.navigateTo({
        url: '/pages/reviewEitd/reviewEitd?id=' + this.data.filmId + '&&reviewContant=' + this.data.reviewContant + '&&addtype=' + addtype,
      })
    }
    
  },

  addreview(){
    wx.showLoading({
      title: '发布中...',
    })
    let filmId = this.data.filmId
    let reviewContant = this.data.reviewContant
    let timeOfAudio = this.data.timeOfAudio

    qcloud.request({
      url: config.service.addReview,
      method: 'POST',
      login:true,
      data: {
        filmId :filmId,
        reviewContant :reviewContant,
        timeOfAudio: timeOfAudio
      },
      success: result => {
        wx.hideLoading()

        let data = result.data
        console.log(data)
        this.voiceUpload()
        if (!data.code) {
          wx.showToast({
            title: '发布成功',
          })
          wx.navigateTo({
            url: '/pages/reviewList/reviewList?id=' + filmId,
          })
        } else {
          wx.showToast({
            icon: 'none',
            title: '发布失败',
          })
        }
      },
      fail: () => {
        wx.hideLoading()

        wx.showToast({
          icon: 'none',
          title: '发布失败',
        })
      }
    })
    
  },

voiceUpload(){
  wx.uploadFile({
    url: config.service.uploadUrl,
    filePath: this.data.reviewContant,
    name: 'file',
    formData: {
      user: 'test'
    },
    success(res) {
      const data = res.data
      console.log('1111'+data)
    }
  })
},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let timeOfAudio = options.timeOfAudio
    if (timeOfAudio===undefined){
      this.setData({
        userName: options.userName,
        userImage: options.userImage,
        filmTitle: options.filmTitle,
        filmImage: options.filmImage,
        reviewContant: options.reviewContant,
        filmId: options.filmId,
        timeOfAudio: 0,
        type:0,
      })
    }else{
      this.setData({
        userName: options.userName,
        userImage: options.userImage,
        filmTitle: options.filmTitle,
        filmImage: options.filmImage,
        reviewContant: options.reviewContant,
        filmId: options.filmId,
        timeOfAudio: timeOfAudio,
        type: 1
      })
    }
     
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