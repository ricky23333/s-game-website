'use strict';

const {LinRouter, ParametersException, loginRequired, groupRequired,logger} = require('lin-mizar');
const {LocalUploader} = require('../../../extensions/file/local-uploader');
const {getSafeParamId} = require('../../../libs/util');
const send = require('koa-send');
const {
    GetFileListValidator
} = require('../../../validators/file');

const file = new LinRouter({
    prefix: '/v1/client-cms/file'
});

file.linPost(
    'uploadImages',
    '/upload-image',
    {
        auth: '上传图片',
        module: '文件',
        mount: true
    },
    groupRequired,
    logger("{user.username}上传了图片"),
    async ctx => {
        const files = await ctx.multipart();
        if (files.length < 1) {
            throw new ParametersException({msg: '未找到符合条件的文件资源'});
        }
        const uploader = new LocalUploader('app/assets/images/upload-image');
        const arr = await uploader.upload(files, '/assets/images/upload-image/', 1);
        ctx.json(arr);
    });

file.linGet(
    'getImage',
    '/get-image',
    {
        auth: '查看图片',
        module: '文件',
        mount: true
    },
    groupRequired,
    async ctx => {
        const v = await new GetFileListValidator().validate(ctx);
        const pageIndex = v.get('query.page');
        const pageCount = v.get('query.pageCount');
        const type = v.get('query.type');
        let desc = v.get('query.desc');
        const uploader = new LocalUploader('app/assets/images/upload-image');
        const images = await uploader.get(pageIndex, pageCount, type, desc, '/assets/images/upload-image/');
        ctx.json(images);
    });

file.get('/download-image/:id', async function (ctx) {
    const id = getSafeParamId(ctx);
    const uploader = new LocalUploader('app/assets/images/upload-image');
    const info = await uploader.getDownloadInfo(id);
    ctx.attachment(info.name);
    await send(ctx, info.name, {root: info.absoluteDir});
});

file.linDelete(
    'deleteImage',
    '/delete-image/:id',
    {
        auth: '删除图片',
        module: '文件',
        mount: true
    },
    groupRequired,
    logger("{user.username}删除了图片"),
    async ctx => {
        const id = getSafeParamId(ctx);
        const uploader = new LocalUploader('app/assets/images/upload-image');
        await uploader.delete(id);
        ctx.success({
            msg: '删除文件成功'
        });
    });

file.linPost(
    'uploadVideos',
    '/upload-video',
    {
        auth: '上传视频',
        module: '文件',
        mount: true
    },
    groupRequired,
    logger("{user.username}上传了视频"),
    async ctx => {
        const files = await ctx.multipart();
        if (files.length < 1) {
            throw new ParametersException({msg: '未找到符合条件的文件资源'});
        }
        const uploader = new LocalUploader('app/assets/videos/upload-video');
        const arr = await uploader.upload(files, '/assets/videos/upload-video/', 2);
        ctx.json(arr);
    });

file.linGet(
    'getVideo',
    '/get-video',
    {
        auth: '查看视频',
        module: '文件',
        mount: true
    },
    groupRequired,
    async ctx => {
        const v = await new GetFileListValidator().validate(ctx);
        const pageIndex = v.get('query.page');
        const pageCount = v.get('query.pageCount');
        const type = v.get('query.type');
        let desc = v.get('query.desc');
        const uploader = new LocalUploader('app/assets/videos/upload-video');
        const videos = await uploader.get(pageIndex, pageCount, type, desc, '/assets/videos/upload-video/');
        ctx.json(videos);
    });

file.get('/download-video/:id', async function (ctx) {
    const id = getSafeParamId(ctx);
    const uploader = new LocalUploader('app/assets/videos/upload-video');
    const info = await uploader.getDownloadInfo(id);
    ctx.attachment(info.name);
    await send(ctx, info.name, {root: info.absoluteDir});
});

file.linDelete(
    'deleteVideo',
    '/delete-video/:id',
    {
        auth: '删除视频',
        module: '文件',
        mount: true
    },
    groupRequired,
    logger("{user.username}删除了视频"),
    async ctx => {
        const id = getSafeParamId(ctx);
        const uploader = new LocalUploader('app/assets/videos/upload-video');
        await uploader.delete(id);
        ctx.success({
            msg: '删除文件成功'
        });
    });

file.linPost(
  'uploadAudios',
  '/upload-audio',
  {
    auth: '上传音频',
    module: '文件',
    mount: true
  },
  groupRequired,
  logger("{user.username}上传了音频"),
  async ctx => {
    const files = await ctx.multipart();
    if (files.length < 1) {
      throw new ParametersException({msg: '未找到符合条件的文件资源'});
    }
    const uploader = new LocalUploader('app/assets/audios/upload-audio');
    const arr = await uploader.upload(files, '/assets/audios/upload-audio/', 3);
    ctx.json(arr);
  });

file.linGet(
  'getAudio',
  '/get-audio',
  {
    auth: '查看音频',
    module: '文件',
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new GetFileListValidator().validate(ctx);
    const pageIndex = v.get('query.page');
    const pageCount = v.get('query.pageCount');
    const type = v.get('query.type');
    let desc = v.get('query.desc');
    const uploader = new LocalUploader('app/assets/audios/upload-audio');
    const audios = await uploader.get(pageIndex, pageCount, type, desc, '/assets/audios/upload-audio/');
    ctx.json(audios);
  });

file.get('/download-audio/:id', async function (ctx) {
  const id = getSafeParamId(ctx);
  const uploader = new LocalUploader('app/assets/audios/upload-audio');
  const info = await uploader.getDownloadInfo(id);
  ctx.attachment(info.name);
  await send(ctx, info.name, {root: info.absoluteDir});
});

file.linDelete(
  'deleteAudio',
  '/delete-audio/:id',
  {
    auth: '删除音频',
    module: '文件',
    mount: true
  },
  groupRequired,
  logger("{user.username}删除了音频"),
  async ctx => {
    const id = getSafeParamId(ctx);
    const uploader = new LocalUploader('app/assets/audios/upload-audio');
    await uploader.delete(id);
    ctx.success({
      msg: '删除文件成功'
    });
  });
module.exports = {file};
