/* eslint-disable class-methods-use-this */
import {post, get, put, _delete} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Article {
    // constructor() {}

    // 类中的方法可以代表一个用户行为
    async addArticle(info) {
        const res = await post('article', info, {handleError: true})
        return res
    }

    // 在这里通过 async await 语法糖让代码同步执行
    // 1. await 一定要搭配 async 来使用
    // 2. await 后面跟的是一个 Promise 对象
    async getArticle(id) {
        const res = await get(`article/${id}`)
        return res
    }

    async editArticle(id, info) {
        const res = await put(`article/${id}`, info)
        return res
    }

    async recoverArticle(info) {
        const res = await put(`article/recover`, info)
        return res
    }

    async deleteArticle(id, info) {
        const res = await _delete(`article/${id}`, info)
        return res
    }

    async getArticles(info) {
        const res = await get('article', info, {handleError: true})
        return res
    }
}

export default new Article()
