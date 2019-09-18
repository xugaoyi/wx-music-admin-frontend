// 格式化时间
export default function formatTime(date, format = '-') { // date 数据格式为 date, format 为分隔日期的符号,默认为'-'
  let fmt = `yyyy${format}MM${format}dd hh:mm:ss` // 预定格式

  const o = {
    // + 正则中的1个或多个
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }

  if (/(y+)/.test(fmt)) {
    // $1 表示正则中的第一个，即(y+)
    fmt = fmt.replace(RegExp.$1, date.getFullYear()) // replace 替换
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, o[k].toString().length === 1 ? '0' + o[k] : o[k])
    }
  }

  return fmt
}
