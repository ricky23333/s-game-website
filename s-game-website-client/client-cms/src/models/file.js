/* eslint-disable class-methods-use-this */
import {post, get, put, _delete} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class File {
    async deleteImage(id) {
        const res = await _delete(`file/delete-image/${id}`)
        return res
    }
    async getImages(info) {
        const res = await get('file/get-image', info, {handleError: true})
        return res
    }

    async deleteVideo(id) {
        const res = await _delete(`file/delete-video/${id}`)
        return res
    }
    async getVideos(info) {
        const res = await get('file/get-video', info, {handleError: true})
        return res
    }

    async deleteAudio(id) {
        const res = await _delete(`file/delete-audio/${id}`)
        return res
    }
    async getAudios(info) {
        const res = await get('file/get-audio', info, {handleError: true})
        return res
    }
}

export default new File()
