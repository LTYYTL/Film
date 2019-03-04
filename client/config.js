/**
 * 小程序配置文件
 */

// 此处主机域名修改成腾讯云解决方案分配的域名
var host = 'https://mjndpgl1.qcloud.la';

var config = {

    // 下面的地址配合云端 Demo 工作
    service: {
        host,

        // 登录地址，用于建立会话
        loginUrl: `${host}/weapp/login`,

        // 测试的请求地址，用于测试会话
        requestUrl: `${host}/weapp/user`,

        // 测试的信道服务地址
        tunnelUrl: `${host}/weapp/tunnel`,

        // 上传图片接口
        uploadUrl: `${host}/weapp/upload`,
        
        //获取所有电影
        filmList: `${host}/weapp/film`,

        //获取指定电影信息
        filmInfo: `${host}/weapp/film/`,

        //获取指定影评信息
        reviewList: `${host}/weapp/review/`,

         //获取指定用户信息
        userInfo: `${host}/weapp/my/`,

        //提交评论
        addReview: `${host}/weapp/review`,

         //添加用户
        addUser: `${host}/weapp/my`,

        //添加收藏
        addCollection: `${host}/weapp/collection`,

        //查找收藏
        checkCollection: `${host}/weapp/collection/`,

        //查找对应用户的收藏
        selectCollection: `${host}/weapp/collection`,

        //获取相应影评的信息
        reviewInfo: `${host}/weapp/getreview/`
    }
};

module.exports = config;
