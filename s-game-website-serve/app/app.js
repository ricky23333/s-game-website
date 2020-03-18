'use strict';

const Koa = require('koa');
const KoaBodyParser = require('koa-bodyparser');
const cors = require('@koa/cors');
const { config } = require('lin-mizar/lin/config');
const mount = require('koa-mount');
const serve = require('koa-static');

// 解决跨域问题
function applyCors (app) {
    app.use(cors());
}

// 参数解析（上传文件）
function applyBodyParse (app) {
    app.use(KoaBodyParser());
}

// 静态资源路径
function applyStatic (app, prefix = '/assets') {
    const assetsDir = config.getItem('file.storeDir', 'app/static');
    app.use(mount(prefix, serve(assetsDir)));
}

// 直接访问服务器时显示页
function indexPage (app) {
    app.context.manager.loader.mainRouter.get('/', async ctx => {
        ctx.type = 'html';
        ctx.body = `<style type="text/css">*{ padding: 0; margin: 0; } div{ padding: 4px 48px;} a{color:#2E5CD5;cursor:
      pointer;text-decoration: none} a:hover{text-decoration:underline; } body{ background: #fff; font-family:
      "Century Gothic","Microsoft yahei"; color: #333;font-size:18px;} h1{ font-size: 100px; font-weight: normal;
      margin-bottom: 12px; } p{ line-height: 1.6em; font-size: 42px }</style><div style="padding: 24px 48px;"><p>
      Hello <br/><span style="font-size:30px">Hello,World!</span></p></div> `;
    });
}

async function createApp () {
    const app = new Koa();
    applyBodyParse(app);
    applyCors(app);
    applyStatic(app);
    config.initApp(app);
    const { log, error, Lin, multipart } = require('lin-mizar');
    app.use(log);
    app.on('error', error);
    const lin = new Lin();
    await lin.initApp(app, true, true, null, null, null);
    indexPage(app);
    multipart(app);
    return app;
}

module.exports = { createApp };