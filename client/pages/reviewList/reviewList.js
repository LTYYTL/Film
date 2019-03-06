// pages/reviewList/reviewList.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    reviewList:[],
    userInfo:[]
  },

  //回到首页
  goBackHome(){
    wx.navigateTo({
      url: '/pages/home/home' ,
    })
  },

  //获得所有的影评
  getReviewList(id, callback) {
    wx.showLoading({
      title: '影评加载中...',
    })
    qcloud.request({
      url: config.service.reviewList + id,
      success: result => {
        console.log(result.data.data)
        wx.hideLoading();
        if (!result.data.code) {
          this.setData({
            reviewList: result.data.data,
          })
          this.getUserInfoList(result.data.data)
        } else {
          setTimeout(() => {
            wx.navigateBack()
          }, 2000);
        }
      },
      fail: result => {
        wx.hideLoading();
        setTimeout(() => {
          wx.navigateBack()
        }, 2000);
      },
      complete: () => {//有回调就回调
        callback && callback()
      }
    })
  },

  //获得影评所对应的用户信息
  getUserInfoList(reviewList){
    let userInfo = []
    for (let i = 0; i < reviewList.length;i++){
        let userId = reviewList[i].userId
        let id = reviewList[i].id
        let filmId = reviewList[i].filmId
        qcloud.request({
          url: config.service.userInfo + userId,
          success: result =>{
            let users = result.data.data[0]
            console.log('1')
            console.log(users)
            
            userInfo.push({
              id:id,
              filmId:filmId,
              userId: users.id,
              userName: users.userName,
              userImage: users.userImage,
              reviewContant: reviewList[i].reviewContant,
              timeOfAudio: reviewList[i].timeOfAudio,
            })
            this.setData({
              userInfo: userInfo
            })
            console.log('1111111'+userInfo)
          },
          fail: result => {
           console.log("erro")
          }
        })
    }
  },

  onPullDownRefresh() {//下拉刷新
    this.getReviewList(this.data.id,() => {
      wx.stopPullDownRefresh()
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReviewList(options.id)
    console.log(options.id)
    this.setData({
      id:options.id
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