import request from '@/utils/request'

export function login(username, password, code, uuid) {
  return request({
    url: 'auth/login',
    method: 'post',
    data: {
      username,
      password,
      code,
      uuid
    }
  })
}

export function getInfo() {
  return request({
    url: 'auth/info',
    method: 'get'
  })
}

export function getCodeImg() {
  return request({
    url: 'auth/vCode',
    method: 'get'
  })
}


export function registerEmailCode(data) {
  return request({
    url: 'api/register/code',
    method: 'post',
    data
  })
}

export function register(data) {
  return request({
    url: 'api/register',
    method: 'post',
    data
  })
}

export function switchLang(lang) {
  return request({
    url: 'api/i18n?i18n_language='+lang,
    method: 'get'
  })
}

