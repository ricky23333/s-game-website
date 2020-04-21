import user from '../../api/user'
import {
  saveUserInfo,
  clearUserInfo,
  loadUserInfo,
  saveSearchHistory,
  getSearchHistory,
  clearSearchHistory,
} from '../../libs/storage'

const state = {
  guestDate: null,
  showActivityFlag: true,
  searchHistory: null,
  showContactUsMessageFlag: false,
  switchBackgroundStarsFlag: false,
  windowResizeFlag:false,//窗口大小发生变动时，全局改变此值
  userIconUrlConfig: [
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-0.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-1.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-2.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-3.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-4.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-5.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-6.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-7.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-8.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-9.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-10.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-11.png',
    'https://cdn.ahyaya.net/images/static/images/homepage/user-icon/user-icon-12.png',
  ],
};

const getters = {
  // 单个参数
  mainRouterIndex: (state) => (mainRouterName) => {
    if (state.guestDate && state.guestDate.router_type) {
      return state.guestDate.router_type.findIndex(item => item.router_name === mainRouterName);
    }
  },

  childTypeName: (state) => (childTypeEnglishName, mainTypeIndex) => {
    try {
      if (state.guestDate && state.guestDate.router_type) {
        let tarItem = state.guestDate.router_type[mainTypeIndex].navInfo.find(item => item.titleRouter === childTypeEnglishName);
        if (tarItem) {
          return tarItem.titleName;
        }
      }
    } catch (e) {
      return null;
    }
  },

  checkIsMobile() {
    //判断当前运行环境为移动端或PC
    let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)
    return flag;
  },

  translateDateInfo: (state) => (oriDate) => {
    //将时间转换为xx天前、xx小时前的样式
    let tDate = new Date();
    let tYear = tDate.getFullYear();
    let tMonth = tDate.getMonth() + 1;
    let tDay = tDate.getDate();
    let tHour = tDate.getHours();
    let tMinute = tDate.getMinutes();
    // let tSecond = tDate.getSeconds();

    let oriYear = parseInt(oriDate.split('-')[0]);
    if (oriYear < 0) return;
    if (oriYear !== tYear) {
      return (tYear - oriYear) + '年前';
    }

    let oriMonth = parseInt(oriDate.split('-')[1]);
    if (oriMonth < 0) return;
    if (oriMonth !== tMonth) {
      return (tMonth - oriMonth) + '月前';
    }

    let oriDate_1 = oriDate.split('T')[0];
    let oriDate_2 = oriDate.split('T')[1];
    let oriDay = parseInt(oriDate_1.split('-')[2]);
    if (oriDay < 0) return;
    if (oriDay !== tDay) {
      return (tDay - oriDay) + '天前';
    }
    let oriHour = parseInt(oriDate_2.split(':')[0]);
    if (oriHour < 0) return;
    oriHour += 8;
    if (oriHour !== tHour) {
      return (tHour - oriHour) + '小时前';
    }

    let oriMinute = parseInt(oriDate_2.split(':')[1]);
    if (oriMinute < 0) return;
    if (oriMinute !== tMinute) {
      return (tMinute - oriMinute) + '分钟前';
    }
    // let oriSecond = parseInt(oriDate_2.split(':')[2].split('.')[0]);
    // if (oriSecond < 0) return;
    // console.log('second',tSecond,oriSecond)
    // if (oriSecond !== tSecond) {
    //   return '刚刚';
    // }
    return '刚刚';
  },
}

const mutations = {
  //对接收到的数据进行处理
  INIT_GUESTDATE(state, data) {
    state.guestDate = data;
    state.guestDate.router_type.forEach((item) => {
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
  },

  SET_SEARCH_HISTORY(state, date) {
    state.searchHistory = date;
  },
  SET_SHOW_CONTACT_US(state,) {
    state.showContactUsMessageFlag = true;
  },
  SET_HIDE_CONTACT_US(state,) {
    state.showContactUsMessageFlag = false;
  },
  SWITCH_BACKGROUND_STARS(state,) {
    state.switchBackgroundStarsFlag = !state.switchBackgroundStarsFlag;
  },
};

const actions = {
  async getUserDate({state, commit}, params) {
    let res = await user.userData(params);
    commit('INIT_GUESTDATE', res.data);
    return res;
  },

  async getLocalStorageUserDate({state, commit}) {
    return loadUserInfo();
  },

  async setLocalStorageUserDate({state, commit}, params) {
    return saveUserInfo(params);
  },

  async clearLocalStorageUserDate({state, commit}) {
    return clearUserInfo();
  },

  async getSearchHistoryDate({state, commit}) {
    commit('SET_SEARCH_HISTORY', getSearchHistory());
  },

  async setSearchHistoryDate({state, commit}, params) {
    commit('SET_SEARCH_HISTORY', saveSearchHistory(params));
  },

  async clearSearchHistoryDate({state, commit}) {
    let res = clearSearchHistory();
    if (res) {
      commit('SET_SEARCH_HISTORY', getSearchHistory());
    }
  },

  async showContactUsMessageBox({state, commit}) {
    commit('SET_SHOW_CONTACT_US');
  },

  async hideContactUsMessageBox({state, commit}) {
    commit('SET_HIDE_CONTACT_US');
  },

  async switchBackgroundStars({state, commit}) {
    commit('SWITCH_BACKGROUND_STARS');
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}
