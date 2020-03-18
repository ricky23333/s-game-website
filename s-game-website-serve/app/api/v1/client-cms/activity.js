'use strict';

const {
    LinRouter,
    NotFound,
    groupRequired,
    disableLoading,
    logger
} = require('lin-mizar');

const {
    UpdateActivityValidator,
} = require('../../../validators/activity');

const {PositiveIdValidator} = require('../../../validators/common');
const {ActivityTypeDao} = require('../../../dao/activity');

const activityApi = new LinRouter({
    prefix: '/v1/client-cms/activity'
});

const ActivityTypeDto = new ActivityTypeDao();

activityApi.get('/', async ctx => {
    const date = await ActivityTypeDto.getActivityType();
    if (!date) {
        throw new NotFound({
            msg: '没有找到相关数据'
        });
    }
    ctx.json(date);
});

activityApi.linPut(
    'updateActivityType',
    '/',
    {
        auth: '设置活动弹窗',
        module: '活动弹窗',
        mount: true
    },
    groupRequired,
    logger("{user.username}更新了活动弹窗配置"),
    async ctx => {
        const v = await new UpdateActivityValidator().validate(ctx);
        await ActivityTypeDto.setActivityType(v);
        ctx.success({
            msg: '活动弹窗设置成功'
        });
    }
);

module.exports = {activityApi, [disableLoading]: false};