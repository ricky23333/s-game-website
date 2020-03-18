'use strict';

const {LinValidator, Rule} = require('lin-mizar');
const {config} = require('lin-mizar/lin/config');

class GetCommentOrReplyListValidator extends LinValidator {
  constructor () {
    super();
  }
}

class CreateCommentValidator extends LinValidator {
  constructor () {
    super();
    this.nickname = new Rule('isLength', '必须传入用户昵称',1,16);
    this.email = new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱');
    this.head_icon_id = new Rule('isInt', '必须传入用户头像');
    this.content = new Rule('isLength', '必须传入content',1,300);
    this.article_id =  new Rule('isInt', 'article_id');
  }
}

class CreateReplyValidator extends LinValidator {
  constructor () {
    super();
    this.nickname = new Rule('isLength', '必须传入用户昵称',1,16);
    this.email = new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱');
    this.head_icon_id = new Rule('isInt', '必须传入用户头像');
    this.content = new Rule('isLength', '必须传入content',1,300);
    this.parent_comment_id =  new Rule('isInt', '必须传入回复评论ID');
    this.reply_user_name =  new Rule('isLength', '必须传入回复用户昵称',1,16);
  }
}

class CreateAdviseValidator extends LinValidator {
  constructor () {
    super();
    this.nickname = new Rule('isLength', '必须传入用户昵称',1,16);
    this.email = new Rule('isEmail', '电子邮箱不符合规范，请输入正确的邮箱');
    this.content = new Rule('isLength', '必须传入content',1,300);
  }
}


module.exports = {
  CreateCommentValidator,
  CreateReplyValidator,
  CreateAdviseValidator,
  GetCommentOrReplyListValidator,
};