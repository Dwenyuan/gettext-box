import { flatten } from 'lodash'
import path from 'path'
import { extractMessagesFromGlob, toPot } from 'react-gettext-parser'
// eslint-disable-next-line no-unused-vars
import { TranslationHeaders } from 'bean/translation-bean'
/**
 * 扫描指定目录下的文件，并提取翻译
 *
 * @export
 * @param {string[]} paths
 * @returns
 */
export function scanFiles (
  paths: string[],
  transformHeaders: TranslationHeaders
) {
  const list = paths.map(v =>
    ['js', 'jsx', 'ts', 'tsx'].map(ex => path.join(v, '/**/*.' + ex))
  )
  const target = flatten(list)
  const message = extractMessagesFromGlob(target, {
    GetText: {
      message: 'msgid',
      messagePlural: 'msgid_plural',
      context: 'msgctxt',
      comment: 'comment'
    },
    funcArgumentsMap: {
      __: ['msgid', 'msgid_plural', 'msgctxt']
    },
    trim: true
  })
  return toPot(message, { transformHeaders: () => transformHeaders })
}
