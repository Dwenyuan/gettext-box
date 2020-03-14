import { flatten } from 'lodash'
import path from 'path'
import { extractMessagesFromGlob, toPot } from 'react-gettext-parser'
import { po } from 'gettext-parser'
// eslint-disable-next-line no-unused-vars
import { TranslationHeaders } from 'bean/translation-bean'
/**
 * 扫描指定目录下的文件，并提取翻译
 *
 * @export
 * @param {string[]} paths
 * @returns
 */
export function scanFiles (paths: string[], headers: TranslationHeaders) {
  // 国家化的方法名
  const fnKey = headers['X-Poedit-KeywordsList'] || 'translate'
  const list = paths.map(v =>
    ['js', 'jsx', 'ts', 'tsx'].map(ex => path.join(v, '/**/*.' + ex))
  )
  const target = flatten(list)
  try {
    const message = extractMessagesFromGlob(target, {
      GetText: {
        message: 'msgid',
        messagePlural: 'msgid_plural',
        context: 'msgctxt',
        comment: 'comment'
      },
      funcArgumentsMap: {
        [fnKey]: ['msgid', 'msgid_plural', 'msgctxt']
      },
      trim: true
    })
    const poStr = toPot(message, {
      transformHeaders: () => ({
        'Content-Type': 'text/plain;charset=utf-8',
        ...headers
      })
    })
    return po.parse(poStr)
  } catch (error) {
    console.error(error)
  }
}
