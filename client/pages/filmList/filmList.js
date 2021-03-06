// pages/filmList/filmList.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    filmList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   this.getFilmList();
  },

  onPullDownRefresh() {//下拉刷新
    this.getFilmList(() => {
      wx.stopPullDownRefresh()
    })
  },

  getFilmList(callback){
    wx.showLoading({
      title: '电影数据加载中...',
    })
    qcloud.request({
      url: config.service.filmList,
      success: result => {
        wx.hideLoading();
        if(!result.data.code){
          this.setData({
            filmList: result.data.data,
          })
        }else{
          wx.showToast({
            title: '电影数据加载失败',
          })
        }
      },
      fail: result => {
        wx.hideLoading();
        wx.showToast({
          title: '电影数据加载失败',
        })
      }, 
      complete: () => {//有回调就回调
        callback && callback()
      }
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