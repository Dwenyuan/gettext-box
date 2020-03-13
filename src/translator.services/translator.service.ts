import { stringify } from 'querystring'
import { MD5 } from './md5'
import { baiduUrl } from './config'

const Axios = require('axios')

export function translatorByBaidu (param) {
  // FIXME: 这里APPID写死了，应该改动一下的，不过无所谓了
  const appid = '20200308000394792'
  const key = '_0Tw6r0QjfHnVLcp63hR'
  const salt = new Date().getTime()
  const { query, from, to } = param
  const str1 = appid + query + salt + key
  const sign = MD5(str1)
  const urlParam = stringify({
    q: query,
    appid,
    salt,
    from,
    to,
    sign
  })
  return Axios.get(`${baiduUrl}?${urlParam}`)
}
export default { translatorByBaidu }
