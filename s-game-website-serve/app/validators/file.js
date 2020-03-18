'use strict';

const { LinValidator, Rule } = require('lin-mizar');

class GetFileListValidator extends LinValidator {
    constructor () {
        super();
    }
}

module.exports = {
    GetFileListValidator,
};
