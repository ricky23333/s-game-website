'use strict';

module.exports = {
    port: 4000,
    siteDomain: 'http://120.27.92.228:4000',
    countDefault: 10,
    pageDefault: 0,
    apiDir: 'app/api/v1',
    accessExp: 60 * 60, // 权限令牌过期时间 1h 单位秒
    // debug 模式
    debug: false,
    // refreshExp 设置refresh_token的过期时间，默认一个月
    refreshExp: 60 * 60 * 24 * 30,
    // 暂不启用插件
    pluginPath: {
        // plugin name
        // poem: {
        //   // determine a plugin work or not
        //   enable: true,
        //   // path of the plugin that relatived the workdir
        //   path: "app/plugins/poem",
        //   // other config
        //   limit: 2
        // },
        // notify: {
        //   enable: true,
        //   path: "app/plugins/notify",
        //   retry: 2000
        // }
    }
};
