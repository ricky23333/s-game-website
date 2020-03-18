const Router = require("koa-router");

//向网站客户端发送主页所有要显示的数据
const m_Router = new Router({
    prefix: '/v1/client-website/homepage'
});

// 获取网站主页所有要显示的数据
m_Router.get("/", async (ctx) => {
        const homepage_date = {};
        ctx.response.status = 200;
        ctx.json(homepage_date);
        // ctx.body = resolve.json(homepage_date);
    }
);

module.exports = m_Router;