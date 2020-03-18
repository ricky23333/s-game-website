'use strict';

const {LinValidator, Rule} = require('lin-mizar');
const {config} = require('lin-mizar/lin/config');

class GetAudioListValidator extends LinValidator {
  constructor () {
    super();
  }
}

class CreateAudioValidator extends LinValidator {
  constructor () {
    super();
    this.audio_url = new Rule('isLength', '必须传入音乐url',1,500);
  }
}

module.exports = {
  GetAudioListValidator,
  CreateAudioValidator,
};