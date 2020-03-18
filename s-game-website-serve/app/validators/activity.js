'use strict';

const {LinValidator, Rule} = require('lin-mizar');

class UpdateActivityValidator extends LinValidator {
    constructor() {
        super();
        this.activity_type = new Rule('isInt', 'activity_type必须为正整数', {min: 0})
    }
}

module.exports = {
    UpdateActivityValidator,
};
