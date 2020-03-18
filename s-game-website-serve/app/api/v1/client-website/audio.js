const Router = require("koa-router");
const { AudioDao } = require("../../../dao/audio");

//负责向网站客户端发送总点击量数据
const m_Router = new Router({
  prefix: "/v1/client-website/audio"
});

// 查询网站总点击量
m_Router.get("/list", async (ctx) => {
    const audioList = await AudioDao.getAudioList();
    // 返回结果
    ctx.response.status = 200;
    ctx.json(audioList);
  }
);
module.exports = m_Router;