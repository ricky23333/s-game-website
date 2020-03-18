'use strict';

const { LinValidator, Rule } = require('lin-mizar');
const { PositiveIdValidator} = require('./common');

class GetArticleListValidator extends LinValidator {
    constructor () {
        super();
        this.main_type = new Rule('isNotEmpty', '必须传入main_type');
        this.child_type = new Rule('isNotEmpty', '必须传入child_type');
    }
}

class ArticleSearchValidator extends LinValidator {
    constructor () {
        super();
        this.keyword = new Rule('isNotEmpty', '必须传入搜索关键字');
    }
}

class CreateOrUpdateArticleValidator extends LinValidator {
    constructor () {
        super();
        this.main_type = new Rule('isNotEmpty', '必须传入main_type');
        this.child_type = new Rule('isNotEmpty', '必须传入child_type');
        this.title = new Rule('isNotEmpty', '必须传入title');
        this.content = new Rule('isNotEmpty', '必须传入content');
        this.show_type =  new Rule('isNotEmpty', '必须传入show_type');
    }
}

class RecoverArticleValidator extends LinValidator {
    constructor () {
        super();
        this.main_type = new Rule('isNotEmpty', '必须传入main_type');
        this.child_type = new Rule('isNotEmpty', '必须传入child_type');
        this.id = new Rule('isNotEmpty', '必须传入id');
    }
}

class GetArticleValidator extends PositiveIdValidator {
    constructor () {
        super();
        this.main_type = new Rule('isNotEmpty', '必须传入main_type');
        this.child_type = new Rule('isNotEmpty', '必须传入child_type');
    }
}

module.exports = {
    CreateOrUpdateArticleValidator,
    RecoverArticleValidator,
    ArticleSearchValidator,
    GetArticleValidator,
    GetArticleListValidator
};
