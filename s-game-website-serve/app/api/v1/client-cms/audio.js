"use strict";
const {
  LinRouter,
  NotFound,
  groupRequired,
  disableLoading,
  logger
} = require("lin-mizar");
const { getSafeParamId } = require("../../../libs/util");
const {
  GetAudioListValidator,
  CreateAudioValidator
} = require("../../../validators/audio");

const { PositiveIdValidator } = require("../../../validators/common");
const { AudioDao } = require("../../../dao/audio");

const audioApi = new LinRouter({
  prefix: "/v1/client-cms/audio"
});

const AudioDto = new AudioDao();

audioApi.linGet(
  "getAudio",
  "/",
  {
    auth: "查看音乐",
    module: "音乐",
    mount: true
  },
  groupRequired,
  async ctx => {
    const v = await new GetAudioListValidator().validate(ctx);
    const audios = await AudioDto.getAudioListWithCms(v);
    ctx.json(audios);
  });

audioApi.linPost(
  "createAudio",
  "/",
  {
    auth: "创建音乐",
    module: "音乐",
    mount: true
  },
  groupRequired,
  logger("{user.username}创建了音乐"),
  async ctx => {
    const v = await new CreateAudioValidator().validate(ctx);
    await AudioDto.createorUpdateAudioWithCms(v, true);
    ctx.success({
      msg: "创建音乐成功"
    });
  }
);

audioApi.linPut(
  "recoverAudio",
  "/recover",
  {
    auth: "恢复音乐",
    module: "音乐",
    mount: true
  },
  groupRequired,
  logger("{user.username}将音乐从被删除列表恢复"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    await AudioDto.recoverAudioWithCms(v, 0);
    ctx.success({
      msg: "恢复音乐成功"
    });
  }
);

audioApi.linPut(
  "updateAudio",
  "/:id",
  {
    auth: "更新音乐",
    module: "音乐",
    mount: true
  },
  groupRequired,
  logger("{user.username}更新了音乐"),
  async ctx => {
    const v = await new CreateAudioValidator().validate(ctx);
    const id = getSafeParamId(ctx);
    await AudioDto.createorUpdateAudioWithCms(v, false, id);
    ctx.success({
      msg: "更新音乐成功"
    });
  }
);

audioApi.linDelete(
  "deleteAudio",
  "/:id",
  {
    auth: "删除音乐",
    module: "音乐",
    mount: true
  },
  groupRequired,
  logger("{user.username}删除了音乐"),
  async ctx => {
    const v = await new PositiveIdValidator().validate(ctx);
    const id = v.get("path.id");
    await AudioDto.deleteAudioWithCms(id);
    ctx.success({
      msg: "删除音乐成功"
    });
  });

module.exports = { audioApi, [disableLoading]: false };