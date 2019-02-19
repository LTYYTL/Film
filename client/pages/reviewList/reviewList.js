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
  getReviewList(id) {
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
      }
    })
  },

  //获得影评所对应的用户信息
  getUserInfoList(reviewList){
    let userInfo = []
    for (let i = 0; i < reviewList.length;i++){
        let userId = reviewList[i].userId
        qcloud.request({
          url: config.service.userInfo + userId,
          success: result =>{
            let users = result.data.data[0]
            
            userInfo.push({
              userId: users.id,
              userName: users.userName,
              userImage: users.userImage,
              reviewContant: reviewList[i].reviewContant
            })
            this.setData({
              userInfo: userInfo
            })
            console.log(userInfo)
          },
          fail: result => {
           console.log("erro")
          }
        })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getReviewList(options.id)
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