/**
 * ajax 服务路由集合
 */
const router = require('koa-router')({
    prefix: '/weapp'
})
const controllers = require('../controllers')

// 从 sdk 中取出中间件
// 这里展示如何使用 Koa 中间件完成登录态的颁发与验证
const { auth: { authorizationMiddleware, validationMiddleware } } = require('../qcloud')

// --- 登录与授权 Demo --- //
// 登录接口
router.get('/login', authorizationMiddleware, controllers.login)
// 用户信息接口（可以用来验证登录态）
router.get('/user', validationMiddleware, controllers.user)

// --- 图片上传 Demo --- //
// 图片上传接口，小程序端可以直接将 url 填入 wx.uploadFile 中
router.post('/upload', controllers.upload)

// --- 信道服务接口 Demo --- //
// GET  用来响应请求信道地址的
router.get('/tunnel', controllers.tunnel.get)
// POST 用来处理信道传递过来的消息
router.post('/tunnel', controllers.tunnel.post)

// --- 客服消息接口 Demo --- //
// GET  用来响应小程序后台配置时发送的验证请求
router.get('/message', controllers.message.get)
// POST 用来处理微信转发过来的客服消息
router.post('/message', controllers.message.post)
//GET用来获取全部电影
router.get('/film', controllers.film.list)
//GET 获取某一个电影
router.get('/film/:id',controllers.film.info)
//GET 获取某一个电影的影评
router.get('/review/:id', controllers.review.list)
//GET用来获取用户信息
router.get('/my/:id', controllers.my.info)
//POST用来添加用户信息
router.post('/my', validationMiddleware,controllers.my.add)

//POST用来添加影评
router.post('/review', validationMiddleware, controllers.review.add)

//POST用来添加收藏
router.post('/collection', validationMiddleware, controllers.collection.add)

//GET用来获取收藏信息
router.get('/collection/:id', validationMiddleware,controllers.collection.decide)

//GET用来获取相应用户的收藏信息
router.get('/collection', validationMiddleware, controllers.collection.userDecide)

//GET用来获取相应影评信息
router.get('/getreview/:id', controllers.getreview.info)

module.exports = router
