const Router = require("koa-router");
const {HitcountDao} = require("../../../dao/hitcount");
const {MainTypeDao} = require("../../../dao/main-type");

//负责向网站客户端发送总点击量数据
const m_Router = new Router({
    prefix: '/v1/client-website/user'
});

// 查询网站总点击量
m_Router.get("/guest", async (ctx) => {
        const guset_date = {};
        guset_date.hit_count = await  HitcountDao.getHitCount();
        guset_date.router_type = await  MainTypeDao.getMainType();
        guset_date.activity_type = await MainTypeDao.getActivityType();
        ctx.response.status = 200;
        ctx.json(guset_date);
    }
);

//添加记录网站总点击量的数据库条目，生产环境下请禁用此api!!!
// m_Router.get("/addMysqlHitcountDate", async (ctx) => {
//         await  HitcountDao.createHitCountDate();
//         ctx.res.status = 200;
//     }
// );
module.exports = m_Router;