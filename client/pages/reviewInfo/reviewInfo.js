// pages/reviewInfo/reviewInfo.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmInfo:[],
    myInfo:[],
    reviewContant:''
  },

  //添加影评
  goAddReview() {
    let id = 0;
    id = this.data.filmInfo.id;
    wx.showActionSheet({
      itemList: ['文字', '录音'],
      success: function (res) {
        wx.navigateTo({
          url: '/pages/reviewEitd/reviewEitd?id=' + id,
        })
      },
      fail: function (res) {
        console.log(res.errMsg)
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
    this.getFilmInfo(options.filmId)
    this.getUserInfo(options.userId)
    this.setData({
      reviewContant: options.reviewContant
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