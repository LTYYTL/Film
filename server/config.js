const CONF = {
    port: '5757',
    rootPathname: '',
    qcloudAppId: '1258497394',
    qcloudSecretId: 'AKIDUm8Uigvwx4zpjPnnHgxH1NBlvx15qpbG',
    qcloudSecretKey: 'dF1Z4KURSFmBPvCwTpv9OWB6mJQZY15R',

    // 微信小程序 App ID
  appId: 'wxc355aee7f37396be',

    // 微信小程序 App Secret
  appSecret: '',

    // 是否使用腾讯云代理登录小程序
    useQcloudLogin: true,

    /**
     * MySQL 配置，用来存储 session 和用户信息
     * 若使用了腾讯云微信小程序解决方案
     * 开发环境下，MySQL 的初始密码为您的微信小程序 appid
     */
    mysql: {
        host: 'localhost',
        port: 3306,
        user: 'root',
        db: 'movies',
        pass: 'l991362541',
        char: 'utf8mb4'
    },

    cos: {
        /**
         * 地区简称
         * @查看 https://cloud.tencent.com/document/product/436/6224
         */
        region: 'ap-guangzhou',
        // Bucket 名称
        fileBucket: 'qcloudtest',
        // 文件夹
        uploadFolder: ''
    },

    // 微信登录态有效期
    wxLoginExpires: 7200,
    wxMessageToken: 'abcdefgh'
}

module.exports = CONF
