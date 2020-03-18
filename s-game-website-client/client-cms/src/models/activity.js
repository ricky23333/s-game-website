/* eslint-disable class-methods-use-this */
import {post, get, put, _delete} from '@/lin/plugins/axios'

// 我们通过 class 这样的语法糖使模型这个概念更加具象化，其优点：耦合性低、可维护性。
class Activity {
    // constructor() {}

    async editActivity(info) {
        const res = await put(`activity`, info)
        return res
    }

    async getActivity() {
        const res = await get('activity', {handleError: true})
        return res
    }
}

export default new Activity()
