// import Vue from 'vue'

export function setToken(value) {
  if (typeof value !== 'string') {
    throw new Error('参数应为 string')
  }
  console.log('token', value)
  window.sessionStorage.setItem('token', value)
  // Vue.ls.set('token', value)
}

export function getToken() {
  // return Vue.ls.get('token')
  return window.sessionStorage.getItem('token')
}

export function removeToken() {
  // return Vue.ls.remove('token')
  return window.sessionStorage.removeItem('token')
}
