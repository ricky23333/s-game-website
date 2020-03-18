'use strict';

module.exports = {
  file: {
    storeDir: 'app/assets',
    singleLimit: 1024 * 1024 * 1024,
    totalLimit: 1024 * 1024 * 10240,
    nums: 10,
    // exclude: [],
    include:['.png','.gif','.svg','.jpg','.bmp','.mp4','.flv','.mp3']
  }
};
