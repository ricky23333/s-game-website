import cookies from 'js-cookie'

/**
 * 存储tokens
 * @param {string} accessToken
 * @param {string} refreshToken
 */
export function saveTokens(accessToken, refreshToken) {
    // 存储tokens tokens只进入cookies，不进入vuex全局管理
    cookies.set('access_token', `Bearer ${accessToken}`)
    cookies.set('refresh_token', `Bearer ${refreshToken}`)
}

/**
 * 存储access_token
 * @param {string} accessToken
 */
export function saveAccessToken(accessToken) {
    cookies.set('access_token', `Bearer ${accessToken}`)
}

/**
 * 获得某个token
 * @param {string} tokenKey
 */
export function getToken(tokenKey) {
    return cookies.get(tokenKey)
}

/**
 * 移除token
 */
export function removeToken() {
    cookies.remove('access_token')
    cookies.remove('refresh_token')
    sessionStorage.removeItem('flag')
    sessionStorage.clear()
    localStorage.clear()
}

/**
 * 存储AccountDate
 * @param {string} accessToken
 */
export function saveAccountDate(username, password) {
    const Base64 = require('js-base64').Base64;
    let codePassWord = Base64.encode(password);
    cookies.set('username', username);
    cookies.set('password', codePassWord);
}

/**
 * 获得AccountDate
 * @param {string} tokenKey
 */
export function getAccountDate() {
    const Base64 = require('js-base64').Base64;
    let username = cookies.get('username');
    let password = cookies.get('password');
    if (!username || !password) {
        removeAccountDate();
        return null;
    }
    let passwordStr = Base64.decode(password);
    if (!username || !passwordStr) {
        removeAccountDate();
        return null;
    }
    return {
        username,
        password: passwordStr
    }
}

/**
 * 移除AccountDate
 */
export function removeAccountDate() {
    cookies.remove('username')
    cookies.remove('password')
}