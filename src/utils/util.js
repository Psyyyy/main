import Vue from 'vue'
/**
 * 设置网页标题
 */
export function setPageTitle(title) {
  const subTitle = title ? `${title} - ` : ''
  document.title = `${subTitle}${process.env.VUE_APP_PAGE_TITLE}`
}

/**
 * 是否为数组
 */
export function isArray(value) {
  return Array.isArray(value)
}

/**
 * 是否为函数
 */
export function isFunction(value) {
  return typeof value === 'function'
}

/**
 * 是否为有效链接
 */
export function isValidUrl(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

// 日期格式转换
Vue.filter('dateFormat', (originVal) => {
  const dt = new Date(originVal * 1000)

  const y = dt.getFullYear()
  const m = (`${dt.getMonth() + 1}`).padStart(2, '0')
  const d = (`${dt.getDate()}`).padStart(2, '0')

  // const hh = (`${dt.getHours()}`).padStart(2, '0')
  // const mm = (`${dt.getMinutes()}`).padStart(2, '0')
  // const ss = (`${dt.getMilliseconds()}`).padStart(2, '0')

  // const DateStr = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  const DateStr = `${y}/${m}/${d}`

  return DateStr
})
export function dateformat(value) {
  const dt = new Date(value * 1000)

  const y = dt.getFullYear()
  const m = (`${dt.getMonth() + 1}`).padStart(2, '0')
  const d = (`${dt.getDate()}`).padStart(2, '0')

  // const hh = (`${dt.getHours()}`).padStart(2, '0')
  // const mm = (`${dt.getMinutes()}`).padStart(2, '0')
  // const ss = (`${dt.getMilliseconds()}`).padStart(2, '0')

  // const DateStr = `${y}-${m}-${d} ${hh}:${mm}:${ss}`
  const DateStr = `${y}/${m}/${d}`

  return DateStr
}
// 时间戳
export function getTimestamp(dateStr) {
  const newstr = dateStr.replace(/\//g, '/')
  const date = new Date(newstr)
  const time_str = date.getTime().toString()
  return time_str.substr(0, 10)
}
function doHandleMonth(month) {
  let m = month
  if (month.toString().length === 1) {
    m = `0${month}`
  }
  return m
}
// 获取最近七天日期
export function getDay(day) {
  const today = new Date()
  const targetday_milliseconds = today.getTime() + 1000 * 60 * 60 * 24 * day
  today.setTime(targetday_milliseconds) // 注意，这行是关键代码
  const tYear = today.getFullYear()
  let tMonth = today.getMonth()
  let tDate = today.getDate()
  tMonth = doHandleMonth(tMonth + 1)
  tDate = doHandleMonth(tDate)
  return `${tMonth}/${tDate}`
}
