// pages/user/user.js
const qcloud = require('../../vendor/wafer2-client-sdk/index')
const config = require('../../config')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    collectionInfo: [], 
    filmTitle:'',
    filmImage:'',
    userName:'',
    userImage:'',
    reviewContant:''
  },

  goBackHome() {
    wx.navigateTo({
      url: '/pages/home/home',
    })
  },

  //获取对应用户收藏信息
  getCollection() {
    qcloud.request({
      url: config.service.selectCollection,
      login: true,
      success: result => {
        //console.log(result.data.data)
        this.getReviewInfo(result.data.data)
      },
      fail: result => {
        console.log(result.data.data)
      }
    })
  },

  //获得对应影评
  getReviewInfo(collection){
    let collectionInfo = []
    for (let i = 0; i < collection.length;i++){
      let collectionId = collection[i].reviewId
      qcloud.request({
        url: config.service.reviewInfo + collectionId,
        success: result =>{
          this.backPackageFilm(collectionInfo,result.data.data[0])
          //this.backPackageUser(result.data.data[0])
          //this.backPackageCollection(collectionInfo, result.data.data[0].reviewContant)
          
        },
        fail:result =>{
          console.log(result)
        }
      })
     
      
    }
  },

  backPackageFilm(collectionInfo,reviewInfo){
    qcloud.request({
      url: config.service.filmInfo + reviewInfo.filmId,
      success: result => {
        let filmTitle = result.data.data.title
        let filmImage = result.data.data.image
        qcloud.request({
          url: config.service.userInfo + reviewInfo.userId,
          success: result => {
            //this.backPackageCollections(collectionInfo, reviewInfo.reviewContant)
            let userImage = result.data.data[0].userImage
            let userName = result.data.data[0].userName
            collectionInfo.push({
              filmTitle: filmTitle,
              filmImage: filmImage,
              userName: userName,
              userImage: userImage,
              reviewContant: reviewInfo.reviewContant
            })
            this.setData({
              filmTitle: filmTitle,
              filmImage: filmImage,
              userImage: userImage,
              userName: userName,
              collectionInfo: collectionInfo
            })

          },
          fail: result => {
            console.log(result)
          }
        })
        //this.backPackageUser(collectionInfo,reviewInfo)
        // let filmTitle=result.data.data.title
        // let filmImage=result.data.data.image
        // this.setData({
        //   filmTitle: filmTitle,
        //   filmImage: filmImage
        // })
        
      },
      fail: result => {
        console.log(result)
      }
    })
  },

  // backPackageUser(collectionInfo,reviewInfo) {
  //   qcloud.request({
  //     url: config.service.userInfo + reviewInfo.userId,
  //     success: result => {
  //       //this.backPackageCollections(collectionInfo, reviewInfo.reviewContant)
  //       let userImage = result.data.data[0].userImage
  //       let userName = result.data.data[0].userName
  //       collectionInfo.push({
  //         filmTitle: this.data.filmTitle,
  //         filmImage: this.data.filmImage,
  //         userName: userName,
  //         userImage: userImage,
  //         reviewContant: reviewInfo.reviewContant
  //       })
  //       this.setData({
  //         userImage: userImage,
  //         userName: userName,
  //         collectionInfo: collectionInfo
  //       })

  //     },
  //     fail: result => {
  //       console.log(result)
  //     }
  //   })
  // },

//   backPackageCollections(collectionInfo, reviewContant){
//   this.backPackageCollection(collectionInfo, reviewContant)
// },
//   backPackageCollection(collectionInfo, reviewContant) {
//     collectionInfo.push({
//       filmTitle: this.data.filmTitle,
//       filmImage: this.data.filmImage,
//       userName: this.data.userName,
//       userImage: this.data.userImage,
//       reviewContant: reviewContant
//     })
//     this.setData({
//       collectionInfo: collectionInfo
//     })
//     console.log(collectionInfo)
//   },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.getCollection()
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