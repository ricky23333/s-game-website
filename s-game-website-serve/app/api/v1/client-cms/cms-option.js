'use strict';
const {CmsOptionDao} = require('../../../dao/cms-option');
const {CreateOrUpdateCmsOptionContentValidator} = require('../../../validators/cms-option');

const {
    adminRequired,
    loginRequired,
    LinRouter,
    logger
} = require('lin-mizar');

const cmsOptionRouter = new LinRouter({
    prefix: '/v1/client-cms/cms-option'
});

cmsOptionRouter.linGet(
    'getCmsOptionContent',
    '/content',
    {},
    loginRequired,
    async ctx => {
        let content = await  CmsOptionDao.getCmsOptionContent();
        ctx.json(content);
    }
);

cmsOptionRouter.linPut(
    'setCmsOptionContent',
    '/content',
    {
        auth: '修改告示板内容',
        module: '信息',
        mount: true
    },
    adminRequired,
    logger("管理员{user.username}修改了告示板内容"),
    async ctx => {
        const v = await new CreateOrUpdateCmsOptionContentValidator().validate(ctx);
        await  CmsOptionDao.setCmsOptionContent(v);
        ctx.success({
            msg: '修改成功'
        });
    }
);

module.exports = {cmsOptionRouter};
