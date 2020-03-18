'use strict';
const {MainTypeDao} = require('../../../dao/main-type');

const {
    loginRequired,
    LinRouter,
} = require('lin-mizar');

const publicInformationRouter = new LinRouter({
    prefix: '/v1/client-cms/public-information'
});

publicInformationRouter.linGet(
    'getPublicInformation',
    '/',
    {},
    loginRequired,
    async ctx => {
        const public_information = {};
        public_information.router_type = await  MainTypeDao.getMainType();
        ctx.response.status = 200;
        ctx.json(public_information);
    }
);

module.exports = {publicInformationRouter};
