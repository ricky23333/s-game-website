/* eslint-disable new-cap */
'use strict';

const {
    LinRouter,
    getTokens,
    loginRequired,
    adminRequired,
    refreshTokenRequiredWithUnifyException,
    Failed,
    logger
} = require('lin-mizar');

const {
    RegisterValidator,
    LoginValidator,
    UpdateInfoValidator,
    ChangePasswordValidator,
    AvatarUpdateValidator
} = require('../../../validators/user');

const {UserDao} = require('../../../dao/user');

const user = new LinRouter({
    prefix: '/v1/client-cms/user'
});

const userDao = new UserDao();

user.linPost(
    'userRegister',
    '/register',
    {
        auth: '注册',
        module: '用户',
        mount: false
    },
    adminRequired,
    logger('管理员{user.username}新建了一个用户'),
    async ctx => {
        const v = await new RegisterValidator().validate(ctx);
        await userDao.createUser(ctx, v);
        ctx.success({
            msg: '用户创建成功'
        });
    }
);

user.linPost(
    'userLogin',
    '/login',
    {
        auth: '登陆',
        module: '用户',
        mount: false
    },
    async ctx => {
        const v = await new LoginValidator().validate(ctx);
        let user = await ctx.manager.userModel.verify(
            v.get('body.username'),
            v.get('body.password')
        );
        const {accessToken, refreshToken} = getTokens(user);
        ctx.json({
            access_token: accessToken,
            refresh_token: refreshToken
        });
    }
);

user.linPut(
    'userUpdate',
    '/',
    {
        auth: '用户更新信息',
        module: '用户',
        mount: false
    },
    loginRequired,
    logger('{user.username}更新了用户信息'),
    async ctx => {
        const v = await new UpdateInfoValidator().validate(ctx);
        await userDao.updateUser(ctx, v);
        ctx.success({
            msg: '操作成功'
        });
    }
);

user.linPut(
    'userUpdatePassword',
    '/change_password',
    {
        auth: '修改密码',
        module: '用户',
        mount: false
    },
    loginRequired,
    logger('{user.username}修改了密码'),
    async ctx => {
        const v = await new ChangePasswordValidator().validate(ctx);
        let user = ctx.currentUser;
        const ok = user.changePassword(
            v.get('body.old_password'),
            v.get('body.new_password')
        );
        if (!ok) {
            throw new Failed({
                msg: '修改密码失败，你可能输入了错误的旧密码'
            });
        }
        user.save();
        ctx.success({
            msg: '密码修改成功'
        });
    }
);

user.linGet(
    'userGetToken',
    '/refresh',
    {
        auth: '刷新令牌',
        module: '用户',
        mount: false
    },
    refreshTokenRequiredWithUnifyException,
    async ctx => {
        let user = ctx.currentUser;
        const {accessToken, refreshToken} = getTokens(user);
        ctx.json({
            access_token: accessToken,
            refresh_token: refreshToken
        });
    }
);

user.linGet(
    'userGetAuths',
    '/auths',
    {
        auth: '查询自己拥有的权限',
        module: '用户',
        mount: false
    },
    loginRequired,
    async ctx => {
        let user = await userDao.getAuths(ctx);
        ctx.json(user);
    }
);

user.linGet(
    'getInformation',
    '/information',
    {
        auth: '查询自己信息',
        module: '用户',
        mount: false
    },
    loginRequired,
    async ctx => {
        const user = ctx.currentUser;
        ctx.json(user);
    }
);

user.put('/avatar', loginRequired, async ctx => {
    const v = await new AvatarUpdateValidator().validate(ctx);
    const avatar = v.get('body.avatar');
    let user = ctx.currentUser;
    user.avatar = avatar;
    await user.save();
    ctx.success({msg: '更新头像成功'});
});

module.exports = {user};
