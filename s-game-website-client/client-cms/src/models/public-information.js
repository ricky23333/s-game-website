import {post, get, put} from '@/lin/plugins/axios'

export default class PublicInformation {

    router_type = null;

    constructor(router_type) {
        this.router_type = router_type
    }

    /**
     * 获取通用信息，并返回PublicInformation实例
     */
    static async getPublicInformation() {
        const info = await get('public-information');

        info.router_type.forEach((item) => {
            item.navInfo = [];
            if (item.child_types) {
                let typeNameAry = item.child_types.split('*');
                typeNameAry.forEach((item1) => {
                    let tempNavInfo = {};
                    let childTypeNameAry = item1.split('|');
                    if (childTypeNameAry.length === 1) {
                        let typeInfoAry = childTypeNameAry[0].split('&');
                        if (typeInfoAry.length === 2) {
                            tempNavInfo.titleName = typeInfoAry[0];
                            tempNavInfo.titleRouter = typeInfoAry[1];
                        }
                    }
                    else {
                        tempNavInfo.titleRouter = null;
                        tempNavInfo.childNav = [];
                        childTypeNameAry.forEach((item2 => {
                            let typeInfoAry = item2.split('&');
                            if (typeInfoAry.length === 1) {
                                tempNavInfo.titleName = typeInfoAry[0];
                            }
                            else if (typeInfoAry.length === 2) {
                                tempNavInfo.childNav.push({
                                    titleName: typeInfoAry[0],
                                    titleRouter: typeInfoAry[1],
                                })
                            }
                        }));
                    }
                    item.navInfo.push(tempNavInfo);
                });
            }
        });
        console.log('routerInfo', info.router_type);
        return new PublicInformation(
            info.router_type,
        )
    }
}
