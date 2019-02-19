// pages/filmInfo/filmInfo.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    film:{},
    id:''
  },

  goReview(){
    let id = 0;
    id = this.data.id;
    wx.navigateTo({
      url: '/pages/reviewList/reviewList?id='+id,
    })
  },

  goAddReview() {
    let id = 0;
    id = this.data.id;
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

  getFilmInfo(id){
    wx.showLoading({
      title: '电影数据加载中...',
    })
    qcloud.request({
      url: config.service.filmInfo + id,
      success: result => {
        wx.hideLoading();
        if (!result.data.code) {
          console.log(result.data.data)
          this.setData({
            film: result.data.data,
            id: result.data.data.id
          })
        } else {
          setTimeout(()=>{
            wx.navigateBack()
          },2000);
        }
      },
      fail: result => {
        wx.hideLoading();
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