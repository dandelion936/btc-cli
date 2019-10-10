import cookies from './util.cookies'
import db from './util.db'
import log from './util.log'

const util = {
  cookies,
  db,
  log
}

/**
 * @description 更新标题
 * @param {String} title 标题
 */
util.title = function (titleText) {
  const processTitle = process.env.VUE_APP_TITLE || 'D2Admin'
  window.document.title = `${processTitle}${titleText ? ` | ${titleText}` : ''}`
}

/**
 * @description 打开新页面
 * @param {String} url 地址
 */
util.open = function (url) {
  var a = document.createElement('a')
  a.setAttribute('href', url)
  a.setAttribute('target', '_blank')
  a.setAttribute('id', 'd2admin-link-temp')
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(document.getElementById('d2admin-link-temp'))
}

/**
 * @description 日期处理
 * @param {Number,String} data 传入的日期
 */
util.format = function (data) {
  if (arguments[0] === '') {
    return ''
  }
  var time = new Date(data)
  var y = time.getFullYear()
  var m = time.getMonth() + 1
  var d = time.getDate()
  var h = time.getHours()
  var f = time.getMinutes()
  var s = time.getSeconds()
  if (m <= 9) {
    m = '0' + m
  }
  if (d <= 9) {
    d = '0' + d
  }
  if (h <= 9) {
    h = '0' + h
  }
  if (f <= 9) {
    f = '0' + f
  }
  if (s <= 9) {
    s = '0' + s
  }
  if (arguments[1] === 'yyyy-MM-dd') {
    if (arguments[2] === 'zh') {
      return y + '年' + m + '月' + d + '日'
    } else {
      return y + '-' + m + '-' + d
    }
  }
  if (arguments[1] === 'HH') {
    return h
  }
  if (arguments[1] === 'yyyy-MM') {
    return y + '-' + m
  }
  if (arguments[1] === 'MM-dd') {
    if (arguments[2] === 'zh') {
      return m + '月' + d + '日'
    } else {
      return m + '-' + d
    }
  }
  if (arguments[1] === 'MM-dd HH:mm') {
    if (arguments[2] === 'zh') {
      return m + '月' + d + '日' + h + '时' + f + '分'
    } else {
      return m + '-' + d
    }
  }
  if (arguments[1] === 'HH:mm') {
    return h + ':' + f
  }
  if (arguments[1] === 'HH:mm:ss') {
    return h + ':' + f + ':' + s
  }
  return y + '-' + m + '-' + d + ' ' + h + ':' + f + ':' + s
}
/**
 * @description url 校验
 * @param {String} url
 */
util.IsURL = function (urlString) {
  let regExp = /^((https?|ftp|news):\/\/)?([a-z]([a-z0-9\-]*[\.。])+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel)|(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5]))(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&]*)?)?(#[a-z][a-z0-9_]*)?$/
  if (urlString.match(regExp)) {
    return true
  } else {
    return false
  }
}
/**
 * @description 货币处理
 * @param {Number} 金额
 */
util.money = function (value) {
  let symbol = ''
  if (value < 0) {
    symbol = '-'
  }
  value = Math.abs(value)
  if (!value) return 0
  else if (value < 1000) {
    return value
  }
  let text = value.toString()
  let arr = text.split('.')
  let l = arr[0].length
  let yu = l % 3
  let str = ''
  if (yu !== 0) {
    str = arr[0].substring(0, yu)
    for (let i = 0; i < l - yu; i = i + 3) {
      str += ',' + arr[0].substring(yu + i, yu + 3 + i)
    }
  } else {
    str = arr[0].substring(0, 3)
    for (let i = 3; i < l; i = i + 3) {
      str += ',' + arr[0].substring(i, 3 + i)
    }
  }
  if (arr[1]) {
    str += '.' + arr[1]
  }
  return symbol + str
}
util.sortOrder = function (val) {
  if (val) {
    if (val === 'descending') {
      return 'desc'
    } else if (val === 'ascending') {
      return 'asc'
    }
  } else {
    return ''
  }
}
// 驼峰命名转下划线命名
util.camelCaseToUnderScoreCase = function (str) {
  try {
    if (typeof str !== 'string') {
      throw new Error(`需要string，传入${typeof str}`)
    }
  } catch (err) {
    // console.log(err)
    return
  }
  // 字符串转成数组
  let arr = str.split('')
  let newStr = ''
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].charCodeAt(0) > 64 && arr[i].charCodeAt(0) < 91) {
      arr[i] = '_' + arr[i].toLowerCase()
    }
    newStr += arr[i]
  }
  return newStr
}
util.urlStringToArr = function (str) {
  try {
    if (typeof str !== 'string') {
      throw new Error(`需要string，传入${typeof str}`)
    }
  } catch (err) {
    console.log(err)
    return
  }
  str = str.replace(/\[/g, '')
  str = str.replace(/\]/g, '')
  str = str.replace(/, http/g, ',http')
  let arr = []
  arr = str.split(',http')
  let brr = []
  if (str === '') {
    brr = []
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i].includes('http')) {
        brr.push(arr[i])
      } else {
        brr.push('http' + arr[i])
      }
    }
  }
  return brr
}
// 微信图片替换成xiaocao01
util.wxImgUrlReplace = function (str) {
  try {
    if (typeof str !== 'string') {
      throw new Error(`需要string，传入${typeof str}`)
    }
  } catch (err) {
    console.log(err)
    return
  }
  let returnStr = str
  returnStr = returnStr.replace(/https:\/\/mmbiz.qpic.cn\//g, 'http://images.xiaocao01.cn/')
  returnStr = returnStr.replace(/http:\/\/mmbiz.qpic.cn\//g, 'http://images.xiaocao01.cn/')
  return returnStr
}
// 微信mpvoice处理
util.wxVideoUrlReplace = function (str) {
  try {
    if (typeof str !== 'string') {
      throw new Error(`需要string，传入${typeof str}`)
    }
  } catch (err) {
    console.log(err)
    return
  }
  let strCopy = str
  let returnStr = str
  let arr = []
  let pIndex = 0
  let sliceStr = []
  if (strCopy.includes('mpvoice')) {
    let leng = strCopy.split('</mpvoice>').length - 1
    for (let i = 0; i < leng; i++) {
      arr.push(0)
      if (i === 0) {
        arr[i] = strCopy.indexOf('</mpvoice>', 0)
      } else {
        arr[i] = strCopy.indexOf('</mpvoice>', arr[i - 1] + 4)
      }
      pIndex = returnStr.indexOf('</p>', arr[i])
      sliceStr.push(str.slice(arr[i], pIndex))
    }
  }
  for (let i = 0; i < sliceStr.length; i++) {
    returnStr = returnStr.replace(sliceStr[i], '</mpvoice>')
  }
  return returnStr
}
// 微信mpvoice转iframe
util.mpvoiceToIframe = function (str) {
  try {
    if (typeof str !== 'string') {
      throw new Error(`需要string，传入${typeof str}`)
    }
  } catch (err) {
    console.log(err)
    return
  }
  let returnStr = str
  returnStr = returnStr.replace(/<mpvoice frameborder="0"/g, '<iframe frameborder="0"')
  returnStr = returnStr.replace(/mpvoice>/g, 'iframe >')
  returnStr = returnStr.replace(/\/cgi-bin/g, 'https://mp.weixin.qq.com/cgi-bin')
  console.log(returnStr)
  return returnStr
}
// 微信iframe转mpvoice
util.iframeToMpvoice = function (str) {
  try {
    if (typeof str !== 'string') {
      throw new Error(`需要string，传入${typeof str}`)
    }
  } catch (err) {
    console.log(err)
    return
  }
  let returnStr = str
  returnStr = returnStr.replace(/<iframe frameborder="0"/g, '<mpvoice frameborder="0"')
  returnStr = returnStr.replace(/iframe >/g, 'mpvoice>')
  returnStr = returnStr.replace(/https:\/\/mp.weixin.qq.com\/cgi-bin/g, '/cgi-bin')
  return returnStr
}

export default util
