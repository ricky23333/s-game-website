/* eslint-disable class-methods-use-this */
import {post, get, put, _delete} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Comment {
    // constructor() {}

    // 类中的方法可以代表一个用户行为
    async addComment(info) {
        const res = await post('comment/normal', info, {handleError: true})
        return res
    }
    async getComment(id) {
        const res = await get(`comment/normal/${id}`)
        return res
    }
    async getComments(info) {
        const res = await get('comment/normal', info, {handleError: true})
        return res
    }
    async editComment(id, info) {
        const res = await put(`comment/normal/${id}`, info)
        return res
    }
    async recoverComment(info) {
        const res = await put(`comment/normal/recover`, info)
        return res
    }
    async deleteComment(id) {
        const res = await _delete(`comment/normal/${id}`)
        return res
    } 


    async addReply(info) {
        const res = await post('comment/reply', info, {handleError: true})
        return res
    }
    async getReply(id) {
        const res = await get(`comment/reply/${id}`)
        return res
    }
    async getReplys(info) {
        const res = await get('comment/reply', info, {handleError: true})
        return res
    }
    async editReply(id, info) {
        const res = await put(`comment/reply/${id}`, info)
        return res
    }
    async recoverReply(info) {
        const res = await put(`comment/reply/recover`, info)
        return res
    }
    async deleteReply(id) {
        const res = await _delete(`comment/reply/${id}`)
        return res
    }


    async getAdvise(id) {
        const res = await get(`comment/advise/${id}`)
        return res
    }
    async getAdvises(info) {
        const res = await get('comment/advise', info, {handleError: true})
        return res
    }
    async recoverAdvise(info) {
        const res = await put(`comment/advise/recover`, info)
        return res
    }
    async deleteAdvise(id) {
        const res = await _delete(`comment/advise/${id}`)
        return res
    }
}

export default new Comment()
