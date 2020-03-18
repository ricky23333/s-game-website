/* eslint-disable class-methods-use-this */
import {post, get, put, _delete} from '@/lin/plugins/axios'

class Audio {
    // constructor() {}

    // 类中的方法可以代表一个用户行为
    async addAudio(info) {
        const res = await post('audio', info, {handleError: true})
        return res
    }
    async getAudio(id) {
        const res = await get(`audio/${id}`)
        return res
    }
    async getAudios(info) {
        const res = await get('audio', info, {handleError: true})
        return res
    }
    async editAudio(id, info) {
        const res = await put(`audio/${id}`, info)
        return res
    }
    async recoverAudio(info) {
        const res = await put(`audio/recover`, info)
        return res
    }
    async deleteAudio(id) {
        const res = await _delete(`audio/${id}`)
        return res
    }
}

export default new Audio()
